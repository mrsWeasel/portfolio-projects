import { useEffect, useRef, useState } from "react"
import styles from "./notification.module.css"

interface ErrorNotificationProps {
  message: string
}

const ErrorNotification = ({ message }: ErrorNotificationProps) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 4000)

    return () => clearTimeout(timeout)
  }, [])

  return visible ? <div className={styles.error}>{message}</div> : null
}

export default ErrorNotification
