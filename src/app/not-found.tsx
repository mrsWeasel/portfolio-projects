import Container from "@/components/container/container"
import Header from "@/components/header/header"
import styles from "./home.module.css"

const NotFound = () => {
  return (
    <Container>
      <Header title="Not found " alignment="center" linkToHome />
      <div data-test-id="not-found" className={styles.notFoundContainer}>
        <p>Hmm 😐 Looks like you are searching for something that does not exist.</p>
      </div>
    </Container>
  )
}

export default NotFound
