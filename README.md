# Hello!

This project functions as a platform for hosting fun little browser games. Games will be able to share common resources (such as database, UI components and so on.) For now, there is one game - reverse engineered classic Minesweeper.

The project is deployed in Vercel: https://portfolio-projects-phi.vercel.app/

Play some minesweeper: https://portfolio-projects-phi.vercel.app/sweeper

## Hours

This project is also a study assignment where bookkeeping of hours is required. The hours can be found in [hours.md file](/hours.md)

## Tooling

This is a fullstack [Next.js](https://nextjs.org/) project with MongoDB. Some central technologies are:

### Development

- JavaScript / TypeScript
- React.js
- Next.js
- Node.js
- MongoDB

### Testing

- Cypress for E2E testing
- Jest for unit tests / api tests
- React Testing Library for component tests

Automated tests also run on pipelines (E2E) / on pre-commit hook (Jest / RTL) to make sure that new code does not (likely) cause issues in production.

### CI/CD

- Github Actions

For all branches, E2E tests are run in pipelines. When pushing to master branch, production deployment is automated too (depends on E2E tests succeeding.)

## Setup

### Install dependencies

On root level, run install script:

```bash
npm install
```

This project is built using Node 18.16.0 (npm v9.5.1). It is recommended to use the same Node version. If you don't have nvm installed yet, [install](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) it first.

Then, to use the Node version specified in projects `.nvmrc`` file, try to run:

```bash
nvm use
```

If you get an error due to not having the correct version installed, run first:

```bash
nvm install
```

and then try again.

You can either use local MongoDB or create a free tier account in MongoDB Atlas.

### Setting up with local db

If you wish to run MongoDB locally, install MongoDB community server with HomeBrew. Step by step instructions: https://www.mongodb.com/docs/manual/administration/install-community/#std-label-install-mdb-community-edition (install version 7.0 to make sure it is compatible!)

Create `.env.local` file for storing environment variables. Copy and paste from below. MONGODB_URI will work as is. Replace other details with your own.

```
MONGODB_URI=mongodb://localhost:27017
MONGODB_LEADERBOARD_DB=yourdbname
MONGODB_MINESWEEPER_COLLECTION=yourcollectionname
CRON_SECRET=yoursecret
```

### Setting up with remote db

First, create a free tier account in MongoDB Atlas. Set up a cluster and create a new database. Save database details in `.env.test`.

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

### Production build

If you wish to create a production build locally, run:

```bash
npm run build
```

and then start the project by running:

```bash
npm start
```

## E2E tests

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
