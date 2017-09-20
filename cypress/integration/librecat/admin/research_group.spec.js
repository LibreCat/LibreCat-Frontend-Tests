describe('The Manage Research Groups page', function() {
    it('should not be publically exposed', function() {
        cy.visit('/librecat/admin/research_group');

        cy.url().should('match', /\/login\?return_url=.*%2Flibrecat%2Fadmin%2Fresearch_group$/);

        cy.get('.page-header h1').should('not.exist');

        cy.get('#id_login').type('einstein');
        cy.get('#id_password').type('einstein{enter}');

        cy.url().should('match', /\/librecat\/admin\/research_group/);

        cy.get('.page-header h1')
            .should('be.visible')
            .prop('innerText')
            .should('eq', 'Manage Research Groups');
    });

    describe('As unauthorized user', function() {
        it('should not be available', function() {
            cy.login();

            cy.request(
                {
                    'url': '/librecat/admin/research_group',
                    'failOnStatusCode': false,
                })
                .its('status').should('eq', 403);
        });
    });

    describe('As authorized user', function() {
        beforeEach(function() {
            cy.login('einstein', 'einstein');
        });

        it('should display the Add new project button', function() {
            cy.visit('/librecat/admin/research_group');

            cy.get('.btn:contains("Add new research group")')
                .should('be.visible');
        });

        it('should display number of results', function() {
            cy.get('h3:contains("Results")').should('be.visible');
        });
    });
});
