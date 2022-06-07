describe('The Manage Accounts page', () => {
  it('should not be publically exposed', () => {
    cy.visit('/librecat/admin/account')

    cy.url().should('match', /\/login\?return_url=.*%2Flibrecat%2Fadmin%2Faccount$/)

    cy.get('.page-header h1').should('not.exist')

    cy.get('#id_login').type('einstein')
    cy.get('#id_password').type('einstein{enter}')

    cy.url().should('match', /\/librecat\/admin\/account/)

    cy.get('.page-header h1')
      .should('be.visible')
      .prop('innerText')
      .should('eq', 'Manage Account Information')
  })

  describe('As unauthorized user', () => {
    it('should not be available', () => {
      cy.login()

      cy.request({
        url: '/librecat/admin/account',
        failOnStatusCode: false
      })
        .its('status')
        .should('eq', 403)
    })
  })

  describe('As authorized user', () => {
    beforeEach(() => {
      cy.login('einstein', 'einstein')

      cy.visit('/librecat/admin/account')
    })

    it('should display the Add new account button', () => {
      cy.get('.btn:contains("Add new account")').should('be.visible')
    })

    it('should display number of results after search', () => {
      cy.contains('h3', '7 Results').should('be.visible')

      cy.get('form#admin-account-search').within(() => {
        cy.get('input[type=text]').type('elvis')

        cy.get(':submit')
          .should('be.visible')
          .click()
      })

      cy.contains('h3', '1 Results').should('be.visible')
    })
  })
})
