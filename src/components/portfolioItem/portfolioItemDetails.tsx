import styles from "./portfolioItem.module.css"

interface Props {
  children: React.ReactNode
}

const PortfolioItemDetails = ({ children }: Props): React.ReactNode => {
  return <div className={styles.portfolioItemDetails}>{children}</div>
}

export default PortfolioItemDetails
