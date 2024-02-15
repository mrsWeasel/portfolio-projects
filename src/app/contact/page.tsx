import Container from "@/components/container/container"
import Link from "next/link"
import Header from "@/components/header/header"
import Grid from "@/components/grid/grid"
import styles from "./contact.module.css"

const Contact = () => {
  return (
    <Container>
      <Header title="Contact" alignment="center" linkToHome />
      <Grid columns={1}>
        <div>
          <p>Feel free to contact me via email laura(at)lauraheino.com.</p>
          <div className={styles.socialLinksContainer}>
            <div className={styles.socialLink}>
              <Link href="https://github.com/mrsWeasel" target="_blank" rel="noopener noreferrer">
                Github
              </Link>
            </div>
            <div className={styles.socialLink}>
              <Link href="https://www.linkedin.com/in/laura-heino-33507278/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </Grid>
    </Container>
  )
}

export default Contact
