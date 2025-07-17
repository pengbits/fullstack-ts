import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/HttpException";
import { APP_ERROR_MESSAGE } from "../constants";

function errorMiddleware(e: HttpException, req: Request, res: Response, next: NextFunction) {
  const status = e.status ? e.status : 500;
  const message = status === 500 ? APP_ERROR_MESSAGE.serverError : e.message;
  const error = e.error;
  res.status(status).json({ 
    status, 
    message,
    success: false, 
    error 
  });
}

export default errorMiddleware;