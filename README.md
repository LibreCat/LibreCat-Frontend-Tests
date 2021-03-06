# LibreCat-Frontend-Tests

Cypress frontend tests for LibreCat

## Installation

In order to run the tests locally:

* Make sure LibreCat is running at http://localhost:5001
* Clone this repository: `git clone git@github.com:LibreCat/LibreCat-Frontend-Tests.git`
* `cd LibreCat-Frontend-Tests`
* Execute [`yarn`](https://yarnpkg.com/)

#### Translations

The tests need translation files from LibreCat. By default the test framework expects 2 files: `en.json` and `de.json`.

You can export these from LibreCat as follows (these will include any translations added via layers):

```
$ cd {LibreCat root}
$ bin/librecat config locale.en > {LibreCat-Frontend-Tests root}/l10n/en.json
$ bin/librecat config locale.de > {LibreCat-Frontend-Tests root}/l10n/de.json
```

Please note that files in the `l10n` folder should never be committed and that you may need to export them again
on a regular basis.

If for some reason you want to test any additional locales or use custom translations, you can add files to the `l10n`
folder, and add a `cypress.env.json` file (see `cypress.env.json.example`) which overwrites the default environment
variable `locales` defined in `cypress.json`, like so:

```
{
    "locales": {
        "en": ["en.json", "en.custom.json"],
        "de": ["de.json", "de.custom.json"]
    }
}
```

Please note that this file should never be committed to git. Also note that the order of files is important here,
as later files may overwrite translations in earlier files.

## Usage

### Headless test excecution (CLI)

```
$ yarn test
```

or

```
$ yarn cypress run
```

### Test execution in Cypress GUI

```
$ yarn cypress open
```
