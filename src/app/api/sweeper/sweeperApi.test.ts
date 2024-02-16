import { unobfuscateMines, generateMineGrid } from "../../../services/sweeperService"
import request from "supertest"

const baseUrl = "http://localhost:3000/api/sweeper"
const token = `Bearer ${process.env.CRON_SECRET}`

describe("initGame api route", () => {
  beforeEach(async () => {
    const response = await request(baseUrl).get("/deleteScores?delete=all").set("Authorization", token)
    expect(response.status).toBe(200)
  })

  test("initGame api route", async () => {
    const response = await request(baseUrl).post("/initGame")

    expect(response.statusCode).toBe(200)
    expect(response.body._id).toBeDefined()
    expect(response.body.obfuscatedMines).toBeDefined()
  })
})

describe("startGame api route", () => {
  beforeEach(async () => {
    const response = await request(baseUrl).get("/deleteScores?delete=all").set("Authorization", token)
    expect(response.status).toBe(200)
  })

  test("startGame api route - when request body is valid, response should be ok", async () => {
    const initResponse = await request(baseUrl).post("/initGame")
    const { _id } = initResponse.body

    const response = await request(baseUrl).put("/startGame").send({ _id }).expect(200)

    expect(response.body.startTime).toBeDefined()
  })

  test("startGame api route - when request body is missing id, should get error response", async () => {
    const response = await request(baseUrl).put("/startGame").send({ _id: undefined }).expect(400)

    expect(response.body.message).toBe("INVALID_REQUEST")
  })
})

describe("endGame api route", () => {
  beforeEach(async () => {
    const response = await request(baseUrl).get("/deleteScores?delete=all").set("Authorization", token)
    expect(response.status).toBe(200)
  })

  test("endGame api route / game won - when request body is valid, response should be ok ", async () => {
    const initResponse = await request(baseUrl).post("/initGame")
    const { _id, obfuscatedMines } = initResponse.body

    const mines = generateMineGrid(unobfuscateMines(obfuscatedMines))
    // mark all cells without mines visited for mocking a scenario where game is won
    const visited = mines.map((i) => i.map((j) => (j ? 0 : 1)))

    // start game
    await request(baseUrl).put("/startGame").send({ _id }).expect(200)

    const endGameResponse = await request(baseUrl).put("/endGame").send({ _id, visited }).expect(200)
    expect(endGameResponse.body.time).toBeDefined()
    expect(endGameResponse.body.result).toBe("WON")
  })

  test("endGame api route / game lost - when request body is valid, response should be ok ", async () => {
    const initResponse = await request(baseUrl).post("/initGame")
    const { _id } = initResponse.body

    await request(baseUrl).put("/startGame").send({ _id }).expect(200)

    const endGameResponse = await request(baseUrl).put("/endGame").send({ _id }).expect(200)
    expect(endGameResponse.body.time).toBeUndefined()
    expect(endGameResponse.body.result).toBe("LOST")
  })

  test("endGame api route - when game is not started yet, response should not be ok", async () => {
    const initResponse = await request(baseUrl).post("/initGame")
    const { _id, obfuscatedMines } = initResponse.body

    const mines = generateMineGrid(unobfuscateMines(obfuscatedMines))
    // mark all cells without mines visited for mocking a scenario where game is won
    const visited = mines.map((i) => i.map((j) => (j ? 0 : 1)))

    await request(baseUrl).put("/endGame").send({ _id, visited }).expect(500)
  })

  test("endGame api route - when request body is missing field '_id', response should not be ok", async () => {
    const initResponse = await request(baseUrl).post("/initGame")
    const { _id, obfuscatedMines } = initResponse.body

    const mines = generateMineGrid(unobfuscateMines(obfuscatedMines))
    // mark all cells without mines visited for mocking a scenario where game is won
    const visited = mines.map((i) => i.map((j) => (j ? 0 : 1)))

    await request(baseUrl).put("/startGame").send({ _id }).expect(200)

    await request(baseUrl).put("/endGame").send({ visited }).expect(400)
  })
})

describe("deleteScores api route", () => {
  it("Is not successful without authorization token", async () => {
    const response = await request(baseUrl).get("/deleteScores?delete=all")
    expect(response.status).toBe(401)
  })

  it("Is not successful with invalid authorization token", async () => {
    const response = await request(baseUrl).get("/deleteScores?delete=all").set("Authorization", "asdf")
    expect(response.status).toBe(401)
  })
})
