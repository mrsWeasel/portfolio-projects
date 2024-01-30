export interface BaseGame {
  _id: string
}

export interface InitiatedGame extends BaseGame {
  obfuscatedMines: string
}

export interface StartedGame extends BaseGame {
  startTime: Date
  mines: number[]
}

export interface WonGame extends StartedGame {
  time: number
}

export type Score = Omit<WonGame, "mines">

export enum GameStatus {
  INITIATED = "INITIATED",
  PLAYING = "PLAYING",
  LOST = "LOST",
  WON = "WON",
}

export enum ApiError {
  InternalError = "INTERNAL_ERROR",
  InvalidRequest = "INVALID_REQUEST",
}
