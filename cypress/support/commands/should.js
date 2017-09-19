import {default as he} from 'he';

Cypress.Commands.overwrite('should', (originalFn, subject, arg1, arg2, arg3) => {
    // Strings from l10n json files should be HTML decoded first

    if (Cypress._.isString(arg3)) {
        arg3 = he.decode(arg3);
    } else if (Cypress._.isString(arg2)) {
        arg2 = he.decode(arg2);
    }

    return originalFn.call(undefined, subject, arg1, arg2, arg3);
});
