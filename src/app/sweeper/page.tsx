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
  const [gameStatus, setGameStatus] = useState("playing")

  const handleGameOver = () => {
    console.log("Booom!")
    setGameStatus("lost")
  }

  const checkIfGameWon = (visited: number[][]) => {
    console.log(visited)
    for (let i = 0; i < visited.flat().length; i++) {
      if (visited.flat()[i] + mineGrid.flat()[i] !== 1) {
        return false
      }
    }
    alert("🎊🪅🎈🎁🎉🪩")
    setGameStatus("won")
    return true
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
    if (gameStatus !== "playing") return

    // mine found
    if (hasValueOneInMatrix(i, j, mineGrid)) {
      handleGameOver()
      return
    }

    // empty without neighboring mines found -> reveal all connected similar cells
    if (!getAdjacentMinesAmount(i, j, mineGrid)) {
      revealConnectedEmptyCells(i, j, visited)
      return
    }

    // update visited
    const temp = JSON.parse(JSON.stringify(visited))
    temp[i][j] = 1
    setVisited(temp)

    checkIfGameWon(temp)
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
            {hasValueOneInMatrix(i, j, mineGrid) && gameStatus === "lost" && "💩"}
            {hasValueOneInMatrix(i, j, mineGrid) && gameStatus === "won" && "🦄"}
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
      <h1>Minesweeper game</h1>
      <div>
        {gameStatus === "playing" && "Now playing"}
        {renderSweeper()}
      </div>
    </ContainerWithNavigation>
  )
}

export default Sweeper
