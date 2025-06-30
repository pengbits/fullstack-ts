import pool from "../../db/pool"

class ParkingSession {
  constructor(){
    console.log('hello from parking-session', process.env.PGUSER)
  }
}

export default ParkingSession