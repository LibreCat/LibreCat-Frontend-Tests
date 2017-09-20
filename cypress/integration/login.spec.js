describe('The login page', function() {
    l10n(() => {
        it('should display a warning when caps lock is on', function() {
            cy.visit('/login');

            cy.get('#caps_alert').as('alert')
                .should('have.text', this.t.login.caps_lock_warning)
                .should('not.be.visible');

            cy.get('#id_password').as('password')
                .type('T');

            cy.get('@alert').should('be.visible');

            cy.get('@password').type('e');

            cy.get('@alert').should('not.be.visible');
        });

        it('should not display a warning when capital letters are typed with the shift key', function() {
            cy.visit('/login');

            cy.get('#caps_alert').as('alert')
                .should('have.text', this.t.login.caps_lock_warning)
                .should('not.be.visible');

            cy.get('#id_password').type('{shift}TESTPASSWORD');

            cy.get('@alert').should('not.be.visible');
        });

        it('should redirect to /librecat upon login', function() {
            cy.visit('/login');

            cy.contains('My Publication List').should('not.exist');

            cy.get('#id_login')
                .should('be.visible')
                .type('test');

            cy.get('#id_password')
                .should('be.visible')
                .type('secret');

            cy.get(`input[type=submit][value=${this.t.login.login_button}]`)
                .should('be.visible')
                .click();

            cy.url().should('match', /\/librecat$/);

            // NOTE: There's a bug here, this should be in German but locale is overwritten during login
            // See LibreCat issue #305 (https://github.com/LibreCat/LibreCat/issues/305)
            cy.contains('My Publication List').should('be.visible');
        });
    });

    describe('As regular user', function() {
        it('should not display the Admin menu', function() {
            cy.visit('/login');

            cy.get('#id_login').type('test');
            cy.get('#id_password').type('secret{enter}');

            cy.get('a.dropdown-toggle:contains("Admin")').should('not.exist');

            cy.get('a[href*="/librecat/admin/"]').should('not.exist');

            cy.get('a:contains("Manage")').should('not.exist');
        });
    });

    describe('As admin user', function() {
        it('should display the Admin menu', function() {
            cy.visit('/login');

            cy.get('#id_login').type('einstein');
            cy.get('#id_password').type('einstein{enter}');

            cy.get('a.dropdown-toggle:contains("Admin")')
                .should('be.visible')
                .click();

            cy.get('a[href*="/librecat/admin/"]')
                .should('be.visible')
                .should('have.length', 3);

            cy.get('a:contains("Manage")')
                .should('be.visible')
                .should('have.length', 3);
        });
    });
});
