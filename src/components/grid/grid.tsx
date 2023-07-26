import styles from "./grid.module.css"

interface Props {
  columns: number
  children: React.ReactNode
}

const Grid = ({ columns, children }: Props) => {
  return <div className={styles[`grid-${columns}`]}>{children}</div>
}

export default Grid
