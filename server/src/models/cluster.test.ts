import { Point } from "./geo"
import cluster from "./cluster"
import Meter from "./meter"

describe('Cluster', () => {
  describe('kmeans(data)', () => {
    it('returns clusters for the data', async () => {
      const home:Point = {
        lat:40.645639,lon:-73.9509129
      }
      const meters = await Meter.withinRange(home, 1000)
      console.log(`found ${meters.length} meters`)
      const data = meters.map(m => ({lat:m.lat, lon:m.long}))
      const clustered = cluster(data, 3)
      console.log(clustered)
    })
  })
})