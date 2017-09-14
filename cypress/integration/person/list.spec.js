describe('The Authors page', function() {
    it('should load successfully', function() {
        cy.visit('/person');
    });

    it('should not show the language ID', function() {
        cy.get('#language_id')
            .should('exist')
            .should('not.be.visible');
    });
});
