#!/usr/bin/env bash
set -euo pipefail

mongosh "$MONGODB_URI" --eval "
  const db = db.getSiblingDB('$MONGODB_LEADERBOARD_DB');
  db.$MONGODB_MINESWEEPER_COLLECTION.deleteMany({});
"


