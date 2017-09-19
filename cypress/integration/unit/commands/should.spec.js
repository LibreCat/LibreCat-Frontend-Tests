// We have overwritten the should command so HTML entities from translation files can be decoded first.
// These are some unit tests to confirm that behavior.

describe('The should command', function() {
    it('should HTML decode any characters provided as second argument', function() {
        cy.wrap('<html>')
            .should('eq', '&lt;html&gt;');

        cy.wrap('It\'s')
            .should('eq', 'It&apos;s');
    });

    it('should HTML decode any characters provided as third argument', function() {
        let obj = {
            html: '<html>',
            its: 'It\'s',
        };

        cy.wrap(obj)
            .should('have.property', 'html', '&lt;html&gt;');

        cy.wrap(obj)
            .should('have.property', 'its', 'It&apos;s');
    });

    it('should not pass on undefined as third parameter to the original function', function() {
        let obj = {
            html: '<html>',
            its: 'It\'s',
        };

        cy.wrap(obj)
            .should('have.property', 'html')
            .should('eq', '&lt;html&gt;');


        cy.wrap(obj)
            .should('have.property', 'its')
            .should('eq', 'It&apos;s');
    });
});
