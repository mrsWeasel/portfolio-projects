import ContainerWithNavigation from "@/components/containerWithNavigation/containerWithNavigation"
import styles from "./page.module.css"
import Link from "next/link"
import Header from "@/components/header/header"

const Home = () => {
  return (
    <ContainerWithNavigation>
      <Header title="Index of /laura_heino/portfolio" alignment="left" />
      <div>
        <div className={styles.tableHeading}>
          <div>Name</div>
          <div>Description</div>
        </div>
        <Link className={styles.link} href="/sweeper">
          <div className={styles.tableRow}>
            <p>🚩 Project: Minesweeper game</p>
            <p>Reverse engineering project</p>
          </div>
        </Link>
        <Link className={styles.link} href="/contact">
          <div className={styles.tableRow}>
            <p>💌 Contact</p>
            <p>Email address and such</p>
          </div>
        </Link>
      </div>
    </ContainerWithNavigation>
  )
}

export default Home
