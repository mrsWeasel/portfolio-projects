import styles from "./sweeperToolbar.module.css"
import Timer from "@/components/timer/timer"

interface Props {
  elapsedSeconds: number
  flagging: boolean
  initGameDisabled: boolean
  setFlagging: (flagging: boolean) => void
  handleInitNewGame: () => void
}

const SweeperToolbar = ({ elapsedSeconds, flagging, initGameDisabled, setFlagging, handleInitNewGame }: Props) => {
  return (
    <div>
      <div className={styles.toolBar}>
        <button
          data-test-id="toolbar-button-flagging"
          className={`${styles.toolBarButton} ${flagging && styles.selected}`}
          onClick={() => setFlagging(true)}
        >
          🚩
        </button>
        <button
          data-test-id="toolbar-button-poking"
          className={`${styles.toolBarButton} ${!flagging && styles.selected}`}
          onClick={() => setFlagging(false)}
        >
          👇
        </button>

        <div className={styles.timer}>
          <Timer data-test-id="sweeper-toolbar-timer" elapsedSeconds={elapsedSeconds} />
        </div>

        <button
          data-test-id="toolbar-button-init"
          className={`${styles.toolBarButton}`}
          disabled={initGameDisabled}
          onClick={() => handleInitNewGame()}
        >
          🌟
        </button>
      </div>
    </div>
  )
}

export default SweeperToolbar
