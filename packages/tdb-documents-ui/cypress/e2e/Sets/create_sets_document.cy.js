/// <reference types="cypress" />

import * as menu from "../../../playground/src/menu.constants"
import * as data from "../../../playground/src/data.constants"
import {FRAMES} from "../../../playground/src/frame"

context("Testing Set fields - CREATE mode ...", () => {
	before(() => {
		cy.visit("http://localhost:3033/")
	})

	it(("Clicks on Set Nav"), () => {
		cy.get(`[data-cy=${menu.SET}]`).click()
	})

	it(("Checks if Frame Viewer is loaded"), () => {
		cy.get(`[data-cy=frame_viewer]`).should('be.visible')
	})

	it("Click on Create Mode", () => {
		cy.get('[data-cy="create_mode"]').check({force: true})
	})

	it((`Add a ${menu.SET_DOCUMENT} to Frame Viewer`), () => {
		for(var item in FRAMES[menu.SET_DOCUMENT]) {
			if (item === "@documentation") continue
			else if(item === "@key") continue
			else if(item === "@type") continue
			else if(item === "@id") continue
			else if(item === "likes_color") {
				for(let index=0; index<data.SET_DOCUMENT[item].length; index++) {
					cy.get(`[data-cy="add_${item}"]`).click()
					cy.get(`[id='root_${item}_${index}']`).select(data.SET_DOCUMENT[item][index], { force: true })
				}
			}
			else if(item === "lived_at") {
				for(let index=0; index<data.SET_DOCUMENT[item].length; index++) {
					cy.get(`[data-cy="add_${item}"]`).click()

					// subDocument
					cy.get(`[id='root_${item}_${index}']`).click({ force: true }).within(() => {
						if(index===0) cy.get("i").click({ force: true }) // Expand Sub Document only one time
						cy.get(`[id='root_lived_at_${index}_AddressLine1']`).click({ force: true }).type(data.SET_DOCUMENT["lived_at"][index]["AddressLine1"])
						cy.get(`[id='root_lived_at_${index}_Country']`).click({ force: true }).type(data.SET_DOCUMENT["lived_at"][index]["Country"])
						cy.get(`[id='root_lived_at_${index}_City']`).click({ force: true }).type(data.SET_DOCUMENT["lived_at"][index]["City"])
						cy.get(`[id='root_lived_at_${index}_postalCode']`).click({ force: true }).type(data.SET_DOCUMENT['lived_at'][index]["postalCode"])
					})

				}
			}
			else if(item === "nicknames") {
				for(let index=0; index<data.SET_DOCUMENT[item].length; index++) {
					cy.get(`[data-cy="add_${item}"]`).click()
					cy.get(`[id='root_${item}_${index}']`).type(data.SET_DOCUMENT[item][index], { force: true })
				
				}
			}
			else if(item === "worked_as") {
				cy.get(`[data-cy="add_${item}"]`).click()
				cy.get(`[data-cy="test_cy_${item}"]`).find("input").should('have.id', `react-select-2-input`).click().type("Designer{enter}", { force: true })
				//cy.get(`[data-cy="add_${item}"]`).click()
				//cy.get("input").should('have.id', `react-select-3-input`).type("Writter{enter}", { force: true })
				
			}
		}
	})

	it((`Create Set document - ${data.SET_DOCUMENT["@type"]}`), () => {
		cy.get(`[type='submit'`).click( { force: true })
	})

	it(("Check if Submitted Data equals expected data"), () => {
		cy.get(`[data-cy="data-reader"]`)
			.invoke('val')
			.then(data => {
				cy.log(data)
				cy.fixture("set_create.json").then((json) => {
					assert.deepEqual(JSON.parse(data), json)
				})
			})
	})
})
