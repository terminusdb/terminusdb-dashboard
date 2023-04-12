import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/setEnum.datatypes.constants"
import '@testing-library/jest-dom'
import {logRoles} from '@testing-library/dom';
import selectEvent from 'react-select-event'
import { extractPropertyDocumentation } from '../helpers/widgetHelper';



/**
 * Create a Person document with likes_color pointing to Enum Color which is of type SET
 */
describe("Test Create Set Enum data type Property", () => {

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
		const { container, getByLabelText } = render(<FrameViewer frame={config.frame}
			type={config.type}
			uiFrame={config.uiFrame}
			formData={config.formData}
			mode={config.mode}
			onSubmit={handleSubmit}/>
		)

		logRoles(container)

		// add enum 
		const addLikesColorButton = screen.getByRole("button", { name: "Add likes_color" })
		expect(addLikesColorButton).toBeInTheDocument()
		await userEvent.click(addLikesColorButton)

		await selectEvent.select(getByLabelText('likes_color'), [config.input[0]])

		
		// check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton) 
			
		return data 
    };
	
	// create a enum type property SET
	test("Create enum type property Set", async () => {
		
		const config = CONST.CREATE_CONFIG

		// setup FrameViewer 
		let data=await setup (config)
		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.SET_ENUM_DATA_TYPE_CREATE_DATA)
	}) 

})


