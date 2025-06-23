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
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number (optional)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Page size (optional)
 *     responses:
 *       200:
 *         description: List of time deposits (paginated)
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
 *                 total:
 *                   type: integer
 *                   description: Total number of time deposits
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 pageSize:
 *                   type: integer
 *                   description: Number of items per page
 *                 count:
 *                   type: integer
 *                   description: Number of items in this page
 *             examples:
 *               default:
 *                 summary: Example paginated response
 *                 value:
 *                   data:
 *                     - id: 1
 *                       planType: basic
 *                       balance: 1000.5
 *                       days: 45
 *                       withdrawals:
 *                         - id: 10
 *                           amount: 100.0
 *                           date: "2025-06-01T12:00:00Z"
 *                           timeDepositId: 1
 *                         - id: 11
 *                           amount: 50.0
 *                           date: "2025-06-10T12:00:00Z"
 *                           timeDepositId: 1
 *                   total: 15
 *                   page: 1
 *                   pageSize: 10
 *                   count: 1
 */
router.get('/', getTimeDepositsHandler)


/**
 * @openapi
 * /api/v1/time-deposits/balances:
 *   patch:
 *     summary: Update the balances of all time deposits
 *     tags:
 *       - TimeDeposits
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
 *             examples:
 *               default:
 *                 value:
 *                   message: Balances updated successfully
 *                   count: 15
 *       500:
 *         description: Failed to update balances
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.patch('/balances', updateTimeDepositBalancesHandler)

export default router
