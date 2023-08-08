/**
 * This test checks the Change Request Inactive Mode 
 * checks included - 
 * 1) Login
 * 2) Select a Team & Clone star_wars data product
 * 3) Select star_wars data product and turn Change Request Mode off 
 * 4) Go to Document Explorer, Click on Create new Film
 * 5) Make sure CR modal does not appear & create a new film from starWarsFilm.json (see fixtures)
 * 6) Return to Data Product Home page & switch on Change Request Mode
 * 7) Go to Team select page and choose star_wars again - make sure Change Request Mode is switched on itself
 * 8) Go to Document Explorer and click on create new Film
 * 9) Make sure CR modal appears
 * 8) Go to Data Product Home page, delete data product & logout
 */
import * as CONST from "../../../src/cypress.constants"
import { IconBarConfig } from "../../../src/components/constants"
const teamName = Cypress.env('TEAM_NAME')
const dataProduct="star_wars"


describe(`Test to check Change Request Mode Inactive`, () => {
  const dashboard = Cypress.config().baseUrl
  let filmData = {}

  /** add this statement to stop cypress form complaining 
   * about react-leaflet being used in terminusdb-document-ui */
   Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  // visit dashboard-dev at the start
  before(function () {
    cy.visit(dashboard)
    cy.fixture('starWarsFilm.json').then(function (data) {
      filmData = data;
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

  //Clone Starwars team
  it('Clone Starwars team', () => {
    cy.intercept(`/${teamName}/${dataProduct}`).as('cloaning')
    cy.get(`button[data-cy=${CONST.CLONE_BUTTON}_${dataProduct}]`).should('exist').click();
    cy.wait('@cloaning')
  })

  // set CR Inactive
  it("Set Change Request Inactive", () => {
    cy.get(`label[data-cy=${CONST.CHANGE_REQUEST_MODE_INACTIVE}]`).should('exist').click();
  })

  // Go to Document Explorer
  it("Go to Document Explorer", () => {
    cy.get(`a[data-cy=${IconBarConfig.documentExplorer.key}]`).should('exist').click();
  })

  // Click on add a new Film 
  it("Add new Film", () => {
    cy.get(`button[data-cy=${CONST.NEW_DOCUMENT_BUTTON_ID}_Film]`).should('exist').click();
    cy.get(2000)
    // the CR modal should not pop up on click of create document
    cy.get('.modal-dialog').should('not.exist') 
    // check if frame viewer loaded
    cy.get(`div[data-cy=${CONST.FRAME_VIEWER}]`).should('exist');
    
    // add opening_crawl as markdown
    cy.get('.w-md-editor-text-input').focus().type(filmData.opening_crawl)
    // add director
    cy.get('textarea[data-cy="root_director"]').focus().type(filmData.director)
    // add producer
    cy.get('textarea[data-cy="root_producer"]').focus().type(filmData.producer)
    // add episode_id
    cy.get('input[data-cy="root_episode_id"]').focus().type(filmData.episode_id)
    
    // click on submit button to create document
    cy.get('.btn').contains('Submit').should('exist').click();
    cy.get(2000)
  })

  // Go to DataProduct Home Page 
  it("Go to DataProduct Home Page", () => {
    cy.visit(`/${teamName}/${dataProduct}`)
  })

  // Activate Change Request
  it("Activate Change Request", () => {
    cy.get(`label[data-cy=${CONST.CHANGE_REQUEST_MODE_ACTIVE}]`).should('exist').click();
  })

  // Activate Change Request
  it("Activate Change Request", () => {
    cy.get(`label[data-cy=${CONST.CHANGE_REQUEST_MODE_ACTIVE}]`).should('exist').click();
  })

  // Return to Team selection Page
  it("Return to Team selection Page & Reselect data product", () => {
    cy.visit(`/`)
    cy.selectTeam(teamName)
    // select starwars data product
    cy.visit(`/${teamName}/${dataProduct}`)
  })

  // Check if Change Request is Active
  it("Check if Change Request is Active", () => {
    cy.get(`label[data-cy=${CONST.CHANGE_REQUEST_MODE_ACTIVE}]`)
      .parent().find('input').should('be.checked')
  })

  // Go to Document Explorer
  it("Go to Document Explorer", () => {
    cy.get(`a[data-cy=${IconBarConfig.documentExplorer.key}]`).should('exist').click();
  })

  // Click on add a new Film 
  it("Add new Film", () => {
    cy.get(`button[data-cy=${CONST.NEW_DOCUMENT_BUTTON_ID}_Film]`).should('exist').click();
    cy.get(2000)
    // the CR modal should pop up on click of create document
    cy.get('.modal-dialog').should('exist') 
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