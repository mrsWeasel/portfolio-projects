import { Red_Hat_Mono } from "next/font/google"
import { Score } from "@/typed/typed"
import styles from "./scores.module.css"

const redHatMono = Red_Hat_Mono({ subsets: ["latin"], weight: ["500"] })

interface Props {
  scores: Score[]
  gameId: string | null
}

const Scores = ({ scores, gameId }: Props) => {
  return (
    <div className={styles.scoresContainer}>
      <div className={styles.header}>
        <h2>Best scores (all players)</h2>
      </div>
      <div className={redHatMono.className}>
        <ul className={styles.scoreList}>
          {scores.map((s, index) => {
            const { time, startTime, _id } = s || {}
            if (!time || !startTime || !_id) return null

            return (
              <li key={_id} className={`${styles.scoreListItem} ${gameId === _id && styles.latestGame}`}>
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
