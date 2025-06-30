import { expectAttributes } from "../.jest/testUtils"
import ParkingSession from "./parking-session"

describe('ParkingSession', () => {
  describe('new()', () => {
    test('creates a new session for the meter_number and duration provided', async () => {
      const s = await ParkingSession.create({
        meter_number: '3163027',
        start: '2025-06-30 12:00:00',
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