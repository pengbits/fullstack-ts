import { Point } from "../geo";
import pool from "../../db/pool";



class Meter {  
  static attrs = [
    'meter_number',   //  '3163027'
    'side_of_street', //  'N'
    'on_street',      //  'CHURCH AVENUE'
    'lat',            //  40.6508226226069
    'long'            //  -73.9505230216675
  ]

  static  async withinRange (center:Point, radius:number){
    const sql = `
    SELECT *
    FROM meters
    WHERE ST_DWithin(meters.geo, ST_MakePoint($1,$2)::geography, $3)
    ORDER BY meters.geo <-> ST_MakePoint(lat,long)::geography;`
    console.log(sql, [center.lat,center.lon,radius])

    const result = await pool.query(sql, [center.lat,center.lon,radius])
    return result.rows.map(row => {
      let meter:any = {}
      for(const k in this.attrs){
        const key = this.attrs[k]
        meter[key] = row[key]
      }
      return meter
    })
  }
}

export default Meter