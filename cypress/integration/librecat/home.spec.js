describe('The backend homepage', function() {
    beforeEach(function() {
        cy.login();
    });

    it('should load successfully', function() {
        cy.visit('/librecat');
    });

    describe('The user profile', function() {
        it('should not display the edit profile form', function() {
            cy.get('.authorIds_input').as('form')
                .should('exist')
                .should('have.length', 10)
                .should('not.be.visible');

            cy.get('#author_ids_edit').as('edit').click();

            cy.get('@form').should('be.visible');

            cy.get('@edit').click();

            cy.get('@form').should('not.be.visible');
        });
    });
});
