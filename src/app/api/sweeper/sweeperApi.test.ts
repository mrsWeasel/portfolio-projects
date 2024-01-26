import axios from "axios"
import request from "supertest"

const baseUrl = "http://localhost:3000/api/sweeper"

describe("initGame api route", () => {
  beforeEach(async () => {
    await request(baseUrl).get("/deleteScores?delete=all")
  })

  afterAll(async () => {
    await request(baseUrl).get("/deleteScores?delete=all")
  })

  test("initGame api route", async () => {
    const response = await request(baseUrl).post("/initGame")

    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBeDefined()
    expect(response.body.mines).toBeDefined()
  })
})

describe("startGame api route", () => {
  beforeEach(async () => {
    await request(baseUrl).get("/deleteScores?delete=all")
  })

  afterAll(async () => {
    await request(baseUrl).get("/deleteScores?delete=all")
  })

  test("startGame api route - when request body is valid, response should be ok", async () => {
    const initResponse = await request(baseUrl).post("/initGame")
    const { id } = initResponse.body

    const response = await request(baseUrl).put("/startGame").send({ id }).expect(200)

    expect(response.body.message).toBeDefined()
  })

  test("startGame api route - when request body is missing id, should get error response", async () => {
    const response = await request(baseUrl).put("/startGame").send({ id: undefined }).expect(400)

    expect(response.body.message).toBe("INVALID_REQUEST")
  })
})
