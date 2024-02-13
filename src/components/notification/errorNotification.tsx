import styles from "./notification.module.css"

interface ErrorNotificationProps {
  message: string
}

const ErrorNotification = ({ message }: ErrorNotificationProps) => {
  return <div className={styles.error}>{message}</div>
}

export default ErrorNotification
