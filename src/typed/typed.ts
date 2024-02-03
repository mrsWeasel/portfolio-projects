import { ObjectId } from "mongodb"

/**
 * Frontend types
 * */
export enum GameStatus {
  INITIATED = "INITIATED",
  PLAYING = "PLAYING",
  LOST = "LOST",
  WON = "WON",
}

/**
 * API types
 * */

export enum ApiError {
  InternalError = "INTERNAL_ERROR",
  InvalidRequest = "INVALID_REQUEST",
  NotFoundError = "NOT_FOUND",
}

export interface BaseGame {
  _id: string
}

export interface InitiatedGame extends BaseGame {
  obfuscatedMines: string
}

export interface StartedGame extends BaseGame {
  startTime: Date
}

export interface WonGame extends StartedGame {
  time: number
}

export type Score = Omit<WonGame, "mines">

export interface DbBaseGame {
  _id: ObjectId
}

export interface DbInitiatedGame extends DbBaseGame {
  mines: number[]
}

export interface DbStartedGame extends DbInitiatedGame {
  startTime: Date
}

export interface DbWonGame extends DbStartedGame {
  time: number
}

export interface DbInsertOneResult {
  insertedId: ObjectId
  acknowledged: boolean
}

export interface ApiErrorResponse {
  message: string
  status: number
}
