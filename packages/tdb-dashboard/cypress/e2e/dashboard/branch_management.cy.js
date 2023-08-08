import * as CONST from "../../../src/cypress.constants"
import { IconBarConfig } from "../../../src/components/constants"
const teamName = Cypress.env('TEAM_NAME')
const dataProduct="star_wars"
const branchName=`branch__${Date.now()}`
const crName=`CR__${branchName}`
const email = Cypress.env('COLLABORATOR_USER')
let planetData = {}, documentID="", branchID=""

describe(`Test to check Branch Management workflow`, () => {
  const dashboard = Cypress.config().baseUrl

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
  it('Select Team', () => {
    cy.selectTeam(teamName)
  })

  //Clone Starwars team
  it('Clone Starwars team', () => {
    cy.intercept(`/${teamName}/${dataProduct}`).as('cloaning')
    cy.get(`button[data-cy=${CONST.CLONE_BUTTON}_${dataProduct}]`).should('exist').click();
    cy.wait('@cloaning')
  })


  // Create New Branch
  it('Create New Branch', () => {

    cy.visit(`/CYPRESS_TEST_TEAM/star_wars`)

    // Activate Change Request
    cy.get(`label[data-cy=${CONST.CHANGE_REQUEST_MODE_ACTIVE}]`).should('exist').click();
    cy.get(`button[data-cy=${CONST.BRANCH_MANAGEMENT_BUTTON_ID}]`).should('exist').click();
    // create
    cy.get(`button[data-cy=${CONST.NEW_BRANCH_BUTTON_ID}]`).should('exist').click();
    // the Branch modal should pop up 
    cy.get('.modal-dialog').should('exist') 
    // Input branch ID
    cy.get(`input[data-cy=${CONST.BRANCH_ID_INPUT}]`).should('exist').type(branchName);
    // force click here on modal since branch id input change is an onBlur()
    cy.get(`.modal-body`).should('exist').click();
    // create new branch 
    cy.get(`button[data-cy=${CONST.CREATE_BRANCH_BUTTON_ID}]`).should('exist').click();
  })

  it('Check if Branch created', () => {
    // check if data product is set to new branch id
    cy.get(`span[data-cy=${CONST.CURRENT_BRANCH_BADGE}]`).should('have.text', branchName)
  })

  // Go to Document Explorer
  it("Go to Document Explorer", () => {
    cy.get(`a[data-cy=${IconBarConfig.documentExplorer.key}]`).should('exist').click();
  })

  // Create a new CR
  it("Create a new CR", () => { 
    const url = `/api/changes/${teamName}/${dataProduct}`    
    cy.intercept({
      method: 'POST',
      path: url,
    }).as('getBranchName')
    cy.createCR(crName, "Planet")
     // create CR 
    cy.get(`button[data-cy=${CONST.CREATE_CHANGE_REQUEST_BUTTON}]`).should('exist').click();
    cy.get(2000)
    cy.wait('@getBranchName').then((interception) => {
      assert.isNotNull(interception.response.body, 'intercepting create CR API')
      //console.log("interception.response.body", interception.response.body)
      branchID = interception.response.body.branchName
    })
  })

  // Click on add a new Planet 
  it("Add new Planet", () => {
    const url = `/${teamName}/api/document/${teamName}/${dataProduct}/local/branch/${branchID}?author=${email}&message=add%20a%20new%20document`    
    cy.intercept({
      method: 'POST',
      path: url,
    }).as('addDocument')

    // check if frame viewer loaded
    cy.get(`div[data-cy=${CONST.FRAME_VIEWER}]`).should('exist');
    
    // add label as markdown
    cy.get('textarea[data-cy="root_label"]').focus().type(planetData.label)
    // add orbital_period
    cy.get('input[data-cy="root_orbital_period"]').focus().type(planetData.orbital_period)
    // add diameter
    cy.get('input[data-cy="root_diameter"]').focus().type(planetData.diameter)
    // add gravity
    cy.get('textarea[data-cy="root_gravity"]').focus().type(planetData.gravity)
    // add climate
    cy.get('textarea[data-cy="root_climate"]').focus().type(planetData.climate)
    
    // click on submit button to create document
    cy.get('.btn').contains('Submit').should('exist').click(); 
    cy.wait(1000)

    cy.wait('@addDocument').then((interception) => {
      assert.isNotNull(interception.response.body, 'intercepting Add Document API')
      //console.log("interception.response.body", interception.response.body)
      documentID = interception.response.body.branchName
    })

  })

  // Submit CR for Review  
  it("Submit CR for Review", () => {
    cy.visit(`${teamName}/${dataProduct}/change_requests`) 
    cy.get(`button[data-cy=${CONST.CR_READY_FOR_REVIEW}]`).should('exist').click();
    // CR Modal for review should pop up
    cy.get(`.modal-body`).should('exist').click();
    // add CR review message
    cy.get(`textarea[data-cy=${CONST.CHANGE_REQUEST_MESSAGE_FOR_REVIEW}]`).focus().type(`${crName}__REVIEW__MESSAGE`)
    // submit CR 
    cy.get(`button[data-cy=${CONST.CHANGE_REQUEST_SUBMIT_REVIEW}]`).should('exist').click(); 
  })

  // Review CR
  it("Review CR", () => {
    //cy.isCorrectURL(`${teamName}/${dataProduct}/change_requests`)
    cy.get(`button[data-cy=${CONST.CHANGE_REQUEST_SUBMIT_REVIEW_FOR_DIFF}]`).should('exist').click(); 
    cy.wait(1000)
    // Aprove CR
    cy.get(`button[data-cy=Approve]`).should('exist').click();
    //cy.isCorrectURL(`${teamName}/${dataProduct}/change_requests?status=Merged`)
  })

  // Get newly created Planet
  it("Get newly created Planet", () => {
    cy.visit(`${teamName}/${dataProduct}/documents/Planet/${documentID}`)
  })

  // Switch to main branch
  it("Switch to main branch", () => {
    cy.visit(`/${teamName}/${dataProduct}`)
    // click on branches
    cy.get(`button[data-cy=${CONST.BRANCH_MANAGEMENT_BUTTON_ID}]`).should('exist').click();
    // switch to main  
    cy.get(`span[data-cy=${CONST.SWITCH_BRANCH_ID}__main]`).should('exist').click();
    cy.get(`span[data-cy=${CONST.CURRENT_BRANCH_BADGE}]`).should('have.text', "main")
  })

  // Check if newly created Planet exists in main branch - api call should result in 404
  it("Check if newly created Planet exists in main branch", () => {
    cy.visit(`${teamName}/${dataProduct}/documents/Planet/${documentID}`)
    const url = `/${teamName}/api/document/${teamName}/${dataProduct}/local/branch/main?id=${documentID}`    
    cy.intercept({
      method: 'GET',
      path: url,
    }).as('getDocument')
    
    cy.wait('@getDocument').its('response.statusCode').should('eq', 404)
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