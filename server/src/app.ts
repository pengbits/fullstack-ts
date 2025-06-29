import express, {Request,Response} from "express";
import bodyParser from "body-parser";
import logger from 'morgan'
import cors from 'cors'
import routes from "./routes";
import env from "./env"; env()


const app = express()
app.get('/api', (req:Request, res:Response) => {
  console.log(process.env.PGUSER)
  res.json({
    "greeting":"Ahoy!"
  })
})
app.use(logger('dev'))
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use('/api',         routes.parkingSessions)
app.use('/api/meters',  routes.meters)


export default app