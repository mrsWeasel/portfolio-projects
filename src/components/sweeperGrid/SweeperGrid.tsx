import { cellHasValueInGrid, getAmountOfSurroundingMines } from "@/services/sweeperService"
import { GameStatus } from "@/typed/typed"
import styles from "./sweeper.module.css"

interface SweeperGridProps {
  mineGrid: number[][] | null
  flaggedGrid: number[][] | null
  visitedGrid: number[][] | null
  handleClickCell: (i: number, j: number) => Promise<void>
  gameStatus: GameStatus | null
  hasError: boolean
  loading: boolean
}

const SweeperGrid = ({
  mineGrid,
  flaggedGrid,
  visitedGrid,
  handleClickCell,
  gameStatus,
  hasError,
  loading,
}: SweeperGridProps) => {
  const isLoading = loading || !(mineGrid && flaggedGrid && visitedGrid)

  if (hasError) {
    return (
      <div className={styles.errorContainer}>
        <div>😭</div>
        <div>Oops! Something went wrong.</div>
      </div>
    )
  } else if (isLoading) {
    return <div className={styles.skeletonContainer}></div>
  } else {
    return (
      <div data-test-id="sweeper-grid-container" className={styles.gridContainer}>
        {mineGrid?.map((row: number[], i: number) =>
          row.map((cell, j) => (
            <div
              key={`item-${i}-${j}`}
              id={`item-${i}-${j}`}
              data-test-id={`item-${i}-${j}`}
              className={`${styles.gridItem} ${cellHasValueInGrid(i, j, visitedGrid) ? styles.visited : ""}`}
              onClick={(e) => handleClickCell(i, j)}
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
    )
  }
}

export default SweeperGrid
