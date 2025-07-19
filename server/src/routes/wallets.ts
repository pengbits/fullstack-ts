import express, {Request,Response,NextFunction} from 'express';
import Wallet from '../models/wallet';

const router = express.Router();
router.get('/', async (req:Request, res:Response, next:NextFunction) => {
  try {
    const wallet = await Wallet.findOrCreate()
    res.status(200).json({
      wallets: [wallet]
    })
  }
  catch(e){
    next(e)
  }
})

export default router