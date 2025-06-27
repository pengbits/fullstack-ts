import request from "supertest"
import {expectAttributes} from '../../.jest/testUtils'
import app from "../app"

describe('parking-sessions', () => {
  describe('GET /parking-session', () => {
    it('returns data about the current parking session', async () => {
      const response = await request(app).get('/parking-session')
      expect(response.status).toBe(200)
      expectAttributes(response.body, [
        'id','car_id','meter_id','meter_location','start_time','end_time','cost'
      ])
    })
  })
})