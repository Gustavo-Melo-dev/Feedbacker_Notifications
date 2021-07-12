const APP_URL = process.env.APP_URL || 'http://localhost:8080'

describe('Widget', () => {
  it('check if widget button are shown', () => {
    cy.visit(APP_URL)
    cy.wait(2000)
    cy.get('#widget-open-button').click()
  })
  it('check the openning widget and send text', () => {
    cy.visit(APP_URL)
    cy.wait(2000)
    cy.get('#widget-open-button').click()
    cy.wait(2000)
    cy.get('#button-idea').click()
    cy.wait(2000)
    cy.get('#text-write').type('Testando cypress')
    cy.get('#send-text').click()
  })
})
