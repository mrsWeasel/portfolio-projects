export const getDirections = (i: number, j: number) => ({
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
  return Array(10).fill(Array(10).fill(0))
}

// console.log(arr)

export const randomizeMines = (size = 10): number[] => {
  const mines: number[] = []

  while (mines.length < 10) {
    const mineIndex = Math.round(Math.random() * 100)
    if (mines.indexOf(mineIndex) === -1) {
        mines.push(mineIndex)
    }
    
  }

  const sortedMines = mines.sort((a, b) => a - b)
  return sortedMines
}

export const generateMineGrid = (size = 10, mines = randomizeMines(10)): number[][] => {
  const arr = Array(100).fill(0)

  let tempRow: number[] = []
  const mineGrid: number[][] = []

  arr.forEach((cell, index) => {
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

export const getAmountOfSurroundingMines = (i: number, j: number, mineGrid: number[][]) => {
  let sum = 0

  const dir = getDirections(i, j)

  Object.keys(dir).forEach((d) => {
    const current = dir[d as keyof typeof dir]
    const { x, y } = current || {}
    try {
      if (mineGrid[y][x]) sum++
    } catch (e) {}
  })
  return sum
}

export const cellHasValueInGrid = (i: number, j: number, arr: number[][]) => {
  try {
    if (arr[i][j]) {
      return true
    }
  } catch (e) {
    return true
  }
  return false
}
