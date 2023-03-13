import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/unfoldableDocumentLinks.datatypes.constants"
import { Search } from "./constants/unfoldableDocumentLinks.datatypes.constants"
import '@testing-library/jest-dom'
import {logRoles} from '@testing-library/dom';


/**
 * view a Person likes Animal ( by linking an existing document ) @unfoldable = true 
 * we test a mix of unfoldable and linked document links to see
 * if create and link existing radio buttons work together 
 * at nested levels 
 */
describe("Test View linking existing Document links data type Property", () => {


	// view an existing document link property
	test("View Existing Document Link  property", async () => {
		
		const config = CONST.VIEW_CONFIG

		// render FrameViewer 
		const { container } = render(<FrameViewer frame={config.frame}
			type={config.type}
			uiFrame={config.uiFrame}
			formData={config.formData}
			onTraverse={CONST.handleTraverse}
      onSelect={<Search/>}
			mode={config.mode}/>
		)

		logRoles(container)

		// check if everything is readily available at depth 2 
		// FILLING DEPTH 2 ( owned_by User )
		// check if unfolded document name property available
		const owned_by_name_2 = document.getElementById("root_owned_by_name_2")
		await expect(owned_by_name_2).toBeInTheDocument()
		expect(owned_by_name_2.value).toStrictEqual(config.formData["likes"]["owned_by"]["name"])
		
		// expect linked ID to be present in document 
			// check if unfolded document likes property available
		const selectedInput = document.getElementById(config.formData["likes"]["owned_by"]["likes"])
		expect(selectedInput).toBeInTheDocument()
		await userEvent.click(selectedInput)
		// test handle traverse
		await expect(screen.queryByText(`You have clicked on ${config.formData["likes"]["owned_by"]["likes"]} ...`))
		//expect(screen.getByText(`You have clicked on ${config.formData["likes"]["owned_by"]["likes"]} ...`)).toBeInTheDocument()
	
	})  

})

