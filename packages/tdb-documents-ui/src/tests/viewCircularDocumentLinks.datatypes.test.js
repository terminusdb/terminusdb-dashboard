import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/circularDocumentLinks.datatypes.constants"
import { LINK_NEW_DOCUMENT } from '../constants';
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';


/**
 * View a Person who likes Animal 
 * example Person has likes property which is linked to another document Animal
 * Animal has a property owned_by which is linked back to Person 
 */
describe("Test Circular Document Links - View MODE", () => {

	// View a document link type property
	test("View Circular Document Link property", async () => {
		
		const config = CONST.VIEW_CONFIG

		// render FrameViewer 
		const { container } = render(<FrameViewer frame={config.frame}
			type={config.type}
			uiFrame={config.uiFrame}
			formData={config.formData}
			mode={config.mode}/>
		) 

		logRoles(container)
		
		// check if everything is readily available at depth 1
		// checking DEPTH 1 ( owned_by User )
		const nameInput = document.getElementById("root_name")
		await expect(nameInput).toBeInTheDocument()
		expect(nameInput.value).toStrictEqual(config.formData["name"])

		const unfoldedInput = screen.getByText(config.formData["likes"]["@id"]);
		expect(unfoldedInput).toBeInTheDocument()
		await userEvent.click(unfoldedInput)

		// test handle traverse
		await expect(screen.queryByText(`You have clicked on ${config.formData["likes"]["@id"]} ...`))

		// checking DEPTH 1 ( likes )
		/*const likes_nickName_1 = document.getElementById("root_likes_nickName_1")
		await expect(likes_nickName_1).toBeInTheDocument()
		expect(likes_nickName_1.value).toStrictEqual(config.formData["likes"]["nickName"])

		// checking DEPTH 1 ( likes )
		const likes_category_1 = document.getElementById("root_likes_category_1")
		await expect(likes_category_1).toBeInTheDocument()
		expect(likes_category_1.value).toStrictEqual(config.formData["likes"]["category"])

		// checking DEPTH 2 ( owned_by User )
		const nameInput_2 = document.getElementById("root_owned_by_name_2")
		await expect(nameInput_2).toBeInTheDocument()
		expect(nameInput_2.value).toStrictEqual(config.formData["likes"]["owned_by"]["name"])

		// checking DEPTH 3 ( likes )
		const likes_nickName_3 = document.getElementById("root_likes_nickName_3")
		await expect(likes_nickName_3).toBeInTheDocument()
		expect(likes_nickName_3.value).toStrictEqual(config.formData["likes"]["owned_by"]["likes"]["nickName"])

		// checking DEPTH 3 ( likes )
		const likes_category_3 = document.getElementById("root_likes_category_3")
		await expect(likes_category_3).toBeInTheDocument()
		expect(likes_category_3.value).toStrictEqual(config.formData["likes"]["owned_by"]["likes"]["category"])

		// checking DEPTH 4 ( owned_by User )
		const nameInput_4 = document.getElementById("root_owned_by_name_4")
		await expect(nameInput_4).toBeInTheDocument()
		expect(nameInput_4.value).toStrictEqual(config.formData["likes"]["owned_by"]["likes"]["owned_by"]["name"])*/

	}) 

})

