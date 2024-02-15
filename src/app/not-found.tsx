import ContainerWithNavigation from "@/components/containerWithNavigation/containerWithNavigation"
import styles from "./home.module.css"
import Header from "@/components/header/header"

const NotFound = () => {
  return (
    <ContainerWithNavigation>
      <Header title="Not found " alignment="center" linkToHome />
      <div className={styles.notFoundContainer}>
        <p>Hmm 😐 Looks like you are searching for something that does not exist.</p>
      </div>
    </ContainerWithNavigation>
  )
}

export default NotFound
