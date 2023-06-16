import styles from "./header.module.css"

const Header = ({ title }) => {
  return (
    <div className={styles.header}>
      <h1>{title}</h1>
    </div>
  )
}

export default Header
