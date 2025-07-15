import request from "supertest"
import {expectAttributes} from '../.jest/testUtils'
import app from "../app"

describe('meters', () => {
  describe('GET /api/meters/lat,long/radius', () => {
    it('returns an array of meters that fall in the search area', async () => {
      const response = await request(app).get('/api/meters/40.645344,-73.9617345/1000')
      expect(response.status).toBe(200)
      expect(response.body.meters).toBeTruthy()
      expect(response.body.meters.length).toBeGreaterThan(0)
      const meter = response.body.meters[0]
        expectAttributes(meter, [
          'meter_number',
          'side_of_street',
          'on_street',
          'lat',
          'long',
          'from_street',
          'to_street'
        ])
    })
  })
  describe('GET /api/meters/lat,long/radius/num_groups', () => {
    it('returns an array of meter-groups (clusters) that fall in the search area', async () => {
      const num_groups = 20
      const response = await request(app).get('/api/meters/40.645344,-73.9617345/400/'+num_groups)
      expect(response.status).toBe(200)
      expect(response.body.meter_groups).toBeTruthy()
      expect(response.body.meter_groups.length).toBe(num_groups)
      const i = Math.floor(Math.random() * response.body.meter_groups.length)
      const group = response.body.meter_groups[i]
      expectAttributes(group,[
        'lat','lon','count'
      ])
      // how about adding up the meters in each cluster and checking the total is the same?
    })
  })
})