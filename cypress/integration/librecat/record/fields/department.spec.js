describe('The department field', function() {
    beforeEach(function() {
        cy.login();

        cy.visit('/librecat/record/new?type=book');
    });

    it('should open the autocomplete list when typing the up or down key', function() {
        cy.contains('li', 'Department of Mathematics').should('not.exist');

        cy.get('#dp_autocomplete_0').as('dp')
            .focus()
            .type('{downarrow}')
            .should('have.value', '');

        cy.contains('li', 'Department of Mathematics').should('be.visible');

        cy.get('@dp')
            .type('{downarrow}')
            .should('have.value', 'Department of Mathematics');

        cy.get('@dp')
            .type('{downarrow}')
            .should('have.value', 'Department of Mathematics -> Analysis Group');

        cy.get('@dp')
            .type('{uparrow}')
            .should('have.value', 'Department of Mathematics');

        cy.get('@dp')
            .type('{uparrow}')
            .should('have.value', '');
    });

    it('should open the autocomplete list when typing', function() {
        cy.contains('li', 'Department of Mathematics').should('not.exist');

        cy.get('#dp_autocomplete_0')
            .focus()
            .type('department')
            .should('have.value', 'department');

        cy.contains('li', 'Department of Mathematics')
            .should('be.visible')
            .click();
    });

    it('should set the value when selecting a department', function() {
        cy.get('#dp_idautocomplete_0').as('id')
            .should('have.value', '');

        cy.get('#dp_autocomplete_0').as('dp')
            .focus()
            .type('{downarrow}')
            .type('{downarrow}{enter}')
            .should('have.value', 'Department of Mathematics');

        cy.get('@id').should('have.value', '9999');
    });

    it('should disable the field when selecting a department', function() {
        cy.get('#dp_autocomplete_0').as('dp')
            .should('be.enabled')
            .focus()
            .type('{downarrow}')
            .type('{downarrow}{enter}')
            .should('be.disabled');
    });
});
