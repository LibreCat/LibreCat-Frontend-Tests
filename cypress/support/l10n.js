(() => {
    let locales = Cypress.env('locales');
    let translations;

    before(function() {
        if (locales && Object.keys(locales).length) {
            translations = {};

            Object.keys(locales).forEach((locale) => {
                let files = locales[locale];
                if (!Cypress._.isArray(files)) {
                    files = [files];
                }

                translations[locale] = {};

                files.forEach((file) => {
                    cy.readFile(`l10n/${file}`, {log: false})
                        .then((parsed) => {
                            translations[locale] = Cypress._.merge(translations[locale], parsed);

                            console.log('Loaded l10n file: ' + file);
                        });
                });
            });
        } else {
            translations = null;
        }
    });

    global.l10n = (fn) => {
        if (locales && Object.keys(locales).length) {
            Object.keys(locales).forEach((locale) => {
                describe(`In ${locale.toUpperCase()} locale`, function() {
                    beforeEach(function() {
                        cy.visit('/set_language?lang=' + locale);

                        this.t = translations[locale];
                    });

                    fn();
                });
            });
        } else {
            throw new Error('You have not defined any environment locales. Usage of the l10n function is only ' +
            'allowed when one or more locales are defined in your Cypress environment.');
        }
    };
})();
