import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/selfLinkedDocumentLinks.datatypes.constants"
import { LINK_NEW_DOCUMENT } from '../constants';
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';


/**
 * Create a Person who is friend_with Person
 * example Person has friends_with property which is linked to User itself
 */
describe("Test Self linked Document Links - CREATE MODE", () => {

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

		const nameInput = screen.getByRole("textbox", { name: "name"})
		// check if nameInput root input is available
		expect(nameInput).toBeInTheDocument()
		// enter a nameInput root value
		fireEvent.change(nameInput, {target: {value: config.input["name"]}})

		const ageInput = screen.getByRole("textbox", { name: "age"})
		// check if ageInput root input is available
		expect(ageInput).toBeInTheDocument()
		// enter a ageInput root value
		fireEvent.change(ageInput, {target: {value: config.input["age"]}})

		// FILLING DEPTH 1
		//const createNew = screen.getByRole('radio', { level: 1 })
		const createNew = document.getElementById("Create New Document__1")
		await expect(createNew).toBeInTheDocument()
		await userEvent.click(createNew); 
		
		const nameInput_1 = document.getElementById("root_friends_with_name_1")
		// check if nameInput_1 root input is available
		expect(nameInput_1).toBeInTheDocument()
		// enter a nameInput_1 root value
		fireEvent.change(nameInput_1, {target: {value: config.input["friends_with"]["name"]}})


		const ageInput_1 = document.getElementById("root_friends_with_age_1")
		// check if ageInput_1 root input is available
		expect(ageInput_1).toBeInTheDocument()
		// enter a ageInput_1 root value
		fireEvent.change(ageInput_1, {target: {value: config.input["friends_with"]["age"]}})

		
		// FILLING DEPTH 2
		
		const createNew_2 = document.getElementById("Create New Document__2")
		await expect(createNew_2).toBeInTheDocument()
		await userEvent.click(createNew_2); 
		
		const nameInput_2 = document.getElementById("root_friends_with_name_2")
		// check if nameInput_2 root input is available
		expect(nameInput_2).toBeInTheDocument()
		// enter a nameInput_2 root value
		fireEvent.change(nameInput_2, {target: {value: config.input["friends_with"]["friends_with"]["name"]}})


		const ageInput_2 = document.getElementById("root_friends_with_age_2")
		// check if ageInput_2 root input is available
		expect(ageInput_2).toBeInTheDocument()
		// enter a ageInput_2 root value
		fireEvent.change(ageInput_2, {target: {value: config.input["friends_with"]["friends_with"]["age"]}})

		
		// check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton) 

		return data 
  };

	// create a document link type property
	test("Create  Self linked Document Link property", async () => {
		
		const config = CONST.CREATE_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		
		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.DOCUMENT_LINK_DATA_TYPE_CREATE_DATA)
	}) 

})

