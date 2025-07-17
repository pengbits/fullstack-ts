export class InvalidAttrsException extends Error {
  constructor(modelType: string, message: string) {
    super(`could not create ${modelType}: ${message}`)
  }
}