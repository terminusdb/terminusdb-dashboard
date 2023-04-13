import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/sysUnit.datatypes.constants.js"
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';



/**
 * Create/ Edit and View a document sys:Unit Property
 * check if default value for sys unit property [] is being submitted
 */
describe("Test Sys Unit Property", () => {
  /**
	 * 
	 * @returns submitted data from <FrameViewer/>
	*/
	const setupEdit = async(config) => {
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
    
    // enter a LinkInfo
		const LinkInfoInput =document.getElementById("root_Links_to_LinkInfo")
		expect(LinkInfoInput).toBeInTheDocument()
		fireEvent.change(LinkInfoInput, { target: { value: config.input["Links_to"]["LinkInfo"] }})

    // check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton)
			
		return data 
  };

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
    
    // enter a LinkInfo
		const LinkInfoInput =document.getElementById("root_Links_to_LinkInfo")
		expect(LinkInfoInput).toBeInTheDocument()
		fireEvent.change(LinkInfoInput, { target: {value: config.input["Links_to"]["LinkInfo"] }})

    // check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton)
			
		return data 
  };

	// create a sys Unit type property
	test("Create sys Unit property", async () => {
		
		const config = CONST.CREATE_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.SYS_UNIT_DATA_TYPE_CREATE_DATA)
	})

	// edit a subdocument type property 
	test("Edit SubDocument property", async () => {
		
		const config = CONST.EDIT_CONFIG

		// setup FrameViewer 
		let data=await setupEdit(config)

		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.SYS_UNIT_DATA_TYPE_EDIT_DATA)
	}) 

})

