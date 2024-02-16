import { createMockScores } from "../../mock/scores"
import { randomizeMines, shouldFetchHighScores } from "./sweeperService"

const { generateGrid, generateMineGrid, isInRange } = require("./sweeperService")

describe("generateGrid", () => {
  it("Generates 10 x 10 grid when size not given as argument", () => {
    const grid = generateGrid()
    expect(grid.length).toBe(10)
    expect(grid[0].length).toBe(10)
  })

  it("Generates a grid with specified size", () => {
    const grid = generateGrid(12)
    expect(grid.length).toBe(12)
    expect(grid[0].length).toBe(12)
  })
})

describe("generateMineGrid", () => {
  it("Generates mine grid of specified size", () => {
    const mines = [2, 6, 8, 36, 54, 55, 71, 88, 90, 98]

    const grid = generateMineGrid(mines, 10)
    expect(grid.length).toBe(10)
    expect(grid[0].length).toBe(10)

    expect(grid[0].flat()).toEqual([0, 0, 1, 0, 0, 0, 1, 0, 1, 0])
    expect(grid[1].flat()).not.toContain(1)
    expect(grid[2].flat()).not.toContain(1)
    expect(grid[3].flat()).toEqual([0, 0, 0, 0, 0, 0, 1, 0, 0, 0])
    expect(grid[4].flat()).not.toContain(1)
    expect(grid[5].flat()).toEqual([0, 0, 0, 0, 1, 1, 0, 0, 0, 0])
    expect(grid[6].flat()).not.toContain(1)
    expect(grid[7].flat()).toEqual([0, 1, 0, 0, 0, 0, 0, 0, 0, 0])
    expect(grid[8].flat()).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 1, 0])
    expect(grid[9].flat()).toEqual([1, 0, 0, 0, 0, 0, 0, 0, 1, 0])
  })

  it("Generates mine grid with default size", () => {
    const mines = [2, 6, 8, 36, 54, 55, 71, 88, 90, 98]

    const grid = generateMineGrid(mines)
    expect(grid.length).toBe(10)
    expect(grid[0].length).toBe(10)

    expect(grid[0].flat()).toEqual([0, 0, 1, 0, 0, 0, 1, 0, 1, 0])
    expect(grid[1].flat()).not.toContain(1)
    expect(grid[2].flat()).not.toContain(1)
    expect(grid[3].flat()).toEqual([0, 0, 0, 0, 0, 0, 1, 0, 0, 0])
    expect(grid[4].flat()).not.toContain(1)
    expect(grid[5].flat()).toEqual([0, 0, 0, 0, 1, 1, 0, 0, 0, 0])
    expect(grid[6].flat()).not.toContain(1)
    expect(grid[7].flat()).toEqual([0, 1, 0, 0, 0, 0, 0, 0, 0, 0])
    expect(grid[8].flat()).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 1, 0])
    expect(grid[9].flat()).toEqual([1, 0, 0, 0, 0, 0, 0, 0, 1, 0])
  })

  it("Generates mine grid with given size", () => {
    const mines = [2, 6, 8, 15]

    const grid = generateMineGrid(mines, 4)
    expect(grid.length).toBe(4)
    expect(grid[0].length).toBe(4)

    expect(grid[0].flat()).toEqual([0, 0, 1, 0])
    expect(grid[1].flat()).toEqual([0, 0, 1, 0])
    expect(grid[2].flat()).toEqual([1, 0, 0, 0])
    expect(grid[3].flat()).toEqual([0, 0, 0, 1])
  })
})

describe("randomizeMines", () => {
  it("Returns 10 mines with valid range by default", () => {
    const mines = randomizeMines()

    expect(mines.length).toBe(10)

    mines.forEach((mine) => {
      expect(mine).toBeLessThan(100)
    })
  })

  it("Returns given amount of mines with valid range", () => {
    const mines = randomizeMines(4)

    expect(mines.length).toBe(4)

    mines.forEach((mine) => {
      expect(mine).toBeLessThan(16)
    })
  })
})

describe("isInRange", () => {
  it("Returns true when given cell is in range", () => {
    const grid = generateGrid(10)
    expect(isInRange(0, 0, grid)).toBeTruthy()
    expect(isInRange(9, 9, grid)).toBeTruthy()
  })

  it("Returns false when given cell is not in range", () => {
    const grid = generateGrid(10)
    expect(isInRange(-1, 0, grid)).toBeFalsy()
    expect(isInRange(0, -1, grid)).toBeFalsy()
    expect(isInRange(10, 10, grid)).toBeFalsy()
  })
})

describe("shouldFetchHighScores", () => {
  it("Returns true when scores table only has 9 items", () => {
    const scores = createMockScores(9)

    const shouldFetch = shouldFetchHighScores(scores, 50)
    expect(shouldFetch).toBe(true)
  })

  it("Returns false when scores table is full and time is not good enough to make it", () => {
    const scores = createMockScores(10)

    const shouldFetch = shouldFetchHighScores(scores, 50)
    expect(shouldFetch).toBe(false)
  })

  it("Returns true when scores table is full but time is good enough to make it", () => {
    const scores = createMockScores(10)

    const shouldFetch = shouldFetchHighScores(scores, 7)
    expect(shouldFetch).toBe(true)
  })

  it("Returns false when scores table is full and time matches the last positions time", () => {
    const scores = createMockScores(10)

    const shouldFetch = shouldFetchHighScores(scores, 29)
    expect(shouldFetch).toBe(false)
  })
})
