/// <reference types="cypress" />

import * as menu from "../../../playground/src/menu.constants"
import * as data from "../../../playground/src/data.constants"
import {FRAMES} from "../../../playground/src/frame"
import {stringDateTime} from "../utils"
import editJson from "../../fixtures/choice_subDocument_edit.json"

/** At this stage - terminusdb-documents-ui does not support change of choices on list & set choice subdocuments */
context("Testing Choice Sub Documents fields - EDIT mode ...", () => {
	before(() => {
		cy.visit("http://localhost:3033/")
	})

	it(("Clicks on Advanced Nav"), () => {
		cy.get(`[data-cy=${menu.ADVANCED_CHOICES}]`).click()
	})

	it(("Clicks on Choice Sub Documents Nav"), () => {
		cy.get(`[data-cy=${menu.DATA_CY_CHOICE_SUB_DOCUMENTS}]`).click()
	})

	it(("Checks if Frame Viewer is loaded"), () => {
		cy.get(`[data-cy=frame_viewer]`).should('be.visible')
	})

	it("Click on Edit Mode", () => {
		cy.get('[data-cy="edit_mode"]').check({force: true})
	})

	it((`Edit ${menu.CHOICE_SUBDOCUMENTS} to Frame Viewer`), () => {
		for(let item in FRAMES[menu.CHOICE_CLASSES_SUBDOCUMENT_DOCUMENT]) {
			if (item === "@documentation") continue
			else if(item === "@key") continue
			else if(item === "@type") continue
			else if(item === "@id") continue
			else if(item === "favorite_subject") { // Testing Mandatory Choice Sub Document
				
				// get Botony's form
				cy.get(`[id="root_${item}"]`).within(() => {
					// add grade
					cy.get(`[id="root_Grade"]`).click( {force: true} ).clear( {force: true} ).type(editJson[item]["Grade"])
					
					// add Number_of_classes_attended
					cy.get(`[id="root_Number_of_classes_attended"]`).click( {force: true} ).clear( {force: true} ).type(editJson[item]["Number_of_classes_attended"])
					
					// add course_start_date
					let {dateArray, timeArray}=stringDateTime(editJson[item]["course_start_date"])
					let fieldName="course_start_date"
					cy.get(`[id='root_${fieldName}_year']`).select(dateArray[0], { force: true })
					cy.get(`[id='root_${fieldName}_month']`).select(dateArray[1], { force: true })
					cy.get(`[id='root_${fieldName}_day']`).select(dateArray[2], { force: true })
					cy.get(`[id='root_${fieldName}_hour']`).select(timeArray[0], { force: true })
					cy.get(`[id='root_${fieldName}_minute']`).select(timeArray[1], { force: true })
					cy.get(`[id='root_${fieldName}_second']`).select(timeArray[2], { force: true })

					// add number_of_assignments
					cy.get(`[id="root_number_of_assignments"]`).click( {force: true} ).clear( {force: true} ).type(editJson[item]["number_of_assignments"])
				})

			}
			else if(item === "second_favorite_subject") { //Testing Optional Choice Sub Document
			
				// get Zoology's form
				cy.get(`[id="root_${item}"]`).within(() => {
					// add grade
					cy.get(`[id="root_Grade"]`).click( {force: true} ).clear( {force: true} ).type(editJson[item]["Grade"])
					
					// add Notes
					cy.get(`[id="root_Notes"]`).click( {force: true} ).clear( {force: true} ).type(editJson[item]["Notes"])
					
					// add Number_of_classes_attended
					cy.get(`[id="root_Number_of_classes_attended"]`).click( {force: true} ).clear( {force: true} ).type(editJson[item]["Number_of_classes_attended"])
					
					// add course_start_date
					let {dateArray, timeArray}=stringDateTime(editJson[item]["course_start_date"])
					let fieldName="course_start_date"
					cy.get(`[id='root_${fieldName}_year']`).select(dateArray[0], { force: true })
					cy.get(`[id='root_${fieldName}_month']`).select(dateArray[1], { force: true })
					cy.get(`[id='root_${fieldName}_day']`).select(dateArray[2], { force: true })
					cy.get(`[id='root_${fieldName}_hour']`).select(timeArray[0], { force: true })
					cy.get(`[id='root_${fieldName}_minute']`).select(timeArray[1], { force: true })
					cy.get(`[id='root_${fieldName}_second']`).select(timeArray[2], { force: true })

				})
			}
			else if(item === "studied") { //Testing Set Choice Sub Document
				editJson[item].map((el, index) => {

					// get Botony's form
					if(el["@type"] === "Botony") {
						cy.get(`[id="root_${item}_${index}"]`).within(() => {
							// add grade
							cy.get(`[id="root_${item}_${index}_Grade"]`).click( {force: true} ).clear( {force: true} ).type(el["Grade"])
							
							// add Number_of_classes_attended
							cy.get(`[id="root_${item}_${index}_Number_of_classes_attended"]`).clear( {force: true} ).click( {force: true} ).type(el["Number_of_classes_attended"])
							
							// add number_of_assignments
							cy.get(`[id="root_${item}_${index}_number_of_assignments"]`).click( {force: true} ).clear( {force: true} ).type(el["number_of_assignments"])
						})
					}
					// get Math's form
					else if(el["@type"] === "Maths") {
						cy.get(`[id="root_${item}_${index}"]`).within(() => {
							// add Number_of_classes_attended
							cy.get(`[id="root_${item}_${index}_Number_of_classes_attended"]`).click( {force: true} ).clear( {force: true} ).type(el["Number_of_classes_attended"])
				
							// add level
							cy.get(`[id="root_${item}_${index}_level"]`).click( {force: true} ).clear( {force: true} ).type(el["level"])

						})
					}
					
				})
			}
			else if(item === "study_time_table") { //Testing List Choice Sub Document
				editJson[item].map((el, index) => {
					// get Zoology's form
					if(el["@type"] === "Zoology") {
						cy.get(`[id="root_${item}_${index}"]`).within(() => {
							// add grade
							cy.get(`[id="root_${item}_${index}_Grade"]`).click( {force: true} ).clear( {force: true} ).type(el["Grade"])
							
							// add Notes
							cy.get(`[id="root_${item}_${index}_Notes"]`).click( {force: true} ).clear( {force: true} ).type(el["Notes"])
							
							// add Number_of_classes_attended
							cy.get(`[id="root_${item}_${index}_Number_of_classes_attended"]`).click( {force: true} ).clear( {force: true} ).type(el["Number_of_classes_attended"])
						})
					}
					// get Botony's form
					else if(el["@type"] === "Botony") {
						cy.get(`[id="root_${item}_${index}"]`).within(() => {
							// add grade
							cy.get(`[id="root_${item}_${index}_Grade"]`).click( {force: true} ).clear( {force: true} ).type(el["Grade"])
							
							// add Number_of_classes_attended
							cy.get(`[id="root_${item}_${index}_Number_of_classes_attended"]`).click( {force: true} ).clear( {force: true} ).type(el["Number_of_classes_attended"])
						
							// add number_of_assignments
							cy.get(`[id="root_${item}_${index}_number_of_assignments"]`).click( {force: true} ).clear( {force: true} ).type(el["number_of_assignments"])
						})
					}
				})
			}
		}
	})

	it((`Edit ${menu.CHOICE_SUBDOCUMENTS} document - ${data.CHOICE_SUB_DOCUMENT["@type"]}`), () => {
		cy.get(`[type='submit'`).click( { force: true })
	})

	it(("Check if Submitted Data equals expected data"), () => {
		cy.get(`[data-cy="data-reader"]`)
			.invoke('val')
			.then(data => {
				cy.log(data)
				cy.fixture("choice_subDocument_edit.json").then((json) => {
					assert.deepEqual(JSON.parse(data), json)
				})
			})
	})
})
