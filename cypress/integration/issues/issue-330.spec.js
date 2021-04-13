// Test for https://github.com/LibreCat/LibreCat/issues/330

describe('Issue #330: Redundant AJAX/XHR requests', function () {
  it('should only load the marked total once when loading a publication detail page', function () {
    cy.intercept('/marked_total*').as('marked')

    cy.visit('/record/2737395')

    cy.wait('@marked')

    cy.get('@marked.all').should('have.length', 1)
  })

  it('should only fire ajax request once when marking publication', function () {
    cy.intercept('POST', '/mark/*').as('mark')

    cy.visit('/record')

    cy.get('.tab-pane .citation-block-div a').first().click()

    cy.get('@mark.all').should('have.length', 0)

    cy.get('a.mark').click()

    cy.wait('@mark')

    cy.get('@mark.all').should('have.length', 1)
  })

  it('should only fire ajax request once when unmarking publication', function () {
    cy.intercept('POST', '/mark/*')

    cy.intercept('POST', '/mark/*?x-tunneled-method=DELETE', {}).as('unmark')

    cy.visit('/record')

    cy.get('.tab-pane .citation-block-div a').first().click()

    cy.get('a.mark').click() // Marking

    cy.get('@unmark.all').should('have.length', 0)

    cy.get('a.mark').click() // Unmarking

    cy.wait('@unmark')

    cy.get('@unmark.all').should('have.length', 1)
  })
})
