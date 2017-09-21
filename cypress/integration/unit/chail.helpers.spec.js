describe('The additional chai helpers', function() {
    describe('The readonly property', function() {
        let $input;

        beforeEach(function() {
            $input = Cypress.$('<input />', {readonly: true});
        });

        describe('In regular mode', function() {
            it('should not throw when a field is readonly', function() {
                expect($input).to.be.readonly;
            });

            it('should throw when a field is not readonly', function(done) {
                $input.prop('readonly', false);

                cy.on('fail', function(error) {
                    // The assertions
                    expect(error.constructor.name).to.eq('AssertionError');
                    expect(error.message).to.eq('expected \'<input>\' to be read-only');

                    done();
                });

                // The test
                expect($input).to.be.readonly;
            });
        });

        describe('In negative mode', function() {
            it('should not throw when a field is not readonly', function() {
                $input.prop('readonly', false);

                expect($input).not.to.be.readonly;
            });

            it('should throw when a field is not readonly', function(done) {
                cy.on('fail', function(error) {
                    // The assertions
                    expect(error.constructor.name).to.eq('AssertionError');
                    expect(error.message).to.eq('expected \'<input>\' to not be read-only');

                    done();
                });

                // The test
                expect($input).not.to.be.readonly;
            });
        });
    });

    describe('The startWith method', function() {
        describe('In regular mode', function() {
            it('should not throw when string starts with substring', function() {
                expect('Abc123').to.startWith('Abc');
            });

            it('should throw when string does not start with substring', function(done) {
                cy.on('fail', function(error) {
                    // The assertions
                    expect(error.constructor.name).to.eq('AssertionError');
                    expect(error.message).to.eq('expected \'Abc123\' to start with \'abc\'');

                    done();
                });

                // The test
                expect('Abc123').to.startWith('abc');
            });
        });

        describe('In negative mode', function() {
            it('should not throw when string does not start with substring', function() {
                expect('Abc123').not.to.startWith('abc');
            });

            it('should throw when string starts with substring', function(done) {
                cy.on('fail', function(error) {
                    // The assertions
                    expect(error.constructor.name).to.eq('AssertionError');
                    expect(error.message).to.eq('expected \'Abc123\' to not start with \'Abc\'');

                    done();
                });

                // The test
                expect('Abc123').not.to.startWith('Abc');
            });
        });
    });

    describe('The endWith method', function() {
        describe('In regular mode', function() {
            it('should not throw when string ends with substring', function() {
                expect('123abC').to.endWith('abC');
            });

            it('should throw when string does not end with substring', function(done) {
                cy.on('fail', function(error) {
                    // The assertions
                    expect(error.constructor.name).to.eq('AssertionError');
                    expect(error.message).to.eq('expected \'123abC\' to end with \'abc\'');

                    done();
                });

                // The test
                expect('123abC').to.endWith('abc');
            });
        });

        describe('In negative mode', function() {
            it('should not throw when string does not end with substring', function() {
                expect('123abC').not.to.endWith('abc');
            });

            it('should throw when string ends with substring', function(done) {
                cy.on('fail', function(error) {
                    // The assertions
                    expect(error.constructor.name).to.eq('AssertionError');
                    expect(error.message).to.eq('expected \'123abC\' to not end with \'abC\'');

                    done();
                });

                // The test
                expect('123abC').not.to.endWith('abC');
            });
        });
    });
});
