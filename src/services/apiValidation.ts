import {
  ApiError,
  ApiErrorResponse,
  DbInitiatedGame,
  DbInsertOneResult,
  DbStartedGame,
  Score,
  StartedGame,
  WonGame,
} from "@/typed/typed"
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
    return false
  }

  if (arr.length < 1) return true

  if (arr.some((v) => !isNumber(v))) return false

  return true
}

const isScore = (object: unknown): object is Score => {
  if (!object || typeof object !== "object") {
    return false
  }

  if (!("_id" in object && "startTime" in object && "time" in object)) {
    return false
  }

  if (!(isString(object._id) && isDate(object.startTime) && isNumber(object.time))) {
    return false
  }

  return true
}

const isObjectId = (param: unknown): param is ObjectId => {
  // TODO: placeholder - length as string should be 24
  return true
}

const isError = (error: unknown): error is Error => {
  if (error instanceof Error) return true

  return false
}

export const validateScores = (arr: unknown): Score[] => {
  if (!arr || !Array.isArray(arr)) {
    throw new Error(`${ApiError.InternalError}: ${arr} does not match with type Score[]`)
  }

  if (arr.length < 1) return arr

  // if array has any scores, they must be correct form
  arr.some((v) => {
    if (!isScore(v)) {
      throw new Error(`${ApiError.InternalError}: ${v} does not match with type Score`)
    }
  })

  return arr as Score[]
}

export const validateDbInsertedOneResult = (object: unknown): DbInsertOneResult => {
  if (!object || typeof object !== "object") {
    throw new Error(`${ApiError.InternalError}: ${object} does not match with type DbInsertOneResult`)
  }

  if (Object.keys(object).length > 2) {
    throw new Error(`${ApiError.InternalError}: ${object} has too many keys: DbInsertOneResult should have 2`)
  }

  if (!("insertedId" in object && "acknowledged" in object)) {
    throw new Error(ApiError.InternalError)
  }

  if (!isObjectId(object.insertedId) || object.acknowledged !== true) {
    throw new Error(
      `${ApiError.InternalError}: ${object} does not match with type DbInsertOneResult: must have insertedId and acknowledged field`
    )
  }

  return object as DbInsertOneResult
}

export const validateDbInitiatedGame = (object: unknown): DbInitiatedGame => {
  if (!object) {
    throw new Error(`${ApiError.NotFoundError}: initiated game was not found`)
  }

  if (typeof object !== "object") {
    throw new Error(`${ApiError.InternalError}: ${object} does not match with type DbInitiatedGame`)
  }

  if (Object.keys(object).length > 2) {
    throw new Error(`${ApiError.InternalError}: ${object} has too many keys: DbInitiatedGame should have 2`)
  }

  if (!("_id" in object && "mines" in object)) {
    throw new Error(
      `${ApiError.InternalError}: ${object} does not match with type DbInitiatedGame: _id and mines are mandatory fields`
    )
  }

  if (!(isObjectId(object._id) && isNumericArray(object.mines))) {
    throw new Error(
      `${ApiError.InternalError}: ${object} does not match with type DbInitiatedGame: _id or mines invalid`
    )
  }

  return object as DbInitiatedGame
}

export const validateDbStartedGame = (object: unknown): DbStartedGame => {
  if (!object) {
    throw new Error(`${ApiError.NotFoundError}: started game was not found`)
  }

  if (typeof object !== "object") {
    throw new Error(`${ApiError.InternalError}: ${JSON.stringify(object)} does not match with type DbStartedGame`)
  }

  if (Object.keys(object).length > 3) {
    throw new Error(
      `${ApiError.InternalError}: ${JSON.stringify(object)} has too many keys: DbStartedGame should have 3`
    )
  }

  if (!("_id" in object && "startTime" in object && "mines" in object)) {
    throw new Error(
      `${ApiError.InternalError}: ${JSON.stringify(
        object
      )} does not match with type DbStartedGame: _id, mines and startTime are mandatory fields`
    )
  }

  if (!(isObjectId(object._id) && isNumericArray(object.mines) && isDate(object.startTime))) {
    ;`${ApiError.InternalError}: ${JSON.stringify(
      object
    )} does not match with type DbInitiatedGame: _id or mines or startTime invalid`
  }

  return object as DbStartedGame
}

export const getApiErrorResponse = (error: unknown): ApiErrorResponse => {
  if (!isError(error)) return { message: "Unknown error occured", status: 500 }

  // Log the full error for debugging
  console.error(error)

  if (error.message.includes(ApiError.InternalError)) {
    return { message: ApiError.InternalError, status: 500 }
  }

  if (error.message.includes(ApiError.InvalidRequest)) {
    return { message: ApiError.InvalidRequest, status: 400 }
  }

  if (error.message.includes(ApiError.NotFoundError)) {
    return { message: ApiError.InvalidRequest, status: 400 }
  }

  return { message: ApiError.InternalError, status: 500 }
}
