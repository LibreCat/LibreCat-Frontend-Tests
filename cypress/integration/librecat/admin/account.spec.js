describe('The Manage Accounts Page', function() {
    it('should not be publically exposed', function() {
        cy.visit('/librecat/admin/account');

        cy.url().should('match', /\/login\?return_url=.*%2Flibrecat%2Fadmin%2Faccount$/);

        cy.contains('Manage Account Information').should('not.exist');

        cy.get('#id_login').type('einstein');

        cy.get('#id_password').type('einstein{enter}');

        cy.url().should('match', /\/librecat\/admin\/account/);

        cy.contains('Manage Account Information').should('be.visible');
    });

    describe('As unauthorized user', function() {
        it('should not be available', function() {
            cy.login();

            cy.request(
                {
                    'url': '/librecat/admin/account',
                    'failOnStatusCode': false,
                })
                .its('status').should('eq', 403);
        });
    });

    describe('As authorized user', function() {
        beforeEach(function() {
            cy.login('einstein', 'einstein');
        });

        it('should display the Add new account button', function() {
            cy.visit('/librecat/admin/account');

            cy.get('.btn:contains("Add new account")')
                .should('be.visible');
        });

        it('should display number of results after search', function() {
            cy.get('h3:contains("Results")').should('not.exist');

            cy.get('form#admin-account-search')
                .within(function() {
                    cy.get(':submit')
                        .should('be.visible')
                        .click();
                });

            cy.get('h3:contains("Results")').should('be.visible');
        });

        it('should load number of publications for users', function() {
            cy.server();
            cy.route('/num_of_publ/1', {total: '123'}).as('publ1');
            cy.route('/num_of_publ/1234', {total: '987'}).as('publ2');

            cy.visit('/librecat/admin/account/search');

            cy.wait(['@publ1', '@publ2']);

            cy.get('.num_publ[data-id=1]').should('have.text', '123');
            cy.get('.num_publ[data-id=1234]').should('have.text', '987');
        });
    });
});
