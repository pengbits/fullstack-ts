import express, {Request,Response,NextFunction} from 'express';
import { HttpException } from '../exceptions/HttpException';
import Vehicle from '../models/vehicle';
import { ModelNotFoundException } from '../exceptions/ModelNotFoundException';
import { InvalidAttrsException} from '../exceptions/InvalidAttrsException'
import {HTTP_RESPONSE_CODE, APP_ERROR_MESSAGE} from '../constants'

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
  catch(e:any){
    if(e instanceof InvalidAttrsException){
      res.status(400).json({
        success:false,
        error: e.message
      })
    }
    next(e)
  }
})

router.put('/:id', async (req:Request, res:Response, next:NextFunction) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
    
    if(req.body.is_default !== undefined) {
      vehicle.is_default = req.body.is_default
    }
    
    if(req.body.name !== undefined) {
      vehicle.name = req.body.name
    }
    
    const update = await vehicle.save()
    res.status(200).json({
      success:true,
      vehicle: update
    })
  }
  catch(e){
    if(e instanceof ModelNotFoundException){
      next(new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND, APP_ERROR_MESSAGE.vehicleDoesntExist))
    }
    next(e)
  }
})

router.delete('/:id', async (req:Request, res:Response, next:NextFunction) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
    await vehicle.delete()
    
    res.status(200).json({
      success:true,
      vehicle
    })
  } 
  catch(e){
    if(e instanceof ModelNotFoundException){
      next(new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND, APP_ERROR_MESSAGE.vehicleDoesntExist))
    }
    next(e)
  }
})
    

export default router