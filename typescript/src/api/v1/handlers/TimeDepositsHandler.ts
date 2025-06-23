import { Request, Response } from 'express'
import { PrismaClient } from '../../../generated/prisma'
import { TimeDepositCalculator } from '../../services/TimeDepositCalculator'
import { PlanType } from '../../../models/Plan'

const prisma = new PrismaClient()
const calc = new TimeDepositCalculator()

export const getTimeDepositsHandler = async (req: Request, res: Response) => {
  try {
    console.info('Getting Time deposits')
    const deposits = await prisma.timeDeposit.findMany({
      include: { withdrawals: true },
    })
    if (!deposits || deposits.length === 0) {
      res.json({ data: [] })
      return
    }

    res.json({
      data: deposits,
      count: deposits.length,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch time deposits.' })
  }
}

export const updateTimeDepositBalancesHandler = async (req: Request, res: Response) => {
  try {
    console.info('Updating Time deposits')
    const updates = req.body

    if (!Array.isArray(updates) || updates.length === 0) {
      res.status(400).json({ message: 'Request body must be a non-empty array.' })
      return
    }

    const results = []
    const errors = []
    for (const u of updates) {
      try {
        console.info('Updating deposit:', u)
        const updateData: any = { balance: u.balance }
        if (typeof u.days === 'number') updateData.days = u.days
        if (u.planType) updateData.planType = u.planType
        const result = await prisma.timeDeposit.update({
          where: { id: u.id },
          data: updateData,
        })
        results.push(result)
      } catch (error) {
        console.error(`Failed to update deposit with id ${u.id}:`, error)
        errors.push({
          id: u.id,
          message: error instanceof Error ? error.message : error,
        })
      }
    }

    if (errors.length > 0) {
      res.status(207).json({
        message: 'Some updates failed',
        updated: results.length,
        errors,
      })
    } else {
      res.json({
        message: 'Balances updated successfully',
        count: results.length,
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update balances.' })
  }
}
