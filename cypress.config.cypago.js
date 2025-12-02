const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/cypago/*.cy.js', // Only run Cypago tests
    baseUrl: 'https://cypago.com',
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 10000,
  },
  reporter: 'mocha-junit-reporter',
  reporterOptions: {
    mochaFile: 'results/cypago-[hash].xml',
    toConsole: true,
  },
});