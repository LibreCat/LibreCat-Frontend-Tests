describe('The Edit publication page', function () {
  it('should load successfully', function () {
    cy.login()

    cy.visit('/librecat/record/edit/2737394')
  })

  describe('The author field', function () {
    beforeEach(() => {
      cy.login()

      cy.visit('/librecat/record/edit/2737394')
    })

    it('should have 2 authors', function () {
      cy.get('#creator .row').should('have.length', 2)
    })

    it('should be able to add an author', function () {
      cy.get('#last_name_0 ~ .input-group-addon .fa-plus').click()

      cy.get('#creator .row').should('have.length', 3)

      cy.get('#first_name_2').should('have.value', '')
      cy.get('#last_name_2').should('have.value', '')
    })

    it('should be able to change to an internal author', function () {
      cy.intercept('/search_researcher*').as('search-researcher')

      cy.get('#last_name_0 ~ .input-group-addon .fa-plus').click()

      cy.get('#first_name_2')
        .as('first') //
        .should('not.be.readonly')
        .type('Elvis')

      cy.get('#last_name_2')
        .as('last') //
        .should('not.be.readonly')
        .type('Presley')

      cy.get('#idm_intern_2')
        .as('internal')
        .should('not.be.checked')
        .next('img')
        .should('have.attr', 'alt', 'Not Authorized')
        .should('have.attr', 'src')
        .should('end.with', 'authorized_no.png')

      cy.get('@internal').click()

      cy.wait('@search-researcher')

      cy.get('@internal')
        .should('be.checked')
        .next('img')
        .should('have.attr', 'alt', 'Authorized')
        .should('have.attr', 'src')
        .should('end.with', 'authorized_yes.png')

      cy.get('@first').should('be.readonly')

      cy.get('@last').should('be.readonly')
    })

    it('should be able to remove an author', function () {
      cy.get('#creator .row').should('have.length', 2)

      cy.get('#last_name_1 ~ .input-group-addon .fa-minus').click()

      cy.get('#creator .row').should('have.length', 1)
    })

    it('should be ordered', function () {
      cy.get('#first_name_0').should('have.value', 'Test')
      cy.get('#last_name_0').should('have.value', 'User')

      cy.get('#first_name_1').should('have.value', 'Alan')
      cy.get('#last_name_1').should('have.value', 'Smith')
    })

    it('should be able to reorder authors', function () {
      cy.get('#creator .row:eq(0) span:contains("First Name")')
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { pageX: 380, pageY: 430 })
        .trigger('mouseup')

      cy.get('#first_name_0').should('have.value', 'Alan')
      cy.get('#last_name_0').should('have.value', 'Smith')

      cy.get('#first_name_1').should('have.value', 'Test')
      cy.get('#last_name_1').should('have.value', 'User')
    })
  })
})
