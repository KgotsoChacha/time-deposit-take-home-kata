import { Router } from 'express'
import {
  getTimeDepositsHandler,
  updateTimeDepositBalancesHandler,
} from '../handlers/TimeDepositsHandler'

const router = Router()

/**
 * @openapi
 * /api/v1/time-deposits:
 *   get:
 *     summary: Get all time deposits
 *     tags:
 *       - TimeDeposits
 *     responses:
 *       200:
 *         description: List of time deposits
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       planType:
 *                         type: string
 *                         enum: [basic, premium, student]
 *                       balance:
 *                         type: number
 *                       days:
 *                         type: integer
 *                       withdrawals:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             amount:
 *                               type: number
 *                             date:
 *                               type: string
 *                               format: date-time
 *                             timeDepositId:
 *                               type: integer
 *                 count:
 *                   type: integer
 */
router.get('/', getTimeDepositsHandler)

/**
 * @openapi
 * /api/v1/time-deposits/balances:
 *   post:
 *     summary: Update all time deposit balances
 *     tags:
 *       - TimeDeposits
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 planType:
 *                   type: string
 *                   enum: [basic, premium, student]
 *                 days:
 *                   type: integer
 *                 balance:
 *                   type: number
 *     responses:
 *       200:
 *         description: Balances updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 count:
 *                   type: integer
 */
router.post('/balances', updateTimeDepositBalancesHandler)

export default router
