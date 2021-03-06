describe('The Manage Projects page', () => {
  it('should not be publically exposed', () => {
    cy.visit('/librecat/admin/project')

    cy.url().should('match', /\/login\?return_url=.*%2Flibrecat%2Fadmin%2Fproject$/)

    cy.get('.page-header h1').should('not.exist')

    cy.get('#id_login').type('einstein')
    cy.get('#id_password').type('einstein{enter}')

    cy.url().should('match', /\/librecat\/admin\/project/)

    cy.get('.page-header h1')
      .should('be.visible')
      .prop('innerText')
      .should('eq', 'Manage Projects')
  })

  describe('As unauthorized user', () => {
    it('should not be available', () => {
      cy.login()

      cy.request({
        url: '/librecat/admin/project',
        failOnStatusCode: false
      })
        .its('status')
        .should('eq', 403)
    })
  })

  describe('As authorized user', () => {
    beforeEach(() => {
      cy.login('einstein', 'einstein')

      cy.visit('/librecat/admin/project')
    })

    it('should display the Add new project button', () => {
      cy.get('.btn:contains("Add new project")').should('be.visible')
    })

    it('should display number of results', () => {
      cy.get('h3:contains("Results")').should('be.visible')
    })
  })
})
