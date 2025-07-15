import { Point } from "../geo";
import pool from "../../db/pool";
import { MeterAttributes } from "../../types/MeterAttributes";
import {QueryResultRow} from 'pg'

class Meter {  
  static async find(id:string):Promise<MeterAttributes> {
    const sql = `
    SELECT * FROM meters WHERE meter_number=$1`
    console.log(sql, [id])
    const result = await pool.query(sql, [id])
    if(result.rows.length !== 1) throw new Error(`expected 1 rows for meter_number:${id}, found:${result.rows.length}`)
    
    return this.serializeRow(result.rows[0])
  }

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
      'from_street':row.from_street,
      'to_street':row.to_street,  
      'lat':row.lat,          
      'long':row.long
    } 
  }
}

export default Meter