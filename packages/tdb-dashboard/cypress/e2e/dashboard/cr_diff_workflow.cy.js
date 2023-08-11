/**
 * 1) login to terminusdb
 * 2) select Terminusdb_demo team 
 * 3) Clone Nuclear data product
 * 4) Go to Document Explorer
 * 5) Create a CR
 * 6) Check if Frame Viewer of ExperimentalReactor is loaded
 * 7) Add a new ExperimentalReactor
 * 8) Create new ExperimentalReactor
 * 9) Check if document were created 
 * 10) Go to CR Page
 * 11) Submit the Change Request for review
 * 12) Review CR
 * 13) Check if diff page is loaded correctly
 * 14) Check if diff class names and UI is loaded correctly 
 * 15) Approve CR
 * 16) Get newly created ExperimentalReactor
 * 17) Reopen the CR 
 * 18) Edit ExperimentalReactor
 * 19) Unlink moderator 
 * 20) Submit the Change Request for review
 * 21) Check if Update CR is prompted
 * 22) Check if Merge Conflict screen is prompted 
 * 23) Merge Conflicts
 */
import * as CONST from "../../../src/cypress.constants"
import { IconBarConfig } from "../../../src/components/constants"
const teamName = Cypress.env('TEAM_NAME')
const dataProduct="nuclear"
const branchName=`branch__${Date.now()}`
const crName=`CR__${branchName}`
const email = Cypress.env('COLLABORATOR_USER')
let experimentalReactorData = {}, documentID="", branchID="", coolantSubstanceID="", moderatorSubstanceID=""

