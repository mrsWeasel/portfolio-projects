import axios from "axios"
import request from "supertest"

const baseUrl = "http://localhost:3000"

describe("initGame api route", () => {
  beforeEach(async () => {
    await request(baseUrl).delete("/api/sweeper/deleteScores")
  })

  afterAll(async () => {
    await request(baseUrl).delete("/api/sweeper/deleteScores")
  })

  test("initGame api route", async () => {
    const response = await request(baseUrl).post("/api/sweeper/initGame")

    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBeDefined()
    expect(response.body.mines).toBeDefined()
  })
})
