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

### Setting up with local db

If you wish to run MongoDB locally, install MongoDB community server with HomeBrew. Step by step instructions: https://www.mongodb.com/docs/manual/administration/install-community/#std-label-install-mdb-community-edition (install version 7.0 to make sure it is compatible!)

Create `env.local` file for storing environment variables. Copy and paste from below. MONGODB_URI will work as is. Replace other details with your own.

```
MONGODB_URI=mongodb://localhost:27017
MONGODB_LEADERBOARD_DB=yourdbname
MONGODB_MINESWEEPER_COLLECTION=yourcollectionname
CRON_SECRET=yoursecret
```

### Setting up with remote db

First, create a free tier account in MongoDB Atlas. Set up a cluster and create a new database. Save database details in `env.test`. Note that if you use `env.local`, that will clash with running e2e tests locally (they need to run against local database.) You will need the same env variables as stated above.

## Running the project

### Using local db

First, launch local database by opening a terminal and starting it up (assuming you installed version 7.0):

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

### Using remote db

Start up project client and server. On root level, run:

```bash
npm run dev:test
```

Project should now be running in http://localhost:3000

## e2e tests

This project uses Cypress for e2e tests. If you wish to run e2e tests locally, first set up local db as instructed above. Tests also use 2 shell scripts to manipulate database state. You need to give execution permission for those files.

Navigate to cypress/utils and run:

```bash
chmod +x seed_db.sh
```

and

```bash
chmod +x clear_db.sh
```

Then, run

```bash
npm run cypress:open
```

and once Cypress app launches, select E2E Testing. Then, choose which browser you would want to use for test runs. After these steps, you should be able to open the spec file and run the tests.
