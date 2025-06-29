import { Meter } from "./meter"

describe('Meter', () => {
  describe('withinRange(point, radius)', () => {
    test('it returns Meters in the range described', () => {
      const our_house = {lat:40.645635,lon:-73.9509129}
      const radius_meters = 1000
      const meters = Meter.withinRange(our_house, radius_meters)
      // TODO
      // construct a query to find the meters that fall within
      // the circle described by point, radius
      // to do this with geography type look at
      // https://stackoverflow.com/questions/37827468/find-the-nearest-location-by-latitude-and-longitude-in-postgresql
      expect(meters).toEqual(expect.arrayContaining([{
        pay_by_cell_number:335108,
        on_street:'Nostrand Avenue',
        side_of_street:'E'
      }]))
    })
  })
})