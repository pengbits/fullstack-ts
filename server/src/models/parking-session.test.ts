import { expectAttributes } from "../.jest/testUtils"
import ParkingSession from "./parking-session"
import { costForDuration } from "../utils/meters"
import { newDate, toTimestamp } from "../utils/date"
import CreateParkingSessionParams from "../types/CreateParkingSessionParams"

describe('ParkingSession', () => {
  describe('current()', () => {
    test('get the active session', async () => {
      const s = await ParkingSession.current()
      expect(s).toBeTruthy()
      expectAttributes(s, ['meter','id','started','ends','cost'])
      expect(s.cost).toEqual(expect.any(Number))
      expectAttributes(s.meter, [
        'meter_number',
        'side_of_street',
        'on_street'
      ])
    })
    test('only one active session at a time', async () => {
      await ParkingSession.deleteAll()
      const attrs1:CreateParkingSessionParams = {
        meter_number: '3043096',
        start_time: toTimestamp(newDate()),
        duration: 60
      }
      await ParkingSession.create(attrs1)

      const attrs2:CreateParkingSessionParams = {
        meter_number: '3043055',
        start_time: toTimestamp(newDate().add(20, 'minutes')),
        duration: 60
      }
 
      await ParkingSession.create(attrs2)
      const sessions = await ParkingSession.find()
      expect(sessions.length).toBe(2)
      const active_sessions = sessions.filter(s => s.active == true)
      expect(active_sessions.length).toBe(1)
      const current = await ParkingSession.current()
      expect(current.meter.meter_number).toBe('3043055')
    })
  })
  describe('new()', () => {
    test('creates a new session for the meter_number and duration provided', async () => {
      const s = await ParkingSession.create({
        meter_number: '3163027',
        start_time: '2025-06-30 12:00:00',
        duration: 20,
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