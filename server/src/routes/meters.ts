import express, {Request,Response} from 'express';
import GetMetersMock from '../mocks/GetMeters';
const router = express.Router();

router.get('/:lat,:long/:radius', (req:Request,res:Response) => {
  const {lat,long,radius} = req.params // radius is in meters
  console.log(`find parking meters that fall within this search area:`, lat,long,radius)
  res.json({
    meters:GetMetersMock
  })
})

export default router