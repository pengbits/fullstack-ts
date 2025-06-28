import request from "supertest"
import {isInsideCircle} from './geo/index'

describe('geography', () => {
  
  test('isInsideCircle(point, circleCenter, radius) == true', () => {
    const cafe_madeline = {lat:40.645344, lon:-73.9617345}
    const circle_center = {lat:40.641926, lon:-73.96335}
    const radius_meters = 1000
    const bool = isInsideCircle(cafe_madeline, circle_center, radius_meters)
    expect(bool).toBe(true)
  })
  
  test('isInsideCircle(point, circleCenter, radius) == false', () => {
    const the_junction = {lat:40.6323967, lon:-73.9524284}
    const circle_center = {lat:40.641926, lon:-73.96335}
    const radius_meters = 1000
    const bool = isInsideCircle(the_junction, circle_center, radius_meters)
    expect(bool).toBe(false)
  })
})