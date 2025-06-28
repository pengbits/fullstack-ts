import request from "supertest"
import {expectAttributes} from '../.jest/testUtils'
import app from "../app"

describe('meters', () => {
  describe('GET /api/meters/lat,long/radius', () => {
    it('returns an array of meters that fall in the search area', async () => {
      const response = await request(app).get('/api/meters/40.645344,-73.9617345/1')
      expect(response.status).toBe(200)
      expect(response.body.meters).toBeTruthy()
      expect(response.body.meters).toEqual(expect.arrayContaining([{
        pay_by_cell_number:expect.any(Number),
        on_street:expect.any(String),
        side_of_street:expect.any(String)
      }]))
    })
  })
})