import express, { Request,Response,NextFunction} from 'express';
import CreateParkingSessionMock from '../mocks/CreateParkingSession';
import GetParkingSessionMock from '../mocks/GetParkingSession'
import ParkingSession from '../models/parking-session'
import { InvalidAttrsException } from '../exceptions/InvalidAttrsException';
import { HttpException } from '../exceptions/HttpException';
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from '../constants';

const router = express.Router();

router.get('/parking-session', async (req:Request,res:Response) => {
  const session = await ParkingSession.current()
  res.json(session)
})

router.get('/parking-sessions', async (req:Request,res:Response) => {
  const sessions = await ParkingSession.find()
  res.json({sessions})
})

router.post('/parking-sessions', async (req:Request,res:Response,next:NextFunction) => {
  try {
    const session = await ParkingSession.create(req.body)
    res.status(201)
    res.json({
      success: true,
      parking_session: session
    })
  } catch (e){
    if(e instanceof InvalidAttrsException){
      next(new HttpException(HTTP_RESPONSE_CODE.BAD_REQUEST, e.message))
    }
    next(e)
  }
})

router.put('/parking-session', async (req:Request, res:Response) => {
  try {
    const updated = await ParkingSession.update({
      duration: req.body.duration
    })

    res.status(200)
    res.json({
      success: true,
      parking_session: updated
    })
  } catch(error){
    console.log(error)
    res.status(400)
    res.json({
      success: false,
      error
    })
  }
})

export default router