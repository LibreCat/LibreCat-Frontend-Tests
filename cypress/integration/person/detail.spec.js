describe('The Author detail page', function() {
    it('should load successfully', function() {
        cy.visit('/person/1');
    });

    it('should not display the edit profile form', function() {
        cy.get('.authorIds_input')
            .should('exist')
            .should('have.length', 9)
            .should('not.be.visible');
    });
});
