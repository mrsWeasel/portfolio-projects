import styles from "./header.module.css"
import { Red_Hat_Display } from "next/font/google"

const redHatDisplay = Red_Hat_Display({ subsets: ["latin"], weight: ["400", "700"] })

interface Props {
  title: string
}

const Header = ({ title }: Props) => {
  return (
    <div className={styles.header}>
      <h1 className={redHatDisplay.className}>{title}</h1>
    </div>
  )
}

export default Header
