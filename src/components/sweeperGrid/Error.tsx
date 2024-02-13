import styles from "./sweeper.module.css"

const Error = () => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>😭</div>
      <div>Oops! Something went wrong.</div>
    </div>
  )
}

export default Error
