import request from 'supertest'
import app from '../index'

describe('TimeDeposits API E2E', () => {
  describe('GET /api/v1/time-deposits', () => {
    it('should return all time deposits with withdrawals', async () => {
      const res = await request(app).get('/api/v1/time-deposits')
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('data')
      expect(Array.isArray(res.body.data)).toBe(true)
      if (res.body.data.length > 0) {
        expect(res.body.data[0]).toHaveProperty('withdrawals')
      }
    })
  })

  describe('POST /api/v1/time-deposits/balances', () => {
    it('should update balances for given deposits', async () => {
      const getRes = await request(app).get('/api/v1/time-deposits')
      expect(getRes.status).toBe(200)
      const deposits = getRes.body.data
      if (!deposits || deposits.length === 0) {
        return
      }
      const updates = deposits.map((d: any) => ({
        id: d.id,
        balance: Number(d.balance) + 1,
      }))
      const postRes = await request(app)
        .patch('/api/v1/time-deposits/balances')
        .send(updates)
        .set('Content-Type', 'application/json')
      expect(postRes.status).toBe(200)
      expect(postRes.body).toHaveProperty('message')
      expect(postRes.body).toHaveProperty('count')
      expect(postRes.body.count).toBe(updates.length)
    })

    it('should return 200 for invalid body', async () => {
      const res = await request(app)
        .patch('/api/v1/time-deposits/balances')
        .send({})
        .set('Content-Type', 'application/json')
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('message')
      expect(res.body).toHaveProperty('count')
    })
  })
})
