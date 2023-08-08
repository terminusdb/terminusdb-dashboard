/**
 * This test checks the Update of data product details
 * checks included - 
 * 1) Login
 * 2) Select a Team
 * 3) Create a New Data product
 * 4) Update Data Product details
 * 5) Delete Data Product
 * 6) Logout 
 */
import * as CONST from "../../../src/cypress.constants"
const dataProduct = `test__${Date.now()}`
// new time stamp 
const update_dataProduct = `test__${Date.now()}`
const teamName = Cypress.env('TEAM_NAME')

describe(`Visit dashboard team ${teamName}`, () => {
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

  // select a team 
  it('Select Team', () => {
    cy.selectTeam(teamName)
  })

  // Create a new data product
  it('Create a new dataProduct', ()=>{
    cy.newDataProduct(teamName, dataProduct)
  })

  // Update dataProduct details
  it('Update dataProduct details', () => {
    cy.get(`button[data-cy=${CONST.UPDATE_DATA_PRODUCT_BUTTON}]`).click()
    cy.get('.modal-dialog').should('be.visible')
    cy.get(`input[data-cy=${CONST.NEW_DATA_PRODUCT_NAME}]`).clear()
    cy.get(`input[data-cy=${CONST.NEW_DATA_PRODUCT_NAME}]`).type(update_dataProduct)
    cy.get(`textarea[data-cy=${CONST.NEW_DATA_PRODUCT_DESC}]`).type(update_dataProduct)
    cy.get(`button[data-cy=${CONST.CREATE_NEW_DATA_PRODUCT_BUTTON_ID}]`).click()
  })

  // delete dataProduct 
  it('Delete dataProduct', ()=>{
    cy.deleteDataProduct(dataProduct)
  })

  it('Logout', () => {
    cy.logout()
  })

  
})