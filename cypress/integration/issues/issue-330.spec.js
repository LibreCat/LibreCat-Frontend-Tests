// Test for https://github.com/LibreCat/LibreCat/issues/330

describe('Issue #330: Redundant AJAX/XHR requests', function() {
    beforeEach(function() {
        cy.server();
    });

    it('should only load the marked total once when loading a publication detail page', function() {
        let countRequests = 0;

        cy.route({
            url: '/marked_total',
            onRequest() {
                countRequests++;
            },
            response: {},
        });

        cy.visit('/publication');

        cy.get('.tab-pane .citation-block-div a')
            .first()
            .click()
            .then(function() {
                expect(countRequests).to.eq(1);
            });
    });

    it('should only fire ajax request once when marking publication', function() {
        let countRequests = 0;

        cy.route({
            url: '/mark/*',
            method: 'POST',
            onRequest() {
                countRequests++;
            },
            response: {},
        });

        cy.visit('/publication');

        cy.get('.tab-pane .citation-block-div a')
            .first()
            .click();

        cy.get('a.mark')
            .click()
            .then(() => expect(countRequests).to.eq(1));
    });

    it('should only fire ajax request once when unmarking publication', function() {
        let countRequests = 0;

        cy.route({
            url: '/mark/*',
            method: 'POST',
            response: {},
        });

        cy.route({
            url: '/mark/*?x-tunneled-method=DELETE',
            method: 'POST',
            onRequest() {
                countRequests++;
            },
            response: {},
        });

        cy.visit('/publication');

        cy.get('.tab-pane .citation-block-div a')
            .first()
            .click();

        cy.get('a.mark').click();

        cy.get('a.mark')
            .click()
            .then(() => expect(countRequests).to.eq(1));
    });
});
