describe("404 page", () => {
  it("Shows 404 page when content does not exist", () => {
    cy.on("uncaught:exception", (err) => {
      expect(err.message).to.include("NEXT_NOT_FOUND")
      return false
    })
    cy.visit("http://localhost:3000/asdf", { failOnStatusCode: false })

    cy.get('[data-test-id="not-found"]').should("exist")
  })
})
