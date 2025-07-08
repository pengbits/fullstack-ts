import pool from "../../db/pool"

import ParkingSessionAttributes from "../../types/ParkingSessionAttributes"
import CreateParkingSessionParams from "../../types/CreateParkingSessionParams"
import Meter from "../meter"
import { toDate, toTimestamp } from "../../utils/date"
import { costForDuration } from "../../utils/meters"

class ParkingSession {
  static async current () {
    // TODO join meter to query
    const sql = `SELECT m.meter_number as meter_number, m.side_of_street as side_of_street, m.on_street as on_street, m.lat as lat, m.long as long, s.started as started, s.ends as ends, s.id as id, s.active as active, s.cost as cost
    FROM parking_sessions AS s
    JOIN meters AS m ON s.meter_number=m.meter_number
    ORDER BY ends DESC LIMIT 1`
    console.log(sql)
    try {
      const res = await pool.query(sql)
      if(res.rows.length !== 1) throw new Error('expected 1 row in ParkingSession::current(), found:'+res.rows.length)
      
      const {
        meter_number,
        side_of_street,
        on_street,
        lat,
        long,
        ...session
      } = res.rows[0]
      return Promise.resolve({...session,
        meter: {
          meter_number,
          side_of_street,
          on_street,
          lat,
          long
        }
      })
    }
    catch(e:any){
      throw e
    }
  }

  static async create(attrs:CreateParkingSessionParams): Promise<ParkingSessionAttributes> {
    // TODO validate elsewhere
    if(!attrs.meter_number) throw new Error('Meter number is required')
    if(!attrs.start_time)   throw new Error('Start time is required')
    if(!attrs.duration)     throw new Error('Duration is required')
    
    try {
      const meter = await Meter.find(attrs.meter_number)
      const start = toDate(attrs.start_time)
      const end   = start.add(attrs.duration, 'minute')
      const cost  = costForDuration(attrs.duration)

      const sql = `
      INSERT INTO parking_sessions (meter_number, started, ends, active, cost)
      VALUES ($1,$2,$3,$4,$5) RETURNING id, meter_number, started::text, ends::text, active, cost`
      console.log(sql, [meter.meter_number, toTimestamp(start), toTimestamp(end), true])
      const res =await pool.query(sql, [meter.meter_number, toTimestamp(start), toTimestamp(end), true, cost])    

      if(res.rows.length !== 1) throw new Error('expected 1 row after succesful ParkingSession::create, found:'+res.rows.length)
      const session = res.rows[0]

      return Promise.resolve({
        id: session.id,
        started:session.started,
        ends: session.ends,
        active: session.active,
        cost,
        meter
      })
    }
    catch (e:any){
      throw e
    }
    
  }

  static async update (attrs:any){
    try {
      let sql = `SELECT started, ends, id FROM parking_sessions ORDER BY ends DESC LIMIT 1`
      console.log(sql) 
      let res = await pool.query(sql)
      if(res.rows.length !== 1) throw new Error('expected 1 row in ParkingSession::update, found:'+res.rows.length)
      const session = res.rows[0]
      const {id,started} = session

      if(!attrs.duration || attrs.duration < 0) throw new Error(`invalid duration provided: ${attrs.duration}`)
      const ends = toDate(started).add(attrs.duration, 'minutes')
    
      sql = `UPDATE parking_sessions SET ends=$1 WHERE id=$2;`;
      console.log(sql, [toTimestamp(ends), id])
      res = await pool.query(sql, [toTimestamp(ends),id])
      return {
        ...session,
        ends
      }
    } catch (e:any){
      throw e
    }
  }

  static async deleteAll () {
    const sql = `DELETE FROM parking_sessions`
    console.log(sql)
    const res =  await pool.query(sql)
    return {success:true}
  }
}

export default ParkingSession