import express, {Request,Response} from 'express';
import CreateParkingSessionMock from '../mocks/CreateParkingSession';
import GetParkingSessionMock from '../mocks/GetParkingSession'
import ParkingSession from '../models/parking-session'

const router = express.Router();

router.get('/parking-session', (req:Request,res:Response) => {
  const p = new ParkingSession()
  res.json(GetParkingSessionMock)
})

router.post('/parking-sessions', (req:Request,res:Response) => {
  try {
    res.status(201)
    res.json({
      success: true,
      parking_session: CreateParkingSessionMock
    })
  } catch (error){
    console.log(error)
  }
})

export default router