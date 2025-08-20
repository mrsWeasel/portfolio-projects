#!/usr/bin/env bash
set -euo pipefail

mongosh "$MONGODB_URI" --eval "
  const db = db.getSiblingDB('$MONGODB_LEADERBOARD_DB');
  db.$MONGODB_MINESWEEPER_COLLECTION.insertOne({
    _id: ObjectId('64a0629d6cd31da8c69f4f67'),
    mines: [0, 11, 22, 33, 44, 55, 66, 77, 88, 99]
  });
"





