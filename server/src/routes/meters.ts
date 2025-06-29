import express, {Request,Response} from 'express';
import Meter from '../models/meter';
import { Point } from '../models/geo';
const router = express.Router();

router.get('/:lat,:lon/:radius', async (req:Request,res:Response) => {
  const {lat,lon,radius} = req.params // radius is in meters
  // console.log(`find parking meters that fall within this search area:`, lat,lon,radius)
  try {

    const meters = await Meter.withinRange({
      lat: Number(lat),
      lon: Number(lon)
    } as Point, Number(radius))
    res.status(200).json({meters})
  } catch(e:unknown){
    res.status(500).json({error:e})
  }
})

export default router