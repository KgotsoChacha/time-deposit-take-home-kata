import { getTimeDepositsHandler } from '../api/v1/handlers/TimeDepositsHandler'
import { Request, Response } from 'express'

jest.mock('../generated/prisma', () => {
  const mPrisma = {
    timeDeposit: {
      count: jest.fn(),
      findMany: jest.fn(),
    },
  }
  return { PrismaClient: jest.fn(() => mPrisma) }
})

const mockPrisma = require('../generated/prisma').PrismaClient()

describe('getTimeDepositsHandler', () => {
  let req: Partial<Request>
  let res: Partial<Response>
  let jsonMock: jest.Mock
  let statusMock: jest.Mock

  beforeEach(() => {
    jsonMock = jest.fn()
    statusMock = jest.fn(() => ({ json: jsonMock }))
    req = { query: {} }
    res = {
      json: jsonMock,
      status: statusMock,
    } as any
    jest.clearAllMocks()
  })

  it('should return paginated time deposits with meta info', async () => {
    req.query = { page: '2', pageSize: '5' }
    mockPrisma.timeDeposit.count.mockResolvedValue(12)
    mockPrisma.timeDeposit.findMany.mockResolvedValue([
      { id: 1, planType: 'basic', balance: 1000, days: 45, withdrawals: [] },
      { id: 2, planType: 'premium', balance: 2000, days: 60, withdrawals: [] },
    ])

    await getTimeDepositsHandler(req as Request, res as Response)

    expect(mockPrisma.timeDeposit.count).toHaveBeenCalled()
    expect(mockPrisma.timeDeposit.findMany).toHaveBeenCalledWith({
      skip: 5,
      take: 5,
      include: { withdrawals: true },
    })
    expect(jsonMock).toHaveBeenCalledWith({
      data: [
        { id: 1, planType: 'basic', balance: 1000, days: 45, withdrawals: [] },
        { id: 2, planType: 'premium', balance: 2000, days: 60, withdrawals: [] },
      ],
      total: 12,
      page: 2,
      pageSize: 5,
      count: 2,
    })
  })

  it('should return empty data if no deposits found', async () => {
    req.query = { page: '1', pageSize: '10' }
    mockPrisma.timeDeposit.count.mockResolvedValue(0)
    mockPrisma.timeDeposit.findMany.mockResolvedValue([])

    await getTimeDepositsHandler(req as Request, res as Response)

    expect(jsonMock).toHaveBeenCalledWith({
      data: [],
      total: 0,
      page: 1,
      pageSize: 10,
      count: 0,
    })
  })

  it('should handle errors and return 500', async () => {
    const error = new Error('DB error')
    mockPrisma.timeDeposit.count.mockRejectedValue(error)

    await getTimeDepositsHandler(req as Request, res as Response)

    expect(statusMock).toHaveBeenCalledWith(500)
    expect(jsonMock).toHaveBeenCalledWith({ error: 'Failed to fetch time deposits.' })
  })
})
