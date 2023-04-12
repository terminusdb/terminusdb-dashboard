import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/unfoldableDocumentLinks.datatypes.constants"
import { Search } from "./constants/unfoldableDocumentLinks.datatypes.constants"
import '@testing-library/jest-dom'
import {logRoles} from '@testing-library/dom';


/**
 * create a Person likes Animal ( by linking an existing document ) @unfoldable = true 
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

		const nameInput = screen.getByRole("textbox", { name: "name"})
		// check if nameInput root input is available
		expect(nameInput).toBeInTheDocument()
		// enter a nameInput root value
		fireEvent.change(nameInput, {target: {value: config.input["name"]}}) 

		// FILLING DEPTH 1 ( likes Animal )
		const createNew = document.getElementById("Create New Document__1")
		await expect(createNew).toBeInTheDocument()
		await userEvent.click(createNew); 

		const likes_category_1 = document.getElementById("root_likes_category_1")
		// check if likes_category_1 root input is available
		expect(likes_category_1).toBeInTheDocument()
		// enter a likes_category_1 root value
		fireEvent.change(likes_category_1, {target: {value: config.input["likes"]["category"]}})

		// FILLING DEPTH 2 ( owned_by User )
		const createNew_2 = document.getElementById("Create New Document__2")
		await expect(createNew_2).toBeInTheDocument()
		await userEvent.click(createNew_2); 
		
		const owned_by_name_2 = document.getElementById("root_owned_by_name_2")
		// check if owned_by_name_2 root input is available
		await expect(owned_by_name_2).toBeInTheDocument()
		// enter a owned_by_name_2 root value
		fireEvent.change(owned_by_name_2, {target: {value: config.input["likes"]["owned_by"]["name"]}})

		// FILLING DEPTH 3 ( likes Animal )
		const createNew_3 = document.getElementById("Create New Document__3")
		await expect(createNew_3).toBeInTheDocument()
		await userEvent.click(createNew_3); 


		const likes_category_3 = document.getElementById("root_likes_category_3")
		// check if likes_category_3 root input is available
		expect(likes_category_3).toBeInTheDocument()
		let categoryInput_3=config.input["likes"]["owned_by"]["likes"]["category"]
		// enter a likes_category_3 root value
		fireEvent.change(likes_category_3, {target: {value: categoryInput_3}})

		// FILLING DEPTH 4 ( owned_by User )
		const createNew_4 = document.getElementById("Link an existing Document__4")
		await expect(createNew_4).toBeInTheDocument()
		await userEvent.click(createNew_4); 

		// expect search component to appear 
		// add an ID from Search component  
		const divInput = document.getElementById(config.input["likes"]["owned_by"]["likes"]["owned_by"])
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

	// create an existing document link property
	test("Create Existing Document Link  property", async () => {
		
		const config = CONST.CREATE_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.DOCUMENT_LINK_DATA_TYPE_CREATE_DATA)
	}) 

})

