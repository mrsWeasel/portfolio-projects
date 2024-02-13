# Hours

|  Day   | Time | Description                                                                                                                            |
| :----: | :--- | :------------------------------------------------------------------------------------------------------------------------------------- |
| 10.6.  | 6    | Getting familiar with Next.js, initializing + configuring app, adding first views, starting on developing first portfolio item (game)  |
| 11.6.  | 4    | Adding some logic to minesweeper game + fighting with recursion                                                                        |
| 12.6.  | 2    | Handling victrory case + flagging suspected mine cells in minesweeper game                                                             |
| 14.6.  | 1    | Generate minegrid dynamically                                                                                                          |
| 15.6.  | 1.5  | Create toolbar for either flagging / revealing cells. Fix some bugs with generating minegrid. Polishing styles.                        |
| 15.6.  | 0.5  | Add button for starting a new game                                                                                                     |
| 16.6.  | 2    | Styling: paddings, margins, colors, typographic styles etc. Improve usability by "protecting" flagged cells from clicks                |
| 16.6.  | 0.5  | Bug hunt 🐛 and fix: "game won" state not updated correctly in all situations                                                          |
| 18.6.  | 0.5  | Some style tweaks                                                                                                                      |
| 18.6.  | 1.5  | Setting up Express, investigating AWS services and reading through documentation for how to deploy Node.js / Express backend           |
| 25.6.  | 3    | Studying Next.js route handlers, start using that instead of Express after all + set up Mongo db                                       |
|  1.7.  | 5    | Further studying of route handlers + create route handlers minesweeper game, use Axios in frontend to fetch and post data              |
|  2.7.  | 2    | Refactor: extract logic from component to service, add backend validation for if game was won / lost                                   |
|  3.7.  | 1    | Install and configure Jest for TypeScript, create first unit tests for sweeperService                                                  |
|  3.7.  | 1    | Make it a bit harder to cheat by obfuscating minegrid data sent in response from api                                                   |
|  4.7.  | 0.5  | Refactor toolbar away from page.tsx to another module                                                                                  |
| 15.7.  | 1.5  | Starting with timer component                                                                                                          |
| 25.7.  | 3    | Struggling with getting React Testing Library to work with Jest & .tsx files                                                           |
| 26.7.  | 2    | Styling: create more 3D look and feel, embed timer to toolbar component                                                                |
| 26.7.  | 1    | Styling: add grid component for multi column layouts, typographic styles                                                               |
| 27.7.  | 1    | Query for getting best results in MongoDB leaderboard + modify how time is saved in MongoDB when game ends                             |
| 27.7.  | 0.5  | Add new index for minesweeper collection (leaderboard) for searching by time (in MongoDB Atlas admin panel)                            |
| 27.7.  | 1    | Add high scores to UI                                                                                                                  |
| 28.7.  | 1    | Update high scores after game won + highlight current game if present in score table                                                   |
| 28.7.  | 1    | Component tests for Timer, figuring out how to mock google fonts for Jest                                                              |
| 28.7.  | 0.5  | Start styling the portfolio item description                                                                                           |
| 29.9.  | 1    | base64 encoding for mines when fetching from API, commenting out stuff that is not needed for phase 1, adding footer                   |
| 29.9.  | 1    | Set up Vercel deployment (in Vercel admin panel)                                                                                       |
| 30.9.  | 0.5  | Styling (background color and some borders + drop shadows)                                                                             |
| 30.9.  | 0.5  | Add headers (CSP etc.)                                                                                                                 |
| 30.9.  | 1    | Troubleshooting how to disable caching in prod deployment for getScores api route                                                      |
| 30.9.  | 2    | Troubleshooting for how to reuse database connection in serverless setting                                                             |
| 30.9.  | 0.5  | Fixing timer bug (starting a new game when previous was not completed didn't clear interval)                                           |
| 1.10.  | 0.5  | Prevent actions when waiting response from api                                                                                         |
| 1.10.  | 0.5  | Install Husky and run unit/component tests on pre-commit hook, protect master branch in Github to prevent deploying by accident        |
| 3.10.  | 3    | Add serverless function to delete all scores from leaderboard (for testing), get started with API tests, install Supertest             |
| 10.10. | 3    | Studying Vercel cron jobs and how to secure api routes used by them, adding CRON_SECRET env variable                                   |
| 14.10. | 1    | Add more logic to deleteScores api route: delete all / delete just unfinished or lost games (to keep database tidy)                    |
| 14.10. | 0.5  | Set up 2 cron jobs: delete all games from db monthly, delete unfinished / lost games weekly                                            |
| 14.10. | 2    | Add util function + npm script for summing up project hours                                                                            |
| 14.10. | 6    | Looking into how to install local MongoDB, installing local MongoDB, struggling with seeding database using mongosh scripts 🤯         |
| 15.10. | 5    | Finally solve how to give mongosh script AND cypress access to env variables                                                           |
| 15.10. | 0.5  | Add assertions to first Cypress test + add data-test-ids where needed                                                                  |
| 15.10. | 0.5  | Add Cypress test for losing a game                                                                                                     |
| 15.10. | 0.5  | Add Cypress test for winning when last clicked item is empty (without number) + for flagging suspicious cells                          |
| 16.10. | 1    | Bug hunt 🐛 and fix: when game is won while recursively traversing cells, handler for win case was called multiple times               |
| 18.10. | 0.5  | Refactor Sweeper grid to its own module                                                                                                |
| 20.10. | 0.5  | In Vercels admin ui, configure env variables separate for preview development (use dev database instead of prod)                       |
| 20.10. | 1    | Getting started with CI/CD - reading through Vercels documentation about integrating with Github Actions, installing Vercel CLI        |
|  8.1.  | 5    | Github Actions for CI/CD pipeline: setup local MongoDB and run e2e tests. Troubleshoot why db connection not working.                  |
|  9.1.  | 2    | Github Actions continued: add production deployment job, make it depend on e2e tests                                                   |
| 10.1.  | 2    | Added content and designs to front page, update header + footer + global styles                                                        |
| 10.1.  | 0.5  | Added content to contact page, improve styling of links with an arrow                                                                  |
| 26.1.  | 1.5  | Add middleware to make api implementation cleaner                                                                                      |
| 26.1.  | 0.5  | Add api test with invalid request body, fix Cypress / Jest types conflicting                                                           |
| 27.1.  | 1    | Timer broke due to api changes - assert in e2e tests that timer stops after game over. Also fix type errors.                           |
| 27.1.  | 1    | Add linting to pre-commit git hook, allow 0 warnings & fix lint errors                                                                 |
| 27.1.  | 1    | Prevent initializing new game if one has been initialized already and not started yet + update tests                                   |
| 27.1.  | 2    | Fight with RTL matchers giving type errors, no good solution found - finally using regular Jest matchers provided workaround           |
| 28.1.  | 1    | Only fetch top scores if current (ended) game has a chance to be in top 10 (BE + FE + unit tests and mocks + update Cypress tests)     |
| 28.1.  | 0.5  | Update documentation in README.md                                                                                                      |
| 29.1.  | 1.5  | Add typing to the API                                                                                                                  |
| 30.1.  | 1    | Remove cron job for deleting all scores, to truly see how db performs. Add indexing for 'time' field in db collection.                 |
| 30.1.  | 1    | Address type errors that resulted from importing MongoDB types, remove middleware as a result too                                      |
| 30.1.  | 1    | Create typeguards / validation util functions for api responses                                                                        |
| 31.1.  | 2    | Continue working on typeguards, add more types for api                                                                                 |
|  1.2.  | 0.5  | Add unit test coverage for /endGame api route                                                                                          |
|  1.2.  | 0.5  | Loading animation / skeleton for minesweeper grid, fix footer text overlapping page content                                            |
|  3.2.  | 2.5  | Looking into more compatible options for confetti effect, ended up with js-confetti and implemented it                                 |
|  3.2.  | 0.5  | Fix bug 🐛: if scores length is over 10, high scores were not fetched from api                                                         |
|  3.2.  | 1.5  | Centralized font service, investigete how to fix Jest mocking for fonts as it got broken                                               |
|  3.2.  | 0.5  | Add more helpful messages to api errors                                                                                                |
|  3.2.  | 0.5  | Generating error response (message and status code) from api error message using a util function, logging the full error for debugging |
|  3.2.  | 0.5  | Investigate and fix yet another corner case issue with fetching high scores + create a new test case for it                            |
|  3.2.  | 1    | Improve documentation                                                                                                                  |
|  8.2.  | 1.5  | Use types in frontend when handling API responses, improve types and update tests                                                      |
| 13.2.  | 2    | Show notification in frontend if an error occurs                                                                                       |

## Total hours: 113
