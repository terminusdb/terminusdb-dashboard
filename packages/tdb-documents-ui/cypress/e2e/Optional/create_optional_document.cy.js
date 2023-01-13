/// <reference types="cypress" />

import * as menu from "../../../playground/src/menu.constants"
import * as data from "../../../playground/src/data.constants"
import {FRAMES} from "../../../playground/src/frame"

context("Testing Optional field - CREATE mode ...", () => {
	before(() => {
		cy.visit("http://localhost:3033/")
	})

	it(("Clicks on Optional Nav"), () => {
		cy.get(`[data-cy=${menu.OPTIONAL}]`).click()
	})

	it(("Checks is Frame Viewer is loaded"), () => {
		cy.get(`[data-cy=frame_viewer]`).should('be.visible')
	})

	it(("Add a person to Frame Viewer"), () => {
		for(var item in FRAMES[menu.OPTIONAL_DOCUMENT]) {
			if (item === "@documentation") continue
			else if(item === "@key") continue
			else if(item === "@type") continue
			else if(item === "@id") continue
			else if(item === "alternativeAddress") {
				// is subDocument
				cy.get(`[id='root_${item}']`).click({ force: true }).within(() => {
					cy.get("i").click({ force: true }) // Expand Sub Document
					cy.get(`[id='root_alternativeAddress_AddressLine1']`).click({ force: true }).type(data.OPTIONAL_DOCUMENT["alternativeAddress"]["AddressLine1"])
					cy.get(`[id='root_alternativeAddress_City']`).click({ force: true }).type(data.OPTIONAL_DOCUMENT["alternativeAddress"]["City"])
					cy.get(`[id='root_alternativeAddress_Country']`).click({ force: true }).type(data.OPTIONAL_DOCUMENT["alternativeAddress"]["Country"])
					cy.get(`[id='root_alternativeAddress_postalCode']`).click({ force: true }).type(data.OPTIONAL_DOCUMENT["alternativeAddress"]["postalCode"])
				}) 
			}
			else {
				// is string or number
				let value=data.OPTIONAL_DOCUMENT[item]
				cy.get(`[id='root_${item}']`).click({ force: true }).type(value) 
			}
		}
	})

	it((`Create Optional document - ${data.OPTIONAL_DOCUMENT["@type"]}`), () => {
		cy.get(`[type='submit'`).click( { force: true })
	})

	it(("Check if Submitted Data equals expected data"), () => {
		cy.get(`[data-cy="data-reader"]`)
			.invoke('val')
			.then(data => {
				cy.log(data)
				cy.fixture("optional_create.json").then((json) => {
					console.log("expected", json )
					console.log("actual", json )
					assert.deepEqual(JSON.parse(data), json)
				})
			})
	})
})
