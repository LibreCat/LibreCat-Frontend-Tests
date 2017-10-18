describe('The BibTeX import feature', function() {
    let bibTeX = `@article{small,
author = {Freely, I.P.},
title = {A small paper},
journal = {The journal of small papers},
year = 1997,
volume = {-1},
note = {to appear},
}

@article{big,
author = {Jass, Hugh},
title = {A big paper},
journal = {The journal of big papers},
year = 7991,
volume = {MCMXCVII},
}`;

    it('should correctly import BibTeX', function() {
        cy.login();

        cy.visit('/librecat');

        cy.contains('.btn', 'Add new Publication').click();

        cy.get('form[action$="/librecat/record/import"]')
            .within(function() {
                cy.get('textarea')
                    .type(bibTeX.replace(/\{/g, '{{}'), {delay: 1}); // Escape start brackets

                cy.contains('.btn', 'Import').click();
            });

        cy.contains('h2', 'Imported 2 record(s) from bibtex')
            .should('be.visible')
            .next('ul').as('list');

        cy.get('@list')
            .find('li')
            .should('have.length', 2);

        cy.get('@list')
            .prop('innerText')
            .should('contain', 'A small paper')
            .should('contain', 'A big paper');
    });
});
