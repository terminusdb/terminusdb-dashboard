import * as CONST from "../../../src/cypress.constants"
const dataProduct = `test__${Date.now()}`
import { IconBarConfig } from "../../../src/components/constants"
const teamName = Cypress.env('TEAM_NAME')
const branchName=`branch__${Date.now()}`
const crName=`CR__${branchName}`
const email = Cypress.env('COLLABORATOR_USER')
const documentName = `test__document`, propertyName = `test__document__name`
const schemaSaveCommitMessage=`Update from model builder`
let branchID=""

describe(`Test time travel widget`, () => {
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

  // Go to Product Model Page
  it("Go to Product Model Page", () => {
    cy.get(`a[data-cy=${IconBarConfig.dataProductModal.key}]`).should('exist').click();
    cy.wait(2000)
  })

  // Add a new document 
  it("Add a new document", () => {
    cy.get(`button[id="add_new_to_schema_button"]`).should('exist').click();
    cy.get(`a[data-cy="add_new_document"]`).should('exist').click();
    cy.get(`.RRT__container`).should('exist')

    cy.get(`input[id="id"]`).focus().type(documentName)
  })

  // Add a string property to document
  it("Add a string property to document", () => {
    cy.get(`div[id="tab-2"]`).should('exist').click(); 
    cy.get(`button[id="add_property"]`).should('exist').click();
    cy.get(`a[id="StringProperty"]`).should('exist').click();
    cy.get(`.tdb__panel__box--edit`).should('exist')
    cy.get(`input[id="id"]`).focus().type(propertyName)
  })

  //Add a commit message and save document
  it("Add a commit message and save document", () => {
    cy.get(`input[data-cy="schema_save_description"]`).should('exist')

  
    const url = `/${teamName}/api/document/${teamName}/${dataProduct}/local/branch/main?graph_type=schema&full_replace=true&author=${email}&message=Update%20from%20model%20builder`    
    cy.intercept({
      method: 'POST',
      path: url,
    }).as('saveSchema')

    cy.get(`button[data-cy="schema_save_button"]`).should('exist').click();

    cy.wait('@saveSchema')
  })

  // Click on time travel widget to see  the first commit
  it("Click on time travel widget to see  the first commit", () => {
    const url = `/${teamName}/api/woql/${teamName}/${dataProduct}/local/branch/main`    
    cy.intercept({
      method: 'POST',
      path: url,
    }).as('getCommit')


    cy.get(`button[data-cy="time_travel_widget_id"]`).should('exist').click();
    cy.wait('@getCommit')
    //cy.get('h6').contains(schemaSaveCommitMessage)
  })

  // Go to Document Explorer
  it("Go to Document Explorer", () => {
    cy.get(`a[data-cy=${IconBarConfig.documentExplorer.key}]`).should('exist').click();
  })

  // Create a CR 
  it("Create a CR ", () => {
    let url = `/api/changes/${teamName}/${dataProduct}`    
    cy.intercept({
      method: 'POST',
      path: url, 
    }).as('getBranchName')
    cy.createCR(crName, documentName) 
    // create CR 
    cy.get(`button[data-cy=${CONST.CREATE_CHANGE_REQUEST_BUTTON}]`).should('exist').click();
    cy.get(2000)
    cy.wait('@getBranchName').then((interception) => {
      assert.isNotNull(interception.response.body, 'Intercepting create CR API ')
      //console.log("interception.response.body", interception.response.body)
      branchID = interception.response.body.branchName
    })
  })

  // Check if Frame Viewer is loaded and add 3 new documents
  it("Check if Frame Viewer is loaded and add 3 new documents", () => {
    // check if frame viewer loaded
    cy.get(`div[data-cy=${CONST.FRAME_VIEWER}]`).should('exist');
    cy.wait(1000)

    // first entry
    cy.get(`textarea[data-cy="root_${propertyName}"]`).focus().type(`${propertyName}__1`)
    cy.get('.btn').contains('Submit').should('exist').click();
    cy.wait(1000)

    // second entry
    cy.get(`button[data-cy="new_document_${documentName}"]`).should('exist').click();
    cy.get(`textarea[data-cy="root_${propertyName}"]`).focus().type(`${propertyName}__2`)
    cy.get('.btn').contains('Submit').should('exist').click();
    cy.wait(1000)

    // third entry
    cy.get(`button[data-cy="new_document_${documentName}"]`).should('exist').click();
    cy.get(`textarea[data-cy="root_${propertyName}"]`).focus().type(`${propertyName}__3`)
    cy.get('.btn').contains('Submit').should('exist').click();
    cy.wait(1000)
    
  }) 

  // Click on time travel widget to see 3 commits where new documents were added
  it("Click on time travel widget to see 3 commits where new documents were added", () => {
    cy.get(`button[data-cy="time_travel_widget_id"]`).should('exist').click();
    cy.wait(2000)
    cy.get('.time-travel-card').find('h6').contains(`add a new document`).should('exist')
    cy.get(`button[data-cy="close__time__travel__widget"]`).should('exist').click({force: true});
  })

  // Check if Document Table has three entries as well
  it("Check if Document Table has three entries as well", () => {
    cy.get("table tbody").find("tr").then((row) => {
      expect(row.length).eq(3)
    });
  })

  // Click on time travel widget and jump to a commit where no instances of document were created
  it("Click on time travel widget and jump to a commit where no instances of document were created", () => {
    cy.get(`button[data-cy="time_travel_widget_id"]`).should('exist').click();
    cy.wait(5000) 
    cy.get(`button[id="time_travel_to_${schemaSaveCommitMessage}"]`).should('exist').click();
    cy.wait(5000)
    cy.get(`button[id="time_travel_to_${schemaSaveCommitMessage}"]`).should('not.exist')
    cy.get('h6').contains(`You are at this point in time`).should('exist')
    // Check if Document Table has 0 entry
    cy.get("table tbody").find("tr").should("not.exist")
  })

  // Select reset button of time travel widget
  it("Select reset button of time travel widget", () => {
    cy.get(`button[data-cy="roll_back_to_head"]`).should('exist').click({force: true});
    cy.wait(4000)
  })

  // Check if Document Table has three entries and has been reset to the head of the branch
  it("Check if Document Table has three entries and has been reset to the head of the branch", () => {
    cy.get("table tbody").find("tr").then((row) => {
      expect(row.length).eq(3)
    });
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