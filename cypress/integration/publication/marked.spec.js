describe('The mark/unmark publication feature', function() {
    it('should be possible to mark and unmark publications', function() {
        let title1 = '\'Good As Gone\' Doesn\'t Quite Get To Greatness';
        let title2 = 'Bibliography of pragmatics online: 13th release, updated and expanded';

        cy.visit('/publication?sort=title.asc');

        cy.get('.row .citation-block-div a').as('titles')
            .first()
            .should('have.text', title1)
            .click();

        cy.get('.label.total-marked').as('marked')
            .should('have.text', '0');

        cy.contains('.nav a', ' Mark/Unmark publication').as('mark')
            .click();

        cy.get('.label.total-marked').as('marked')
            .should('have.text', '1');

        cy.go('back');

        cy.get('@titles')
            .eq(1)
            .should('have.text', title2)
            .click();

        cy.get('.label.total-marked').as('marked')
            .should('have.text', '1');

        cy.contains('.nav a', ' Mark/Unmark publication').as('mark')
            .click();

        cy.get('.label.total-marked').as('marked')
            .should('have.text', '2')
            .click();

        cy.get('main .row:nth-child(2) ul.nav li.active a')
            .should('have.text', '2 Marked Publication(s)');

        cy.get('.markedme')
            .should('have.length', 2);

        cy.get('.markedme:nth-of-type(1) .citation-block-div a')
            .should('have.text', title1);

        cy.get('.markedme:nth-of-type(2) .citation-block-div a')
            .should('have.text', title2);

        cy.get('.markedme')
            .last()
            .trigger('mousedown', {which: 1})
            .trigger('mousemove', {pageX: 579, pageY: 283})
            .trigger('mouseup');

        cy.reload();

        cy.get('.markedme:nth-of-type(1) .citation-block-div a')
            .should('have.text', title2);

        cy.get('.markedme:nth-of-type(2) .citation-block-div a')
            .should('have.text', title1);

        cy.contains('#export_facet a', 'BibTeX')
            .prop('href')
            .then(cy.request)
            .then(function(response) {
                expect(response.headers['content-disposition']).to.match(/^attachment; filename=/);
                expect(response.headers['content-type']).to.eq('text/x-bibtex; charset=utf-8');
            });

        cy.contains('.mark_all', 'Unmark all')
            .click();

        cy.get('.mark_all')
            .should('not.exist');

        cy.get('.markedme')
            .should('not.exist');

        cy.contains('You don\'t have any publications \'marked\' yet.')
            .should('be.visible');
    });

    it('should display the correct count when navigating backwards to the list page', function() {
        cy.visit('/publication');

        cy.get('.total-marked').as('total')
            .should('have.text', '0');

        cy.get('.citation-block-div a')
            .random()
            .click();

        cy.get('a.mark').as('mark').click(); // Mark

        cy.get('@total').should('have.text', '1');

        cy.go('back');

        cy.get('@total').should('have.text', '1');
    });

    it('should display the correct count when navigating backwards to the detail page', function() {
        cy.visit('/publication/2737390');

        cy.get('.total-marked').as('total')
            .should('have.text', '0');

        cy.get('a.mark').as('mark').click(); // Mark

        cy.get('@total')
            .should('have.text', '1')
            .click(); // Navigates to /marked route

        cy.get('@mark').click(); // Unmark

        cy.go('back');

        cy.get('@total').should('have.text', '0');
    });
});
