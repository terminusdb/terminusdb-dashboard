module.exports = {
  env:{},
  defaultCommandTimeout: 120000,
  responseTimeout: 120000,
  requestTimeout: 120000,
  chromeWebSecurity: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://dashboard-dev.terminusdb.com/',
   

  },
}
