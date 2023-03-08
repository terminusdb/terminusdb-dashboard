import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/circularDocumentLinks.datatypes.constants"
import { LINK_NEW_DOCUMENT } from '../constants';
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';


/**
 * Edit a Person who is friend_with Person - try unlinking already populated links
 * and add new
 */
describe("Test Circular Document Links - Unlink already populated links", () => {

	/**
	 * 
	 * @returns submitted data from <FrameViewer/>
	*/
	const setup = async(config) => {
    // submitted data via <FrameViewer/>
		let data=false

		// callback function which returns back data submitted via <FrameViewer/>
		function handleSubmit (submittedData) {
			console.log("////submittedData", submittedData)
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


		// FILLING DEPTH 2
		const nameInput_2 = document.getElementById("root_friends_with_name_2")
		// check if nameInput_2 root input is available
		expect(nameInput_2).toBeInTheDocument()
		expect(nameInput_2.value).toStrictEqual(config.formData["friends_with"]["friends_with"]["name"])

		const ageInput_2 = document.getElementById("root_friends_with_age_2")
		// check if ageInput_2 root input is available
		expect(ageInput_2).toBeInTheDocument()
		expect(ageInput_2.value).toStrictEqual(config.formData["friends_with"]["friends_with"]["age"])
		
		// unlink button'd id at this stage will be equal to depth level
		const unLink_Button_2=document.getElementById("2")
		expect(unLink_Button_2).toBeInTheDocument()
		await userEvent.click(unLink_Button_2) 
		
		// after unlink these id's should not be there 
		const nameInput_unlinked = document.getElementById("root_friends_with_name_2")
		// check if nameInput_2 root input is NOT available
		expect(nameInput_unlinked).not.toBeInTheDocument()

		// after unlink these id's should not be there 
		const ageInput_unlinked = document.getElementById("root_friends_with_age_2")
		// check if ageInput_unlinked root input is NOT available
		expect(ageInput_unlinked).not.toBeInTheDocument()

		// click on Create New Document
		const createNew_2 = document.getElementById("Create New Document__2")
		await expect(createNew_2).toBeInTheDocument()
		await userEvent.click(createNew_2); 
		
		// add new inputs
		const nameInput_createNew_2 = document.getElementById("root_friends_with_name_2")
		// check if nameInput_createNew_2 root input is available
		await expect(nameInput_createNew_2).toBeInTheDocument()
		// enter a nameInput_createNew_2 root value
		fireEvent.change(nameInput_createNew_2, {target: {value: config.unLinkedInput["friends_with"]["friends_with"]["name"]}})

		const ageInput_createNew_2 = document.getElementById("root_friends_with_age_2")
		// check if ageInput_createNew_2 root input is available
		await expect(ageInput_createNew_2).toBeInTheDocument()
		// enter a ageInput_createNew_2 root value
		fireEvent.change(ageInput_createNew_2, {target: {value: config.unLinkedInput["friends_with"]["friends_with"]["age"]}})
		

		// check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton)   

		return data 
  };

	

	// edit a document link  type property 
	test("Edit Document Link property", async () => {
		
		const config = CONST.EDIT_CONFIG

		// setup FrameViewer 
		let data=await setup(config)

		// check if data is same as expected data
		expect(data).toStrictEqual(config.unLinkedInput)
	})

	
})

