/// <reference types="cypress" />

import * as menu from "../../../playground/src/menu.constants"
import * as data from "../../../playground/src/data.constants"
import {FRAMES} from "../../../playground/src/frame"
import {stringDateTime} from "../utils"

context("Testing Choice Documents fields - CREATE mode ...", () => {
	before(() => {
		cy.visit("http://localhost:3033/")
	})

	it(("Clicks on Advanced Nav"), () => {
		cy.get(`[data-cy=${menu.ADVANCED_CHOICES}]`).click()
	})

	it(("Clicks on Choice Documents Nav"), () => {
		cy.get(`[data-cy=${menu.DATA_CY_CHOICE_DOCUMENTS}]`).click()
	})

	it(("Checks if Frame Viewer is loaded"), () => {
		cy.get(`[data-cy=frame_viewer]`).should('be.visible')
	})

	it("Click on Create Mode", () => {
		cy.get('[data-cy="create_mode"]').check({force: true})
	})

	it((`Add a ${menu.CHOICE_DOCUMENTS} to Frame Viewer`), () => {
		for(let item in FRAMES[menu.CHOICE_DOCUMENTS]) {
			if (item === "@documentation") continue
			else if(item === "@key") continue
			else if(item === "@type") continue
			else if(item === "@id") continue
			else if(item === "favorite_group") { // Testing Mandatory Choice  Document 
				// select Art
				let choice=FRAMES[item][0] 
				cy.get(`[id="root_${item}__anyof_select"]`).select(choice, { force: true })

				// get Art's form
				cy.get(`[id="root_${item}"]`).within(() => {
					cy.find("input").should('have.id', `react-select-2-input`).click().type("Art/Charcoal%20Art%20Group", { force: true })
				})
				

			}
		}
	})

	it((`Create ${menu.CHOICE_DOCUMENTS} document - ${data.CHOICE_CLASSES_DOCUMENT["@type"]}`), () => {
		cy.get(`[type='submit'`).click( { force: true })
	})

	it(("Check if Submitted Data equals expected data"), () => {
		cy.get(`[data-cy="data-reader"]`)
			.invoke('val')
			.then(data => {
				cy.log(data)
				cy.fixture("choice_Document_create.json").then((json) => {
					assert.deepEqual(JSON.parse(data), json)
				})
			})
	})
})
