// Test for https://github.com/LibreCat/LibreCat/issues/299

describe('Issue #299: Department autocompletion', function () {
  beforeEach(function () {
    cy.login()

    cy.visit('/librecat/record/new?type=book')
  })

  it('should keep the focus if no matching department is found', function () {
    cy.intercept('/get_department*').as('ajax')

    cy.get('#dp_autocomplete_0').as('dp').click().type('Department')

    cy.wait('@ajax')

    cy.get('@dp').type('x')

    cy.wait('@ajax')

    cy.focused().invoke('prop', 'id').should('eq', 'dp_autocomplete_0')
  })

  it('should keep the focus while typing', function () {
    cy.intercept('/get_department*').as('ajax')

    cy.get('#dp_autocomplete_0').as('dp').click().type('Department ')

    cy.wait('@ajax')

    cy.contains('li', 'Department of Mathematics').should('be.visible')

    cy.get('@dp').type('o')

    cy.wait('@ajax')

    cy.contains('li', 'Department of Mathematics').should('be.visible')

    cy.focused().invoke('prop', 'id').should('eq', 'dp_autocomplete_0')
  })
})
