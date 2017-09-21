describe('The Edit publication page', function() {
    beforeEach(function() {
        cy.login('einstein', 'einstein');
    });

    it('should load successfully', function() {
        cy.visit('/librecat');

        cy.get('a:contains("Ordering of TiO2 (nanoparticles) to mesoporous structures")')
            .should('have.length', 1)
            .click({force: true}); // link is overlayed by .citation-block-link
    });

    describe('The author field', function() {
        it('should have 2 authors', function() {
            cy.get('#creator .row').should('have.length', 3);
        });

        it('should be ordered', function() {
            cy.get('#first_name_0').should('have.value', 'Marilyn');
            cy.get('#last_name_0').should('have.value', 'Monroe');

            cy.get('#first_name_1').should('have.value', 'Jonas');
            cy.get('#last_name_1').should('have.value', 'Billet');

            cy.get('#first_name_2').should('have.value', 'Filip');
            cy.get('#last_name_2').should('have.value', 'Du Prez');
        });

        it('should be able to add an author', function() {
            cy.get('#last_name_0 ~ .input-group-addon .glyphicon-plus')
                .click();

            cy.get('#creator .row').should('have.length', 4);

            cy.get('#first_name_3').should('have.value', '');
            cy.get('#last_name_3').should('have.value', '');
        });

        it('should be able to change to an internal author', function() {
            cy.get('#first_name_3').as('first')
                .should('not.be.readonly')
                .type('Elvis');

            cy.get('#last_name_3').as('last')
                .should('not.be.readonly')
                .type('Presley');

            cy.get('#idm_intern_3')
                .should('not.be.checked')
                .click()
                .should('be.checked');

            cy.get('@first').should('be.readonly');

            cy.get('@last').should('be.readonly');
        });
    });
});
