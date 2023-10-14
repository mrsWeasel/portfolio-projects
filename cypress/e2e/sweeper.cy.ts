import { obfuscateMines } from "@/services/sweeperService"

const id = "64a0629d6cd31da8c69f4f67"
const mines = [0, 11, 22, 33, 44, 55, 66, 77, 88, 99]

describe("Sweeper game", () => {
  beforeEach(() => {
    cy.exec(`npm run db:local:clear`)
    cy.exec(`npm run db:local:seed`)
    cy.intercept("POST", "/api/sweeper/initGame", {
      statusCode: 200,
      body: {
        mines: "WzAsMTEsMjIsMzMsNDQsNTUsNjYsNzcsODgsOTld",
        id,
      },
    }).as("initGame")

    cy.visit("http://localhost:3000/sweeper")
  })
  it("Wins game when all non-mined cells are revealed", () => {
    cy.wait("@initGame")

    cy.get(`[data-test-id="item-0-1"]`).click()
    cy.get(`[data-test-id="item-0-3"]`).click()
    cy.get(`[data-test-id="item-8-9"]`).click()
    cy.wait(1000)
    cy.get(`[data-test-id="item-1-0"]`).click()
    cy.get(`[data-test-id="item-3-0"]`).click()
    cy.get(`[data-test-id="item-9-8"]`).click()
    cy.wait(1000)
  })
})
