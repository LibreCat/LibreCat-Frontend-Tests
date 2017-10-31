// Test for https://github.com/LibreCat/LibreCat/issues/324

describe('Issue #324: BibTeX import', function() {
    let bibTeX = `@article{small,
author = {Freely, I.P.},
title = {A small paper},
journal = {The journal of small papers},
year = 1997,
volume = {-1},
note = {to appear},
}`;

    it('should be able to edit the record after import', function() {
        cy.login();

        cy.visit('/librecat/record/new');

        cy.get('form[action$="/librecat/record/import"]')
            .within(function() {
                cy.get('textarea')
                    .type(bibTeX.replace(/\{/g, '{{}'), {delay: 1}); // Escape start brackets

                cy.contains('.btn', 'Import').click();
            });

        cy.contains('h2', 'Imported 1 record(s) from bibtex')
            .next('ul')
            .contains('li a', 'Edit').as('edit')
            .prop('href')
            .should('match', /\/librecat\/record\/edit\/\d+$/)

        cy.wait(1000);
        cy.get('@edit').click();

        cy.location('href')
            .should('match', /\/librecat\/record\/edit\/\d+$/);
    });
});
