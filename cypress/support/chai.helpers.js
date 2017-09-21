chai.util.addProperty(chai.Assertion.prototype, 'readonly', function() {
    this.assert(
        this._obj[0].readOnly
        , 'expected #{this} to be read-only'
        , 'expected #{this} to not be read-only'
    );
});

chai.Assertion.addMethod('startWith', function(substring) {
    this.assert(
        Cypress._.startsWith(this._obj, substring)
        , 'expected #{this} to start with #{exp}'
        , 'expected #{this} to not start with #{exp}'
        , substring
    );
});

chai.Assertion.addMethod('endWith', function(substring) {
    this.assert(
        Cypress._.endsWith(this._obj, substring)
        , 'expected #{this} to end with #{exp}'
        , 'expected #{this} to not end with #{exp}'
        , substring
    );
});
