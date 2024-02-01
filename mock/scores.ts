import { Score } from "@/typed/typed"

export const createMockScores = (amount = 1): Score[] => {
  const scores = []

  for (let i = 0; i < amount; i++) {
    scores.push({
      _id: "1234567",
      time: 20 + i,
      startTime: new Date(),
    })
  }

  return scores
}
