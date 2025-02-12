const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5000',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'tests/e2e/**/*.spec.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 5000,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
