import Link from "next/link"
import React from "react"
import styles from "./containerWithNavigation.module.css"
import { Red_Hat_Display } from "next/font/google"
import Footer from "../footer/footer"

const redHatDisplay = Red_Hat_Display({ subsets: ["latin"], weight: ["400", "700"] })

interface Props {
  children?: React.ReactNode
}

// Navigation hidden for now until more content is added
const ContainerWithNavigation: React.FC<Props> = ({ children }) => {
  return (
    <>
      <main className={styles.main}>
        {/* <nav className={styles.navbar}>
        <ul className={redHatDisplay.className}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/sweeper">Minesweeper game</Link>
          </li>
        </ul>
      </nav> */}
        <div className={styles.container}>{children}</div>
      </main>
      <Footer />
    </>
  )
}

export default ContainerWithNavigation
