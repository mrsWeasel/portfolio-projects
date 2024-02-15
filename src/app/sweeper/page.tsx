"use client"
import { useCallback, useEffect, useRef, useState } from "react"
import Container from "@/components/container/container"
import {
  generateMineGrid,
  getDirections,
  getAmountOfSurroundingMines,
  cellHasValueInGrid,
  isInRange,
  generateGrid,
  isGameWon,
  unobfuscateMines,
  shouldFetchHighScores,
} from "@/services/sweeperService"
import Grid from "@/components/grid/grid"
import Header from "@/components/header/header"
import axios, { AxiosResponse } from "axios"
import SweeperToolbar from "@/components/sweeperToolbar/sweeperToolbar"
import Scores from "@/components/sweeperScores/scores"
import { Score, GameStatus, EndedGame, InitiatedGame, ApiErrorResponse, StartedGame } from "@/typed/typed"
import SweeperGrid from "@/components/sweeperGrid/SweeperGrid"
import Confetti from "@/components/confetti/Confetti"
import { isApiErrorResponse } from "@/services/apiValidation"
import ErrorNotification from "@/components/notification/errorNotification"

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

  const [gameError, setGameError] = useState("")
  const [scoresError, setScoresError] = useState("")

  const interval = useRef<number>()

  // for storing temporarily the state of visited cells when traversing through grid
  const tempVisited = useRef<number[][]>(generateGrid(10))
  // for stopping recursion in case game is already won
  let forceStop = useRef<boolean>(false)

  const reset = () => {
    if (interval.current) clearInterval(interval.current)
    setGameId(null)
    setGameStatus(null)
    setFlagging(false)
    setTimer(0)
    setLoading(false)
    setMineGrid(null)
  }

  const handleGameError = (errorMessage: string): void => {
    if (interval.current) clearInterval(interval.current)
    setLoading(false)
    setGameError(errorMessage)
  }

  // posts new game to db, returns id and generated minefield
  const initiateGame = useCallback(async () => {
    reset()
    setLoading(true)
    setGameError("")
    try {
      const res: AxiosResponse<InitiatedGame | ApiErrorResponse> = await axios.post(`/api/sweeper/initGame`)

      const { data } = res || {}

      if (!data || isApiErrorResponse(data)) {
        handleGameError("Error trying to initiate a game")
        return
      }

      const { _id, obfuscatedMines } = data || {}

      setGameId(_id)
      setGameStatus(GameStatus.INITIATED)

      setMineGrid(generateMineGrid(unobfuscateMines(obfuscatedMines), 10))
      setLoading(false)
    } catch (e) {
      handleGameError("Error trying to initiate a game")
    }
  }, [])

  // starts timer, posts starting time to db
  const startGame = async () => {
    setLoading(true)
    try {
      const res: AxiosResponse<StartedGame | ApiErrorResponse> = await axios.put("/api/sweeper/startGame", {
        _id: gameId,
      })
      setLoading(false)

      const { data } = res || {}

      if (!data || isApiErrorResponse(data)) {
        handleGameError("Error trying to start a game")
        return
      }

      interval.current = window?.setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    } catch (e) {
      handleGameError("Error trying to start a game")
    }
  }

  // stops timer, posts ending time to db
  const endGame = async (visited?: number[][]) => {
    try {
      const res: AxiosResponse<EndedGame | ApiErrorResponse> = await axios.put("/api/sweeper/endGame", {
        _id: gameId,
        visited,
      })

      if (interval.current) clearInterval(interval.current)

      const { data } = res || {}

      if (!data || isApiErrorResponse(data)) {
        handleGameError("Error trying to end the game")
        return
      }
    } catch (e) {
      handleGameError("Error trying to end the game")
    }
  }

  // gets 10 top scores from db
  const fetchHighScores = async () => {
    try {
      const res: AxiosResponse<Score[] | ApiErrorResponse> = await axios.get("/api/sweeper/getScores")
      const { data } = res || {}

      if (!data || isApiErrorResponse(data)) {
        setScoresError("Error fetching scores")
        return
      }

      setScores(data)
    } catch (e) {
      setScoresError("Error fetching scores")
    }
  }

  useEffect(() => {
    initiateGame()
    fetchHighScores()

    return () => {
      if (interval) clearInterval(interval.current)
    }
  }, [initiateGame])

  const revealConnectedEmptyCells = async (i: number, j: number, visitedCells: number[][]) => {
    if (forceStop.current) return
    if (!mineGrid) return
    tempVisited.current = JSON.parse(JSON.stringify(visitedCells))
    tempVisited.current[i][j] = 1
    setVisitedGrid(tempVisited.current)

    if (getAmountOfSurroundingMines(i, j, mineGrid)) return

    const directions = getDirections(i, j) || {}
    const adjacent = Object.keys(directions).map((key) => directions[key])

    for (let l = 0; l < adjacent.length; l++) {
      if (forceStop.current) break

      const curr = adjacent[l]
      if (!isInRange(curr.y, curr.x, mineGrid)) continue
      if (cellHasValueInGrid(curr.y, curr.x, tempVisited.current)) continue
      revealConnectedEmptyCells(curr.y, curr.x, tempVisited.current)
    }

    // check if game is won
    if (!forceStop.current && isGameWon(tempVisited.current, mineGrid)) {
      forceStop.current = true
      handleWin(tempVisited.current)
    }
  }

  const handleClickCell = async (i: number, j: number) => {
    if (gameError) return
    if (!mineGrid) return

    if (loading) return
    if (!gameStatus) return
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

    // if cell is flagged, do not reveal it (might be clicked by accident)
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

  const handleWin = async (visitedCells: number[][]) => {
    if (gameStatus === GameStatus.WON) return

    setGameStatus(GameStatus.WON)
    await endGame(visitedCells)

    // Only fetch updated scores if game has a chance to be in the top 10
    if (!shouldFetchHighScores(scores, timer)) return
    fetchHighScores()
  }

  return (
    <Container>
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
            hasError={!!gameError}
          />
        </div>
        <Scores gameId={gameId} scores={scores} />
      </Grid>
      <Confetti showConfetti={gameStatus === GameStatus.WON} />
      {gameError && <ErrorNotification message={gameError} />}
      {scoresError && <ErrorNotification message={scoresError} />}
    </Container>
  )
}

export default Sweeper
