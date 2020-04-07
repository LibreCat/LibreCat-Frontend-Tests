// Test for https://github.com/LibreCat/LibreCat/issues/264

describe('Issue #264: Searching for "Peeters Netherlands"', function() {
    it('should results in record 2737384', function() {
        cy.visit('/');

        cy.get('input[name=q]').type('Peeters Netherlands{enter}');

        cy.contains('LibreCat-ID: 2737384').should('be.visible');

        cy.contains('a', 'Regime change at a distance: Austria and the Southern Netherlands following ' +
            'the war of the Spanish succession, 1716-1725')
            .should('be.visible')
            .should('have.attr', 'href')
            .should('end.with', '/record/2737384');
    });
});
