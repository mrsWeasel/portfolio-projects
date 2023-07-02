const { generateGrid, generateMineGrid, isGameWon, isInRange } = require("./sweeperService")

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
