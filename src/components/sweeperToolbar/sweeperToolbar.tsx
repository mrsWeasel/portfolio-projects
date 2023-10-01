import styles from "./sweeperToolbar.module.css"
import Timer from "@/components/timer/timer"

interface Props {
  elapsedSeconds: number
  flagging: boolean
  loading: boolean
  setFlagging: (flagging: boolean) => void
  handleInitNewGame: () => void
}

const SweeperToolbar = ({ elapsedSeconds, flagging, loading, setFlagging, handleInitNewGame }: Props) => {
  return (
    <div>
      <div className={styles.toolBar}>
        <button className={`${styles.toolBarButton} ${flagging && styles.selected}`} onClick={() => setFlagging(true)}>
          🚩
        </button>
        <button
          className={`${styles.toolBarButton} ${!flagging && styles.selected}`}
          onClick={() => setFlagging(false)}
        >
          👇
        </button>

        <div className={styles.timer}>
          <Timer elapsedSeconds={elapsedSeconds} />
        </div>

        <button className={`${styles.toolBarButton}`} disabled={loading} onClick={() => handleInitNewGame()}>
          🌟
        </button>
      </div>
    </div>
  )
}

export default SweeperToolbar
