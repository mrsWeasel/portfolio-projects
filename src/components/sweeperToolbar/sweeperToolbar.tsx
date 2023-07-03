import styles from "./sweeperToolbar.module.css"

interface Props {
  flagging: boolean
  setFlagging: (flagging: boolean) => void
  handleStartNewGame: () => void
}

const SweeperToolbar = ({ flagging, setFlagging, handleStartNewGame }: Props) => {
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

        <button className={`${styles.toolBarButton}`} onClick={() => handleStartNewGame()}>
          🌟
        </button>
      </div>
    </div>
  )
}

export default SweeperToolbar
