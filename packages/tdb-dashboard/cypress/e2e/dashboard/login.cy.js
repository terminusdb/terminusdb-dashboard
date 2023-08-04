/// <reference types="cypress" />

import { SiGmail } from "react-icons/si"

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

///8MmY%*2q
//tester@terminusdb.com

//emf7V3RaiDXCsx$#@%yy
describe('visit dashboard dev', () => {
    const dashboard = "https://dashboard-dev.terminusdb.com/"
    let ownerPass = Cypress.env('OWNER_PASS')
    const newPass = Cypress.env('NEW_PASS')
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

     /*beforeEach(function() {
        
     })*/ 


    it('Check to see that you can create a new user', () => {
        expect(emailAddressOwner).to.contain("@mailslurp");
        //check to be in terminusdb - login page
        cy.get('#signUpTab').should('have.class', "form-tabs__button active")
        cy.get('#email').type(emailAddressOwner).trigger('change');
        cy.get('#password').type(ownerPass).trigger('change');
        cy.get('#btn-signup').click()
        cy.wait(5000)
    })

    function userLogin(){
      cy.get('#loginTab').click()
      cy.get('#email').type(emailAddressOwner).trigger('change');
      cy.get('#password').type(ownerPass).trigger('change');
      cy.get('#btn-login').click()
      cy.wait(5000)
    }

    it('the user check can not visualize the dashboard, need to verify the email', ()=>{
        cy.get('h1').should("contain","Verify your Email")
    })


    it('check verification email has been sent and activate the account', ()=>{
      cy.mailslurp().then(mailslurp => mailslurp.waitForLatestEmail(inboxIdOwner, 30000, true))
        .then(email => { expect(email.subject).to.contain("TerminusCMS Email Verification")
        // get the verification link
        const link = email.body.match(/href="([^"]*)/)[1];
         // cy.origin('terminusdb.com', { args: { link } }, ({ link }) => {
          cy.visit(link);
          cy.wait(3000)
          cy.get('h1.hero-banner__heading').should('have.text', 'SIGN UP')
          userLogin()
      })
     
      //cy.get("._pendo-close-guide").click()
    })

    it('Check that the user can logout.', () => {
      cy.get('#profile_menu_arrow').click()
      cy.get('#logout').click()
      cy.wait(5000)
  })

  it('Check that the user can reset the password.', () => {   
    cy.get('#passwordReset').click()
    cy.get('input#email-reset').type(emailAddressOwner).trigger('change')
    cy.get('#reset-password').click()
    cy.get('#success-message').should("contain","We have sent you an email to reset your password")

    cy.mailslurp().then(mailslurp => mailslurp.waitForLatestEmail(inboxIdOwner, 30000, true))
        .then(email => { expect(email.subject).to.contain("TerminusX Reset Email")
      // get the verification link
      const link = email.body.match(/href="([^"]*)/)[1];
         // cy.origin('terminusdb.com', { args: { link } }, ({ link })=> {
          cy.visit(link);
          cy.get('div.auth0-lock-name').should("contain","Change Password")
          ownerPass = newPass
          cy.get('input[name="password"]').first().type(ownerPass)
          cy.get('input[name="password"]').last().type(ownerPass)
          cy.get('button.auth0-lock-submit').click()
          //})
      })
})

let teamName = "shared_team"
//profile_open_create_new_team_modal
it('check that you can create a new Team', ()=>{
      userLogin()
      teamName = `${teamName}__${Date.now()}`
      cy.get('#team_page_open_create_new_team_modal').click()
      cy.get('input#team_id').type(teamName).trigger('change');
      cy.get('#create_new_team_button').click()
      cy.wait(5000)
      cy.get('#team_list_menu_button').should("contain",teamName)

  })

    
   /* it('get Owner new Email', () => {
       
        cy.get('#verification_link').click()
        cy.wait(5000)

    })*/
    /*it('can add new todo items', () => {
      // We'll store our item text in a variable so we can reuse it
      const newItem = 'Feed the cat'
  
      // Let's get the input element and use the `type` command to
      // input our new list item. After typing the content of our item,
      // we need to type the enter key as well in order to submit the input.
      // This input has a data-test attribute so we'll use that to select the
      // element in accordance with best practices:
      // https://on.cypress.io/selecting-elements
      cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)
  
      // Now that we've typed our new item, let's check that it actually was added to the list.
      // Since it's the newest item, it should exist as the last element in the list.
      // In addition, with the two default items, we should have a total of 3 elements in the list.
      // Since assertions yield the element that was asserted on,
      // we can chain both of these assertions together into a single statement.
      cy.get('.todo-list li')
        .should('have.length', 3)
        .last()
        .should('have.text', newItem)
    })
  
    it('can check off an item as completed', () => {
      // In addition to using the `get` command to get an element by selector,
      // we can also use the `contains` command to get an element by its contents.
      // However, this will yield the <label>, which is lowest-level element that contains the text.
      // In order to check the item, we'll find the <input> element for this <label>
      // by traversing up the dom to the parent element. From there, we can `find`
      // the child checkbox <input> element and use the `check` command to check it.
      cy.contains('Pay electric bill')
        .parent()
        .find('input[type=checkbox]')
        .check()
  
      // Now that we've checked the button, we can go ahead and make sure
      // that the list element is now marked as completed.
      // Again we'll use `contains` to find the <label> element and then use the `parents` command
      // to traverse multiple levels up the dom until we find the corresponding <li> element.
      // Once we get that element, we can assert that it has the completed class.
      cy.contains('Pay electric bill')
        .parents('li')
        .should('have.class', 'completed')
    })
  
    context('with a checked task', () => {
      beforeEach(() => {
        // We'll take the command we used above to check off an element
        // Since we want to perform multiple tests that start with checking
        // one element, we put it in the beforeEach hook
        // so that it runs at the start of every test.
        cy.contains('Pay electric bill')
          .parent()
          .find('input[type=checkbox]')
          .check()
      })
  
      it('can filter for uncompleted tasks', () => {
        // We'll click on the "active" button in order to
        // display only incomplete items
        cy.contains('Active').click()
  
        // After filtering, we can assert that there is only the one
        // incomplete item in the list.
        cy.get('.todo-list li')
          .should('have.length', 1)
          .first()
          .should('have.text', 'Walk the dog')
  
        // For good measure, let's also assert that the task we checked off
        // does not exist on the page.
        cy.contains('Pay electric bill').should('not.exist')
      })
  
      it('can filter for completed tasks', () => {
        // We can perform similar steps as the test above to ensure
        // that only completed tasks are shown
        cy.contains('Completed').click()
  
        cy.get('.todo-list li')
          .should('have.length', 1)
          .first()
          .should('have.text', 'Pay electric bill')
  
        cy.contains('Walk the dog').should('not.exist')
      })
  
      it('can delete all completed tasks', () => {
        // First, let's click the "Clear completed" button
        // `contains` is actually serving two purposes here.
        // First, it's ensuring that the button exists within the dom.
        // This button only appears when at least one task is checked
        // so this command is implicitly verifying that it does exist.
        // Second, it selects the button so we can click it.
        cy.contains('Clear completed').click()
  
        // Then we can make sure that there is only one element
        // in the list and our element does not exist
        cy.get('.todo-list li')
          .should('have.length', 1)
          .should('not.have.text', 'Pay electric bill')
  
        // Finally, make sure that the clear button no longer exists.
        cy.contains('Clear completed').should('not.exist')
      })
    })*/
  })
