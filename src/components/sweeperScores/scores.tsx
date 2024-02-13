import { Score } from "@/typed/typed"
import styles from "./scores.module.css"
import { redHatMono } from "@/services/fonts"

interface Props {
  scores: Score[]
  gameId: string | null
  hasError: boolean
}

const Scores = ({ scores, gameId, hasError }: Props) => {
  return (
    <div className={styles.scoresContainer}>
      <div className={styles.header}>
        <h2>Best scores (all players)</h2>
      </div>
      <div className={redHatMono.className}>
        <ul data-test-id="scores-list" className={styles.scoreList}>
          {scores.map((s, index) => {
            const { time, startTime, _id } = s || {}
            // TODO: if hasError, return error view "Not able to fetch scores" etc.

            if (!time || !startTime || !_id) return null

            return (
              <li
                data-test-id={`game-${_id}`}
                key={_id}
                className={`${styles.scoreListItem} ${gameId === _id && styles.latestGame}`}
              >
                <span className={styles.position}>{`${index + 1}. `}</span>
                <span className={styles.time}>{`${time} sec `}</span>
                <span className={styles.date}>{`(${new Date(startTime).toLocaleDateString("en-GB")})`}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Scores
