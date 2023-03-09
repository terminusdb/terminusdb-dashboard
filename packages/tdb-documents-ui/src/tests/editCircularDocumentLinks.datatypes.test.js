import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/circularDocumentLinks.datatypes.constants"
import { LINK_NEW_DOCUMENT } from '../constants';
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';


/**
 * Edit a Person who likes Animal 
 * example Person has likes property which is linked to another document Animal
 * Animal has a property owned_by which is linked back to Person 
 */
describe("Test Circular Document Links - EDIT MODE", () => {

	/**
	 * 
	 * @returns submitted data from <FrameViewer/>
	*/
	const setup = async(config) => {
    // submitted data via <FrameViewer/>
		let data=false

		// callback function which returns back data submitted via <FrameViewer/>
		function handleSubmit (submittedData) {
			console.log("submittedData ////", JSON.stringify(submittedData, null, 2))
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
		
		// check if everything is readily available at depth 2 
		// FILLING DEPTH 2 ( owned_by User )
		const owned_by_name_2 = document.getElementById("root_owned_by_name_2")
		await expect(owned_by_name_2).toBeInTheDocument()
		expect(owned_by_name_2.value).toStrictEqual(config.formData["likes"]["owned_by"]["name"])
		
		
		/*const owned_by_name_2 = document.getElementById("root_owned_by_name_2")
		// check if owned_by_name_2 root input is available
		await expect(owned_by_name_2).toBeInTheDocument()
		// enter a owned_by_name_2 root value
		fireEvent.change(owned_by_name_2, {target: {value: config.input["likes"]["owned_by"]["name"]}})*/
		
		// FILLING DEPTH 3 ( likes Animal )
		// change category
		const likes_category_3 = document.getElementById("root_likes_category_3")
		// check if likes_category_3 root input is available
		expect(likes_category_3).toBeInTheDocument()
		expect(likes_category_3.value).toStrictEqual(config.formData["likes"]["owned_by"]["likes"]["category"])

		// MODIFY EDIT at level depth - edit category to fish 
		let new_categoryInput_3=config.input["likes"]["owned_by"]["likes"]["category"]
		fireEvent.change(likes_category_3, {target: {value: new_categoryInput_3}})

		//nickName
		const likes_nickName_3 = document.getElementById("root_likes_nickName_3")
		// check if likes_nickName_3 root input is available
		expect(likes_nickName_3).toBeInTheDocument()
		expect(likes_nickName_3.value).toStrictEqual(config.formData["likes"]["owned_by"]["likes"]["nickName"])


		// MODIFY EDIT at level depth 3 - edit nickName to Goldie 
		let new_nickNameInput_3=config.input["likes"]["owned_by"]["likes"]["nickName"]
		fireEvent.change(likes_nickName_3, {target: {value: new_nickNameInput_3}})


		// FILLING DEPTH 4 ( owned_by User )
		const owned_by_name_4 = document.getElementById("root_owned_by_name_4")
		// check if owned_by_name_4 root input is available
		await expect(owned_by_name_4).toBeInTheDocument()
		expect(owned_by_name_4.value).toStrictEqual(config.formData["likes"]["owned_by"]["likes"]["owned_by"]["name"])
		
		// MODIFY EDIT at level depth 4 - edit name to Jerome Kal
		let new_owned_by_name_4=config.input["likes"]["owned_by"]["likes"]["owned_by"]["name"]
		fireEvent.change(owned_by_name_4, {target: {value: new_owned_by_name_4}})

		// check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton) 

		return data 
  };

	// create a document link type property
	test("Edit Circular Document Link property", async () => {
		
		const config = CONST.EDIT_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		
		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.DOCUMENT_LINK_DATA_TYPE_EDIT_DATA)
	}) 

})

