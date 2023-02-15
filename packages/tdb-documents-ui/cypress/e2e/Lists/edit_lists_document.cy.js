/// <reference types="cypress" />
import * as menu from "../../../playground/src/menu.constants"
import * as data from "../../../playground/src/data.constants"
import {FRAMES} from "../../../playground/src/frame"
import editJson from "../../fixtures/list_edit.json"


context("Testing List field - EDIT mode ...", () => {
	before(() => {
		cy.visit("http://localhost:3033/")
	})

	it(("Clicks on List Nav"), () => {
		cy.get(`[data-cy=${menu.LIST}]`).click()
	})

	it(("Checks if Frame Viewer is loaded"), () => {
		cy.get(`[data-cy=frame_viewer]`).should('be.visible')
	})

	it("Click on Edit Mode", () => {
		cy.get('[data-cy="edit_mode"]').check({force: true})
	})

	it((`Edit ${menu.LIST_DOCUMENT} using Frame Viewer`), () => {
		for(var item in FRAMES[menu.LIST_DOCUMENT]) {
			if (item === "@documentation") continue
			else if(item === "@key") continue
			else if(item === "@type") continue
			else if(item === "@id") continue
			else if(item === "likes_color") {
				// edit first value
				cy.get(`[id='root_${item}_1']`).select(editJson[item][1], { force: true })
				// add a new value
				cy.get(`[data-cy="add_${item}"]`).click({force: true})
				// find element by index
				let index=editJson[item].length-1
				cy.get(`[id='root_${item}_${index}']`).select(editJson[item][index], { force: true })
			}
			else if(item === "hangs_out_at") {
				// edit first subDocument
				cy.get(`[id='root_${item}_0']`).click({ force: true }).within(() => {
					cy.get("i").click({ force: true }) // Expand Sub Document only one time
					cy.get(`[id='root_hangs_out_at_0_AddressLine1']`).click({ force: true }).clear({force: true}).type(editJson["hangs_out_at"][0]["AddressLine1"])
					cy.get(`[id='root_hangs_out_at_0_Country']`).click({ force: true }).clear({force: true}).type(editJson["hangs_out_at"][0]["Country"])
					cy.get(`[id='root_hangs_out_at_0_City']`).click({ force: true }).clear({force: true}).type(editJson["hangs_out_at"][0]["City"])
					cy.get(`[id='root_hangs_out_at_0_postalCode']`).click({ force: true }).clear({force: true}).type(editJson['hangs_out_at'][0]["postalCode"])
				})
				// add a new subDocument 
				cy.get(`[data-cy="add_${item}"]`).click({force: true})
				// fill in new values
				let index=editJson[item].length-1
				cy.get(`[id='root_${item}_${index}']`).click({ force: true }).within(() => {
					cy.get(`[id='root_hangs_out_at_${index}_AddressLine1']`).click({ force: true }).type(editJson["hangs_out_at"][index]["AddressLine1"])
					cy.get(`[id='root_hangs_out_at_${index}_Country']`).click({ force: true }).type(editJson["hangs_out_at"][index]["Country"])
					cy.get(`[id='root_hangs_out_at_${index}_City']`).click({ force: true }).type(editJson["hangs_out_at"][index]["City"])
					cy.get(`[id='root_hangs_out_at_${index}_postalCode']`).click({ force: true }).type(editJson['hangs_out_at'][index]["postalCode"])
				})
			}
			else if(item === "to_do") {
				// edit second value
				cy.get(`[id='root_${item}_1']`).clear({force: true}).type(editJson[item][1], { force: true })
				// Add new to_do
				cy.get(`[data-cy="add_${item}"]`).click( { force: true })
				// fill in new values
				let index=editJson[item].length-1
				cy.get(`[id='root_${item}_${index}']`).type(editJson[item][index], { force: true })
			}
		}
	})

	it((`Edit List document - ${data.LIST_DOCUMENT["@type"]}`), () => {
		cy.get(`[type='submit'`).click( { force: true })
	})

	it(("Check if Submitted Data equals expected data"), () => {
		cy.get(`[data-cy="data-reader"]`)
			.invoke('val')
			.then(data => {
				cy.log(data)
				cy.fixture("list_edit.json").then((json) => {
					//console.log(" -- expected", json)
					//console.log(" -- extracted", JSON.parse(data))
					assert.deepEqual(JSON.parse(data), json)
				})
			})
	})

})