describe(`Change Request and Diff screens workflow`, () => {
  const dashboard = Cypress.config().baseUrl

  /** add this statement to stop cypress form complaining 
   * about react-leaflet being used in terminusdb-document-ui */
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  // visit dashboard-dev at the start
  before(function () {
    cy.visit(dashboard)
    cy.fixture('experimentalReactor.json').then(function (data) {
      experimentalReactorData = data;
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

  //Clone Nuclear data product
  it('Clone Nuclear data product', () => {
    cy.intercept(`/${teamName}/${dataProduct}`).as('cloaning')
    cy.get(`button[data-cy=${CONST.CLONE_BUTTON}_${dataProduct}]`).should('exist').click();
    cy.wait('@cloaning')
  })

  // Go to Document Explorer
  it("Go to Document Explorer", () => {
    cy.visit(`/CYPRESS_TEST_TEAM/nuclear`)
    cy.get(`a[data-cy=${IconBarConfig.documentExplorer.key}]`).should('exist').click();
  })

  // Create a CR 
  it("Create a CR ", () => {
    let url = `/api/changes/${teamName}/${dataProduct}`    
    cy.intercept({
      method: 'POST',
      path: url, 
    }).as('getBranchName')
    cy.createCR(crName, "ExperimentalReactor") 
     // create CR 
    cy.get(`button[data-cy=${CONST.CREATE_CHANGE_REQUEST_BUTTON}]`).should('exist').click();
    cy.get(2000)
    cy.wait('@getBranchName').then((interception) => {
      assert.isNotNull(interception.response.body, 'Intercepting create CR API ')
      //console.log("interception.response.body", interception.response.body)
      branchID = interception.response.body.branchName
    })
  })

  // Check if Frame Viewer of ExperimentalReactor is loaded
  it("Check if Frame Viewer of ExperimentalReactor is loaded", () => {
    // check if frame viewer loaded
    cy.get(`div[data-cy=${CONST.FRAME_VIEWER}]`).should('exist');
    cy.wait(1000)
  }) 

  // Add a new ExperimentalReactor
  it("Add a new ExperimentalReactor", () => {
    // Add capacity
    cy.get(`input[data-cy="root_capacity_quantity"]`).focus().type(experimentalReactorData.capacity.quantity)
    cy.wait(1000)
    // link a new unit
    cy.get(`input[data-cy="Link an existing Document__unit"]`).should('exist').click();
    cy.wait(2000)
    cy.get(`span[data-cy="US Dollar"]`).should('exist').click();
    cy.wait(2000)
    cy.get(`button[data-cy="delete__unit"]`).should('exist')

    // Add New coolent
    cy.get(`input[data-cy="Create New Document__coolant"]`).should('exist').click();
    cy.get(`textarea[data-cy="root_coolant_name_1"]`).focus().type(experimentalReactorData.coolant.name)

    // Add New Moderator
    cy.get(`input[data-cy="Create New Document__moderator"]`).should('exist').click();
    cy.get(`textarea[data-cy="root_moderator_name_1"]`).focus().type(experimentalReactorData.moderator.name)

    // Add a name
    cy.get(`textarea[data-cy="root_name"]`).focus().type(experimentalReactorData.name)

  })

  // Create new ExperimentalReactor
  it("Create new ExperimentalReactor", () => {
    const url = `/${teamName}/api/document/${teamName}/${dataProduct}/local/branch/${branchID}?author=${email}&message=add%20a%20new%20document`    
    cy.intercept({
      method: 'POST',
      path: url,
    }).as('addDocument')

    // click on submit button to create document
    cy.get('.btn').contains('Submit').should('exist').click();

    // catch the Document ID of ExperimentalReactor
    cy.wait('@addDocument').then((interception) => {
      assert.isNotNull(interception.response.body, 'intercepting Add Document API')
      let  fullId = interception.response.body[0]
      documentID = btoa(fullId)
    })
    cy.get(2000)
  })  

  // Check if document were created 
  it("Check if document were created ", () => {
    
    const url = `/${teamName}/api/document/${teamName}/${dataProduct}/local/branch/${branchID}?id=http://lib.terminusdb.com/nuclear/ExperimentalReactor/ExperimentalReactor_test`
    cy.intercept({
      method: 'GET',
      path: url,
    }).as('getDocument')

    cy.wait(1000)
    cy.get(`span[data-cy="ExperimentalReactor_test"]`).should('exist').click();
    // click on submit button to create document
    //cy.get('.btn').contains('Submit').should('exist').click();

    // catch the Document ID of ExperimentalReactor
    cy.wait('@getDocument').then((interception) => {
      assert.isNotNull(interception.response.body, 'intercepting get Document API')
      coolantSubstanceID=interception.response.body.coolant
      moderatorSubstanceID=interception.response.body.moderator
    })
    cy.get(2000)

  })

  // Go to CR Page
  it("Go to CR Page", () => {
    cy.get(`a[data-cy=${IconBarConfig.changes.key}]`).should('exist').click();
    cy.get(`button[data-cy=${CONST.CR_READY_FOR_REVIEW}]`).should('exist').click();
    cy.get('.modal-dialog').should('exist') 
  })

  // Submit the Change Request for review
  it("Submit the Change Request for review", () => {
    // add CR review message
    cy.get(`textarea[data-cy=${CONST.CHANGE_REQUEST_MESSAGE_FOR_REVIEW}]`).focus().type(`${crName}__REVIEW__MESSAGE`)
    // submit CR 
    cy.get(`button[data-cy=${CONST.CHANGE_REQUEST_SUBMIT_REVIEW}]`).should('exist').click(); 
   
  })

  // Review CR
  it("Review CR", () => {
    cy.get(`button[data-cy=${CONST.CHANGE_REQUEST_SUBMIT_REVIEW_FOR_DIFF}]`).should('exist').click(); 
    cy.wait(1000)
  })

  // Check if diff page is loaded correctly 
  it("Check if diff page is loaded correctly ", () => {
    cy.get(`button[data-cy=Approve]`).should('exist')
    cy.get(`button[data-cy=Reject]`).should('exist')

    cy.get(`div[id="ExperimentalReactor/ExperimentalReactor_test"]`).should('exist')


    cy.get(`div[id="${coolantSubstanceID}"]`).should('exist')
    cy.get(`div[id="${moderatorSubstanceID}"]`).should('exist')

  })

  // Check if diff class names and UI is loaded correctly 
  it("Check if diff class names and UI is loaded correctly ", () => {
    cy.get(`div[id="ExperimentalReactor/ExperimentalReactor_test"]`).click()
    cy.get(`.tdb__diff__inserted`).should('exist')
    cy.get(`div[id="ExperimentalReactor/ExperimentalReactor_test"]`).click({force: true})
  })


  // Approve CR
  it("Approve CR", () => {
    cy.get(`textarea[data-cy=${CONST.CR_ACTION_MESSAGEBOX}]`).first().focus().type(`APPROVE ${crName}`);
    cy.get(`button[data-cy=Approve]`).should('exist').click();
  })

  // Get newly created ExperimentalReactor
  it("Get newly created ExperimentalReactor", () => {
    cy.visit(`${teamName}/${dataProduct}/documents/ExperimentalReactor/${documentID}`)
  })

  // Reopen the CR 
  it("Reopen the CR ", () => {
    
    cy.get(`a[data-cy=${IconBarConfig.changes.key}]`).should('exist').click();
    cy.get(`button[data-cy=${CONST.MERGED_CR}]`).should('exist').click();
    cy.wait(2000)
    cy.get(`button`).contains(`Reopen`).should('exist').click();
    cy.get('.modal-dialog').should('exist') 
    cy.get(`textarea[data-cy="cr_message_for_review"]`).focus().type(`Reopening ${crName} message`)
    cy.get(`button`).contains(`Submit change request`).should('exist').click();
    cy.get(`button[data-cy=${CONST.CR_KEEP_EDITING}]`).should('exist').click();
  })

  // Go to Document Explorer
  it("Go to Document Explorer", () => {
    cy.get(`a[data-cy=${IconBarConfig.documentExplorer.key}]`).should('exist').click();
  })
  
  // Edit ExperimentalReactor
  it("Edit ExperimentalReactor", () => {
    cy.get(`button[id="ExperimentalReactor"]`).should('exist').click();
    cy.get(`span[data-cy="ExperimentalReactor_test"]`).should('exist').click();
    cy.get(`button[data-cy="edit__document"]`).should('exist').click()
  })

  // Unlink moderator 
  it("Unlink moderator ", () => {
    cy.get(`button[data-cy="delete__moderator"]`).should('exist').click();
    // select type
    cy.get(`input[id="root_type"]`).should('exist').focus().type(`${experimentalReactorData.type}{enter}`)
    cy.get('.btn').contains('Submit').should('exist').click();
    cy.wait(2000)
  })

  // Go to CR Page
  it("Go to CR Page", () => {
    cy.get(`a[data-cy=${IconBarConfig.changes.key}]`).should('exist').click();
    cy.get(`button[data-cy=${CONST.CR_READY_FOR_REVIEW}]`).should('exist').click();
    cy.get('.modal-dialog').should('exist') 
  })

  // Submit the Change Request for review
  it("Submit the Change Request for review", () => {
    // add CR review message
    cy.get(`textarea[data-cy=${CONST.CHANGE_REQUEST_MESSAGE_FOR_REVIEW}]`).focus().type(`${crName}__REVIEW__EDIT__MESSAGE`)
    // submit CR 
    cy.get(`button[data-cy=${CONST.CHANGE_REQUEST_SUBMIT_REVIEW}]`).should('exist').click(); 
   
  })

  // Review CR
  it("Review CR", () => {
    cy.get(`button[data-cy=${CONST.CHANGE_REQUEST_SUBMIT_REVIEW_FOR_DIFF}]`).should('exist').click(); 
    cy.wait(1000)
  })

  // Check if Update CR is prompted
  it("Check if Update CR is prompted", () => {
    cy.get('h3').contains(`This Change Request is out of date`).should('exist')
    cy.get(`button`).contains(`Update Change Request`).should('exist').click(); 
    cy.wait(2000)
    cy.get(`button`).contains(`Resolve Conflict`).should('exist').click(); 
    cy.wait(2000)
  })

  // Check if Merge Conflict screen is prompted 
  it("Check if Merge Conflict screen is prompted", () => {
    cy.get(`button`).contains(`Merge Conflicts`).should('exist')
    cy.get(`button`).contains(`Reject Conflicts`).should('exist')
    cy.get(`button`).contains(`Reopen CR`).should('exist')
    cy.get(`div[id="ExperimentalReactor/ExperimentalReactor_test"]`).click()
    cy.wait(2000)
    cy.get(`div[data-cy="${moderatorSubstanceID}"]`).should('exist')
    .should('satisfy', ($el) => {
      const classList = Array.from($el[0].classList); 
      return classList.includes('tdb__diff__original-underline') 
    }) 

    cy.get(`div[data-cy="deleted__moderator"]`).should('exist')
  
  })

  // Merge Conflicts
  it("Merge Conflicts", () => {
    cy.get(`button`).contains(`Merge Conflicts`).should('exist').click()
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