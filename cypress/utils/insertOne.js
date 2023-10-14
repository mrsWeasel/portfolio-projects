const { db, ObjectId } = require("mongodb")

db.connect(process.env.MONGODB_URI)

db = db.getSiblingDB("localdb")

db.localcollection.insertOne({
  _id: new ObjectId("64a0629d6cd31da8c69f4f67"),
  mines: [0, 11, 22, 33, 44, 55, 66, 77, 88, 99],
})

db.minesweeper.find({})
