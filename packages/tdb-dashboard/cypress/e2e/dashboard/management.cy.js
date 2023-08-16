import * as CONST from "../../../src/cypress.constants"
import { IconBarConfig } from "../../../src/components/constants"
import { EXAMPLES_PRODUCTS } from "../../../src/routing/constants"
const teamName = Cypress.env('TEAM_NAME')
const email = Cypress.env('COLLABORATOR_USER')
const dataProduct="star_wars"
let inboxIdOwner="", emailAddressOwner=""

describe(`Test Team Management`, () => {
  const dashboard = Cypress.config().baseUrl

  /** add this statement to stop cypress form complaining 
   * about react-leaflet being used in terminusdb-document-ui */
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  // visit dashboard-dev at the start
  before(function () {
    cy.visit(dashboard)
    return cy.mailslurp().then(mailslurp => mailslurp.createInbox())
      .then(inbox => {
        // save inbox id and email address to this (make sure you use function and not arrow syntax)
        inboxIdOwner = inbox.id
        emailAddressOwner = inbox.emailAddress
        //console.log(inboxIdOwner,emailAddressOwner)
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

  // Go to administrator page
  it('Go to administrator page', () => {
    cy.get(`button[id="profile_menu_arrow"]`).should('exist').click();
    cy.get(`a[id="team_members"]`).should('exist').click();
    cy.wait(1000)
    cy.isCorrectURL(`/${teamName}/administrator`)
  })

  // Send an Invitation to join team
  it('Send an Invitation to join team', () => {
    cy.get(`button`).contains(`Invite a Member`).should('exist').click();
    cy.get(`input[id="invite__email__input"]`).focus().type(emailAddressOwner);
    cy.get(`input[id="Role/admin"]`).should('exist').click();
    cy.get(`button[id="add_element_button"]`).should('exist').click();
  })

  // Logout
  it('Logout', () => {
    cy.logout()
  })

  it('Open the email box and check for the invitation email and accept Invitation', ()=>{
    cy.mailslurp().then(mailslurp => mailslurp.waitForLatestEmail(inboxIdOwner, 30000, true))
      .then(email => { expect(email.subject).to.contain(`Invitation from ${email} to collaborate on a team ${teamName}`)
      // get the verification link
      const link = email.body.match(/href="([^"]*)/)[1];
       // cy.origin('terminusdb.com', { args: { link } }, ({ link }) => {
        cy.visit(link);
        cy.wait(3000)
        cy.get('h5').contains('You have been invited').should('exist')
        cy.get('h5').contains(`to join the ${teamName} team.`).should('exist')
        cy.get('h5').contains(`To accept this invite please confirm`).should('exist')
        cy.get('button').contains(`REJECT`).should('exist')
        cy.get('button').contains(`ACCEPT`).should('exist').click()
    })
   
    //cy.get("._pendo-close-guide").click()
  })
  

  
  
})