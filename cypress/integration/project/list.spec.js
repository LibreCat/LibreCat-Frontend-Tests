describe('The Projects page', function() {
    it('should load successfully', function() {
        cy.visit('/project');
    });

    it('should not show the language ID', function() {
        cy.get('#language_id')
            .should('exist')
            .should('not.be.visible');
    });
});
