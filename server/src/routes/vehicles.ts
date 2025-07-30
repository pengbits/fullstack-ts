import express, {Request,Response,NextFunction} from 'express';
import Vehicle from '../models/vehicle';

const router = express.Router();
router.get('/', async (req:Request, res:Response, next:NextFunction) => {
  try {
    const vehicles = await Vehicle.find()
    res.status(200).json({
      vehicles
    })
  }
  catch(e){
    next(e)
  }
})

router.post('/', async (req:Request, res:Response, next:NextFunction) => {
  try {
    const vehicle = await Vehicle.create(req.body)
    res.status(201).json({
      success: true,
      vehicle 
    })
  }
  catch(e){
    console.log(e)
    next(e)
  }
})



export default router