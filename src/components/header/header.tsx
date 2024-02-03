import Link from "next/link"
import styles from "./header.module.css"
import { redHatDisplay } from "@/services/fonts"

interface Props {
  title: string
  alignment?: "left" | "center" | "right"
  linkToHome?: boolean
}

const Header = ({ title, alignment, linkToHome }: Props) => {
  return (
    <div className={styles.header} style={{ textAlign: alignment || "center" }}>
      {linkToHome && (
        <div className={styles.linkToHome}>
          <Link href="/">Back</Link>
        </div>
      )}
      <h1 className={redHatDisplay.className}>{title}</h1>
    </div>
  )
}

export default Header
