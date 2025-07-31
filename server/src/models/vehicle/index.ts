import pool from "../../db/pool";
import {VehicleAttributes} from "../../common/types/api/VehicleAttributes"
import { InvalidAttrsException } from "../../exceptions/InvalidAttrsException";
import { ModelNotFoundException } from "../../exceptions/ModelNotFoundException";

export class Vehicle {
  id: string
  name: string
  is_default: boolean

  constructor(attrs:VehicleAttributes) {
    this.id = attrs.id
    this.name = attrs.name
    this.is_default = attrs.is_default
  }

  async save(){
    const sql = `UPDATE vehicles SET name=$1, is_default=$2 WHERE id=$3`
    console.log(sql, [this.name, this.is_default, this.id])
    const res = await pool.query(sql, [this.name, this.is_default, this.id])
    return this.serialize()
  }

  async delete(){
    const sql = `DELETE FROM vehicles WHERE id=$1`;
    console.log(sql, [this.id])
    const res = await pool.query(sql, [this.id])
    return res
  }

  serialize ():VehicleAttributes {
    return {
      name: this.name,
      id: this.id,
      is_default: this.is_default
    }
  }

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
  
  static async findById(id:string):Promise<Vehicle> {
    const sql = `SELECT * FROM vehicles WHERE id=$1 LIMIT 1;`
    console.log(sql, [id])
    const res = await pool.query(sql, [id])

    if(res.rows.length > 1){
      throw new Error(`expected 0-1 rows for vehicle::findById(${id})`)
    }
    if(res.rows.length == 0){
      throw new ModelNotFoundException('Vehicle', {id})
    }
    return new Vehicle(res.rows[0])
  }

  static async create({name,id,is_default}:VehicleAttributes) {
    try {
      const sql = `INSERT INTO vehicles (name,id,is_default) VALUES($1,$2,$3)
                 RETURNING name, id, is_default`
      console.log(sql, [name,id,is_default])
      const res = await pool.query(sql, [name,id,is_default])
      return res.rows[0]
    } catch(e:any){
      if(e.message.indexOf('duplicate key value') == 0){
        throw new InvalidAttrsException('Vehicle','id must be a unique value')
      }
      throw(e)
    }
  }
}
export default Vehicle