// Test for https://github.com/LibreCat/LibreCat/issues/326

describe('Issue #326: Export not in right order', function() {
    it('should export unsorted publications in the order they were marked', function() {
        cy.visit('/publication');

        cy.get('.tab-pane .citation-block-div a')
            .map((pub) => Cypress._.pick(pub, 'href', 'text'))
            .then(Cypress._.reverse) // Make sure the order is different, _.shuffle doesn't guarantee that
            .then((pubs) => Cypress._.take(pubs, 4))
            .then(function(publications) {
                let titles = new RegExp(
                    Cypress._(publications)
                        .map('text')
                        .map(Cypress._.escapeRegExp)
                        .value()
                        .join('[\\s\\S]*')
                );

                // Mark the publications in order
                cy.wrap(publications, {log: false})
                    .each((pub) => {
                        cy.visit(pub.href);

                        cy.get('a.mark').click();
                    });

                // Make sure they are in the right marked order
                cy.visit('/marked');

                cy.get('.nav li.active').should('have.text', '4 Marked Publication(s)');

                cy.get('.citation-block-div a')
                    .map('innerText')
                    .should('eql', publications.map((pub) => pub.text));

                // Make sure they are exported in the right order
                cy.request('/marked.bibtex')
                    .its('body')
                    .should('match', titles);

                cy.request('/marked.ris')
                    .its('body')
                    .should('match', titles);

                cy.request('/marked.json')
                    .its('body')
                    .then(JSON.stringify)
                    .should('match', titles);

                cy.request('/marked.yaml')
                    .its('body')
                    .should('match', titles);
            });
    });
});
