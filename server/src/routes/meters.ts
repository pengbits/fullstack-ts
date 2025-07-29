import express, {Request,Response,NextFunction} from 'express';
import Meter from '../models/meter';
import {MetersResponse} from '../types/MetersResponse'
import { MetersWithinRangeParams } from '../types/MetersWithinRangeParams';
import { Point } from '../models/geo';
import cluster from '../models/cluster';
import { MeterGroupsResponse } from '../types/MeterGroupsResponse';
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants/";
import { HttpException } from "../exceptions/HttpException";
import { ModelNotFoundException } from '../exceptions/ModelNotFoundException';
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
  const {lat,lon,radius} = req.params // radius is in meters
  try {
    const num_groups = Number(req.params.num_groups)
    if(!num_groups) throw new Error('must provide a valid num_groups param for clustering')
    const meters = await metersWithinRange({lat,lon,radius,num_groups})
    const data = meters.map(m => ({lat:m.lat, lon:m.long}))
    const clusters = cluster(data, num_groups)
    const meter_groups = clusters.centroids.map((c,i) => {
      return {
        lat:c.lat, 
        lon:c.lon,
        count:clusters.clusters[i].points.length
      }
    })
    //.filter(group => group.count > 0) 
    // ^ filtering out empties results in less than the requested groups, causing tests to fail
    
    res.status(200).json({meter_groups})
  } catch(e:unknown){
    res.status(500).json({error:e, meter_groups:[]})
  }
})

router.get('/:meter_number', async (req:Request, res:Response<MetersResponse>, next:NextFunction) => {
  try {
    const {meter_number} = req.params
    // TODO move to separate validator file
    if(isNaN(parseInt(meter_number))) {
      throw new HttpException(HTTP_RESPONSE_CODE.BAD_REQUEST, APP_ERROR_MESSAGE.invalidMeterNumber)
    }
    const meter = await Meter.find(meter_number)
    res.status(200).json({meters:[meter]})
  } catch (e:unknown){
    if(e instanceof ModelNotFoundException){
      next(new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND, APP_ERROR_MESSAGE.meterDoesntExist))
    }
    next(e)
  }
})


export default router