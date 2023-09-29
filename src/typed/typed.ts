export interface Score {
  _id: string
  time: number
  startTime: string
}

export enum GameStatus {
  INITIATED = "INITIATED",
  PLAYING = "PLAYING",
  LOST = "LOST",
  WON = "WON",
}
