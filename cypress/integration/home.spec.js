describe('The Home page', function() {
    it('should load successfully', function() {
        cy.visit('/');
    });

    it('should have the librecat object in the global scope', function() {
        cy.window().then((w) => {
            expect(w).to.have.property('librecat');
            expect(w.librecat).to.have.property('uri_base');
            expect(w.librecat.uri_base).to.eq(Cypress.config('baseUrl'));
        });
    });

    l10n(() => {
        it('should display the title', function() {
            cy.visit('/');

            cy.get('#banner > h1')
                .should('have.length', 1)
                .should('be.visible')
                .should('have.text', this.t.header.title);
        });

        describe('The search form', function() {
            it('should be visible', function() {
                cy.get('form[action*="/record"]')
                    .should('exist')
                    .within(() => {
                        cy.get('input[name="q"]')
                            .should('be.visible')
                            .should('have.attr', 'placeholder', this.t.home.search_placeholder);

                        cy.get('button[type=submit]')
                            .should('be.visible')
                            .should('have.text', this.t.facets.go_button);
                    });
            });

            it('should post to the publication page', function() {
                cy.get('input[name="q"]').type('intracardiac electrograms{enter}');

                cy.url().should('contain', 'record?q=intracardiac+electrograms');

                cy.get('#publ h3')
                    .first()
                    .should('be.visible')
                    .should('contain', `1 ${this.t.hits.publication}`);

                cy.get('a[href$="/record/2737391"]').should('contain',
                    'Signal processing of intracardiac electrograms : optimization of mapping and ablation ' +
                        'in tachyarrhythmias');
            });
        });
    });
});
