import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/HttpException";
import { APP_ERROR_MESSAGE } from "../constants";

function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
  const status = error.status ? error.status : 500;
  const message = status === 500 ? APP_ERROR_MESSAGE.serverError : error.message;
  const errors = error.error;
  res.status(status).json({ status, message, error: errors });
}

export default errorMiddleware;