const { db } = require("mongodb")

db.connect("mongodb://localhost:27017")

db = db.getSiblingDB("localdb")

db.localcollection.deleteMany({})
