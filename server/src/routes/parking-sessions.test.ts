import request from "supertest"
import {expectAttributes} from '../.jest/testUtils'
import app from "../app"
import ParkingSession from "../models/parking-session"
import ParkingSessionAttributes from "../types/ParkingSessionAttributes"
import { toDate, toTimestamp, newDate, getDuration } from "../utils/date"
import { costForDuration } from "../utils/meters"

beforeAll(async () => {
  await ParkingSession.deleteAll()
})


describe('parking-sessions', () => {

  describe('GET /api/parking-session', () => {
    it('returns an empty object if there is no current session', async () => {
      const response = await request(app).get('/api/parking-session')

      expect(response.status).toBe(200)
      expect(response.body.duration).toBe(0)
      
    })
  })

  describe('GET /api/parking-sessions', () => {
    it('returns an array of parking sessions sorted in reverse chron order', async () => {
      const session_attrs = [{
        meter_number: '3163005',
        start_time: toTimestamp(newDate().subtract(1, 'hours')),
        duration: 30
      },{
        meter_number: '3163006',
        start_time: toTimestamp(newDate().subtract(2, 'hours')),
        duration: 60
      },{
        meter_number: '3163007',
        start_time: toTimestamp(newDate().subtract(3, 'hours')),
        duration: 10
      }]

      // this results in multiple active sessions, do not attempt!
      // const created = await Promise.all(session_attrs.map(s => {
      //   return new Promise((resolve, reject) => ParkingSession.create(s).then(resolve))
      // }))
      // const {length} = created
      await ParkingSession.create(session_attrs[0])
      await ParkingSession.create(session_attrs[1])
      await ParkingSession.create(session_attrs[2])
      
      const response = await request(app).get('/api/parking-sessions')
      
      expect(response.status).toBe(200)
      const {sessions} = response.body
      expect(sessions.length).toBe(3)
      expect(sessions.filter((s:ParkingSessionAttributes) => !!s.active)).toHaveLength(1)
      expectAttributes(sessions[0], ["meter", "active", "ends", "started", "id", "cost"])
      expect(sessions[0].cost).toBeTruthy()
      expect(sessions[0].meter).toEqual(expect.objectContaining({
        on_street:expect.any(String),
        side_of_street:expect.any(String),
      }))
    })
  })
  
  describe('POST /api/parking-sessions', () => {
    it('saves the parking-session attrs to the db', async () => {
      const response = await request(app).post('/api/parking-sessions')
        .send({
          'meter_number': '3163005',
          'start_time': toTimestamp(newDate()),
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
      console.log(response.body)
      expect(response.body.success).toBe(false)
    })
  })

  describe('GET /api/parking-session', () => {
    it('returns data about the current parking session', async () => {
      const response = await request(app).get('/api/parking-session')

      expect(response.status).toBe(200)
      expectAttributes(response.body, [
        'id','meter','started','ends','cost'
      ])

      expect(response.body.meter).toEqual({
        'lat'           : expect.any(Number),
        'long'          : expect.any(Number),
        'meter_number'  : expect.any(String),
        'on_street'     : expect.any(String),
        'side_of_street': expect.any(String)
      })
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