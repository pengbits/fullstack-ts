import {describe,it,expect} from 'vitest'
import GetMetersMock from '@/mocks/GetMetersMock.small';
import { aggregate, canMerge } from './aggregator';

describe('Util.markers.aggregator', () => {
  describe('group by location', () => {
    it('collects the meters and collapses them into meter-groups', () => {
      expect(GetMetersMock.meters).toHaveLength(76)
      const res = aggregate(GetMetersMock.meters)
      // expect(res).toHaveLength(3)
    })
  })
  describe('compare markers', () => {
    it('collapses two markers and calculates the count if they are in range', () => {
      const a = {
        meter_number: "3043196",
        side_of_street: "E",
        on_street: "NOSTRAND AVENUE",
        lat: 40.6426632984008,
        long: -73.9486175521103
      }
      const b = {
        meter_number: "3043198",
        side_of_street: "W",
        on_street: "NOSTRAND AVENUE",
        lat: 40.6424929661789,
        long: -73.9487586851238
      }
      expect(canMerge(a,b)).toBe(true)
    })
  })
})