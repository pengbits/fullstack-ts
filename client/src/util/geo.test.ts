import {describe,it,expect} from 'vitest'
import { measure, getDimensionsFromBounds, getSearchRadiusFromDimensions } from "./geo"

describe('geo', () => {
  describe('measure(p1,p2)', () => {
    it('returns distance between two points in meters', () => {
      const d = measure({
        lat: 40.659416408148644,
        lon: -73.93824526718493
      }, {
        lat:40.63593982800676, 
        lon: -73.98819872787828
      })
      expect(d).toBe(4957.408539505147)
    })
  })

  describe('getDimensionsFromBounds(ne,sw) => {width,height})', () => {
    it('returns the width and height, in meters, for the map bounds', () => {
      const ne= {lat: 40.666822352797524, lon: -73.92826744964952}
      const sw= {lat: 40.628530455207326, lon: -73.99817654541368}
      const dimensions = getDimensionsFromBounds({ne,sw})
      expect(dimensions).toEqual({ width:5896, height:4257 })
    })
  })

  describe('getSearchRadiusFromDimensions', () => {
    it('returns the 1/2 of the larger of the two properties, width or height', () => {
      const r = getSearchRadiusFromDimensions({ width: 5896, height: 4257 })
      expect(r).toEqual(2948)
    })
  })
})