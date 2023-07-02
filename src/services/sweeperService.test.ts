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
