import Container from "@/components/container/container"
import styles from "./home.module.css"
import Link from "next/link"
import Header from "@/components/header/header"

const Home = () => {
  return (
    <Container>
      <Header title="Index of /projects" alignment="left" />
      <div>
        <div className={styles.tableHeading}>
          <div>Name</div>
          <div>Description</div>
        </div>
        <Link className={styles.link} href="/sweeper">
          <div className={styles.tableRow}>
            <p>🚩 Minesweeper game</p>
            <p>Reverse engineered classic</p>
          </div>
        </Link>
        <Link className={styles.link} href="/contact">
          <div className={styles.tableRow}>
            <p>💌 Contact</p>
            <p>Email address and such</p>
          </div>
        </Link>
      </div>
    </Container>
  )
}

export default Home
