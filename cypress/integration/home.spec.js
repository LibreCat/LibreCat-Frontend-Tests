describe('The Home page', function() {
    it('should load successfully', function() {
        cy.visit('/');
    });

    it('should display the title', function() {
        cy.get('h1')
            .should('have.length', 1)
            .should('have.text', 'Publicaions at LibreCat University');
    });
});
