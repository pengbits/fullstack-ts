import express, {Request,Response} from 'express';
import Meter from '../models/meter';
import {MetersResponse} from '../types/MetersResponse'
import { MetersWithinRangeParams } from '../types/MetersWithinRangeParams';
import { Point } from '../models/geo';
import { MeterGroupsResponse } from '../types/MeterGroupsResponse';
const router = express.Router();

const metersWithinRange = async ({lat,lon,radius}:MetersWithinRangeParams) => {
  return Meter.withinRange({
    lat: Number(lat),
    lon: Number(lon)
  } as Point, Number(radius))
}

router.get('/:lat,:lon/:radius', async (req:Request<MetersWithinRangeParams>,res:Response<MetersResponse>) => {
  const {lat,lon,radius,num_groups} = req.params // radius is in meters
  try {
    const meters = await metersWithinRange({lat,lon,radius,num_groups})
    res.status(200).json({meters})
  } catch(e:unknown){
    res.status(500).json({error:e, meters:[]})
  }
})

router.get('/:lat,:lon/:radius/:num_groups', async (req:Request<MetersWithinRangeParams>,res:Response<MeterGroupsResponse>) => {
  const {lat,lon,radius,num_groups} = req.params // radius is in meters
  try {
    const meters = await metersWithinRange({lat,lon,radius,num_groups})
    res.status(200).json({meter_groups:[]})
  } catch(e:unknown){
    res.status(500).json({error:e, meter_groups:[]})
  }
})


export default router