const { db } = require("mongodb")

db.connect(process.env.MONGODB_URI)

db = db.getSiblingDB(process.env.MONGODB_LEADERBOARD_DB)

db[process.env.MONGODB_MINESWEEPER_COLLECTION].drop()
