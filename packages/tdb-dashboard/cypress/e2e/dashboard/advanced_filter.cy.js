import * as CONST from "../../../src/cypress.constants"
import { IconBarConfig } from "../../../src/components/constants"
import { EXAMPLES_PRODUCTS } from "../../../src/routing/constants"
const teamName = Cypress.env('TEAM_NAME')
const dataProduct="star_wars"

describe(`Test Advanced Filters in document explorer`, () => {
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

  // select Terminusdb_demo team 
  it('Select Team', () => {
    cy.selectTeam(teamName)
  })

  //Clone Starwars team
  it('Clone Starwars team', () => {
    cy.intercept(`/${teamName}/${dataProduct}`).as('cloaning')
    cy.get(`button[data-cy=${CONST.CLONE_BUTTON}_${dataProduct}]`).should('exist').click();
    cy.wait('@cloaning')
  }) 

  // Go to Document Explorer
  it("Go to Document Explorer", () => {
    cy.visit(`/CYPRESS_TEST_TEAM/star_wars`)
    cy.get(`a[data-cy=${IconBarConfig.documentExplorer.key}]`).should('exist').click();
  })

  // Click on People to view documents of type People
  // Go to Document Explorer
  it("Go to Document Explorer and Click on People to view documents of type People", () => {
    cy.get(`button[id="People"]`).should('exist').click();
    cy.wait(1000)
  })
 
  // Click on  Advanced filter and add rule
  it("Click on  Advanced filter and add rule", () => {
    cy.get(`h2[data-cy="Advanced filter"]`).should('exist').click();
    cy.get("button").contains("Add rule").should('exist').click();
  })

  // Advanced filter - contains
  it("Test Advanced filter - contains Skywalker & should filter out three results", () => {
    cy.get(`.rule--field select`).should('exist').select('label')
    cy.get(`.rule--operator select`).should('exist').select('Contains')
    cy.get(`.widget--widget input`).should('exist').type('Skywalker')
    cy.get("button").contains("Filter Data").should('exist').click();
    cy.get(`span[data-cy="Luke Skywalker"]`).contains("Luke Skywalker").should('exist')
    cy.get(`span[data-cy="Anakin Skywalker"]`).contains("Anakin Skywalker").should('exist')
    cy.get(`span[data-cy="Shmi Skywalker"]`).contains("Shmi Skywalker").should('exist')
    cy.get("table tbody").find("tr").then((row) => {
      expect(row.length).eq(3)
    });
  })

  // Advanced filter - Equals
  it("Test Advanced filter - Equals to Luke Skywalker & should filter one result", () => {
    cy.get(`.rule--field select`).should('exist').select('label')
    cy.get(`.rule--operator select`).should('exist').select('==')
    cy.get(`.widget--widget input`).should('exist').clear()
    cy.get(`.widget--widget input`).type('Luke Skywalker')
    cy.get("button").contains("Filter Data").should('exist').click();
    cy.get(`span[data-cy="Luke Skywalker"]`).contains("Luke Skywalker").should('exist')
    cy.get("table tbody").find("tr").then((row) => {
      expect(row.length).eq(1)
    });
  })

  // Group filter - mixed parameters
  it("Test Group filter - mixed parameters Name contains Skywalker | eye_color is blue", () => {
    cy.get(`.rule--field select`).should('exist').select('label')
    cy.get(`.rule--operator select`).should('exist').select('Contains')
    cy.get(`.widget--widget input`).should('exist').clear()
    cy.get(`.widget--widget input`).type('Skywalker')
    cy.get("button").contains("Filter Data").should('exist').click();
    cy.get("table tbody").find("tr").then((row) => {
      expect(row.length).eq(3)
    });
    // add a group 
    cy.get("button").contains("Add group").should('exist').click();
    cy.get('.one--child .rule--field select').should('exist').select('eye_color')
    cy.get(`.one--child .widget--widget input`).type('blue')
    cy.get("button").contains("Filter Data").should('exist').click();
    // Shmi Skywalker does not have blue eye
    cy.get(`span`).contains("Shmi Skywalker").should('not.exist')
    cy.get("table tbody").find("tr").then((row) => {
      expect(row.length).eq(2)
    });
  })

  // Go to Document Explorer
  it("Go to Document Explorer", () => {
    cy.get(`a[data-cy=${IconBarConfig.documentExplorer.key}]`).should('exist').click();
  })

  // Click on People to view documents of type People
  // Go to Document Explorer
  it("Go to Document Explorer and Click on People to view documents of type People", () => {
    cy.get(`button[id="People"]`).should('exist').click();
    cy.wait(1000)
  })

  // Click on  Advanced filter and add rule
  it("Click on  Advanced filter and add rule", () => {
    cy.get(`h2[data-cy="Advanced filter"]`).should('exist').click();
    cy.get("button").contains("Add rule").should('exist').click();
  })

  // And Filter
  it("And filter - Name contains Skywalker AND gender is female", () => {

    cy.get(`.rule--field select`).should('exist').select('label')
    cy.get(`.rule--operator select`).should('exist').select('Contains')
    cy.get(`.widget--widget input`).should('exist').clear()
    cy.get(`.widget--widget input`).type('Skywalker')
    cy.get("button").contains("Filter Data").should('exist').click();
    cy.get("table tbody").find("tr").then((row) => {
      expect(row.length).eq(3)
    });
    // add a group 
    cy.get("button").contains("Add rule").should('exist').click();
    cy.get('.rule--field select').last().should('exist').select('gender')
    cy.get(`.widget--widget input`).last().type('female')
    cy.get("button").contains("Filter Data").should('exist').click();
    // Shmi Skywalker should be the only female
    cy.get(`span[data-cy="Shmi Skywalker"]`).contains("Shmi Skywalker").should('exist')
    cy.get("table tbody").find("tr").then((row) => {
      expect(row.length).eq(1)
    });
  })

  // Or Filter
  it("Or filter - Name contains Skywalker OR gender is female", () => {
   cy.get(`input[value="OR"]`).should('exist').click();
   cy.get("button").contains("Filter Data").should('exist').click();
   cy.wait(1000)
   cy.get("table tbody").find("tr").then((row) => {
      expect(row.length).not.eq(3)
    });
  })

  // Go to Document Explorer
  it("Go to Document Explorer", () => {
    cy.get(`a[data-cy=${IconBarConfig.documentExplorer.key}]`).should('exist').click();
  })

  // Click on People to view documents of type People
  // Go to Document Explorer
  it("Go to Document Explorer and Click on People to view documents of type People", () => {
    cy.get(`button[id="People"]`).should('exist').click();
  })

  // Click on  Advanced filter and add rule
  it("Click on  Advanced filter and add rule", () => {
    cy.get(`h2[data-cy="Advanced filter"]`).should('exist').click();
    cy.get("button").contains("Add rule").should('exist').click();
  })


  // Not Filter
  it("Not filter - eye color is NOT blue", () => {
   
    
    cy.get(`.rule--field select`).should('exist').select('eye_color')
    cy.get(`.rule--operator select`).should('exist').select('==')
    cy.get(`.widget--widget input`).should('exist').clear()
    cy.get(`.widget--widget input`).type('blue')
    cy.get(`input[type="checkbox"]`).should('exist').click();
    cy.get("button").contains("Filter Data").should('exist').click();
    cy.get(`span`).contains("brown").should('not.exist')
   })



  // Go to Document Explorer
  it("Go to Document Explorer", () => {
    cy.get(`a[data-cy=${IconBarConfig.documentExplorer.key}]`).should('exist').click();
  })

  // Click on People to view documents of type Film
  // Go to Document Explorer
  it("Go to Document Explorer and Click on Film to view documents of type Films", () => {
    cy.get(`button[id="Film"]`).should('exist').click();
    cy.wait(1000)
  })

  // Click on  Advanced filter and add rule
  it("Click on  Advanced filter and add rule", () => {
    cy.get(`h2[data-cy="Advanced filter"]`).should('exist').click();
    cy.get("button").contains("Add rule").should('exist').click();
  })

  // Advanced filter - Does Not Equal Attack of the Clones
  it("Test Advanced filter - Does Not Equal to Attack of the Clones & should filter 6 results", () => {
    cy.get(`.rule--field select`).should('exist').select('label')
    cy.get(`.rule--operator select`).should('exist').select('!=')
    cy.get(`.widget--widget input`).should('exist').type('Attack of the Clones')
    cy.get("button").contains("Filter Data").should('exist').click();
    cy.get(`span`).contains("Attack of the Clones").should('not.exist')
    cy.get("table tbody").find("tr").then((row) => {
      expect(row.length).eq(6)
    });
  })

  // Go to Document Explorer
  it("Go to Document Explorer", () => {
    cy.get(`a[data-cy=${IconBarConfig.documentExplorer.key}]`).should('exist').click();
  })

  // Click on People to view documents of type People
  // Go to Document Explorer
  it("Go to Document Explorer and Click on People to view documents of type People", () => {
    cy.get(`button[id="People"]`).should('exist').click();
  })

  // Regex filter from table
  it("Test Advanced filter - Regex filter from table - search for Sky in label & height 188", () => {
    /*cy.get(`input[data-cy="label"]`).focus().type('sky{enter}')
    cy.wait(2000)
    cy.get(`span[data-cy="Luke Skywalker"]`).contains("Luke Skywalker").should('exist')
    cy.get(`span[data-cy="Anakin Skywalker"]`).contains("Anakin Skywalker").should('exist')
    //cy.get(`span[data-cy="Shmi Skywalker"]`).contains("Shmi Skywalker").should('exist')
    /*cy.get("table tbody").find("tr").then((row) => {
      expect(row.length).eq()
    });*/
    cy.get(`input[data-cy="mass"]`).then(function($input){
      $input[0].setAttribute('value', `77`)
    })
    .should('have.attr', 'value', `77`)
    //cy.wait(1000)
    /*cy.get(`span[data-cy="Anakin Skywalker"]`).contains("Shmi Skywalker").should('exist')
    cy.get("table tbody").find("tr").then((row) => {
      expect(row.length).eq(1)
    });*/
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