const assertToolBar = () => {
  cy.get('[data-test-id="toolbar-button-flagging"]').should("exist")
  cy.get('[data-test-id="toolbar-button-poking"]').should("exist")
  cy.get('[data-test-id="toolbar-button-init"]').should("have.attr", "disabled")
  cy.get('[data-test-id="sweeper-toolbar-timer"]').should("contain", "00:00:00")
}

const assertTimerIsStopped = () => {
  cy.get('[data-test-id="sweeper-toolbar-timer"]').then(($timer): void => {
    const time1 = $timer.text()
    // Time shouldn't have changed
    cy.wait(2000)
    cy.get('[data-test-id="sweeper-toolbar-timer"]').contains(time1.toString())
  })
}

const _id = "64a0629d6cd31da8c69f4f67"

describe("Sweeper game", () => {
  beforeEach(() => {
    cy.exec(
      `env MONGODB_URI=${Cypress.env("MONGODB_URI")} MONGODB_LEADERBOARD_DB=${Cypress.env(
        "MONGODB_LEADERBOARD_DB"
      )} MONGODB_MINESWEEPER_COLLECTION=${Cypress.env("MONGODB_MINESWEEPER_COLLECTION")} npm run db:local:clear`
    )
    cy.exec(
      `env MONGODB_URI=${Cypress.env("MONGODB_URI")} MONGODB_LEADERBOARD_DB=${Cypress.env(
        "MONGODB_LEADERBOARD_DB"
      )} MONGODB_MINESWEEPER_COLLECTION=${Cypress.env("MONGODB_MINESWEEPER_COLLECTION")} npm run db:local:seed`
    )

    cy.intercept("POST", "/api/sweeper/initGame", {
      statusCode: 200,
      body: {
        // decodes to [0, 11, 22, 33, 44, 55, 66, 77, 88, 99]
        obfuscatedMines: "WzAsMTEsMjIsMzMsNDQsNTUsNjYsNzcsODgsOTld",
        _id,
      },
    }).as("initGame")

    cy.visit("http://localhost:3000/sweeper")
  })
  it("Wins game when all non-mined cells are revealed, last clicked item being one with number", () => {
    cy.wait("@initGame")

    // Assert toolbar
    assertToolBar()

    // Assert leaderboard
    cy.get('[data-test-id="scores-list"]').should("exist")
    cy.get('[data-test-id="game-64a0629d6cd31da8c69f4f67"]').should("not.exist")

    // Assert grid
    cy.get('[data-test-id="sweeper-grid-container"]').should("exist")

    cy.get(`[data-test-id="item-0-1"]`).click()
    cy.get(`[data-test-id="item-0-1"]`).should("contain", "2")

    // Wait to get some time on timer
    cy.wait(2000)
    cy.get('[data-test-id="sweeper-toolbar-timer"]').should("contain", "00:00")
    cy.get('[data-test-id="sweeper-toolbar-timer"]').should("not.contain", "00:00:00")

    cy.get(`[data-test-id="item-0-3"]`).click()
    cy.get(`[data-test-id="item-0-3"]`).should("be.empty")

    cy.get(`[data-test-id="item-8-9"]`).click()
    cy.get(`[data-test-id="item-8-9"]`).should("contain", "2")

    cy.get(`[data-test-id="item-1-0"]`).click()
    cy.get(`[data-test-id="item-1-0"]`).should("contain", "2")

    cy.get(`[data-test-id="item-3-0"]`).click()
    cy.get(`[data-test-id="item-3-0"]`).should("be.empty")

    cy.get(`[data-test-id="item-9-8"]`).click()
    cy.get(`[data-test-id="item-9-8"]`).should("contain", "2")

    cy.get(`[data-test-id="item-0-0"]`).should("contain", "🦄")

    // Assert leaderboard
    cy.get('[data-test-id="scores-list"]').should("exist")
    cy.get('[data-test-id="game-64a0629d6cd31da8c69f4f67"]').should("exist")

    // Assert timer
    assertTimerIsStopped()
  })

  it("Wins game when all non-mined cells are revealed, last clicked item being empty (no number)", () => {
    cy.wait("@initGame")

    // Assert toolbar
    assertToolBar()

    // Assert leaderboard
    cy.get('[data-test-id="scores-list"]').should("exist")
    cy.get('[data-test-id="game-64a0629d6cd31da8c69f4f67"]').should("not.exist")

    // Assert grid
    cy.get('[data-test-id="sweeper-grid-container"]').should("exist")

    cy.get(`[data-test-id="item-0-1"]`).click()
    cy.get(`[data-test-id="item-0-1"]`).should("contain", "2")

    // Wait to get some time on timer
    cy.wait(2000)
    cy.get('[data-test-id="sweeper-toolbar-timer"]').should("contain", "00:00")
    cy.get('[data-test-id="sweeper-toolbar-timer"]').should("not.contain", "00:00:00")

    cy.get(`[data-test-id="item-8-9"]`).click()
    cy.get(`[data-test-id="item-8-9"]`).should("contain", "2")

    cy.get(`[data-test-id="item-1-0"]`).click()
    cy.get(`[data-test-id="item-1-0"]`).should("contain", "2")

    cy.get(`[data-test-id="item-9-8"]`).click()
    cy.get(`[data-test-id="item-9-8"]`).should("contain", "2")

    cy.get(`[data-test-id="item-0-3"]`).click()
    cy.get(`[data-test-id="item-0-3"]`).should("be.empty")

    cy.get(`[data-test-id="item-3-0"]`).click()
    cy.get(`[data-test-id="item-3-0"]`).should("be.empty")

    cy.get(`[data-test-id="item-0-0"]`).should("contain", "🦄")

    // Assert leaderboard
    cy.get('[data-test-id="scores-list"]').should("exist")
    cy.get('[data-test-id="game-64a0629d6cd31da8c69f4f67"]').should("exist")

    // Assert timer
    assertTimerIsStopped()
  })

  it("Loses when hits a cell with mine", () => {
    cy.wait("@initGame")

    // Assert toolbar
    assertToolBar()

    // Assert leaderboard
    cy.get('[data-test-id="scores-list"]').should("exist")
    cy.get('[data-test-id="game-64a0629d6cd31da8c69f4f67"]').should("not.exist")

    // Assert grid
    cy.get('[data-test-id="sweeper-grid-container"]').should("exist")

    cy.get(`[data-test-id="item-0-1"]`).click()
    cy.get(`[data-test-id="item-0-1"]`).should("contain", "2")

    // Wait to get some time on timer
    cy.wait(2000)

    cy.get('[data-test-id="item-0-0"]').click()
    cy.get(`[data-test-id="item-0-0"]`).should("contain", "💩")

    // Assert leaderboard
    cy.get('[data-test-id="scores-list"]').should("exist")
    cy.get('[data-test-id="game-64a0629d6cd31da8c69f4f67"]').should("not.exist")

    // Assert timer
    assertTimerIsStopped()
  })

  it("Toggles between clicking cells open and marking them with flag", () => {
    cy.wait("@initGame")

    // Assert toolbar
    assertToolBar()

    // Switch to "flagging" mode
    cy.get('[data-test-id="toolbar-button-flagging"]').click()

    cy.get(`[data-test-id="item-0-1"]`).click()
    cy.get(`[data-test-id="item-0-1"]`).should("contain", "🚩")

    // Switch away from "flagging" mode
    cy.get('[data-test-id="toolbar-button-poking"]').click()

    cy.get(`[data-test-id="item-0-1"]`).click()
    // Flagged item is "protected" and should not be opened
    cy.get(`[data-test-id="item-0-1"]`).should("contain", "🚩")

    // Switch to "flagging" mode
    cy.get('[data-test-id="toolbar-button-flagging"]').click()

    cy.get(`[data-test-id="item-0-1"]`).click()
    cy.get(`[data-test-id="item-0-1"]`).should("be.empty")

    // Switch away from "flagging" mode
    cy.get('[data-test-id="toolbar-button-poking"]').click()

    cy.get(`[data-test-id="item-0-1"]`).click()

    cy.get(`[data-test-id="item-0-1"]`).should("contain", "2")
  })

  it("Shows error message in sweeper grid and notification when trying to start game but api returns error", () => {
    cy.intercept("PUT", "/api/sweeper/startGame*", {
      statusCode: 500,
      body: {
        message: "INTERNAL_ERROR",
      },
    })

    cy.wait("@initGame")

    // Assert grid
    cy.get('[data-test-id="sweeper-grid-container"]').should("exist")

    // Assert error when trying to start game
    cy.get(`[data-test-id="item-0-1"]`).click()
    cy.get('[data-test-id="sweeper-error"]').should("exist")

    // Assert timer
    assertTimerIsStopped()
  })

  it("Shows error notification when trying to end game but api returns error", () => {
    cy.intercept("PUT", "/api/sweeper/endGame*", {
      statusCode: 500,
      body: {
        message: "INTERNAL_ERROR",
      },
    })

    cy.wait("@initGame")

    // Assert grid
    cy.get('[data-test-id="sweeper-grid-container"]').should("exist")

    // Click a cell with "2"
    cy.get(`[data-test-id="item-0-1"]`).click()
    cy.get(`[data-test-id="item-0-1"]`).should("contain", "2")

    // Wait to get some time on timer
    cy.wait(2000)

    // Click a cell with mine
    cy.get('[data-test-id="item-0-0"]').click()

    // Assert error when ending the game is not successful
    cy.get('[data-test-id="sweeper-error"]').should("exist")

    // Assert timer
    assertTimerIsStopped()
  })

  it("Shows error notification when fetching scores fails", () => {
    cy.intercept("GET", "/api/sweeper/getScores*", {
      statusCode: 500,
      body: {
        message: "INTERNAL_ERROR",
      },
    })

    // Assert grid
    cy.get('[data-test-id="sweeper-grid-container"]').should("exist")

    // Assert error notification
    cy.get('[data-test-id="error-notification"]').should("exist")
  })
})
