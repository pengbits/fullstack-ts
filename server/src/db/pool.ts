import pg from 'pg'
import env from '../env'

const {
  PGUSER,
  PGPASSWORD,
  PGHOST,
  PGPORT,
} = env()

const pool = new pg.Pool({
  user: PGUSER,
  password: PGPASSWORD,
  host: PGHOST,
  port: Number(PGPORT),
  max : 5, // max number of clients in the pool
  connectionTimeoutMillis : 5000,
  idleTimeoutMillis : 30000
})

export default pool