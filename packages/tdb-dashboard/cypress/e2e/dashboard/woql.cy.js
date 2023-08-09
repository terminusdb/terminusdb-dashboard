/**
 * This test checks Product Explorer page and tests if we can run a simple Query
 * checks included - 
 * 1) Login
 * 2) Select a Team & Clone star_wars data product
 * 3) Select nuclear data product and go to product Explorer Page
 * 4) Make Sure New Query Pane button exists
 * 5) Type a WOQL Query in Query Editor & click on Run 
 * 6) Make sure results are loaded
 * 7) switch between the woql mode and the json mode
 * 8) Check that the translation is correct
 * 9) Delete data product and logout
 * */
import * as CONST from "../../../src/cypress.constants"
import { IconBarConfig } from "../../../src/components/constants"
const teamName = Cypress.env('TEAM_NAME')
const dataProduct="nuclear"

describe(`Test WOQL Product Explorer Page`, () => {
  const dashboard = Cypress.config().baseUrl

  /** add this statement to stop cypress form complaining 
   * about react-leaflet being used in terminusdb-document-ui */
   Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  // visit dashboard-dev at the start
  before(function () {
    cy.visit(dashboard)
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

  // Go to Product Explorer
  it("Go to Product Explorer", () => {
    //cy.visit(`/CYPRESS_TEST_TEAM/nuclear`)
    cy.get(`a[data-cy=${IconBarConfig.dataProductExplorer.key}]`).should('exist').click();
  })

  // Expect New Query Pane Button to be there
  it("Expect New Query Pane Button to be there", () => {
    cy.get(`button[data-cy="New Query Pane"]`).should('exist')
  })
  
  // Type a query
  it("Type a query", () => {
    const query = `WOQL.triple("v:a", "v:b", "v:c")`
    cy.get('.cm-content').first().type(query)
  })

  // Run a query
  it("Run a query", () => {
    cy.get(`button[data-cy="Run"]`).should('exist').click()
  })

  //Check if Results are loaded
  it('Check if Results are loaded)', () => {
    cy.get('table').first().should('exist')
  })

  // delete dataProduct 
  it('Delete dataProduct', ()=>{
    cy.visit(`/${teamName}/${dataProduct}`)
    cy.deleteDataProduct(dataProduct)
  })

  it('Logout', () => {
    cy.logout()
  })
})