describe('The Home page', function() {
    it('should load successfully', function() {
        cy.visit('/');
    });

    it('should have the librecat object in the global scope', function() {
        cy.window().then(function(w) {
            expect(w).to.have.property('librecat');
            expect(w.librecat).to.have.property('uri_base');
            expect(w.librecat.uri_base).to.eq(Cypress.config('baseUrl'));
        });
    });

    it('should not show the language ID', function() {
        cy.get('#language_id')
            .should('exist')
            .should('not.be.visible');
    });

    it('should display the title', function() {
        cy.get('#banner > h1')
            .should('have.length', 1)
            .should('be.visible')
            .should('have.text', 'Publications at LibreCat University');
    });

    describe('The search form', function() {
        it('should be visible', function() {
            cy.get('form[action*="/publication"][method="get"]')
                .should('exist')
                .within(function() {
                    cy.get('input[name="q"]')
                        .should('be.visible');

                    cy.get('button[type=submit]:contains("Go!")')
                        .should('be.visible');
                });
        });

        it('should post to the publication page', function() {
            cy.get('input[name="q"]').type('intracardiac electrograms');

            cy.get('button:contains("Go!")').click();

            cy.url().should('contain', 'publication?q=intracardiac+electrograms');

            cy.contains('1 Publication').should('be.visible');

            cy.get('a[href$="/publication/2737391"]').should('contain',
                'Signal processing of intracardiac electrograms : optimization of mapping and ablation ' +
                    'in tachyarrhythmias');
        });
    });
});
