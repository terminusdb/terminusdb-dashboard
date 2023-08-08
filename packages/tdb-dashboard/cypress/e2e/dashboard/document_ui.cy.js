import * as CONST from "../../../src/cypress.constants"
import { IconBarConfig } from "../../../src/components/constants"
const teamName = Cypress.env('TEAM_NAME')
const dataProduct="nuclear"
const email = Cypress.env('COLLABORATOR_USER')
const crName=`CR_${Date.now()}`
let documentID="", nuclearPowerPlantData={}, branchID={}

describe(`Test document explorer UI (Edit/delete/create)`, () => {
  const dashboard = Cypress.config().baseUrl

  /** add this statement to stop cypress form complaining 
   * about react-leaflet being used in terminusdb-document-ui */
   Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  // visit dashboard-dev at the start
  before(function () {
    cy.visit(dashboard)
    cy.fixture('nuclearPowerPlant.json').then(function (data) {
      nuclearPowerPlantData = data;
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

  //Clone Nuclear team
  it('Clone Nuclear team', () => {
    cy.intercept(`/${teamName}/${dataProduct}`).as('cloaning')
    cy.get(`button[data-cy=${CONST.CLONE_BUTTON}_${dataProduct}]`).should('exist').click();
    cy.wait('@cloaning')
  })*/

  // Go to Document Explorer
  it("Go to Document Explorer", () => {
    cy.visit(`/CYPRESS_TEST_TEAM/nuclear`)
    cy.get(`a[data-cy=${IconBarConfig.documentExplorer.key}]`).should('exist').click();
  })

  // Click on add a new NuclearPowerPlant 
  /*it("Click on add a new NuclearPowerPlant", () => {
    cy.get(`button[data-cy=${CONST.NEW_DOCUMENT_BUTTON_ID}_NuclearPowerPlant]`).should('exist').click();
    cy.get(2000)
    // the CR modal should pop up on click of create document
    cy.get('.modal-dialog').should('exist')  
  })*/

  // Create a CR 
  it("Create a CR ", () => {
    let url = `/api/changes/${teamName}/${dataProduct}`    
    cy.intercept({
      method: 'POST',
      path: url,
    }).as('getBranchName')
    cy.createCR(crName, "NuclearPowerPlant") 
    // create CR 
    cy.get(`button[data-cy=${CONST.CREATE_CHANGE_REQUEST_BUTTON}]`).should('exist').click();
    cy.get(2000)
    cy.wait('@getBranchName').then((interception) => {
      assert.isNotNull(interception.response.body, 'Intercepting create CR API ')
      //console.log("interception.response.body", interception.response.body)
      branchID = interception.response.body.branchName
    })
  })

  // Check if Frame Viewer of NuclearPowerPlant is loaded
  it("Check if Frame Viewer of NuclearPowerPlant is loaded", () => {
    // check if frame viewer loaded
    cy.get(`div[data-cy=${CONST.FRAME_VIEWER}]`).should('exist');
    cy.wait(1000)
  }) 

  // Add Name ( test string field )
  it("Add Name ( test string field )", () => {
    // add name
    cy.get('textarea[data-cy="root_name"]').focus().type(nuclearPowerPlantData.name)
    cy.wait(1000)
  }) 
  
  // Test Linking of documents
  it("Add country (test linking a field)", () => {
    // add country and test linking documents 
    cy.get(`input[data-cy="Link an existing Document__country"]`).should('exist').click();
    cy.wait(1000)
    cy.get(`span[data-cy="Argentina"]`).should('exist').click();
  }) 

  // Delete Linked country and test if changing links works
  it("Delete Linked country and test if changing links works", () => {
    // after linking a document, change link button for the field should appear in dom
    cy.get(`button[data-cy="delete__country"]`).should('exist').click();
    cy.wait(1000)
  })

  // Add country
  it("Add country", () => {
    // add country and test linking documents 
    cy.get(`input[data-cy="Link an existing Document__country"]`).should('exist').click();
    cy.wait(1000)
    cy.get(`span[data-cy="Argentina"]`).should('exist').click();
    //cy.get('span').contains(nuclearPowerPlantData.country).click();
  })

  // Add capacity 
  it("Add capacity (test numeric field & linking in subdocument)", () => {
    // add country and test linking documents 
    cy.get(`input[data-cy="root_capacity_quantity"]`).focus().type(nuclearPowerPlantData.capacity.quantity)
    cy.wait(1000)
    // link a new unit
    cy.get(`input[data-cy="Link an existing Document__unit"]`).should('exist').click();
    cy.wait(2000)
    cy.get(`span[data-cy="US Dollar"]`).should('exist').click();
    cy.wait(2000)
    cy.get(`button[data-cy="delete__unit"]`).should('exist')
  })

  // Add location
  it("Add location & test Create New Document Links", () => {
    // add location
    cy.get(`input[data-cy="Create New Document__location"]`).should('exist').click();
    // add latitude
    cy.get(`input[data-cy="latitude__0"]`).focus().type(nuclearPowerPlantData.location.coordinates[0])
    // add longitude
    cy.get(`input[data-cy="longitude__1"]`).focus().type(nuclearPowerPlantData.location.coordinates[1])
    // select type
    cy.get(`input[id="root_location_type_1"]`).should('exist').focus().type(`${nuclearPowerPlantData.location.type}{enter}`)
  })

  // Add url
  it("Add url and test url field", () => {
    cy.get(`textarea[data-cy="root_url"]`).focus().type(nuclearPowerPlantData.url)
  })

  // Add gppd_idnr
  it("Add gppd_idnr field", () => {
    cy.get(`textarea[data-cy="root_gppd_idnr"]`).focus().type(nuclearPowerPlantData.gppd_idnr)
  })

  // Create new Nuclear Power Plant
  it("Create new Nuclear Power Plant", () => {
    const url = `/${teamName}/api/document/${teamName}/${dataProduct}/local/branch/${branchID}?author=${email}&message=add%20a%20new%20document`    
    cy.intercept({
      method: 'POST',
      path: url,
    }).as('addDocument')

    // click on submit button to create document
    cy.get('.btn').contains('Submit').should('exist').click();

    cy.wait('@addDocument').then((interception) => {
      assert.isNotNull(interception.response.body, 'intercepting Add Document API')
      console.log("interception.response.body", interception.response.body)
      let  fullId = interception.response.body[0]
      documentID = btoa(fullId)
      console.log("encoded", documentID)
      //`https://dashboard.terminusdb.com/${orgName}/${dbName}/documents/${type}/${fullIdEncode}`
    })
    cy.get(2000)

  })  

  // View newly created nuclear power plant
  it("View newly created nuclear power plant", () => {
    // Get newly created Planet
    cy.visit(`${teamName}/${dataProduct}/documents/NuclearPowerPlant/${documentID}`)
    cy.get(2000)
  })

})