import React from "react"
import styles from "./container.module.css"
import Footer from "../footer/footer"

interface Props {
  children?: React.ReactNode
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
      <Footer />
    </>
  )
}

export default Container
