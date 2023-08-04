import * as CONST from "../../../src/cypress.constants"
import { IconBarConfig } from "../../../src/components/constants"
const teamName = Cypress.env('TEAM_NAME')
const dataProduct="star_wars"
const crName=`CR_${Date.now()}`
let branchID = ""


describe(`Test Document History Widget`, () => {
  const dashboard = Cypress.config().baseUrl
  let planetData = {}
  
  /** add this statement to stop cypress form complaining 
   * about react-leaflet being used in terminusdb-document-ui */
   Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  // visit dashboard-dev at the start
  before(function () {
    cy.visit(dashboard)
    cy.fixture('starWarsPlanet.json').then(function (data) {
      planetData = data;
    })
  });

  // login to terminusdb 
  it('Check to see that you can login with an exists user', () => {
    cy.userLogin()
  })

  // select Terminusdb_demo team 
  /*it('Select Team', () => {
    cy.selectTeam(teamName)
  })

  //Clone Starwars team
  it('Clone Starwars team', () => {
    cy.intercept(`/${teamName}/${dataProduct}`).as('cloaning')
    cy.get(`button[data-cy=${CONST.CLONE_BUTTON}_${dataProduct}]`).should('exist').click();
    cy.wait('@cloaning')
  })*/

  // Go to Document Explorer and load a Planet
  it("Go to Document Explorer and load a Planet", () => {
    cy.visit(`/CYPRESS_TEST_TEAM/star_wars`)
    cy.get(`a[data-cy=${IconBarConfig.documentExplorer.key}]`).should('exist').click();
    cy.visit(`${teamName}/${dataProduct}/documents/Planet/dGVybWludXNkYjovLy9zdGFyLXdhcnMvUGxhbmV0LzE=`)
  })

  // Click on History Button
  it("Click on History Button", () => {
    cy.get(`button[data-cy=history__button]`).should('exist').click();
    // history card should be available in document on click 
    cy.get(`.tdb__frame__display`).should('exist')
    // close history info card
    cy.get(`button[data-cy=close__info__button]`).should('exist').click();
  })

  // Edit document
  it("Edit document", () => {
    cy.get(`button[data-cy=edit__document]`).should('exist').click();
  })

  // Create a CR 
  it("Create a CR ", () => {
    let url = `/api/changes/${teamName}/${dataProduct}`    
    cy.intercept({
      method: 'POST',
      path: url,
    }).as('getBranchName')
    cy.createCR(crName) 
     // create CR 
    cy.get(`button[data-cy=${CONST.CREATE_CHANGE_REQUEST_BUTTON}]`).should('exist').click();
    cy.get(2000)
    cy.wait('@getBranchName').then((interception) => {
      assert.isNotNull(interception.response.body, '1st API call has data')
      //console.log("interception.response.body", interception.response.body)
      branchID = interception.response.body.branchName
    })
  })

  // Edit Planet's orbital_period first time
  it("Edit Planet's orbital_period first time", () => {
   // check if frame viewer loaded
   cy.get(`div[data-cy=${CONST.FRAME_VIEWER}]`).should('exist');
   cy.get(2000)
   // edit orbital_period
   cy.get('input[data-cy="root_orbital_period"]').focus().type(planetData.orbital_period)
   // click on submit button to submit changes
   cy.get('.btn').contains('Submit').should('exist').click(); 
  })

  // Edit Planet's orbital_period second time
  it("Edit Planet's orbital_period second time", () => {
    cy.visit(`${teamName}/${dataProduct}/documents/Planet/dGVybWludXNkYjovLy9zdGFyLXdhcnMvUGxhbmV0LzE=`)
    cy.get(`button[data-cy=edit__document]`).should('exist').click();
    // edit orbital_period, concatinate 1
    let value = planetData.orbital_period + 1
    cy.get('input[data-cy="root_orbital_period"]').focus().type(value)
    // click on submit button to submit changes
    cy.get('.btn').contains('Submit').should('exist').click(); 
    cy.wait(1000)
  })

  // Edit Planet's orbital_period third time
  it("Edit Planet's orbital_period third time", () => {
    cy.visit(`${teamName}/${dataProduct}/documents/Planet/dGVybWludXNkYjovLy9zdGFyLXdhcnMvUGxhbmV0LzE=`)
    cy.get(`button[data-cy=edit__document]`).should('exist').click();
    // edit orbital_period, concatinate 1
    let value = planetData.orbital_period + 1
    cy.get('input[data-cy="root_orbital_period"]').focus().type(value)
    // click on submit button to submit changes
    cy.get('.btn').contains('Submit').should('exist').click(); 
    cy.wait(1000)
  })

  
  /*it("Intercept History calls", () => {
    let url = `https://cloud-dev.terminusdb.com/CYPRESS_TEST_TEAM/api/history/CYPRESS_TEST_TEAM/star_wars/local/branch/02cd98cd-a236-490d-8e13-25fd4a8623af?start=0&count=6&id=terminusdb:///star-wars/Planet/1`
    cy.intercept(url).as('getHistory')
    cy.wait('@getHistory').then((interception) => {
      assert.isNotNull(interception.response.body, '1st API call has data')
    })
  })*/

  // Open History Widget again
  it("Open History Widget again", () => {
    cy.get(`button[data-cy=view__history__button]`).should('exist').click();
    // history card should be available in document on click 
    cy.get(`.tdb__frame__display`).should('exist')
    
  })

  it('Logout', () => {
    cy.logout()
  })

})