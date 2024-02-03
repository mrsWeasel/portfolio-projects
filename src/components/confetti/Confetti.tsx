import JSConfetti from "js-confetti"
import { useEffect, useRef } from "react"
import styles from "./confetti.module.css"

interface ConfettiProps {
  showConfetti: boolean
}

const Confetti = ({ showConfetti }: ConfettiProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const confettiRef = useRef<JSConfetti | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    confettiRef.current = new JSConfetti({ canvas: canvasRef.current })
  }, [])

  useEffect(() => {
    if (!showConfetti) return

    const fireConfetti = () => {
      confettiRef.current?.addConfetti({
        confettiRadius: 4,
        confettiNumber: 300,
        confettiColors: ["#D33FB6", "#FF999E", "#F3EA6C", "#8EECF5"],
      })
    }
    fireConfetti()
  }, [showConfetti])

  return <canvas className={styles.confettiCanvas} ref={canvasRef} />
}

export default Confetti
