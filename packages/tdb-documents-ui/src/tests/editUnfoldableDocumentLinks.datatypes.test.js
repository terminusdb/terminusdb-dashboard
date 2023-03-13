import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/unfoldableDocumentLinks.datatypes.constants"
import { Search } from "./constants/unfoldableDocumentLinks.datatypes.constants"
import '@testing-library/jest-dom'
import {logRoles} from '@testing-library/dom';


/**
 * edit a Person likes Animal ( by linking an existing document ) @unfoldable = true 
 * we test a mix of unfoldable and linked document links to see
 * if create and link existing radio buttons work together 
 * at nested levels 
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
      console.log("submittedData ///", JSON.stringify(submittedData, null, 2))
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

		// check if everything is readily available at depth 2 
		// FILLING DEPTH 2 ( owned_by User )
		const owned_by_name_2 = document.getElementById("root_owned_by_name_2")
		await expect(owned_by_name_2).toBeInTheDocument()
		expect(owned_by_name_2.value).toStrictEqual(config.formData["likes"]["owned_by"]["name"])

		// unlink button'd id at this stage will be equal to depth level
		const unLink_Button_3=document.getElementById("3")
		expect(unLink_Button_3).toBeInTheDocument()
		await userEvent.click(unLink_Button_3) 

		// FILLING DEPTH 3 ( likes Animal )
		// link an ID at this point
		const linkNew = document.getElementById("Link an existing Document__3")
		await expect(linkNew).toBeInTheDocument()
		await userEvent.click(linkNew); 

		// expect search component to appear 
		// add an ID from Search component  
		const divInput = document.getElementById(config.input["likes"]["owned_by"]["likes"])
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

