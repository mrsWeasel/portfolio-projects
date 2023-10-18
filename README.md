# Hello!

This is my sandbox project for small experiments, such as games. It is a fullstack [Next.js](https://nextjs.org/) project with MongoDB.

## Hours

This project is also a study assignment where bookkeeping of hours is required. The hours can be found in [hours.md file](/hours.md)

## Install dependencies

On root level, run install script:

```bash
npm install
```

## Setup

You can either use local MongoDB or create a free tier account in MongoDB Atlas.

If you wish to run MongoDB locally, install MongoDB community server with HomeBrew. Step by step instructions: https://www.mongodb.com/docs/manual/administration/install-community/#std-label-install-mdb-community-edition (install version 7.0 to make sure it is compatible!)

Create `env.local` file for storing environment variables. Copy and paste from below. If you choose to run database locally, MONGODB_URI will work as is.

```
MONGODB_URI=mongodb://localhost:27017
MONGODB_LEADERBOARD_DB=yourdbname
MONGODB_MINESWEEPER_COLLECTION=yourcollectionname
CRON_SECRET=yoursecret
```

## Running the project

If you are using local db, open a terminal and start it up (assuming you installed version 7.0):

```bash
brew services start mongodb-community@7.0
```

Then start up project client and server. On root level, run:

```bash
npm run dev:local
```

That's it! Project should now be running in http://localhost:3000

If you need to stop MongoDB server, run:

```bash
brew services stop mongodb-community@7.0
```
