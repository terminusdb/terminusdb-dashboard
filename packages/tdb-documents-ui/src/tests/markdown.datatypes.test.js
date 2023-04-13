import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/markdown.datatypes.constants"
import '@testing-library/jest-dom'
import {logRoles} from '@testing-library/dom';



/**
 * Create/ Edit and View a document with body (rendered_as markdown)
 */
describe("Test markdown data type Property", () => {

	/**
	 * 
	 * @returns submitted data from <FrameViewer/>
	*/
	const setup = async(config) => {
    // submitted data via <FrameViewer/>
		let data=false

		// callback function which returns back data submitted via <FrameViewer/>
		function handleSubmit (submittedData) {
      //console.log("submittedData//////", JSON.stringify(submittedData, null, 2))
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

		// enter a markdown 
		const input = document.getElementById("root_body")//screen.getByRole("textbox", "root_body")
		// check if input is available
		expect(input).toBeInTheDocument()
		// enter a markdown
    fireEvent.change(input, {target: {value: config.input.body}})
		
		// check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton)
			
		return data 
    };

	// create a markdown type property
	test("Create markdown type property", async () => {
		
		const config = CONST.CREATE_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		// check if data is same as expected data
		expect(data).toStrictEqual(config.input)
	})

	// edit a markdown type property 
	test("Edit markdown type property", async () => {
		
		const config = CONST.EDIT_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.MARKDOWN_DATA_TYPE_EDIT_DATA)
	})

	// view a markdown type property 
	test("View markdown type property", async () => {

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
		const input = document.getElementById("root_body")
		// expect the input to be in document
		expect(input).toBeInTheDocument()
		// expect correct filled data to be displayed in text area 
		expect(input.value).toStrictEqual(CONST.VIEW_CONFIG.formData.body)
		
	})

})

