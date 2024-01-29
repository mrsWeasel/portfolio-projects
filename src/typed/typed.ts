export interface Score {
  _id: string
  time: number
  startTime: string
}

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

export enum GameStatus {
  INITIATED = "INITIATED",
  PLAYING = "PLAYING",
  LOST = "LOST",
  WON = "WON",
}
