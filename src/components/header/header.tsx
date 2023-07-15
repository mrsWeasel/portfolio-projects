import styles from "./header.module.css"

interface Props {
  title: string
}

const Header = ({ title }: Props) => {
  return (
    <div className={styles.header}>
      <h1>{title}</h1>
    </div>
  )
}

export default Header
