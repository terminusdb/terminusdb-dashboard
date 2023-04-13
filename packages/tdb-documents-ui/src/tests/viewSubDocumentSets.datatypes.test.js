import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/subDocumentSets.datatypes.constants.js"
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';


function checkIfFieldsAreFilled(index, input) {

	// expect Address line 1 to be filled
	const addressLineInput = document.getElementById(`root_previous_addresses_${index}__${index}_AddressLine1`)
	expect(addressLineInput).toBeInTheDocument()
	expect(addressLineInput.value).toStrictEqual(input["AddressLine1"])

	const cityInput = document.getElementById(`root_previous_addresses_${index}__${index}_City`)
  expect(cityInput).toBeInTheDocument()
	expect(cityInput.value).toStrictEqual(input["City"])

	// enter a Country
  const countryInput = document.getElementById(`root_previous_addresses_${index}__${index}_Country`)
  expect(countryInput).toBeInTheDocument()
	expect(countryInput.value).toStrictEqual(input["Country"])

  // enter postal code
  const postalCodeInput = document.getElementById(`root_previous_addresses_${index}__${index}_postalCode`)
  expect(postalCodeInput).toBeInTheDocument()
	expect(postalCodeInput.value).toStrictEqual(input["postalCode"])

 
} 

/**
 * View a Student document with with property previous_addresses which is linked to 
 * subdoucment Address
 */
describe("Test Subdocuments - View SETs", () => {

	// view a subdocument type property 
	test("View SubDocument type property - SETs ", async () => {

		// render FrameViewer in View mode
		const { container } = render(<FrameViewer frame={CONST.VIEW_CONFIG.frame}
			type={CONST.VIEW_CONFIG.type}
			uiFrame={CONST.VIEW_CONFIG.uiFrame}
			formData={CONST.VIEW_CONFIG.formData}
			mode={CONST.VIEW_CONFIG.mode}
			/>
		)
		
		logRoles(container)
		// check for first entry 
		checkIfFieldsAreFilled(0, CONST.VIEW_CONFIG.formData["previous_addresses"][0]) 

		// check for second entry 
		checkIfFieldsAreFilled(1, CONST.VIEW_CONFIG.formData["previous_addresses"][1]) 
		
		
	})

})

