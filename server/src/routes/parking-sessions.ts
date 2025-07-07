import express, {Request,Response} from 'express';
import CreateParkingSessionMock from '../mocks/CreateParkingSession';
import GetParkingSessionMock from '../mocks/GetParkingSession'
import ParkingSession from '../models/parking-session'

const router = express.Router();

router.get('/parking-session', async (req:Request,res:Response) => {
  const session = await ParkingSession.current()
  res.json(session)
})

router.post('/parking-sessions', async (req:Request,res:Response) => {
  try {
    const session = await ParkingSession.create(req.body)
    res.status(201)
    res.json({
      success: true,
      parking_session: session
    })
  } catch (error){
    res.status(400)
    res.json({
      success: false,
      error: error
    })
  }
})

export default router