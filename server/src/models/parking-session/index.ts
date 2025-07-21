import pool from "../../db/pool"

import ParkingSessionAttributes from "../../types/ParkingSessionAttributes"
import CreateParkingSessionParams from "../../types/CreateParkingSessionParams"
import Meter from "../meter"
import { InvalidAttrsException } from "../../exceptions/InvalidAttrsException"
import { ModelNotFoundException } from "../../exceptions/ModelNotFoundException"
import { getDuration, toDate, toTimestamp } from "../../utils/date"
import { costForDuration } from "../../utils/meters"
import Wallet from "../wallet"

class ParkingSession {
  static async current () {
    const sql = `SELECT m.meter_number as meter_number, m.side_of_street as side_of_street, m.on_street as on_street, m.lat as lat, m.long as long, s.started as started, s.ends as ends, s.id as id, s.active as active, s.cost as cost
    FROM parking_sessions AS s
    JOIN meters AS m ON s.meter_number=m.meter_number
    WHERE s.active=true AND s.ends::date >= NOW()`
    console.log(sql)
    try {
      const res = await pool.query(sql)
      
      if(res.rows.length > 1) {
        throw new Error('expected 0-1 rows in ParkingSession::current(), found:'+res.rows.length)
      }

      if(res.rows.length == 0) {
        return {
          duration:0
        }
      }

      return this.getSessionAttributesFromRow(res.rows[0])
    }
    catch(e:any){
      throw e
    }
  }

  static getSessionAttributesFromRow = (row:any) => {
    const {
      meter_number,
      side_of_street,
      on_street,
      lat,
      long,
      cost,
      ...session
    } = row
    return {
      ...session,
      cost: parseInt(cost),
      duration: getDuration(session.started, session.ends),
      meter: {
        meter_number,
        side_of_street,
        on_street,
        lat,
        long
      }
    }
  }

  static async create(attrs:CreateParkingSessionParams): Promise<ParkingSessionAttributes> {
    // TODO validate elsewhere
    if(!attrs.meter_number) throw new InvalidAttrsException('Meter','Meter number is required')
    if(!attrs.start_time)   throw new InvalidAttrsException('Meter','Start time is required')
    if(!attrs.duration)     throw new InvalidAttrsException('Meter','Duration is required')
    
    try {
      const meter = await Meter.find(attrs.meter_number)
      if(!meter) throw new ModelNotFoundException('meter', attrs)
      await this.unsetActive()
      
      const start = toDate(attrs.start_time)
      const end   = start.add(attrs.duration, 'minute')
      const cost  = costForDuration(attrs.duration)
      
      const wallet = await Wallet.findOrCreate()
      wallet.decrement(cost)
      await wallet.save()
      
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
  
  static async unsetActive(){
    const sql = `UPDATE parking_sessions SET active=false WHERE active=true`
    console.log(sql)
    return pool.query(sql)
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
      const cost = costForDuration(attrs.duration)
      sql = `UPDATE parking_sessions SET ends=$1, cost=$2 WHERE id=$3;`;
      console.log(sql, [toTimestamp(ends), cost, id])
      res = await pool.query(sql, [toTimestamp(ends), cost, id])
      return {
        ...session,
        cost,
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

  static async find () {
    const sql = `SELECT m.meter_number as meter_number, m.side_of_street as side_of_street, m.on_street as on_street, m.lat as lat, m.long as long, s.started as started, s.ends as ends, s.id as id, s.active as active, s.cost as cost
    FROM parking_sessions AS s
    JOIN meters AS m ON s.meter_number=m.meter_number`
    console.log(sql)
    const res = await pool.query(sql)
    return res.rows.map(r => this.getSessionAttributesFromRow(r))
  }
}

export default ParkingSession