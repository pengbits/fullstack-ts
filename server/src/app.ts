import express, {Request,Response} from "express";
import bodyParser from "body-parser";
import logger from 'morgan'
import cors from 'cors'
import errorsMiddleware from "./middleware/errors";
import routes from "./routes";


const app = express()
app.get('/api', (req:Request, res:Response) => {
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
app.use('/api/wallets', routes.wallets)
app.use(errorsMiddleware)
export default app