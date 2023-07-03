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
  isGameWon,
  unobfuscateMines,
} from "@/services/sweeperService"
import styles from "./sweeper.module.css"
import { Red_Hat_Display } from "next/font/google"
import Header from "@/components/header/header"
import axios from "axios"
import SweeperToolbar from "@/components/sweeperToolbar/sweeperToolbar"

const redHatDisplay = Red_Hat_Display({ subsets: ["latin"], weight: ["400", "700"] })

enum GameStatus {
  INITIATED = "INITIATED",
  PLAYING = "PLAYING",
  LOST = "LOST",
  WON = "WON",
}

const Sweeper = () => {
  const [mineGrid, setMineGrid] = useState<number[][] | null>(null)
  const [visitedGrid, setVisitedGrid] = useState<number[][]>(generateGrid(10))
  const [flaggedGrid, setFlaggedGrid] = useState<number[][]>(generateGrid(10))
  const [flagging, setFlagging] = useState(false)
  const [timer, setTimer] = useState(0)
  const [gameStatus, setGameStatus] = useState<GameStatus | null>(null)
  const [gameId, setGameId] = useState<string | null>(null)

  const initiateGame = async () => {
    try {
      const res = await axios.post(`/api/sweeper/initGame`)

      const { data } = res || {}
      const { id, mines } = data || {}

      if (!id || !mines) {
        throw new Error("Response data missing")
      }

      setGameId(id)
      setGameStatus(GameStatus.INITIATED)

      setMineGrid(generateMineGrid(unobfuscateMines(mines), 10))
    } catch (e) {
      console.log("Error")
    }
  }

  const startGame = async () => {
    try {
      const res = await axios.put("/api/sweeper/startGame", { id: gameId })

      const { data } = res || {}
      console.log(data)
    } catch (e) {
      console.log("Error")
    }
  }

  const endGame = async (visited?: number[][]) => {
    try {
      const res = await axios.put("/api/sweeper/endGame", { id: gameId, visited })

      const { data } = res || {}
      console.log(data)
      reset()
    } catch (e) {
      console.log("Error")
    }
  }

  const reset = () => {
    setGameId(null)
    setTimer(0)
  }

  useEffect(() => {
    initiateGame()
  }, [])

  let tempVisited

  const revealConnectedEmptyCells = (i: number, j: number, visitedCells: number[][]) => {
    if (!mineGrid) return

    tempVisited = JSON.parse(JSON.stringify(visitedCells))
    tempVisited[i][j] = 1
    setVisitedGrid(tempVisited)

    if (getAmountOfSurroundingMines(i, j, mineGrid)) return

    // TODO: refactor to use Object keys directly
    const { up, down, left, right, upLeft, upRight, downLeft, downRight } = getDirections(i, j) || {}
    const adjacent = [up, upRight, right, downRight, down, downLeft, left, upLeft]

    for (let l = 0; l < adjacent.length; l++) {
      const curr = adjacent[l]
      if (!isInRange(curr.y, curr.x, mineGrid)) continue
      if (cellHasValueInGrid(curr.y, curr.x, tempVisited)) continue

      revealConnectedEmptyCells(curr.y, curr.x, tempVisited)
    }

    // check if game is won
    if (isGameWon(tempVisited, mineGrid)) {
      setGameStatus(GameStatus.WON)
      endGame(tempVisited)
    }
  }

  const handleClick = async (i: number, j: number) => {
    if (!mineGrid) return

    if (gameStatus === GameStatus.WON) return
    if (gameStatus === GameStatus.LOST) return

    if (gameStatus === GameStatus.INITIATED) {
      setGameStatus(GameStatus.PLAYING)
      await startGame()
    }

    // flagging cells
    if (flagging) {
      const tempFlaggedGrid = JSON.parse(JSON.stringify(flaggedGrid))
      tempFlaggedGrid[i][j] = !tempFlaggedGrid[i][j]
      setFlaggedGrid(tempFlaggedGrid)
      return
    }

    // // if cell is flagged, do not reveal it (might be clicked by accident)
    if (cellHasValueInGrid(i, j, flaggedGrid)) {
      return
    }

    // mine found
    if (cellHasValueInGrid(i, j, mineGrid)) {
      endGame()
      setGameStatus(GameStatus.LOST)
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
    if (isGameWon(tempVisitedGrid, mineGrid)) {
      setGameStatus(GameStatus.WON)
      endGame(tempVisitedGrid)
    }
  }

  const handleStartNewGame = async () => {
    // setMineGrid(generateMineGrid(10))
    await initiateGame()
    setGameStatus(GameStatus.INITIATED)
    setVisitedGrid(generateGrid(10))
    setFlaggedGrid(generateGrid(10))
  }

  return (
    <ContainerWithNavigation>
      <Header title="Play minesweeper!" />
      <SweeperToolbar flagging={flagging} setFlagging={setFlagging} handleStartNewGame={handleStartNewGame} />
      <div className={redHatDisplay.className}>
        <div className={styles.gridContainer}>
          {mineGrid?.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`item-${i}-${j}`}
                id={`item-${i}-${j}`}
                className={`${styles.gridItem} ${cellHasValueInGrid(i, j, visitedGrid) ? styles.visited : ""}`}
                onClick={(e) => handleClick(i, j)}
              >
                {cellHasValueInGrid(i, j, mineGrid) && gameStatus === GameStatus.LOST && "💩"}
                {cellHasValueInGrid(i, j, mineGrid) && gameStatus === GameStatus.WON && "🦄"}
                {cellHasValueInGrid(i, j, flaggedGrid) &&
                  !cellHasValueInGrid(i, j, visitedGrid) &&
                  gameStatus === GameStatus.PLAYING &&
                  "🚩"}
                {(cellHasValueInGrid(i, j, visitedGrid) && getAmountOfSurroundingMines(i, j, mineGrid)) || ""}
              </div>
            ))
          )}
        </div>
      </div>
      <div className={styles.timer}>{timer}</div>
    </ContainerWithNavigation>
  )
}

export default Sweeper
