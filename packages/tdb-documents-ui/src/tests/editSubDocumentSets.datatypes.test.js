import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/subDocumentSets.datatypes.constants.js"
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';

// add fields 
function addFields (index, input) {
  // enter a Address line 1
  const addressLineInput = document.getElementById(`root_previous_addresses_${index}__${index}_AddressLine1`)
  expect(addressLineInput).toBeInTheDocument()
  fireEvent.change(addressLineInput, { target: { value: input["AddressLine1"] } })

  // enter a City
  const cityInput = document.getElementById(`root_previous_addresses_${index}__${index}_City`)
  expect(cityInput).toBeInTheDocument()
  fireEvent.change(cityInput, { target: { value: input["City"] } })

  // enter a Country
  const countryInput = document.getElementById(`root_previous_addresses_${index}__${index}_Country`)
  expect(countryInput).toBeInTheDocument()
  fireEvent.change(countryInput, { target: { value: input["Country"] } })

  // enter postal code
  const postalCodeInput = document.getElementById(`root_previous_addresses_${index}__${index}_postalCode`)
  expect(postalCodeInput).toBeInTheDocument()
  fireEvent.change(postalCodeInput, { target: { value: input["postalCode"] } })
}

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
 * Create/ Edit and View a Student document with with property previous_addresses which is linked to 
 * subdoucment Address
 */
describe("Test Subdocuments - SETs", () => {

	/**
	 * 
	 * @returns submitted data from <FrameViewer/>
	*/
	const setup = async(config) => {
    // submitted data via <FrameViewer/>
		let data=false

		// callback function which returns back data submitted via <FrameViewer/>
		function handleSubmit (submittedData) {
			data=submittedData
			return data 
		}

		// render FrameViewer 
		const { container } = render(<FrameViewer frame={config.frame}
			type={config.type}
			uiFrame={config.uiFrame}
			formData={config.formData}
			mode={config.mode}
			onSubmit={handleSubmit}/>
		)

		logRoles(container)
		
		// check for first entry 
		checkIfFieldsAreFilled(0, config.formData["previous_addresses"][0]) 

		// check for second entry 
		checkIfFieldsAreFilled(1, config.formData["previous_addresses"][1]) 
		
		// delete second entry
		const deleteSecond = document.getElementById("Remove_root_previous_addresses_1__1")
		await expect(deleteSecond).toBeInTheDocument()
		await userEvent.click(deleteSecond)
    

		// add another entry 
		const addPreviousAddress =  screen.getByRole("button", { name: "Add previous_addresses"})
		expect(addPreviousAddress).toBeInTheDocument()
		// click on subdocument button to add set
		await userEvent.click(addPreviousAddress) 

		// add new address after deleting
		addFields (1, config.input["previous_addresses"][1])

		// check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton)

		return data 
  };


	// edit a subdocument type property 
	test("Edit SubDocument property - SETs", async () => {
		
		const config = CONST.EDIT_CONFIG

		// setup FrameViewer 
		let data=await setup(config)

		// check if data is same as expected data
		await expect(data).toStrictEqual(CONST.SET_SUBDOCUMENT_DATA_TYPE_EDIT_DATA)
	}) 


})

