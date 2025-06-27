import request from "supertest"
import {expectAttributes} from '../../.jest/testUtils'
import app from "../app"

describe('parking-sessions', () => {
  describe('GET /api/parking-session', () => {
    it('returns data about the current parking session', async () => {
      const response = await request(app).get('/api/parking-session')
      expect(response.status).toBe(200)
      expectAttributes(response.body, [
        'id','car_id','meter_id','meter_location','start_time','end_time','cost'
      ])
    })
  })

  describe('POST /api/parking-sessions', () => {
    it('saves the parking-session attrs to the db', async () => {
      const response = await request(app).post('/api/parking-sessions')
        .send({
          'meter_id': '335108',
          'start_time':'2025-06-27T14:49:16.844Z',
          'duration': 20,
          'price': 50
        })
        .set('Accept', 'application/json')
      expect(response.status).toBe(201)
      expectAttributes(response.body.parking_session, [
        'id','meter_id','start_time','duration','price'
      ])
    })
  })
})