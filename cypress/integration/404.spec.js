describe('A non existing page', function() {
    it('should return a 404 HTTP status', function() {
        cy.request(
            {
                url: '/non-existing-page',
                failOnStatusCode: false,
            })
            .then(function(response) {
                expect(response.status).to.eq(404);
                expect(response.statusText).to.eq('Not Found');
                expect(response.body).to.contain('Page not found (404)');
            });
    });
});
