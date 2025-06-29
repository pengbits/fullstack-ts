import { Point } from "../geo";

const sql = `
SELECT *
FROM meters
WHERE ST_DWithin(meters.geo, ST_MakePoint(40.645635,-73.9509129)::geography, 1000)
ORDER BY meters.geo <-> ST_MakePoint(lat,long)::geography;`

class Meter {  
  static withinRange (center:Point, radius:number){
    console.log(`Meter::withinRange`, center, radius)
    return []
  }
}

export default Meter