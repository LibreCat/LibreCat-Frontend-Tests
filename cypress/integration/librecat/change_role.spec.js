describe('The Change role function', function() {
    describe('As regular user', function() {
        beforeEach(function() {
            cy.login();

            cy.visit('/librecat');

            cy.get('a:contains("Settings")').as('settings');
        });

        describe('The Change role button', function() {
            it('should not be displayed', function() {
                cy.get('@settings')
                    .should('be.visible')
                    .click();

                cy.contains('Logged in as test').should('be.visible');

                cy.contains('Role: User').should('not.exist');

                cy.contains('(Change role:').should('not.exist');

                cy.get('a[href*="/librecat/change_role/"]')
                    .should('not.exist');
            });
        });
    });

    describe('As admin user', function() {
        beforeEach( function() {
            cy.login('einstein', 'einstein');

            cy.visit('/librecat');

            cy.get('a:contains("Settings")').as('settings');
        });

        describe('The Change role button', function() {
            it('should be displayed', function() {
                cy.get('@settings')
                    .should('be.visible')
                    .click();

                cy.contains('Logged in as einstein').should('be.visible');

                cy.contains('Role: Admin').should('be.visible');

                cy.contains('(Change role:').should('be.visible');

                cy.get('a[href$="/librecat/change_role/user"]')
                    .should('have.text', 'User')
                    .should('be.visible');
            });

            it('should switch to the regular user view when clicked', function() {
                cy.get('@settings').click();

                cy.get('a[href$="/librecat/change_role/user"]').click();

                cy.get('@settings').click();

                cy.contains('Logged in as einstein').should('be.visible');

                cy.contains('Role: User').should('be.visible');

                cy.contains('(Change role:').should('be.visible');

                cy.get('a[href$="/librecat/change_role/admin"]')
                    .should('have.text', 'Admin')
                    .should('be.visible');
            });

            it('should switch back to the admin user when clicked', function() {
                cy.get('@settings').click();

                cy.get('a[href$="/librecat/change_role/admin"]').click();

                cy.get('@settings').click();

                cy.contains('Logged in as einstein').should('be.visible');

                cy.contains('Role: Admin').should('be.visible');

                cy.contains('(Change role:').should('be.visible');

                cy.get('a[href$="/librecat/change_role/user"]')
                    .should('have.text', 'User')
                    .should('be.visible');
            });
        });
    });
});
