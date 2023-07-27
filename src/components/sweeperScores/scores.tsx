import { Scores } from "@/typed/typed"

const Scores = ({ scores }: Scores) => {
  return (
    <ul>
      {scores.map((s) => {
        const { time, startTime, _id } = s || {}
        if (!time || time <= 0 || !startTime || !_id) return null

        return <li key={_id}>{`${time} sec (${new Date(startTime).toLocaleDateString("en-GB")})`}</li>
      })}
    </ul>
  )
}

export default Scores
