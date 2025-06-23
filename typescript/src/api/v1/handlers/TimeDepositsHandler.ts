import { Request, Response } from 'express'
import { PrismaClient } from '../../../generated/prisma'
import { TimeDepositCalculator } from '../../services/TimeDepositCalculator'
import { PlanType } from '../../../models/Plan'

const prisma = new PrismaClient()
const calc = new TimeDepositCalculator()

export const getTimeDepositsHandler = async (req: Request, res: Response) => {
  try {
    console.info('Getting Time deposits')
    const page = parseInt(req.query.page as string) || 1
    const pageSize = parseInt(req.query.pageSize as string) || 10
    const skip = (page - 1) * pageSize
    const take = pageSize
    const total = await prisma.timeDeposit.count()
    const deposits = await prisma.timeDeposit.findMany({
      skip,
      take,
      include: { withdrawals: true },
    })
    console.info('Time deposits fetched successfully')
    res.json({
      data: deposits,
      total,
      page,
      pageSize,
      count: deposits.length,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch time deposits.' })
  }
}

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

export const updateTimeDepositBalancesHandler = async (req: Request, res: Response) => {
  try {
    console.info('Updating all time deposit balances')
    const deposits = await prisma.timeDeposit.findMany()
    if (!deposits || deposits.length === 0) {
      res.json({ message: 'No time deposits to update', count: 0 })
      return
    }

    const depositObjs = deposits.map((d) => ({
      id: d.id,
      planType: d.planType as PlanType,
      days: d.days,
      balance: Number(d.balance),
    }))
    calc.updateBalance(depositObjs)

    const batchSize = 100
    const batches = chunkArray(depositObjs, batchSize)
    let updatedCount = 0
    for (const batch of batches) {
      const results = await Promise.all(
        batch.map((d) =>
          prisma.timeDeposit.update({
            where: { id: d.id },
            data: { balance: d.balance },
          }),
        ),
      )
      updatedCount += results.length
    }
    console.info('Updated all time deposit balances')
    res.json({
      message: 'Balances updated successfully',
      count: updatedCount,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update balances.' })
  }
}
