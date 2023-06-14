"use client"
import { useEffect, useState } from "react"
import ContainerWithNavigation from "@/components/containerWithNavigation/containerWithNavigation"
import {
  generateMineGrid,
  getDirections,
  getAmountOfSurroundingMines,
  cellHasValueInGrid,
  isInRange,
  generateGrid,
} from "@/services/sweeperService"
import styles from "./sweeper.module.css"

const Sweeper = () => {
  const [mineGrid, setMineGrid] = useState([])
  const [visitedGrid, setVisitedGrid] = useState(generateGrid(10))
  const [flaggedGrid, setFlaggedGrid] = useState(generateGrid(10))
  const [flagging, setFlagging] = useState(false)
  const [gameStatus, setGameStatus] = useState("playing")

  useEffect(() => {
    const mineGrid = generateMineGrid(10)
    setMineGrid(mineGrid)
  }, [])

  const handleGameOver = () => {
    setGameStatus("lost")
  }

  const checkIfGameWon = (visited: number[][]) => {
    for (let i = 0; i < visited.flat().length; i++) {
      if (visited.flat()[i] + mineGrid.flat()[i] !== 1) {
        return false
      }
    }
    setGameStatus("won")
    return true
  }

  let temp

  const revealConnectedEmptyCells = (i: number, j: number, visitedCells: number[][]) => {
    temp = JSON.parse(JSON.stringify(visitedCells))
    temp[i][j] = 1
    setVisitedGrid(temp)

    if (getAmountOfSurroundingMines(i, j, mineGrid)) return

    // TODO: refactor to use Object keys directly
    const { up, down, left, right, upLeft, upRight, downLeft, downRight } = getDirections(i, j) || {}
    const adjacent = [up, upRight, right, downRight, down, downLeft, left, upLeft]

    for (let l = 0; l < adjacent.length; l++) {
      const curr = adjacent[l]
      if (!isInRange(curr.y, curr.x, mineGrid)) continue
      if (cellHasValueInGrid(curr.y, curr.x, temp)) continue

      revealConnectedEmptyCells(curr.y, curr.x, temp)
    }
  }

  const handleClick = (i: number, j: number): void => {
    if (gameStatus !== "playing") return

    // flagging cells
    if (flagging) {
      const tempFlaggedGrid = JSON.parse(JSON.stringify(flaggedGrid))
      tempFlaggedGrid[i][j] = !tempFlaggedGrid[i][j]
      setFlaggedGrid(tempFlaggedGrid)
      return
    }

    // mine found
    if (cellHasValueInGrid(i, j, mineGrid)) {
      handleGameOver()
      return
    }

    // empty without neighboring mines found -> reveal all connected similar cells
    if (!getAmountOfSurroundingMines(i, j, mineGrid)) {
      revealConnectedEmptyCells(i, j, visitedGrid)
      return
    }

    // update visited
    const tempVisitedGrid = JSON.parse(JSON.stringify(visitedGrid))
    tempVisitedGrid[i][j] = 1
    setVisitedGrid(tempVisitedGrid)

    // check if game is won
    checkIfGameWon(tempVisitedGrid)
  }

  const handleStartNewGame = (): void => {
    setMineGrid(generateMineGrid(10))
    setVisitedGrid(generateGrid(10))
    setFlaggedGrid(generateGrid(10))
    setGameStatus("playing")
  }

  const renderSweeper = () => {
    const items = []

    for (let i = 0; i < mineGrid.length; i++) {
      for (let j = 0; j < mineGrid[i].length; j++) {
        items.push(
          <div
            key={`item-${i}-${j}`}
            id={`item-${i}-${j}`}
            className={`${styles.gridItem} ${cellHasValueInGrid(i, j, visitedGrid) ? styles.visited : ""}`}
            onClick={(e) => handleClick(i, j)}
          >
            {cellHasValueInGrid(i, j, mineGrid) && gameStatus === "lost" && "💩"}
            {cellHasValueInGrid(i, j, mineGrid) && gameStatus === "won" && "🦄"}
            {cellHasValueInGrid(i, j, flaggedGrid) &&
              !cellHasValueInGrid(i, j, visitedGrid) &&
              gameStatus === "playing" &&
              "🚩"}
            {(cellHasValueInGrid(i, j, visitedGrid) && getAmountOfSurroundingMines(i, j, mineGrid)) || ""}
          </div>
        )
      }
    }
    return (
      <div>
        <div className={styles.toolBar}>
          <button
            className={`${styles.toolBarButton} ${flagging && styles.selected}`}
            onClick={() => setFlagging(true)}
          >
            🚩
          </button>
          <button
            className={`${styles.toolBarButton} ${!flagging && styles.selected}`}
            onClick={() => setFlagging(false)}
          >
            ☠️
          </button>
          <button className={`${styles.toolBarButton}`} onClick={() => handleStartNewGame()}>
            🌟
          </button>
        </div>
        <div className={styles.gridContainer}>{items}</div>
      </div>
    )
  }

  return (
    <ContainerWithNavigation>
      <h1>Minesweeper game</h1>
      <div>{renderSweeper()}</div>
    </ContainerWithNavigation>
  )
}

export default Sweeper
