import { Point } from "../geo";
import pool from "../../db/pool";
import { MeterAttributes } from "../../types/MeterAttributes";
import {QueryResultRow} from 'pg'

class Meter {  
  static async withinRange (center:Point, radius:number){
    const sql = `
    SELECT *
    FROM meters
    WHERE ST_DWithin(meters.geo, ST_MakePoint($1,$2)::geography, $3)
    ORDER BY meters.geo <-> ST_MakePoint(lat,long)::geography;`
    console.log(sql, [center.lat,center.lon,radius])

    const result = await pool.query(sql, [center.lat,center.lon,radius])
    return result.rows.map(row => this.serializeRow(row))
  }

  static serializeRow = (row:QueryResultRow):MeterAttributes => {
    return {
      'meter_number':row.meter_number,  
      'side_of_street':row.side_of_street,
      'on_street':row.on_street,   
      'lat':row.lat,          
      'long':row.long
    } 
  }
}

export default Meter