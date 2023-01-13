/// <reference types="cypress" />
import * as menu from "../../../playground/src/menu.constants"
import * as data from "../../../playground/src/data.constants"
import {FRAMES} from "../../../playground/src/frame"
import {stringDateTime} from "../utils"
import editJson from "../../fixtures/optional_edit.json"


context("Testing Optional field - EDIT mode ...", () => {
	before(() => {
		cy.visit("http://localhost:3033/")
	})

	it(("Clicks on Optional Nav"), () => {
		cy.get(`[data-cy=${menu.OPTIONAL}]`).click()
	})

	it(("Checks if Frame Viewer is loaded"), () => {
		cy.get(`[data-cy=frame_viewer]`).should('be.visible')
	})

	it("Click on Edit Mode", () => {
		cy.get('[data-cy="edit_mode"]').check({force: true})
	})

	it(("Edit a person to Frame Viewer"), () => {
		for(var item in FRAMES[menu.OPTIONAL_DOCUMENT]) {
			if (item === "@documentation") continue
			else if(item === "@key") continue
			else if(item === "@type") continue
			else if(item === "alternativeAddress") {
				// is subDocument
				cy.get(`[id='root_${item}']`).click({ force: true }).within(() => {
					cy.get("i").click({ force: true }) // Expand Sub Document
					cy.get(`[id='root_alternativeAddress_AddressLine1']`).click({ force: true }).clear().type(editJson["alternativeAddress"]["AddressLine1"])
					cy.get(`[id='root_alternativeAddress_City']`).click({ force: true }).clear().type(editJson["alternativeAddress"]["City"])
					cy.get(`[id='root_alternativeAddress_Country']`).click({ force: true }).clear().type(editJson["alternativeAddress"]["Country"])
					cy.get(`[id='root_alternativeAddress_postalCode']`).click({ force: true }).clear().type(editJson["alternativeAddress"]["postalCode"])
				}) 
			}
			else {
				// is string or number
				let value=editJson[item]
				cy.get(`[id='root_${item}']`).click({ force: true }).clear().type(value) 
			}
		}
	})

	it((`Edit Optional document - ${data.OPTIONAL_DOCUMENT["@type"]}`), () => {
		cy.get(`[type='submit'`).click( { force: true })
	})

	it(("Check if Submitted Data equals expected data"), () => {
		cy.get(`[data-cy="data-reader"]`)
			.invoke('val')
			.then(data => {
				cy.log(data)
				cy.fixture("optional_edit.json").then((json) => {
					console.log(" -- expected", json)
					console.log(" -- extracted", data)
					assert.deepEqual(JSON.parse(data), json)
				})
			})
	})

})
