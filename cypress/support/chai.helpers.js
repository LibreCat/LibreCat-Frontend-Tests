chai.util.addProperty(chai.Assertion.prototype, 'readonly', function() {
    this.assert(
        this._obj[0].readOnly
        , 'expected #{this} to be read-only'
        , 'expected #{this} to not be read-only'
    );
});
