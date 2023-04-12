import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/string.datatypes.constants"
import '@testing-library/jest-dom'
import {logRoles} from '@testing-library/dom';



/**
 * Create/ Edit and View a Person document with Name (string type) data field
 */
describe("Test string Type Property", () => {


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

		//logRoles(container)

		// enter a name 
		const nameInput = document.getElementById("root_name")
		// check if name input is available
		expect(nameInput).toBeInTheDocument()
		// clear 
		await userEvent.clear(nameInput);
		// enter a name
		await userEvent.type(nameInput, config.input)
		
		// check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton)
			
		return data 
    };

	// create a string type property
	test("Create string type property", async () => {
		
		const config = CONST.CREATE_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.STRING_DATA_TYPE_CREATE_DATA)
	})

	// edit a string type property 
	test("Edit string type property", async () => {
		
		const config = CONST.EDIT_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.STRING_DATA_TYPE_EDIT_DATA)
	})

	// view a string type property 
	test("View string type property", async () => {

		// render FrameViewer in View mode
		const { container } = render(<FrameViewer frame={CONST.VIEW_CONFIG.frame}
			type={CONST.VIEW_CONFIG.type}
			uiFrame={CONST.VIEW_CONFIG.uiFrame}
			formData={CONST.VIEW_CONFIG.formData}
			mode={CONST.VIEW_CONFIG.mode}
			/>
		)

		logRoles(container)

		
		// check if text area with filled data is displayed 
		const nameInput = document.getElementById("root_name")
		// expect the name input to be in document
		expect(nameInput).toBeInTheDocument()
		// expect correct filled data to be displayed in text area 
		expect(nameInput.innerHTML).toStrictEqual(CONST.VIEW_CONFIG.formData.name)
		
	})

})

