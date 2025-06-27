import express, {Request,Response} from "express";
const app = express()
import routes from "./routes";

app.get('/api', (req:Request, res:Response) => {
  res.json({
    "greeting":"Ahoy!"
  })
})

app.use('/', routes.parkingSessions)


export default app