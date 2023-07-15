interface Props {
  elapsedSeconds: number
}

const Timer = ({ elapsedSeconds }: Props) => {
  const getHours = () => {
    if (elapsedSeconds < 3600) return 0
    const hours = elapsedSeconds / 60 / 60
    return hours
  }

  const getMinutes = () => {
    if (elapsedSeconds < 60) return 0
    const minutes = elapsedSeconds / 60
    return Math.floor(minutes % 60)
  }

  const getSeconds = () => {
    if (elapsedSeconds < 60) return elapsedSeconds
    return Math.floor(elapsedSeconds % 60)
  }

  return <div>{`${getHours()}:${getMinutes()}:${getSeconds()}`}</div>
}

export default Timer
