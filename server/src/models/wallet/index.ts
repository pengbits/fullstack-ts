import pool from "../../db/pool";
import {WalletAttributes} from "../../common/types/api/WalletAttributes"

const initial_balance = 2000

export class Wallet {
  balance: number

  constructor(attrs:WalletAttributes){
    this.balance = attrs.balance
  }

  serialize():WalletAttributes {
    return {
      balance: this.balance
    }
  }

  decrement(amount:number):number {
    this.balance -= amount
    return this.balance
  }

  async save(){
    try {
      const sql = `UPDATE wallets SET balance=${this.balance}`
      console.log(sql)
      const res = await pool.query(sql)
      return this.serialize()
    }
    catch(e){
      throw(e)
    }
  }

  static async findOrCreate() {
    const [row] = await Wallet.find()
    if(row) {
      return new Wallet(row)
    }
    return Wallet.create()
  }

  static async create(){
    try {
      const sql = `INSERT INTO wallets (balance) VALUES (${initial_balance}) RETURNING (balance);`
      console.log(sql)
      const res = await pool.query(sql)
      if(res.rows.length !== 1){
        throw new Error('could not create Wallet in db')
      }
      return new Wallet(res.rows[0])
    } catch (e){
      throw(e)
    }
  }

  static async find(){
    const sql = `SELECT * FROM wallets`;
    console.log(sql)
    const res = await pool.query(sql)
    return res.rows
  }

  static async deleteAll(){
    const sql = `DELETE FROM wallets`;
    console.log(sql)
    return pool.query(sql)
  }
}

export default Wallet