
export const directions = (i: number, j: number) => ({
    up: { y: i - 1, x: j },
    upRight: { y: i - 1, x: j + 1 },
    right: { y: i, x: j + 1 },
    downRight: { y: i + 1, x: j + 1 },
    down: { y: i + 1, x: j },
    downLeft: { y: i + 1, x: j - 1 },
    left: { y: i, x: j - 1 },
    upLeft: { y: i - 1, x: j - 1 },
  })

export const generateMineGrid = () => {
    // 100 cells - 10 x 10 grid
    // TODO: make dynamic
    return ([
        [0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,1,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,0],
        [0,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,1,0,0,0,0,0,0,0,0]
    ])
}

export const isInRange = (i: number, j: number, mineGrid: number[][]) => {
    try {
        if (mineGrid[i][j] === 0) return true
        if (mineGrid[i][j] === 1) return true
    } catch(e){
        return false
    }
    // return false
}

export const getAdjacentMinesAmount = (i: number, j: number, mineGrid: number[][]) => {
    let sum = 0

    const dir = directions(i, j)

    Object.keys(dir).forEach((d) => {
      const current = dir[d as keyof typeof dir]
      const { x, y } = current || {}
      try {
        if (mineGrid[y][x]) sum++
      } catch (e) {
        // console.log("")
        
      }
    })

    return sum
}

export const hasValueOneInMatrix = (i: number, j: number, arr: number[][]) => {
    try {
        if (arr[i][j]) {
            return true
        } 
    } catch (e) {
        return true
    }
    // return false
}


