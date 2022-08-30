/// <reference types="cypress" />

describe('visit dashboard dev', () => {
    const dashboard = "http://localhost:3030/"
  
    let emailAddressOwner =  '' 
    let inboxIdOwner =  '' 
    //const collaboratorEmail = 

    before(function () {
      // visit at the start
      cy.visit(dashboard)
      return cy.mailslurp()
          .then(mailslurp => mailslurp.createInbox())
          .then(inbox => {
              // save inbox id and email address to this (make sure you use function and not arrow syntax)
              inboxIdOwner = inbox.id
              emailAddressOwner = inbox.emailAddress

              console.log(inboxIdOwner,emailAddressOwner)
          })
     });
})