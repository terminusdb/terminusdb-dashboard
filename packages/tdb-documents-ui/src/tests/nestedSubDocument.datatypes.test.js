import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/nestedSubDocuments.datatypes.constants"
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';



/**
 * Create/ Edit and View a Person document with nested subdocuments 
 * */
describe("Test Nested Subdocuments", () => {

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

		// zip
		const zipInput =screen.getByRole('textbox', { name: "zip" })
		// check if zip
		expect(zipInput).toBeInTheDocument()
		// enter a zip
		fireEvent.change(zipInput, {target: {value: config.input["lives"]["postalCode"]["zip"] }})

		// eir
		const eirInput =screen.getByRole('textbox', { name: "eir" })
		// check if eir
		expect(eirInput).toBeInTheDocument()
		// enter a eir
		fireEvent.change(eirInput, {target: {value: config.input["lives"]["postalCode"]["eir"] }})

		// name
		const nameInput =screen.getByRole('textbox', { name: "name" })
		// check if name
		expect(nameInput).toBeInTheDocument()
		// enter a name
		fireEvent.change(nameInput, {target: {value: config.input["lives"]["postalCode"]["shared_by"]["name"] }})

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

		// zip
		const zipInput =screen.getByRole('textbox', { name: "zip" })
		// check if zip
		expect(zipInput).toBeInTheDocument()
		// enter a zip
		expect(zipInput.value).toStrictEqual(CONST.VIEW_CONFIG.formData["lives"]["postalCode"]["zip"])

		
		// eir
		const eirInput =screen.getByRole('textbox', { name: "eir" })
		// check if eir
		expect(eirInput).toBeInTheDocument()
		// enter a eir
		expect(eirInput.value).toStrictEqual(CONST.VIEW_CONFIG.formData["lives"]["postalCode"]["eir"])


		// name
		const nameInput =screen.getByRole('textbox', { name: "name" })
		// check if name
		expect(nameInput).toBeInTheDocument()
		// enter a name
		expect(nameInput.value).toStrictEqual(CONST.VIEW_CONFIG.formData["lives"]["postalCode"]["shared_by"]["name"])

	}) 

})

