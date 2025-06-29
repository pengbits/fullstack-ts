import { Point } from "../geo";
import pool from "../../db/pool";



class Meter {  
  static  async withinRange (center:Point, radius:number){
    const sql = `
    SELECT *
    FROM meters
    WHERE ST_DWithin(meters.geo, ST_MakePoint($1,$2)::geography, $3)
    ORDER BY meters.geo <-> ST_MakePoint(lat,long)::geography;`
    console.log(sql, [center.lat,center.lon,radius])

    const result = await pool.query(sql, [center.lat,center.lon,radius])
    return result.rows
  }
}

export default Meter