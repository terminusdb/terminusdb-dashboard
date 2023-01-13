/// <reference types="cypress" />

import * as menu from "../../../playground/src/menu.constants"
import * as data from "../../../playground/src/data.constants"
import {FRAMES} from "../../../playground/src/frame"

context("Testing List fields - CREATE mode ...", () => {
	before(() => {
		cy.visit("http://localhost:3033/")
	})

	it(("Clicks on List Nav"), () => {
		cy.get(`[data-cy=${menu.LIST}]`).click()
	})

	it(("Checks if Frame Viewer is loaded"), () => {
		cy.get(`[data-cy=frame_viewer]`).should('be.visible')
	})

	it("Click on Create Mode", () => {
		cy.get('[data-cy="create_mode"]').check({force: true})
	})

	it((`Add a ${menu.LIST_DOCUMENT} to Frame Viewer`), () => {
		for(var item in FRAMES[menu.LIST_DOCUMENT]) {
			if (item === "@documentation") continue
			else if(item === "@key") continue
			else if(item === "@type") continue
			else if(item === "@id") continue
			else if(item === "likes_color") {
				for(let index=0; index<data.LIST_DOCUMENT[item].length; index++) {
					cy.get(`[data-cy="add_${item}"]`).click()
					cy.get(`[id='root_${item}_${index}']`).select(data.LIST_DOCUMENT[item][index], { force: true })
				}
			}
			else if(item === "hangs_out_at") {
				for(let index=0; index<data.LIST_DOCUMENT[item].length; index++) {
					cy.get(`[data-cy="add_${item}"]`).click()

					// subDocument
					cy.get(`[id='root_${item}_${index}']`).click({ force: true }).within(() => {
						if(index===0) cy.get("i").click({ force: true }) // Expand Sub Document only one time
						cy.get(`[id='root_hangs_out_at_${index}_AddressLine1']`).click({ force: true }).type(data.LIST_DOCUMENT["hangs_out_at"][index]["AddressLine1"])
						cy.get(`[id='root_hangs_out_at_${index}_Country']`).click({ force: true }).type(data.LIST_DOCUMENT["hangs_out_at"][index]["Country"])
						cy.get(`[id='root_hangs_out_at_${index}_City']`).click({ force: true }).type(data.LIST_DOCUMENT["hangs_out_at"][index]["City"])
						cy.get(`[id='root_hangs_out_at_${index}_postalCode']`).click({ force: true }).type(data.LIST_DOCUMENT['hangs_out_at'][index]["postalCode"])
					})

				}
			}
			else if(item === "to_do") {
				for(let index=0; index<data.LIST_DOCUMENT[item].length; index++) {
					cy.get(`[data-cy="add_${item}"]`).click()
					cy.get(`[id='root_${item}_${index}']`).type(data.LIST_DOCUMENT[item][index], { force: true })
				
				}
			}
		}
	})

	it((`Create List document - ${data.LIST_DOCUMENT["@type"]}`), () => {
		cy.get(`[type='submit'`).click( { force: true })
	})

	it(("Check if Submitted Data equals expected data"), () => {
		cy.get(`[data-cy="data-reader"]`)
			.invoke('val')
			.then(data => {
				cy.log(data)
				cy.fixture("list_create.json").then((json) => {
					assert.deepEqual(JSON.parse(data), json)
				})
			})
	})
})
