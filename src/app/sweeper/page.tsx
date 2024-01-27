"use client"
import { useCallback, useEffect, useState } from "react"
import confetti from "canvas-confetti"
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
import Grid from "@/components/grid/grid"
import Header from "@/components/header/header"
import axios from "axios"
import SweeperToolbar from "@/components/sweeperToolbar/sweeperToolbar"
import Scores from "@/components/sweeperScores/scores"
import PortfolioItemDetails from "@/components/portfolioItem/portfolioItemDetails"
import { Score, GameStatus } from "@/typed/typed"
import SweeperGrid from "@/components/sweeperGrid/SweeperGrid"

let interval: number | undefined

const Sweeper = () => {
  const [loading, setLoading] = useState(false)
  const [mineGrid, setMineGrid] = useState<number[][] | null>(null)
  const [visitedGrid, setVisitedGrid] = useState<number[][]>(generateGrid(10))
  const [flaggedGrid, setFlaggedGrid] = useState<number[][]>(generateGrid(10))
  const [flagging, setFlagging] = useState(false)
  const [timer, setTimer] = useState<number>(0)
  const [gameStatus, setGameStatus] = useState<GameStatus | null>(null)
  const [gameId, setGameId] = useState<string | null>(null)
  const [scores, setScores] = useState<Score[]>([])

  const reset = () => {
    if (interval) clearInterval(interval)
    setGameId(null)
    setTimer(0)
  }

  // posts new game to db, returns id and generated minefield
  const initiateGame = useCallback(async () => {
    reset()
    setLoading(true)
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
      setLoading(false)
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message)
      }
      setLoading(false)
    }
  }, [])

  // starts timer, posts starting time to db
  const startGame = async () => {
    setLoading(true)
    try {
      const res = await axios.put("/api/sweeper/startGame", { id: gameId })
      setLoading(false)
      const { data } = res || {}

      interval = window?.setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message)
      }
      setLoading(false)
    }
  }

  // stops timer, posts ending time to db
  const endGame = async (visited?: number[][]) => {
    try {
      await axios.put("/api/sweeper/endGame", { id: gameId, visited })

      if (interval) clearInterval(interval)
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message)
      }
    }
  }

  // gets 10 top scores from db
  const fetchHighScores = async () => {
    try {
      const res = await axios.get("/api/sweeper/getScores")

      const { data } = res || {}
      setScores(data)
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message)
      }
    }
  }

  useEffect(() => {
    initiateGame()
    fetchHighScores()

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [initiateGame])

  // for storing temporarily the state of visited cells when traversing through grid
  let tempVisited
  // for stopping recursion in case game is already won
  let forceStop = false

  const revealConnectedEmptyCells = async (i: number, j: number, visitedCells: number[][]) => {
    if (forceStop) return
    if (!mineGrid) return
    tempVisited = JSON.parse(JSON.stringify(visitedCells))
    tempVisited[i][j] = 1
    setVisitedGrid(tempVisited)

    if (getAmountOfSurroundingMines(i, j, mineGrid)) return

    // TODO: refactor to use Object keys directly
    const { up, down, left, right, upLeft, upRight, downLeft, downRight } = getDirections(i, j) || {}
    const adjacent = [up, upRight, right, downRight, down, downLeft, left, upLeft]

    for (let l = 0; l < adjacent.length; l++) {
      if (forceStop) break

      const curr = adjacent[l]
      if (!isInRange(curr.y, curr.x, mineGrid)) continue
      if (cellHasValueInGrid(curr.y, curr.x, tempVisited)) continue
      revealConnectedEmptyCells(curr.y, curr.x, tempVisited)
    }

    // check if game is won
    if (!forceStop && isGameWon(tempVisited, mineGrid)) {
      forceStop = true
      handleWin(tempVisited)
    }
  }

  const handleClickCell = async (i: number, j: number) => {
    if (!mineGrid) return

    if (loading) return
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
      // recursively open all 'empty' cells that are connected
      revealConnectedEmptyCells(i, j, visitedGrid)
      return
    }

    // update visited
    const tempVisitedGrid = JSON.parse(JSON.stringify(visitedGrid))
    tempVisitedGrid[i][j] = 1
    setVisitedGrid(tempVisitedGrid)

    // check if game is won
    if (isGameWon(tempVisitedGrid, mineGrid)) {
      handleWin(tempVisitedGrid)
    }
  }

  const handleInitNewGame = async () => {
    // no need to initiate new game if already initiated game hasn't been started
    if (gameStatus === GameStatus.INITIATED) return

    await initiateGame()
    setGameStatus(GameStatus.INITIATED)
    setVisitedGrid(generateGrid(10))
    setFlaggedGrid(generateGrid(10))
  }

  const handleWin = async (tempVisited: number[][]) => {
    if (gameStatus === GameStatus.WON) return

    setGameStatus(GameStatus.WON)
    confetti({
      shapes: ["square", "circle"],
      spread: 80,
      scalar: 0.9,
      colors: ["#D33FB6", "#FF999E", "#F3EA6C", "#8EECF5"],
    })
    await endGame(tempVisited)
    // TODO: maybe only fetch if time is better than 10. result of list?
    fetchHighScores()
  }

  return (
    <ContainerWithNavigation>
      <Header title="Minesweeper game" linkToHome />
      <Grid columns={2}>
        <div>
          <SweeperToolbar
            elapsedSeconds={timer}
            flagging={flagging}
            initGameDisabled={loading || gameStatus === GameStatus.INITIATED}
            setFlagging={setFlagging}
            handleInitNewGame={handleInitNewGame}
          />
          <SweeperGrid
            mineGrid={mineGrid}
            visitedGrid={visitedGrid}
            flaggedGrid={flaggedGrid}
            handleClickCell={handleClickCell}
            gameStatus={gameStatus}
          />
        </div>
        <Scores gameId={gameId} scores={scores} />
      </Grid>
      {/* <PortfolioItemDetails> */}
      {/* <p>
          Minesweeper, one of my favorite childhood games! I just <strong>had to</strong> reverse engineer it and also
          get a bit creative with it. Hope you enjoy it!
        </p> */}
      {/* </PortfolioItemDetails> */}
    </ContainerWithNavigation>
  )
}

export default Sweeper
