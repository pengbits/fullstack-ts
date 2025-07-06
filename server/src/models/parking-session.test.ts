import { expectAttributes } from "../.jest/testUtils"
import ParkingSession from "./parking-session"

describe('ParkingSession', () => {
  describe('current()', () => {
    test('get the active session', async () => {
      const s = await ParkingSession.current()
      expect(s).toBeTruthy()
      expectAttributes(s, ['meter_number','active','started','ends'])
      expect(s.active).toBe(true)
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
      expect(s.active).toBe(true)
      expect(s.start).toBe('2025-06-30 12:00:00')
      expect(s.end).toBe('2025-06-30 12:20:00')
      expectAttributes(s.meter, [
        'meter_number',
        'side_of_street',
        'on_street'
      ])
    })
  })
})