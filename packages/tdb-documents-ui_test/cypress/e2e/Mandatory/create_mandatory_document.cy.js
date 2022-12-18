/// <reference types="cypress" />

import * as menu from "../../../playground/src/menu.constants"
import * as data from "../../../playground/src/data.constants"
import {FRAMES} from "../../../playground/src/frame"
import {stringDateTime} from "../utils"

context("Testing Mandatory field - CREATE mode ...", () => {
	before(() => {
		cy.visit("http://localhost:3033/")
	})

	it(("Clicks on Mandatory Nav"), () => {
		cy.get(`[data-cy=${menu.MANDATORY}]`).click()
	})

	it(("Checks is Frame Viewer is loaded"), () => {
		cy.get(`[data-cy=frame_viewer]`).should('be.visible')
	})

	it(("Add a person to Frame Viewer"), () => {
		for(var item in FRAMES[menu.MANDATORY_DOCUMENT]) {
			if (item === "@documentation") continue
			else if(item === "@key") continue
			else if(item === "@type") continue
			else if(item === "Birthday") {
				// is date
				let {dateArray, timeArray}=stringDateTime(data.MANDATORY_DOCUMENT[item])
				cy.get(`[id='root_${item}_year']`).select(dateArray[0], { force: true })
				cy.get(`[id='root_${item}_month']`).select(dateArray[1], { force: true })
				cy.get(`[id='root_${item}_day']`).select(dateArray[2], { force: true })
				cy.get(`[id='root_${item}_hour']`).select(timeArray[0], { force: true })
				cy.get(`[id='root_${item}_minute']`).select(timeArray[1], { force: true })
				cy.get(`[id='root_${item}_second']`).select(timeArray[2], { force: true })
			}
			else if(item === "Today") {
				// is date
				let {dateArray, timeArray}=stringDateTime(data.MANDATORY_DOCUMENT[item])
				cy.get(`[id='root_${item}_year']`).select(dateArray[0], { force: true })
				cy.get(`[id='root_${item}_month']`).select(dateArray[1], { force: true })
				cy.get(`[id='root_${item}_day']`).select(dateArray[2], { force: true })
				cy.get(`[id='root_${item}_hour']`).select(timeArray[0], { force: true })
				cy.get(`[id='root_${item}_minute']`).select(timeArray[1], { force: true })
				cy.get(`[id='root_${item}_second']`).select(timeArray[2], { force: true })
			}
			else if(item === "above18") {
				// is boolean
				cy.get(`[id='root_${item}']`).click({ force: true })
			}
			else if(item === "permanentAddress") {
				// is subDocument
				cy.get(`[id='root_${item}']`).click({ force: true }).within(() => {
					cy.get("i").click({ force: true }) // Expand Sub Document
					cy.get(`[id='root_permanentAddress_AddressLine1']`).click({ force: true }).type(data.MANDATORY_DOCUMENT["permanentAddress"]["AddressLine1"])
					cy.get(`[id='root_permanentAddress_Country']`).click({ force: true }).type(data.MANDATORY_DOCUMENT["permanentAddress"]["Country"])
					cy.get(`[id='root_permanentAddress_City']`).click({ force: true }).type(data.MANDATORY_DOCUMENT["permanentAddress"]["City"])
					cy.get(`[id='root_permanentAddress_postalCode']`).click({ force: true }).type(data.MANDATORY_DOCUMENT['permanentAddress']["postalCode"])
				}) 
			}
			else {
				// is string or number
				let value=data.MANDATORY_DOCUMENT[item]
				cy.get(`[id='root_${item}']`).click({ force: true }).type(value) 
			}
		}
	})

	it(("Create Mandatory document - Person"), () => {
		cy.get(`[type='submit'`).click( { force: true })
	})

	it(("Check if Submitted Data equals expected data"), () => {
		cy.get(`[data-cy="data-reader"]`)
			.invoke('val')
			.then(data => {
				cy.log(data)
				cy.fixture("mandatory_create.json").then((json) => {
					assert.deepEqual(JSON.parse(data), json)
				})
			})
	})
})
