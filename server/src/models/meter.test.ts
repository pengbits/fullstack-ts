import Meter from "./meter"

describe('Meter', () => {
  describe('withinRange(point, radius)', () => {
    test('it returns Meters in the range described', async () => {
      const our_house = {lat:40.645635,lon:-73.9509129}
      const radius_meters = 200
      const meters = await Meter.withinRange(our_house, radius_meters)
      expect(meters.length).toBe(7)
      const meter = meters[0]

      expect(meter.meter_number).toBe('3163027')
      expect(meter.side_of_street).toBe('N')
      expect(meter.on_street).toBe('CHURCH AVENUE')
      expect(meter.lat).toBe(40.6508226226069)
      expect(meter.long).toBe(-73.9505230216675)
    })
  })
})