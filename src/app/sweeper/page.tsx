"use client"
import { useState } from "react"
import ContainerWithNavigation from "@/components/containerWithNavigation/containerWithNavigation"
import { generateMineGrid } from "@/services/sweeperService"
import styles from "./sweeper.module.css"
import { Dir } from "fs"
import { dir } from "console"

const Sweeper = () => {
  const [mineGrid] = useState(generateMineGrid())
  const [visited, setVisited] = useState(Array(5).fill(Array(5).fill(0)))
  const [gameOn, setGameOn] = useState(true)

  const handleClick = (i: number, j: number): void => {
    if (!gameOn) return

    // mine found
    if (mineGrid[i][j] === 1) {
      console.log("Booom!")
      setGameOn(false)
    }

    // update visited
    const temp = JSON.parse(JSON.stringify(visited))
    temp[i][j] = 1
    setVisited(temp)
  }

  const getAdjacentMinesAmount = (i: number, j: number) => {
    let sum = 0

    const directions = {
      up: { y: i - 1, x: j },
      upRight: { y: i - 1, x: j + 1 },
      right: { y: i, x: j + 1 },
      downRight: { y: i + 1, x: j + 1 },
      down: { y: i + 1, x: j },
      downLeft: { y: i + 1, x: j - 1 },
      left: { y: i, x: j - 1 },
      upLeft: { y: i - 1, x: j - 1 },
    }

    Object.keys(directions).forEach((d) => {
      const current = directions[d as keyof typeof directions]
      const { x, y } = current || {}
      try {
        if (mineGrid[y][x]) sum++
      } catch (e) {
        // console.log("")
      }
    })

    return sum
  }

  const renderSweeper = () => {
    const items = []

    for (let i = 0; i < mineGrid.length; i++) {
      for (let j = 0; j < mineGrid[i].length; j++) {
        items.push(
          <div
            key={`item-${i}-${j}`}
            id={`item-${i}-${j}`}
            className={`${styles.gridItem} ${visited[i][j] ? styles.visited : ""}`}
            onClick={(e) => handleClick(i, j)}
          >
            {/* {visited[i][j] === 1 ? "v" : 0} */}
            {mineGrid[i][j] === 1 ? "xx" : ""}
            {getAdjacentMinesAmount(i, j)}
          </div>
        )
      }

      // console.log(mineGrid[i])
      // if ((i + 1) % 5 === 0) {
      //   console.log("row end!")
      // }
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
