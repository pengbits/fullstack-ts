import request from "supertest"
import {expectAttributes} from '../.jest/testUtils'
import app from "../app"

describe('wallets', () => {
  describe('GET /api/wallets', () => {
    it('returns the wallet details', async () => {
      const res = await request(app).get('/api/wallets')
      expect(res.status).toBe(200)
      expect(res.body.wallets).toEqual(expect.arrayContaining([{
        balance: expect.any(Number)
      }]))
    })
  })
})