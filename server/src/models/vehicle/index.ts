import pool from "../../db/pool";
import { QueryResultRow } from "pg";
import {VehicleAttributes} from "../../common/types/api/VehicleAttributes"


class Vehicle {
  static async deleteAll() {
    const sql = `DELETE FROM vehicles`
    const res = await pool.query(sql)
    return {success:true}
  }

  static async find(): Promise<VehicleAttributes[]> {
    const sql = `SELECT * FROM vehicles;`
    console.log(sql)
    const res = await pool.query(sql)
    return res.rows
  }

  static async create({name,id,is_default}:VehicleAttributes) {
    const sql = `INSERT INTO vehicles (name,id,is_default) VALUES($1,$2,$3)
                 RETURNING name, id, is_default`
    console.log(sql, [name,id,is_default])
    const res = await pool.query(sql, [name,id,is_default])
    const row = res.rows[0]
    return this.serializeRow(row)
  }

  static serializeRow = (row:QueryResultRow):VehicleAttributes => {
    return {
      name: row.name,
      id: row.id,
      is_default: row.is_default
    }
  }
}
export default Vehicle