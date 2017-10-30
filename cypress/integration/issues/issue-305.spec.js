// Test for https://github.com/LibreCat/LibreCat/issues/305

describe('Issue #305: Language switch + login issue', function() {
    it('should keep the current language after login', function() {
        cy.visit('/set_language?lang=de');

        cy.get('h1')
            .should('have.text', 'Publikationen an der Universität LibreCat');

        cy.login();

        cy.visit('/');

        cy.get('h1')
            .should('have.text', 'Publikationen an der Universität LibreCat');
    });
});
