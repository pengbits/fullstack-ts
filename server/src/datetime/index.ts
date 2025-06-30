import dayjs from "dayjs";
import pool from "../db/pool"
export default class DateTime  {
  static async save(date:Date){
    const sql = `INSERT INTO foo (datetime)
    VALUES ($1)`;
    const dateStr = dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    console.log(sql, [dateStr])
    const res = await pool.query(sql, [dateStr])
  }
  static async find (){
    const sql = `SELECT datetime FROM foo ORDER BY datetime DESC LIMIT 1`
    const sql_raw = `SELECT datetime::text FROM foo ORDER BY datetime DESC LIMIT 1`
    const res = await pool.query(sql_raw)
    if(res.rows.length !== 1) throw new Error('badness')

    return res.rows[0]
  }
} 