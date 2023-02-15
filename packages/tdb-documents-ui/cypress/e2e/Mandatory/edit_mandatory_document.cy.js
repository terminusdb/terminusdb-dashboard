/// <reference types="cypress" />
import * as menu from "../../../playground/src/menu.constants"
import * as data from "../../../playground/src/data.constants"
import {FRAMES} from "../../../playground/src/frame"
import {stringDateTime} from "../utils"
import editJson from "../../fixtures/mandatory_edit.json"


context("Testing Mandatory field - EDIT mode ...", () => {
	before(() => {
		cy.visit("http://localhost:3033/")
	})

	it(("Checks is Frame Viewer is loaded"), () => {
		cy.get(`[data-cy=frame_viewer]`).should('be.visible')
	})

	it("Click on Edit Mode", () => {
		cy.get('[data-cy="edit_mode"]').check({force: true})
	})
	console.log("editJson", editJson)

	it(("Edit a person to Frame Viewer"), () => {
		for(var item in FRAMES[menu.MANDATORY_DOCUMENT]) {
			if (item === "@documentation") continue
			else if(item === "@key") continue
			else if(item === "@type") continue
			else if(item === "Birthday") continue
			else if(item === "Today") continue
			else if(item === "above18") continue
			else if(item === "permanentAddress") {
				// is subDocument
				cy.get(`[id='root_${item}']`).click({ force: true }).within(() => {
					cy.get("i").click({ force: true }) // Expand Sub Document
					cy.get(`[id='root_permanentAddress_AddressLine1']`).clear({ force: true })
					cy.get(`[id='root_permanentAddress_AddressLine1']`).click({ force: true }).type(editJson["permanentAddress"]["AddressLine1"])
					cy.get(`[id='root_permanentAddress_Country']`).clear({ force: true })
					cy.get(`[id='root_permanentAddress_Country']`).click({ force: true }).type(editJson["permanentAddress"]["Country"])
					cy.get(`[id='root_permanentAddress_City']`).clear({ force: true })
					cy.get(`[id='root_permanentAddress_City']`).click({ force: true }).type(editJson["permanentAddress"]["City"])
					cy.get(`[id='root_permanentAddress_postalCode']`).clear({ force: true })
					cy.get(`[id='root_permanentAddress_postalCode']`).click({ force: true }).type(editJson['permanentAddress']["postalCode"])
				}) 
			}
			else {
				// is string or number
				let value=editJson[item]
				cy.get(`[id='root_${item}']`).click({ force: true }).clear().type(value) 
			}
		}
	})

	it(("Edit Mandatory document - Person"), () => {
		cy.get(`[type='submit'`).click( { force: true })
	})

	it(("Check if Submitted Data equals expected data"), () => {
		cy.get(`[data-cy="data-reader"]`)
			.invoke('val')
			.then(data => {
				cy.log(data)
				cy.fixture("mandatory_edit.json").then((json) => {
					assert.deepEqual(JSON.parse(data), json)
				})
			})
	})

})
