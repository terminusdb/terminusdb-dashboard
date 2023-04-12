import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/existingDocumentLinks.datatypes.constants"
import { Search } from "./constants/existingDocumentLinks.datatypes.constants"
import '@testing-library/jest-dom'
import {logRoles} from '@testing-library/dom';
import selectEvent from 'react-select-event'



/**
 * Edit a Person likes Animal ( by linking an existing document )
 * test change link button as well
 */
describe("Test linking existing Document links data type Property", () => {

	/**
	 * 
	 * @returns submitted data from <FrameViewer/>
	*/
	const setup = async(config) => {
    // submitted data via <FrameViewer/>
		let data=false

		// callback function which returns back data submitted via <FrameViewer/>
		function handleSubmit (submittedData) {
      console.log("submittedData ///", submittedData)
			data=submittedData
			return data 
		}

		// render FrameViewer 
		const { container } = render(<FrameViewer frame={config.frame}
			type={config.type}
			uiFrame={config.uiFrame}
			formData={config.formData}
      onSelect={<Search/>}
			mode={config.mode}
			onSubmit={handleSubmit}/>
		)

		logRoles(container)
    
    // expect linked ID to be present in document 
		const selectedInput = document.getElementById(config.formData["likes"])
		expect(selectedInput).toBeInTheDocument()
		
		// click on change link 
		const changeLinkButton = screen.getByRole("button", { name: "Change Link" })
		expect(changeLinkButton).toBeInTheDocument
		await userEvent.click(changeLinkButton);

		// expect search component to appear 
		// add an ID from Search component  
		const divInput = document.getElementById(config.input["likes"])
		// check if divInput input is available
		expect(divInput).toBeInTheDocument()
    // select ID 3
    await userEvent.click(divInput); 
		
		// check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton)
			
		return data 
    };

	// edit an existing document link property
	test("Edit Existing Document Link  property", async () => {
		
		const config = CONST.EDIT_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.DOCUMENT_LINK_DATA_TYPE_EDIT_DATA)
	}) 

})

