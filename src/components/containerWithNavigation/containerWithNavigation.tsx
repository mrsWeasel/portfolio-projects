import Link from "next/link"
import React from "react"
import styles from "./containerWithNavigation.module.css"

interface Props {
  children?: React.ReactNode
}

const ContainerWithNavigation: React.FC<Props> = ({ children }) => {
  return (
    <main className={styles.main}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/sweeper">Sweeper game</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.container}>{children}</div>
    </main>
  )
}

export default ContainerWithNavigation
