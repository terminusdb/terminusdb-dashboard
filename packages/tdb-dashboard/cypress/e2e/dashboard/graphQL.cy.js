import * as CONST from "../../../src/cypress.constants"
import { IconBarConfig } from "../../../src/components/constants"
import { EXAMPLES_PRODUCTS } from "../../../src/routing/constants"
const teamName = Cypress.env('TEAM_NAME')
const dataProduct="nuclear"
const branchName=`branch__${Date.now()}`
const crName=`CR__${branchName}`
const email = Cypress.env('COLLABORATOR_USER')
let graphQLFilterData={}, graphQLAllCountriesData={}, graphQLReverseCountriesData={}

describe(`Test GraphQL interface`, () => {
  const dashboard = Cypress.config().baseUrl

  /** add this statement to stop cypress form complaining 
   * about react-leaflet being used in terminusdb-document-ui */
   Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  // visit dashboard-dev at the start
  before(function () {
    cy.visit(dashboard)
    cy.fixture('graphQLFilter.json').then(function (data) {
      graphQLFilterData = data;
    })
    cy.fixture('graphQLAllCountries.json').then(function (data) {
      graphQLAllCountriesData = data;
    })
    cy.fixture('graphQLReverseCountries.json').then(function (data) {
      graphQLReverseCountriesData = data;
    })
  });

  // login to terminusdb 
  it('Check to see that you can login with an exists user', () => {
    cy.userLogin()
  })

  // select Terminusdb_demo team 
  it('Select Team', () => {
    cy.selectTeam(teamName)
  })

  //Clone Nuclear team
  it('Clone Nuclear team', () => {
    cy.intercept(`/${teamName}/${dataProduct}`).as('cloaning')
    cy.get(`button[data-cy=${CONST.CLONE_BUTTON}_${dataProduct}]`).should('exist').click();
    cy.wait('@cloaning')
  })

  // Go to GraphQL Explorer
  it("Go to GraphQL Explorer", () => {
    //cy.visit(`/CYPRESS_TEST_TEAM/nuclear`)
    cy.get(`a[data-cy=${IconBarConfig.graphiql.key}]`).should('exist').click();
  })

  // Check is Graph QL interface is loaded correctly
  it('Check is Graph QL interface is loaded correctly', () => {
    cy.get(`div[data-testid="graphiql-container"]`).should('exist');
  })


  // Check all available countries with a query
  it('Check all available countries with a query', () => {
    //clear code mirror
    cy.clearCodeMirror()
    const query = `query {
      Country {
        name
      }
    }
    `
    // type query
    cy.editCodeMirror(query)
    // run query 
    cy.get('.graphiql-execute-button').should('exist').click()
    cy.wait(1000)
  })

  // Expect all countries data to be equal to Sample JSON
  it('Expect all countries data to be equal to Sample JSON', () => {
    cy.expectCodeMirrorToHave(graphQLAllCountriesData)
  })


  // Check if the countries can be sorted in reverse order
  it('Check if the countries can be sorted in reverse order', () => {
    cy.clearCodeMirror()
    const query = `query {
      Country(orderBy: {name: DESC}) {
        name
      }
    }
    `
    // type query
    cy.editCodeMirror(query)

    // run query 
    cy.get('.graphiql-execute-button').should('exist').click()
    cy.wait(1000)
  })

  // Expect all sorted countries in reverse order data to be equal to Sample JSON
  it('Expect all sorted countries in reverse order data to be equal to Sample JSON', () => {
    cy.expectCodeMirrorToHave(graphQLReverseCountriesData)
  })

  // Check if filtering works
  it('Check if filtering works', () => {
    cy.clearCodeMirror()
    const query = `query {
      NuclearPowerPlant(filter: {country:{name: {eq: "India"}}}) {
        country {
          name
        }
        name
      }
    }
    
    `
    // type query
    cy.editCodeMirror(query)
    // run query 
    cy.get('.graphiql-execute-button').should('exist').click()
    cy.wait(1000)


  })

  // Expect the filtered data to be equal to Sample JSON
  it('Expect the filtered data to be equal to Sample JSON', () => {
    cy.expectCodeMirrorToHave(graphQLFilterData)
  })

  // Check if autocomplete works 
  it('Check if auto complete works', () => {
    cy.clearCodeMirror()
    cy.get('.CodeMirror').first().type(`query {
      Nucl{ctrl+c}{enter}
   `)
   cy.wait(1000)
  })

  // Check if documentation is available
  it('Check if documentation is available', () => {
    cy.get(`button[aria-label="Show Documentation Explorer"]`).should('exist').click();
    cy.get('.graphiql-doc-explorer').should('exist')
  })

})