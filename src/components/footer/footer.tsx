import styles from "./footer.module.css"

const Footer = () => {
  const year = new Date().getFullYear()
  return <p className={styles.footerText}>{`© Laura Heino ${year}`}</p>
}

export default Footer
