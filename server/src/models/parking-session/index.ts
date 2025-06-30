import pool from "../../db/pool"
import dayjs from 'dayjs'

import ParkingSessionAttributes from "../../types/ParkingSessionAttributes"
import ParkingSessionParams from "../../types/ParkingSessionParams"
import Meter from "../meter"

const toTimestamp = (date:any) => {
  return dayjs(date).format('MM-DD-YYYY HH:mm:ss')
}

class ParkingSession {

  static async create(attrs:ParkingSessionParams): Promise<ParkingSessionAttributes> {
    // TODO validate elsewhere
    if(!attrs.meter_number) throw new Error('Meter number is required')
    if(!attrs.start) throw new Error('Start time is required')
    if(!attrs.duration) throw new Error('Duration is required')
    
    try {
      const meter = await Meter.find(attrs.meter_number)
      const start = dayjs(attrs.start)
      const end   = start.add(attrs.duration, 'minute')
      
      const sql = `
      INSERT INTO parking_sessions (meter_number, started, ends, active)
      VALUES ($1,$2,$3,$4) RETURNING meter_number, started::text, ends::text, active`
      console.log(sql, [meter.meter_number, toTimestamp(start), toTimestamp(end), true])
      const res =await pool.query(sql, [meter.meter_number, toTimestamp(start), toTimestamp(end), true])    

      if(res.rows.length !== 1) throw new Error('expected 1 row after succesful create, found:'+res.rows.length)
      const session = res.rows[0]

      return Promise.resolve({
        start:session.started,
        end: session.ends,
        active: session.active,
        meter
      })
    }
    catch (e:any){
      throw e
    }
    
  }
}

export default ParkingSession