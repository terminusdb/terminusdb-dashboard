/// <reference types="cypress" />

describe('visit dashboard local', () => {
    const dashboard = "http://localhost:6364/dashboard"
  
   
    beforeAll(function () {
      // visit at the start 
        cy.visit(dashboard)
    })

    const user ="admin"
    const pass ="root"


      it('Check to see that you can login with an exists user', () => {
          //check to be in terminusdb - login page
          cy.get('#add_element_name').type(user).trigger('change');
          cy.get('#add_element_password').type(pass).trigger('change');
          cy.get('#add_element_button').click()
          cy.wait(5000)

          //admin

      })

    //add_element_name


})