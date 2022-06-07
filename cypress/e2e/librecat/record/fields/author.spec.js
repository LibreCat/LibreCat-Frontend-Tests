describe('The author field', function () {
  beforeEach(function () {
    cy.login()

    cy.visit('/librecat/record/new?type=book')
  })

  describe('For unknown authors', function () {
    it('should not be possible to activate the author', function () {
      cy.get('.creator .fa-plus:visible').click()

      cy.get('#first_name_1').as('first').should('be.empty').should('not.be.readonly')

      cy.get('#last_name_1').as('last').should('be.empty').should('not.be.readonly').type('bohr')

      cy.get('.modal-dialog').as('modal').should('not.be.visible')

      cy.get('#idm_intern_1').click()

      cy.get('@modal')
        .should('be.visible')
        .should(
          'contain',
          'No matching entry in staff directory found. ' +
            'Please check, if first and last name of the author are entered correctly. ' +
            'You can omit letters (e.g. just enter the last name, or the last name and ' +
            'first letter of first name).'
        )

      cy.get('@first').should('have.empty').should('not.be.readonly')

      cy.get('@last').should('have.value', 'bohr').should('not.be.readonly')
    })
  })

  describe('For authors without an old name', function () {
    it('should be possible to activate the author', function () {
      cy.get('.creator .fa-plus:visible').click()

      cy.get('#first_name_1').as('first').should('be.empty').should('not.be.readonly')

      cy.get('#last_name_1').as('last').should('be.empty').should('not.be.readonly').type('einstein')

      cy.get('#idm_intern_1').click()

      cy.get('.modal-dialog').should('not.be.visible')

      cy.get('@first').should('have.value', 'Albert').should('be.readonly')

      cy.get('@last').should('have.value', 'Einstein').should('be.readonly')
    })
  })

  describe('For authors with an old name', function () {
    it('should be possible to activate the author by current name', function () {
      cy.get('.creator .fa-plus:visible').click()

      cy.get('#first_name_1').as('first').should('be.empty').should('not.be.readonly')

      cy.get('#last_name_1').as('last').should('be.empty').should('not.be.readonly').type('monroe')

      cy.get('.modal-dialog').as('modal').should('not.be.visible')

      cy.get('#idm_intern_1').click()

      cy.get('@modal')
        .should('be.visible')
        .find('table tr')
        .should('have.length', 3)
        .contains('td a', 'Marilyn Monroe')
        .click()

      cy.get('@modal').should('not.be.visible')

      cy.get('@first').should('have.value', 'Marilyn').should('be.readonly')

      cy.get('@last').should('have.value', 'Monroe').should('be.readonly')
    })

    it('should be possible to activate the author by old name', function () {
      cy.get('.creator .fa-plus:visible').click()

      cy.get('#first_name_1').as('first').should('be.empty').should('not.be.readonly')

      cy.get('#last_name_1').as('last').should('be.empty').should('not.be.readonly').type('mortenson')

      cy.get('.modal-dialog').as('modal').should('not.be.visible')

      cy.get('#idm_intern_1').click()

      cy.get('@modal')
        .should('be.visible')
        .find('table tr')
        .should('have.length', 3)
        .contains('td', 'Norma Jeane Mortenson (now Marilyn Monroe)')
        .contains('a', 'Norma Jeane Mortenson')
        .click()

      cy.get('@modal').should('not.be.visible')

      cy.get('@first').should('have.value', 'Norma Jeane').should('be.readonly')

      cy.get('@last').should('have.value', 'Mortenson').should('be.readonly')
    })
  })
})
