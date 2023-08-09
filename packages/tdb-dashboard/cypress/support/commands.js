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


/** user login function */
Cypress.Commands.add('userLogin', () => { 
  cy.get('#loginTab').click()
  cy.get('#email').type(email).trigger('change');
  cy.get('#password').type(password).trigger('change');
  cy.get('#btn-login').click()
  cy.wait(5000)
});

/** select a team */
Cypress.Commands.add('selectTeam', (team) => {
  cy.get(`#${team}`).click()
  cy.location().should((loc) => {
    expect(loc.pathname).to.eq(`/${team}`)
  })
})

/** check if in correct data product */
Cypress.Commands.add('inCorrectDataProduct', (team, dataProduct) => {
  cy.location().should((loc) => {
    expect(loc.pathname).to.eq(`/${team}/${dataProduct}`)
  })
})

/** check if url is in right location */
Cypress.Commands.add('isCorrectURL', (link) => {
  cy.location().should((loc) => {
    expect(loc.pathname).to.eq(link)
  })
})

/** create a data product */
Cypress.Commands.add('newDataProduct', (team, dataProduct) => {
  cy.get(`button[data-cy=${CONST.NEW_DATA_PRODUCT_BUTTON_ID}]`).click()
  cy.get(`input[data-cy=${CONST.NEW_DATA_PRODUCT_ID}]`).type(dataProduct)
  cy.get(`input[data-cy=${CONST.NEW_DATA_PRODUCT_NAME}]`).type(dataProduct)
  cy.get(`textarea[data-cy=${CONST.NEW_DATA_PRODUCT_DESC}]`).type(dataProduct)
  cy.get(`button[data-cy=${CONST.CREATE_NEW_DATA_PRODUCT_BUTTON_ID}]`).click()
  cy.inCorrectDataProduct(team, dataProduct)
})

/** delete a data product  */
Cypress.Commands.add('deleteDataProduct', (dataProduct) => {
  cy.get(`button[data-cy=${CONST.HOME_DELETE_DATAPRODUCT_BUTTON_ID}]`).click()
  cy.get('.modal-dialog').should('be.visible')
  cy.get(`input[data-cy=${CONST.DELETE_DATA_PRODUCT_ID}]`).type(dataProduct) 
  cy.get(`button[data-cy=${CONST.DELETE_DATAPRODUCT_BUTTON_ID}]`).click()
  cy.get(`#${dataProduct}`).should('not.exist');
})

/** create a CR */
Cypress.Commands.add('createCR', (crName, type) => {
  cy.get(`button[data-cy=${CONST.NEW_DOCUMENT_BUTTON_ID}_${type}]`).should('exist').click();
  cy.get(2000)
  // the CR modal should not pop up on click of create document
  cy.get('.modal-dialog').should('exist') 
  // add CR Name
  cy.get(`input[data-cy=${CONST.INPUT_CR_NAME}]`).focus().type(crName)
  // add CR Message
  cy.get(`input[data-cy=${CONST.INPUT_CR_MESSAGE}]`).focus().type(`${crName}__MESSAGE`)
 
})

// clear codemirror
Cypress.Commands.add("clearCodeMirror", () => {
  cy.get('.CodeMirror')
    .first()
    .then((editor) => {
      editor[0].CodeMirror.setValue('');
    })
});


// add to codemirror
Cypress.Commands.add("editCodeMirror", (text) => {
  cy.get('.CodeMirror')
  .first()
  .then((editor) => {
    editor[0].CodeMirror.setValue(text);
  });
});

// check if codemirror textarea value is qual to a json value
Cypress.Commands.add("expectCodeMirrorToHave", (data) => {
  cy.get('.CodeMirror-wrap') // code mirror in graphQL interface
  .then((editor) => {
    let response = editor[0].CodeMirror.getValue()
    expect(response).to.eq(JSON.stringify(data, null, 2))
  });
});


/** logout */
Cypress.Commands.add('logout', () => {
  cy.get('#profile_menu_arrow').click()
  cy.get('#logout').click()
  cy.get('h1.hero-banner__heading').should('have.text', 'SIGN UP')
})

