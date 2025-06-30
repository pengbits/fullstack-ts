import { expectAttributes } from "../.jest/testUtils"
import ParkingSession from "./parking-session"

describe('ParkingSession', () => {
  describe('new()', () => {
    test('creates a new session for the meter_number and duration provided', async () => {
      const res = await ParkingSession.create({
        meter_number: '3163027',
        start: '2025-06-30T15:32:13.596Z',
        duration: 20,
        
      })
      expect(res).toBeTruthy()
      expect(res.start).toBe('2025-06-30T15:32:13.596Z')
      expect(res.end).toBe('2025-06-30T15:52:13.596Z')
      expectAttributes(res.meter, [
        'meter_number',
        'side_of_street',
        'on_street'
      ])
    })
  })
})