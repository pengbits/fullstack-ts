export class HttpException extends Error {
  status: number;
  error: {};
  constructor(status: number, message: string, error?: any) {
    super(message);
    this.status = status;
    this.error = error;
  }
}