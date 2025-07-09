import { expectAttributes } from "../.jest/testUtils"
import ParkingSession from "./parking-session"
import { costForDuration } from "../utils/meters"

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
      // ParkingSession.deleteAll()
      // ParkingSession.create(ends:4:15pm ...attrs1) 
      // ParkingSession.create(ends:4:30pm ...attrs2)
      // ParkingSession.current() === attrs2
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