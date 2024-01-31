import { ApiError, DbInitiatedGame, DbInsertOneResult, DbStartedGame, Score, StartedGame, WonGame } from "@/typed/typed"
import { ObjectId } from "mongodb"

const isNumber = (param: unknown): param is number => {
  return typeof param === "number" || param instanceof Number
}

const isString = (param: unknown): param is string => {
  return typeof param === "string" || param instanceof String
}

const isDate = (param: unknown): param is Date => {
  return param instanceof Date
}

const isNumericArray = (arr: unknown): arr is number[] => {
  if (!arr || !Array.isArray(arr)) {
    throw new Error(ApiError.InternalError)
  }

  if (arr.length < 1) return true

  if (arr.some((v) => !isNumber(v))) return false

  return true
}

const isScore = (object: unknown): object is Score => {
  if (!object || typeof object !== "object") {
    throw new Error(ApiError.InternalError)
  }

  if (!("_id" in object && "startTime" in object && "time" in object)) {
    throw new Error(ApiError.InternalError)
  }

  if (!(isString(object._id) && isDate(object.startTime) && isNumber(object.time))) {
    throw new Error(ApiError.InternalError)
  }

  return true
}

const isObjectId = (param: unknown): param is ObjectId => {
  // TODO: placeholder - length as string should be 24
  return true
}

export const validateScores = (arr: unknown): Score[] => {
  if (!arr || !Array.isArray(arr)) {
    throw new Error(ApiError.InternalError)
  }

  if (arr.length < 1) return arr

  // if array has any scores, they must be correct form
  if (arr.some((v) => !isScore(v))) {
    throw new Error(ApiError.InternalError)
  }

  return arr as Score[]
}

export const validateDbInsertedOneResult = (object: unknown): DbInsertOneResult => {
  if (!object || typeof object !== "object") {
    throw new Error(ApiError.InternalError)
  }

  if (Object.keys(object).length > 2) {
    throw new Error(ApiError.InternalError)
  }

  if (!("insertedId" in object && "acknowledged" in object)) {
    throw new Error(ApiError.InternalError)
  }

  if (!isObjectId(object.insertedId) || object.acknowledged !== true) {
    throw new Error(ApiError.InternalError)
  }

  return object as DbInsertOneResult
}

export const validateDbInitiatedGame = (object: unknown): DbInitiatedGame => {
  if (!object || typeof object !== "object") {
    throw new Error(ApiError.InternalError)
  }

  if (Object.keys(object).length > 2) {
    throw new Error(ApiError.InternalError)
  }

  if (!("_id" in object && "mines" in object)) {
    throw new Error(ApiError.InternalError)
  }

  if (!(isObjectId(object._id) && isNumericArray(object.mines))) {
    throw new Error(ApiError.InternalError)
  }

  return object as DbInitiatedGame
}

export const validateDbStartedGame = (object: unknown): DbStartedGame => {
  if (!object || typeof object !== "object") {
    throw new Error(ApiError.NotFoundError)
  }

  if (Object.keys(object).length > 3) {
    throw new Error(ApiError.InternalError)
  }

  if (!("_id" in object && "startTime" in object && "mines" in object)) {
    throw new Error(ApiError.InternalError)
  }

  if (!(isObjectId(object._id) && isNumericArray(object.mines) && isDate(object.startTime))) {
    throw new Error(ApiError.InternalError)
  }

  return object as DbStartedGame
}
