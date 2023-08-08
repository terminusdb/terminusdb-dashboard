
/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

///8MmY%*2q
//tester@terminusdb.com
 
//emf7V3RaiDXCsx$#@%yy
describe('visit dashboard dev', () => {
    const dashboard = "/"//"https://dashboard-dev.terminusdb.com/"

    let emailAddressOwner =  "collaborator@gmail.com"//Cypress.env('COLLABORATOR_USER')
    let ownerPass = "collaborator@gmail.com"///Cypress.env('COLLABORATOR_USER')

    //const collaboratorEmail = 

    before(function () {
      // visit at the start
      cy.visit(dashboard)
     });

    function userLogin(){
      cy.get('#loginTab').click()
      cy.get('#email').type(emailAddressOwner).trigger('change');
      cy.get('#password').type(ownerPass).trigger('change');
      cy.get('#btn-login').click()
      cy.wait(5000)
    }
    it('Check to see that you can login with an exists user', () => {
        //check to be in terminusdb - login page
        userLogin()
    })

   
    it('check that you can select a team', ()=>{
        cy.get('#cypress_test').click() //  
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/cypress_test')
        })
    })


    let dataProduct
    it('check that you can create a new dataProduct', ()=>{
        dataProduct = `dataP__${Date.now()}`
        cy.get('#new_data_product').click() // 
        cy.get('input#id').type(dataProduct).trigger('change');
        cy.get('input#label').type(dataProduct).trigger('change');
        cy.get('textarea#description').type(dataProduct).trigger('change');
        cy.get('#create_data_product_button').click()
        cy.get('#home_product_label').then(($label) => {
          cy.wrap($label).should("contain",dataProduct)
        }) 

    })


  const docName =  "Doc01"
  const stringProperty = "name"
  const commit_message_doc = "save new schema, add document"
  const commit_message_prop = "save new schema, add property"
  it('Check that a Document can be create in schema', ()=>{
    // check that the dataproduct is in the dataproduct list
        cy.get('#data_products_model').click()

        cy.get('g#ROOT').click()
        cy.get('g#ROOT').click()
        cy.get('#node_add_children_icon').click().then(($child) => {
        cy.wrap($child).find('#ADD_NEW_ENTITY').click()
        cy.get('#tab-1').should("contain","Document").should('have.class', 'RRT__tab--selected')
            // add document
        cy.get('input#id').type(docName).trigger('change');
            //save document
        cy.get('input#schema_save_description').type(commit_message_doc).blur();
        cy.get('#schema_save_button').click();

        cy.get(`#${docName}`).click()
        cy.get('div.RRT__showmore').click()
        cy.get('#tab-2').click()
        cy.get('#tab-2').should('have.class', 'RRT__tab--selected').should("contain","Properties")
        cy.get('#add_property').find('.dropdown-toggle').click()
        cy.get('#StringProperty').click()
            // add string property
        cy.get('input#id').type(stringProperty).trigger('change');
        cy.get('input#schema_save_description').type(commit_message_prop).blur();
        cy.get('#schema_save_button').click();
        cy.get('#model_schema_left_panel_title').should("contain",`${dataProduct} - Schema`)    
  }) 

})

  const branchName = "branch_test"
  const squash_commit_message = "squash test"
  it('Check that a new branch can be added', ()=>{
    // check that the dataproduct is in the dataproduct list
    cy.get(`a#HOME`).click()
    cy.get(`#home_show_branches`).click()
    cy.get('#home_open_create_new_branch_modal').click() 

     
    cy.get('input#id').type(branchName).blur();
    cy.get('#create_new_branch_button').click()
    // check that the dataproduct is NOT in the dataproduct list
    cy.get("h5.fw-bold.text-success").should("contain" , branchName)
})

it('Check that the new branch has 2 commits', ()=>{
  cy.get(`span[title="View Commit Logs and preform actions on a branch ${branchName}"]`).click()
  // I have 2 commits
  cy.get('tbody').find('td[role="cell"]').find('span').find('span').contains(commit_message_doc)
  cy.get('tbody').find('td[role="cell"]').find('span').find('span').contains(commit_message_prop)

})

  it('Check that the new branch can be squashed', ()=>{
    cy.get('#squash_branch').click()
    cy.get('input#squash').type(squash_commit_message).blur();
    cy.get('#squash_branch_button').click()
    cy.wait(3000)
    cy.get('tbody').find('tr').should('have.length', 1)
    
    cy.get('tbody').find('tr').find('td[role="cell"]').find('span').find('span').contains(squash_commit_message)
  })

  it('Check that the new branch can be deleted', ()=>{
    cy.get('#delete_branch').click()
    cy.get('input#delete').type(branchName).blur()
    cy.get('#delete_branch_button').click()
    cy.get("h5.fw-bold.text-success").should("not.contain" , branchName)
  })

  it('check that you can get a dataProduct', ()=>{
    // check that the dataproduct is in the dataproduct list
    cy.get(`a#HOME`).click()
    cy.get(`#${dataProduct}`).find('span').should("contain",dataProduct)
})


  it('check that you can delete a dataProduct', ()=>{
      // check that the dataproduct is in the dataproduct list
      cy.get('#home_open_delete_product_modal').click() // 
      cy.get(`input#${dataProduct}`).type(dataProduct).trigger('change');
      cy.get('#delete_data_product_button').click()
      cy.get(`#${dataProduct}`).should('not.exist');
  })

  it('Check that the user can logout.', () => {
    cy.get('#profile_menu_arrow').click()
    cy.get('#logout').click()
    //cy.wait(5000) 
    cy.get('h1.hero-banner__heading').should('have.text', 'SIGN UP')
 })
})