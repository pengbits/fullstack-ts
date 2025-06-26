import express, {Request,Response} from "express";
const app = express()
app.get('/api', (req:Request, res:Response) => {
  res.json({
    "greeting":"Ahoy mate!_"
  })
})
export default app