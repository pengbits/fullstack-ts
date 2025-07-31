import { expectAttributes } from "../.jest/testUtils"
import ParkingSession from "./parking-session"
import Vehicle from "./vehicle"
import { costForDuration } from "../utils/meters"
import { newDate, toTimestamp } from "../utils/date"
import {CreateParkingSessionParams} from "../common/types/api/CreateParkingSessionParams"

beforeEach(async() => {
  await ParkingSession.deleteAll()
  await Vehicle.deleteAll()
  await Vehicle.create({
    id:'LWYRUP',
    name:'saulmobile',
    is_default:false
  })
})

describe('ParkingSession', () => {
  describe('current()', () => {
    test('get the active session', async () => {
      await ParkingSession.create({
        meter_number: '3043096',
        start_time: toTimestamp(newDate()),
        duration: 30,
        vehicle_id:'LWYRUP'
      })
      const s = await ParkingSession.current()
      expect(s).toBeTruthy()
      expectAttributes(s, ['meter','id','started','ends','cost','vehicle'])
      expect(s.cost).toEqual(expect.any(Number))
      expectAttributes(s.meter, [
        'meter_number',
        'side_of_street',
        'on_street'
      ])
    })
    test('only one active session at a time', async () => {
      const attrs1:CreateParkingSessionParams = {
        meter_number: '3043096',
        start_time: toTimestamp(newDate()),
        duration: 60,
        vehicle_id:'LWYRUP'
      }
      await ParkingSession.create(attrs1)

      const attrs2:CreateParkingSessionParams = {
        meter_number: '3043055',
        start_time: toTimestamp(newDate().add(20, 'minutes')),
        duration: 60,
        vehicle_id:'LWYRUP'
      }
 
      await ParkingSession.create(attrs2)
      const sessions = await ParkingSession.find()
      expect(sessions.length).toBe(2)
      const active_sessions = sessions.filter(s => s.active == true)
      expect(active_sessions.length).toBe(1)
      const current = await ParkingSession.current()
      expect(current.meter.meter_number).toBe('3043055')
    })
    
    test('returns a session with duration=0 if last active session has expired', async () => {
      const expired = await ParkingSession.create({
        meter_number: '3163027',
        start_time: toTimestamp(newDate().subtract(15, 'minutes')),
        duration: 10,
        vehicle_id:'LWYRUP'
      })
      const c = await ParkingSession.current()
      expect(c).toEqual({duration:0})
    })
  })

  describe('new()', () => {
    test('creates a new session for the meter_number and duration provided', async () => {
      const s = await ParkingSession.create({
        meter_number: '3163027',
        start_time: '2025-06-30 12:00:00',
        duration: 20,
        vehicle_id:'LWYRUP'
      })
      expect(s).toBeTruthy()
      expect(s.started).toBe('2025-06-30 12:00:00')
      expect(s.ends).toBe('2025-06-30 12:20:00')
      expect(s.cost).toBe(costForDuration(20))
      expectAttributes(s.meter, [
        'meter_number',
        'side_of_street',
        'on_street'
      ])
    })
  })
})