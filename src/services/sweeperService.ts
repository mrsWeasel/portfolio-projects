import { Score } from "@/typed/typed"

interface Direction {
  y: number
  x: number
}

export const getDirections = (i: number, j: number): Record<string, Direction> => ({
  up: { y: i - 1, x: j },
  upRight: { y: i - 1, x: j + 1 },
  right: { y: i, x: j + 1 },
  downRight: { y: i + 1, x: j + 1 },
  down: { y: i + 1, x: j },
  downLeft: { y: i + 1, x: j - 1 },
  left: { y: i, x: j - 1 },
  upLeft: { y: i - 1, x: j - 1 },
})

export const generateGrid = (size = 10): number[][] => {
  return Array(size).fill(Array(size).fill(0))
}

export const randomizeMines = (size = 10): number[] => {
  const mines: number[] = []

  while (mines.length < size) {
    const mineIndex = Math.floor(Math.random() * size * size)
    if (mines.indexOf(mineIndex) === -1) {
      mines.push(mineIndex)
    }
  }

  const sortedMines = mines.sort((a, b) => a - b)
  return sortedMines
}

export const obfuscateMines = (mines: number[]): string => {
  return btoa(JSON.stringify(mines))
}

export const unobfuscateMines = (obfuscatedMines: string): number[] => {
  return JSON.parse(atob(obfuscatedMines))
}

export const generateMineGrid = (mines = randomizeMines(10), size = 10): number[][] => {
  const arr = Array(size * size).fill(0)

  let tempRow: number[] = []
  const mineGrid: number[][] = []

  arr.forEach((_cell, index) => {
    if (mines.indexOf(index) !== -1) {
      tempRow.push(1)
    } else {
      tempRow.push(0)
    }
    if (tempRow.length >= size) {
      mineGrid.push(tempRow)
      tempRow = []
    }
  })

  return mineGrid
}

export const isInRange = (i: number, j: number, mineGrid: number[][]) => {
  try {
    if (mineGrid[i][j] === 0) return true
    if (mineGrid[i][j] === 1) return true
  } catch (e) {
    return false
  }
}

export const isGameWon = (visited: number[][], mineGrid: number[][]): boolean => {
  if (!visited || !mineGrid) return false

  for (let i = 0; i < visited.flat().length; i++) {
    if (visited.flat()[i] + mineGrid.flat()[i] !== 1) {
      return false
    }
  }
  return true
}

export const getAmountOfSurroundingMines = (i: number, j: number, mineGrid: number[][]) => {
  let sum = 0

  const dir = getDirections(i, j)

  Object.keys(dir).forEach((d) => {
    const current = dir[d as keyof typeof dir]
    const { x, y } = current || {}
    try {
      if (mineGrid[y][x]) sum++
    } catch (e) {
      // errors are most likely due to not all cells having adjacent cells (on edges) -> no need to do anything
    }
  })
  return sum
}

export const cellHasValueInGrid = (i: number, j: number, arr: number[][]) => {
  try {
    if (arr[i][j]) {
      return true
    }
    throw new Error(`Error trying to find ${i}, ${j} in grid`)
  } catch (e) {
    // errors are most likely due to not all cells having adjacent cells (on edges) -> no need to do anything
  }
  return false
}

export const shouldFetchHighScores = (scores: Score[], seconds: number): boolean => {
  if (scores.length < 10) return true

  const slowest = scores[scores.length - 1]

  if (seconds < (slowest.time ?? 0)) return true

  return false
}
