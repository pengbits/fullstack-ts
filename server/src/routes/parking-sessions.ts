import express, {Request,Response} from 'express';
const router = express.Router();


const mock = {
	'id': 1,
	'car_id': 1,
	'meter_id': 335108,
	'meter_location': '1663 E nostrand Ave',
	'start_time': '2025-06-27T14:49:16.844Z',
	'end_time': '2025-06-27T15:09:16.844Z',
	'cost': 25
}

router.get('/parking-session', (req:Request,res:Response) => {
  res.json(mock)
})

export default router