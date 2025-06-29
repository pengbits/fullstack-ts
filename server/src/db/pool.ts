import pg from 'pg'
console.log(`DB.pool ${process.env.PGUSER}@${process.env.PGHOST}`)
const pool = new pg.Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: Number(process.env?.PGPORT),
  max : 5, // max number of clients in the pool
  connectionTimeoutMillis : 5000,
  idleTimeoutMillis : 30000
})

export default pool