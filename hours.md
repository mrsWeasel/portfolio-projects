# Hours

|  Day   | Time | Description                                                                                                                           |
| :----: | :--- | :------------------------------------------------------------------------------------------------------------------------------------ |
| 10.6.  | 6    | Getting familiar with Next.js, initializing + configuring app, adding first views, starting on developing first portfolio item (game) |
| 11.6.  | 4    | Adding some logic to minesweeper game + fighting with recursion                                                                       |
| 12.6.  | 2    | Handling victrory case + flagging suspected mine cells in minesweeper game                                                            |
| 14.6.  | 1    | Generate minegrid dynamically                                                                                                         |
| 15.6.  | 1.5  | Create toolbar for either flagging / revealing cells. Fix some bugs with generating minegrid. Polishing styles.                       |
| 15.6.  | 0.5  | Add button for starting a new game                                                                                                    |
| 16.6.  | 2    | Styling: paddings, margins, colors, typographic styles etc. Improve usability by "protecting" flagged cells from clicks               |
| 16.6.  | 0.5  | Bug hunt 🐛 and fix: "game won" state not updated correctly in all situations                                                         |
| 18.6.  | 0.5  | Some style tweaks                                                                                                                     |
| 18.6.  | 1.5  | Setting up Express, investigating AWS services and reading through documentation for how to deploy Node.js / Express backend          |
| 25.6.  | 3    | Studying Next.js route handlers, start using that instead of Express after all + set up Mongo db                                      |
|  1.7.  | 5    | Further studying of route handlers + create route handlers minesweeper game, use Axios in frontend to fetch and post data             |
|  2.7.  | 2    | Refactor: extract logic from component to service, add backend validation for if game was won / lost                                  |
|  3.7.  | 1    | Install and configure Jest for TypeScript, create first unit tests for sweeperService                                                 |
|  3.7.  | 1    | Make it a bit harder to cheat by obfuscating minegrid data sent in response from api                                                  |
|  4.7.  | 0.5  | Refactor toolbar away from page.tsx to another module                                                                                 |
| 15.7.  | 1.5  | Starting with timer component                                                                                                         |
| 25.7.  | 3    | Struggling with getting React Testing Library to work with Jest & .tsx files                                                          |
| 26.7.  | 2    | Styling: create more 3D look and feel, embed timer to toolbar component                                                               |
| 26.7.  | 1    | Styling: add grid component for multi column layouts, typographic styles                                                              |
| 27.7.  | 1    | Query for getting best results in MongoDB leaderboard + modify how time is saved in MongoDB when game ends                            |
| 27.7.  | 0.5  | Add new index for minesweeper collection (leaderboard) for searching by time (in MongoDB Atlas admin panel)                           |
| 27.7.  | 1    | Add high scores to UI                                                                                                                 |
| 28.7.  | 1    | Update high scores after game won + highlight current game if present in score table                                                  |
| 28.7.  | 1    | Component tests for Timer, figuring out how to mock google fonts for Jest                                                             |
| 28.7.  | 0.5  | Start styling the portfolio item description                                                                                          |
| 29.9.  | 1    | base64 encoding for mines when fetching from API, commenting out stuff that is not needed for phase 1, adding footer                  |
| 29.9.  | 1    | Set up Vercel deployment (in Vercel admin panel)                                                                                      |
| 30.9.  | 0.5  | Styling (background color and some borders + drop shadows)                                                                            |
| 30.9.  | 0.5  | Add headers (CSP etc.)                                                                                                                |
| 30.9.  | 1    | Troubleshooting how to disable caching in prod deployment for getScores api route                                                     |
| 30.9.  | 2    | Troubleshooting for how to reuse database connection in serverless setting                                                            |
| 30.9.  | 0.5  | Fixing timer bug (starting a new game when previous was not completed didn't clear interval)                                          |
| 1.10.  | 0.5  | Prevent actions when waiting response from api                                                                                        |
| 1.10.  | 0.5  | Install Husky and run unit/component tests on pre-commit hook, protect master branch in Github to prevent deploying by accident       |
| 3.10.  | 3    | Add serverless function to delete all scores from leaderboard (for testing), get started with API tests, install Supertest            |
| 10.10. | 3    | Studying Vercel cron jobs and how to secure api routes used by them, adding CRON_SECRET env variable                                  |
| 14.10. | 1    | Add more logic to deleteScores api route: delete all / delete just unfinished or lost games (to keep database tidy)                   |
| 14.10. | 0.5  | Set up 2 cron jobs: delete all games from db monthly, delete unfinished / lost games weekly                                           |
|   -    | ?    | Total hours                                                                                                                           |
