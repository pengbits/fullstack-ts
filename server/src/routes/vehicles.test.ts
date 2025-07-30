import request from "supertest"
import {expectAttributes} from '../.jest/testUtils'
import app from "../app"

describe('vehicles', () => {
  describe('GET /api/vehicles', () => {
    it('returns the list of vehicles', async () => {
      const res = await request(app).get('/api/vehicles')
      expect(res.status).toBe(200)
      expect(res.body.vehicles).toEqual(expect.arrayContaining([{
        name: expect.any(String),
        id: expect.any(String),
        is_default:expect.any(Boolean)
      }]))
    })
  })

  describe('POST /api/vehicles', () => {
    it('creates a new vehicle and saves it to the db', async () => {
      const res = await request(app).post('/api/vehicles')
        .send({
          'name': 'saulmobile',
          'id': 'LWYRUP',
          'is_default':false
        })
        .set('Accept', 'application/json')
      expect(res.status).toBe(201) 
      expect(res.body).toEqual({
        success:true,
        vehicle: {
          'name': 'saulmobile',
          'id': 'LWYRUP',
          'is_default':false
        }
      })
    })
  })
})