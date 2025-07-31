import request from "supertest"
import {expectAttributes} from '../.jest/testUtils'
import app from "../app"
import Vehicle
 from "../models/vehicle"
describe('vehicles', () => {
  describe('GET /api/vehicles', () => {
    it('returns the list of vehicles', async () => {
      await Vehicle.deleteAll()
      await Vehicle.create({
        name: 'saulmobile',
        id: 'LWYRUP',
        is_default:false
      })
      const res = await request(app).get('/api/vehicles')
      expect(res.status).toBe(200)
      expect(res.body.vehicles).toEqual(expect.arrayContaining([{
        name: expect.any(String),
        id: expect.any(String),
        is_default:expect.any(Boolean)
      }]))
    })
  })

  describe('GET /api/vehicles/:id', () => {
    it('returns the vehicle for the specified id', async () => {
      await Vehicle.deleteAll()
      await Vehicle.create({
        name: 'My Honda',
        id: 'JNT-1000',
        is_default:true
      })
      const res = await request(app).get('/api/vehicles/JNT-1000')
      expect(res.status).toBe(200)
      expect(res.body.vehicle).toEqual({
        name: 'My Honda',
        id: 'JNT-1000',
        is_default:true
      })
    })
  })


  describe('POST /api/vehicles', () => {
    it('creates a new vehicle and saves it to the db', async () => {
      await Vehicle.deleteAll()
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

    it('ids must be unique', async () => {
      await Vehicle.deleteAll()
      const one = await request(app).post('/api/vehicles')
        .send({
          'name': 'kendrickmobile',
          'id': 'GNX24',
          'is_default':false
        })
      const two= await request(app).post('/api/vehicles')
        .send({
          'name': 'kendrickmobile',
          'id': 'GNX24',
          'is_default':false
        })
      expect(two.status).toBe(400)
      expect(two.body.success).toBe(false)
      expect(two.body.error).toEqual('could not create Vehicle: id must be a unique value')
    })
  })

  describe('PUT /api/vehicles/:id', () => {
    it('updates the vehicle for the specified id', async () => {
      await Vehicle.create({
        'name': 'saulmobile',
        'id': 'LWYRUP',
        'is_default':false
      })
      const res = await request(app).put('/api/vehicles/LWYRUP')
        .send({
          'name':'some beater',
          'is_default':true
        })
      expect(res.status).toBe(200) 
      expect(res.body.vehicle.name).toBe('some beater')
    })
  })

  describe('DELETE /api/vehicles/:id', () => {
    it('removes the vehicle from the db', async () => {
      await Vehicle.deleteAll()
      await Vehicle.create({
        'name': 'tempcar',
        'id': 'JSX-1851',
        'is_default':false
      }) 
      const res = await request(app)
        .delete('/api/vehicles/JSX-1851')

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true) 
      expect(res.body.vehicle.id).toBe('JSX-1851')
    })
  })
})