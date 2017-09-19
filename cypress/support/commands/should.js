import {default as he} from 'he';

Cypress.Commands.overwrite('should', function(originalFn, subject, arg1, arg2, arg3) {
    // Strings from l10n json files should be HTML decoded first
    if (Cypress._.isString(arg3)) {
        arg3 = he.decode(arg3);
    } else if (Cypress._.isString(arg2)) {
        arg2 = he.decode(arg2);
    }

    let args = [subject, arg1, arg2, arg3].slice(0, arguments.length - 1);

    return originalFn.apply(this, args);
});
