describe('The Add New Publication page', function() {
    let modes = ['book', 'book_editor', 'book_chapter', 'review', 'conference_abstract', 'conference_editor',
        'conference', 'dissertation', 'encyclopedia_article', 'journal_article', 'journal_editor', 'newspaper_article',
        'patent', 'preprint', 'report', 'translation', 'translation_chapter', 'working_paper', 'research_data'];

    beforeEach(function() {
        cy.login();
    });

    describe('The start form', function() {
        it(`should display ${modes.length} modes`, function() {
            cy.visit('/librecat/record/new');

            cy.get('a[href*="/librecat/record/new?type="]')
                .should('have.length', 20)
                .then(($els) => {
                    return Cypress._.chain($els)
                        .map('href').map((i) => {
                            return Cypress._.replace(i, /^.+new\?type=(.+)$/, '$1');
                        })
                        .value();
                })
                .should('have.same.members', modes);
        });
    });

    describe('The edit form', function() {
        modes.forEach((mode) => {
            describe(`In ${mode} mode`, function() {
                it('should load succesfully', function() {
                    cy.visit(`/librecat/record/new?type=${mode}`);
                });
            });
        });
    });
});
