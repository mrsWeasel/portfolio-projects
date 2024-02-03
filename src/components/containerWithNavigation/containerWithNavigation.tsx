import Link from "next/link"
import React from "react"
import styles from "./containerWithNavigation.module.css"
import Footer from "../footer/footer"
import { redHatDisplay } from "@/services/fonts"

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
