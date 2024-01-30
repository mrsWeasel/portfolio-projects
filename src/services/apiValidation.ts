import { InitiatedGame, Score, StartedGame, WonGame } from "@/typed/typed"

export const isNumber = (param: unknown): param is number => {
  return typeof param === "number" || param instanceof Number
}

export const isString = (param: unknown): param is string => {
  return typeof param === "string" || param instanceof String
}

// TODO: placeholders - add actual validation
export const isInitiatedGame = (object: unknown): object is InitiatedGame => {
  return true
}

export const isStartedGame = (object: unknown): object is StartedGame => {
  return true
}

export const isWonGame = (object: unknown): object is WonGame => {
  return true
}

export const isHighScores = (object: unknown): object is Score[] => {
  return true
}

export const getInitiatedGame = (object: unknown): InitiatedGame => {
  if (isInitiatedGame(object)) return object

  throw new Error(`failed to handle ${object} in getInitiatedGame`)
}

export const getStartedGame = (object: unknown): StartedGame => {
  if (isStartedGame(object)) return object

  throw new Error(`failed to handle ${object} in getStartedGame`)
}

export const getWonGame = (object: unknown): WonGame => {
  if (isWonGame(object)) return object

  throw new Error(`failed to handle ${object} in getWonGame`)
}

export const getHighScores = (object: unknown): Score[] => {
  if (isHighScores(object)) return object

  throw new Error(`failed to handle ${object} in getHighScores`)
}
