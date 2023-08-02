// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command -- 
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import * as CONST from "../../src/cypress.constants"
const email = Cypress.env('COLLABORATOR_USER')
const password = Cypress.env('COLLABORATOR_PASSWORD')
const team = Cypress.env('TEAM_NAME')


/** user login function */
Cypress.Commands.add('userLogin', () => { 
  cy.get('#loginTab').click()
  cy.get('#email').type(email).trigger('change');
  cy.get('#password').type(password).trigger('change');
  cy.get('#btn-login').click()
  cy.wait(5000)
});

/** select a team */
Cypress.Commands.add('selectTeam', () => {
  cy.get(`#${team}`).click()
  cy.location().should((loc) => {
    expect(loc.pathname).to.eq(`/${team}`)
  })
})

/** check if in correct data product */
Cypress.Commands.add('inCorrectDataProduct', (dataProduct) => {
  cy.location().should((loc) => {
    expect(loc.pathname).to.eq(`/${team}/${dataProduct}`)
  })
})

/** create a data product */
Cypress.Commands.add('newDataProduct', (dataProduct) => {
  cy.get(`button[data-cy=${CONST.NEW_DATA_PRODUCT_BUTTON_ID}]`).click()
  cy.get(`input[data-cy=${CONST.NEW_DATA_PRODUCT_ID}]`).type(dataProduct)
  cy.get(`input[data-cy=${CONST.NEW_DATA_PRODUCT_NAME}]`).type(dataProduct)
  cy.get(`textarea[data-cy=${CONST.NEW_DATA_PRODUCT_DESC}]`).type(dataProduct)
  cy.get(`button[data-cy=${CONST.CREATE_NEW_DATA_PRODUCT_BUTTON_ID}]`).click()
  cy.inCorrectDataProduct(dataProduct)
})

/** delete a data product  */
Cypress.Commands.add('deleteDataProduct', (dataProduct) => {
  cy.get(`button[data-cy=${CONST.HOME_DELETE_DATAPRODUCT_BUTTON_ID}]`).click()
  cy.get('.modal-dialog').should('be.visible')
  cy.get(`input[data-cy=${CONST.DELETE_DATA_PRODUCT_ID}]`).type(dataProduct) 
  cy.get(`button[data-cy=${CONST.DELETE_DATAPRODUCT_BUTTON_ID}]`).click()
  cy.get(`#${dataProduct}`).should('not.exist');
})

/** logout */
Cypress.Commands.add('logout', () => {
  cy.get('#profile_menu_arrow').click()
  cy.get('#logout').click()
  cy.get('h1.hero-banner__heading').should('have.text', 'SIGN UP')
})

