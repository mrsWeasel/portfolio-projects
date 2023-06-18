const express = require("express")
const app = express()

let data = ""

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>")
})

app.get("/api/minesweeper/scores", (req, res) => {
  res.json(data)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
