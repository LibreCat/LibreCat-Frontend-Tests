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
            cy.get('.creator').should('have.length', 2);
        });

        it('should be ordered', function() {
            cy.get('#first_name_0').should('have.value', 'Jonas');
            cy.get('#last_name_0').should('have.value', 'Billet');

            cy.get('#first_name_1').should('have.value', 'Filip');
            cy.get('#last_name_1').should('have.value', 'Du Prez');
        });
    });
});
