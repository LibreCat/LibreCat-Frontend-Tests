const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '511wso',
  video: false,
  defaultCommandTimeout: 2000,
  viewportWidth: 1200,
  chromeWebSecurity: false,
  env: {
    locales: {
      en: 'en.json',
      de: 'de.json',
    },
  },
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:5001',
    experimentalSessionAndOrigin: true,
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
