// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './common/helpers/chai';
import './common/commands/map';
import './common/commands/prop';

import './commands/login';
import './commands/should';
import './commands/random';
import './commands/delete-record';

import './l10n';
