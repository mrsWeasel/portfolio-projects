"use client"
import { useState } from "react"
import ContainerWithNavigation from "@/components/containerWithNavigation/containerWithNavigation"
import {
  generateMineGrid,
  directions,
  getAdjacentMinesAmount,
  hasValueOneInMatrix,
  isInRange,
} from "@/services/sweeperService"
import styles from "./sweeper.module.css"

const Sweeper = () => {
  const [mineGrid] = useState(generateMineGrid())
  const [visited, setVisited] = useState(Array(10).fill(Array(10).fill(0)))
  const [gameOn, setGameOn] = useState(true)

  const handleGameOver = () => {
    console.log("Booom!")
    setGameOn(false)
  }

  let temp

  const revealConnectedEmptyCells = (i: number, j: number, visitedCells: number[][]) => {
    temp = JSON.parse(JSON.stringify(visitedCells))
    temp[i][j] = 1
    setVisited(temp)

    if (getAdjacentMinesAmount(i, j, mineGrid)) return

    // TODO: refactor to use Object keys directly
    const { up, down, left, right, upLeft, upRight, downLeft, downRight } = directions(i, j) || {}
    const adjacent = [up, upRight, right, downRight, down, downLeft, left, upLeft]

    for (let l = 0; l < adjacent.length; l++) {
      const curr = adjacent[l]
      if (!isInRange(curr.y, curr.x, mineGrid)) continue
      if (hasValueOneInMatrix(curr.y, curr.x, temp)) continue

      revealConnectedEmptyCells(curr.y, curr.x, temp)
    }
  }

  // TODO: clean up
  const handleClick = (i: number, j: number): void => {
    if (!gameOn) return

    // mine found
    if (hasValueOneInMatrix(i, j, mineGrid)) {
      handleGameOver()
      return
    }

    // game won
    // TODO: sum of visited array & mineGrid -> all ones -> game won

    // empty without neighboring mines found -> reveal all connected similar cells
    if (!getAdjacentMinesAmount(i, j, mineGrid)) {
      revealConnectedEmptyCells(i, j, visited)
      return
    }

    // update visited
    const temp = JSON.parse(JSON.stringify(visited))
    temp[i][j] = 1
    setVisited(temp)
  }

  // TODO: clean up
  const renderSweeper = () => {
    const items = []

    for (let i = 0; i < mineGrid.length; i++) {
      for (let j = 0; j < mineGrid[i].length; j++) {
        items.push(
          <div
            key={`item-${i}-${j}`}
            id={`item-${i}-${j}`}
            className={`${styles.gridItem} ${hasValueOneInMatrix(i, j, visited) ? styles.visited : ""}`}
            onClick={(e) => handleClick(i, j)}
          >
            {!gameOn && hasValueOneInMatrix(i, j, mineGrid) ? "💩" : ""}
            {(hasValueOneInMatrix(i, j, visited) && getAdjacentMinesAmount(i, j, mineGrid)) || ""}
          </div>
        )
      }
    }
    return <div className={styles.gridContainer}>{items}</div>
  }
  renderSweeper()

  return (
    <ContainerWithNavigation>
      <h1>Sweeper game</h1>
      <div>
        {gameOn ? "Now playing" : "Game over"}
        {renderSweeper()}
      </div>
    </ContainerWithNavigation>
  )
}

export default Sweeper
