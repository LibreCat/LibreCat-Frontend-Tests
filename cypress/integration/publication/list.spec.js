describe('The Publications page', function() {
    it('should load successfully', function() {
        cy.visit('/record');
    });

    it('should not show the language ID', function() {
        cy.get('#language_id')
            .should('exist')
            .should('not.be.visible');
    });

    l10n(() => {
        describe('The Display / Sort options', function() {
            describe('The Hits per page option', function() {
                beforeEach(function() {
                    cy.visit('/record');

                    cy.get('button[data-target="#hitsperpage_"]').as('hits-per-page-button');
                    cy.get('#hitsperpage_').as('hits-per-page-collpasible');
                });

                it('should be collapsed', function() {
                    cy.get('@hits-per-page-button').should('have.text', `${this.t.facets.hits_per_page}: 20`);

                    cy.get('@hits-per-page-collpasible').should('not.be.visible');
                });

                it('should open when button is clicked', function() {
                    cy.get('@hits-per-page-button').click();

                    cy.get('@hits-per-page-collpasible')
                        .should('be.visible')
                        .find('a:contains("100")')
                        .click();

                    cy.url().should('match', /record\?limit=100/);

                    cy.get('@hits-per-page-button')
                        .should('have.text', `${this.t.facets.hits_per_page}: 100`);
                });

                it('should display the number of marked publications', function() {
                    cy.server();
                    cy.route({
                        url: '/marked_total*',
                        response: {
                            total: 1234,
                            ok: 1,
                        },
                    });

                    cy.visit('/record');

                    cy.contains('a', this.t.mark.marked_publication)
                        .should('be.visible')
                        .should('have.attr', 'href')
                        .should('end.with', '/marked');

                    cy.get('.total-marked')
                        .should('be.visible')
                        .should('have.text', '1234');
                });
            });
        });
    });
});
