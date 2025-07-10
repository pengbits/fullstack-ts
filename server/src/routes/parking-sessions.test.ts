import request from "supertest"
import {expectAttributes} from '../.jest/testUtils'
import app from "../app"
import ParkingSession from "../models/parking-session"
import { toDate, toTimestamp, getDuration } from "../utils/date"
import { costForDuration } from "../utils/meters"

beforeAll(async () => {
  await ParkingSession.deleteAll()
})


describe('parking-sessions', () => {
  describe('GET /api/parking-session', () => {
    it('returns data about the current parking session', async () => {
      // const response = await request(app).get('/api/parking-session')

      // expect(response.status).toBe(200)
      // expectAttributes(response.body, [
      //   'id','meter','started','ends','cost'
      // ])

      // expect(response.body.meter).toEqual({
      //   'lat'           : expect.any(Number),
      //   'long'          : expect.any(Number),
      //   'meter_number'  : expect.any(String),
      //   'on_street'     : expect.any(String),
      //   'side_of_street': expect.any(String)
      // })
    })
  })

  describe('POST /api/parking-sessions', () => {
    it('saves the parking-session attrs to the db', async () => {
      const response = await request(app).post('/api/parking-sessions')
        .send({
          'meter_number': '3163005',
          'start_time':'2025-06-30T14:00:00.000Z',
          'duration': 20,
        })
        .set('Accept', 'application/json')
      expect(response.status).toBe(201)
      expectAttributes(response.body.parking_session, [
        'id','started','ends','active','meter'
      ])
      expectAttributes(response.body.parking_session.meter, [
        'meter_number',   //: '3163005',
        'side_of_street', //: 'W',
        'on_street',      //: 'NOSTRAND AVENUE',
        'lat',            //: 40.6558028823484,
        'long'            //: -73.950029350261
      ])
    })

    it('returns an error if meter_id, start_time or duration are missing', async () => {
      const response = await request(app).post('/api/parking-sessions')
        .send({
          'start_time':'2025-06-T14:49:16.844Z',
          'duration': 20
        })
        .set('Accept', 'application/json')
      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
    })
  })

  describe('PUT /api/parking-session', () => {
    it('extends the length of the current parking session', async () => {
      const current = await ParkingSession.current()
      const currentDuration = getDuration(current.started, current.ends)
      const expectedEnds = toDate(current.ends).add(40, "minutes")
      const expectedCost = costForDuration(currentDuration+40)
      const res = await request(app).put('/api/parking-session')
        .send({
          'duration' : currentDuration + 40
        })
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      
      const updated = res.body.parking_session
      expect(toDate(updated.ends).toISOString()).toEqual(expectedEnds.toISOString())
      expect(updated.cost).toEqual(expectedCost)
      // 
    })
  })
})