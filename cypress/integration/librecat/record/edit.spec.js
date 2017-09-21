describe('The Edit publication page', function() {
    beforeEach(function() {
        cy.login('einstein', 'einstein');
    });

    it('should load successfully', function() {
        cy.visit('/librecat/record/edit/2737388');
    });

    describe('The author field', function() {
        it('should have 3 authors', function() {
            cy.get('#creator .row').should('have.length', 3);
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

            cy.get('#idm_intern_3').as('internal')
                .should('not.be.checked')
                .next('img')
                .should('have.attr', 'alt', 'Not Authorized')
                .should('have.attr', 'src')
                .should('end.with', 'authorized_no.png');

            cy.get('@internal')
                .click()
                .should('be.checked')
                .next('img')
                .should('have.attr', 'alt', 'Authorized')
                .should('have.attr', 'src')
                .should('end.with', 'authorized_yes.png');

            cy.get('@first').should('be.readonly');

            cy.get('@last').should('be.readonly');
        });

        it('should be able to remove an author', function() {
            cy.get('#creator .row').should('have.length', 4);

            cy.get('#last_name_3 ~ .input-group-addon .glyphicon-minus')
                .click();

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

        it('should be able to reorder authors', function() {
            cy.get('#creator .row:eq(0) span:contains("First Name")')
                .trigger('mousedown', {which: 1})
                .trigger('mousemove', {pageX: 369, pageY: 500})
                .trigger('mouseup');

            cy.get('#first_name_0').should('have.value', 'Jonas');
            cy.get('#last_name_0').should('have.value', 'Billet');

            cy.get('#first_name_1').should('have.value', 'Marilyn');
            cy.get('#last_name_1').should('have.value', 'Monroe');

            cy.get('#first_name_2').should('have.value', 'Filip');
            cy.get('#last_name_2').should('have.value', 'Du Prez');
        });
    });
});
