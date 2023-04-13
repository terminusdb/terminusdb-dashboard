import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/subDocuments.datatypes.constants"
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';



/**
 * Create/ Edit and View a Person document with Name (string type) data field
 */
describe("Test Subdocuments", () => {

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
		/*const subDocumentButton =  screen.getByRole("button", { name: "PermanentAddress"})
		expect(subDocumentButton).toBeInTheDocument()
		// click on subdocument button to expand properties
		await userEvent.click(subDocumentButton) */


		const subDocumentButton =  screen.getByText("Click here to expand SubDocument PermanentAddress")
		expect(subDocumentButton).toBeInTheDocument()
		// click on subdocument button to expand properties
		await userEvent.click(subDocumentButton)

		// enter a Address line 1
		const addressLine1Input =screen.getByRole('textbox', { name: "AddressLine1" })
		// check if Address line 1 input is available
		expect(addressLine1Input).toBeInTheDocument()
		// enter a Address line 1
		fireEvent.change(addressLine1Input, {target: {value: config.input["AddressLine1"]}})

		// enter a City
		const cityInput =screen.getByRole('textbox', { name: "City" })
		expect(cityInput).toBeInTheDocument()
		// enter a city
		fireEvent.change(cityInput, {target: {value: config.input["City"]}})

		// enter a Country
		const countryInput =screen.getByRole('textbox', { name: "Country" })
		// check if Country input is available
		expect(countryInput).toBeInTheDocument()
		// enter a Country
		fireEvent.change(countryInput, {target: {value: config.input["Country"]}})


		// enter a postalCode
		const postalCodeInput =screen.getByRole('textbox', { name: "postalCode" })
		// check if postalCode input is available
		expect(postalCodeInput).toBeInTheDocument()
		// enter a postalCode
		fireEvent.change(postalCodeInput, {target: {value: config.input["postalCode"]}})
		
		// check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton)
			
		return data 
  };

	// create a subdocument type property
	test("Create SubDocument property", async () => {
		
		const config = CONST.CREATE_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.SUBDOCUMENT_DATA_TYPE_CREATE_DATA)
	})

	// edit a subdocument type property 
	test("Edit SubDocument property", async () => {
		
		const config = CONST.EDIT_CONFIG

		// setup FrameViewer 
		let data=await setup(config)

		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.SUBDOCUMENT_DATA_TYPE_EDIT_DATA)
	})

	// view a subdocument type property 
	test("View SubDocument type property", async () => {

		// render FrameViewer in View mode
		const { container } = render(<FrameViewer frame={CONST.VIEW_CONFIG.frame}
			type={CONST.VIEW_CONFIG.type}
			uiFrame={CONST.VIEW_CONFIG.uiFrame}
			formData={CONST.VIEW_CONFIG.formData}
			mode={CONST.VIEW_CONFIG.mode}
			/>
		)

		//logRoles(container)

		// Address line 1
		const addressLine1Input =screen.getByRole('textbox', { name: "AddressLine1" })
		// check if Address line 1 input is available
		expect(addressLine1Input).toBeInTheDocument()
		// expect the addressLine1Input input to be displayed in text area 
		expect(addressLine1Input.value).toStrictEqual(CONST.VIEW_CONFIG.formData["PermanentAddress"]["AddressLine1"])

		// City
		const cityInput =screen.getByRole('textbox', { name: "City" })
		// check if City input is available
		expect(cityInput).toBeInTheDocument()
		// expect the City to be displayed in text area 
		expect(cityInput.value).toStrictEqual(CONST.VIEW_CONFIG.formData["PermanentAddress"]["City"])

		// Country
		const countryInput =screen.getByRole('textbox', { name: "Country" })
		// check if Country input is available
		expect(countryInput).toBeInTheDocument()
		// expect the Country to be displayed in text area 
		expect(countryInput.value).toStrictEqual(CONST.VIEW_CONFIG.formData["PermanentAddress"]["Country"])

		// postalCode
		const postalCodeInput =screen.getByRole('textbox', { name: "postalCode" })
		// check if postalCode input is available
		expect(postalCodeInput).toBeInTheDocument()
		// expect the postalCode to be displayed in text area 
		expect(postalCodeInput.value).toStrictEqual(CONST.VIEW_CONFIG.formData["PermanentAddress"]["postalCode"])
	
		
	})

})

