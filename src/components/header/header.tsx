import Link from "next/link"
import styles from "./header.module.css"
import { Red_Hat_Display } from "next/font/google"

const redHatDisplay = Red_Hat_Display({ subsets: ["latin"], weight: ["400", "700"] })

interface Props {
  title: string
  alignment?: "left" | "center" | "right"
  linkToHome?: boolean
}

const Header = ({ title, alignment, linkToHome }: Props) => {
  return (
    <div className={styles.header} style={{ textAlign: alignment || "center" }}>
      {linkToHome && (
        <Link href="/" className={styles.linkToHome}>
          ← Home
        </Link>
      )}
      <h1 className={redHatDisplay.className}>{title}</h1>
    </div>
  )
}

export default Header
