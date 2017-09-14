describe('The Publications page', function() {
    it('should load successfully', function() {
        cy.visit('/publication');
    });

    it('should not show the language ID', function() {
        cy.get('#language_id')
            .should('exist')
            .should('not.be.visible');
    });

    describe('The Display / Sort options', function() {
        describe('The Hits per page option', function() {
            beforeEach(function() {
                cy.get('button[data-target="#hitsperpage_"]').as('hits-per-page-button');
                cy.get('#hitsperpage_').as('hits-per-page-collpasible');
            });

            it('should be collapsed', function() {
                cy.get('@hits-per-page-button').should('have.text', 'Hits per page: 20');

                cy.get('@hits-per-page-collpasible').should('not.be.visible');
            });

            it('should open when button is clicked', function() {
                cy.get('@hits-per-page-button').click();

                cy.get('@hits-per-page-collpasible').should('be.visible');
            });

            it('should reload when a different option is clicked', function() {
                cy.get('@hits-per-page-collpasible')
                    .find('a:contains("100")')
                    .click();

                cy.url().should('match', /publication\?limit=100/);

                cy.get('@hits-per-page-button')
                    .should('have.text', 'Hits per page: 100');
            });
        });
    });
});
