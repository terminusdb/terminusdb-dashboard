module.exports = {
  env:{"MAILSLURP_API_KEY": "134d181528f7c1d7d730894948b5ea9faa117c4b8a580e1cbd805a93ce27a9e7",
  "COLLABORATOR_USER":"collaborator@gmail.com",
  "COLLABORATOR_PASS":"collaborator@gmail.com",
  "OWNER_PASS": "GEHEHUWBZBSBVD&#*JSHHDHBSHBNJ",
  "NEW_PASS" : "6789UWBZBSBVD&#*JSHHDHBSHBNJ"},
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
