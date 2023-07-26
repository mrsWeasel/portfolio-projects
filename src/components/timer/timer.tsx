interface Props {
  elapsedSeconds: number
}

const Timer = ({ elapsedSeconds = 0 }: Props) => {
  const getHours = (): string => {
    const hours = Math.floor(elapsedSeconds / 60 / 60)
    if (hours < 10) return `0${hours}`
    return hours.toString()
  }

  const getMinutes = (): string => {
    const minutes = Math.floor((elapsedSeconds / 60) % 60)
    if (minutes < 10) return `0${minutes}`
    return minutes.toString()
  }

  const getSeconds = (): string => {
    const seconds = Math.floor(elapsedSeconds % 60)
    if (seconds < 10) return `0${seconds}`
    return seconds.toString()
  }

  return <div>{`${getHours()}:${getMinutes()}:${getSeconds()}`}</div>
}

export default Timer
