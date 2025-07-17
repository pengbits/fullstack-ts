export class ModelNotFoundException extends Error {
  constructor(modelType: string, attrs: {}) {
    super(`could not find ${modelType} in db with ${JSON.stringify(attrs)}`)
  }
}