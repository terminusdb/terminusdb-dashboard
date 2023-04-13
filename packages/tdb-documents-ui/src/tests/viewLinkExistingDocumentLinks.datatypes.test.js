import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/existingDocumentLinks.datatypes.constants"
import { Search, handleTraverse } from "./constants/existingDocumentLinks.datatypes.constants"
import '@testing-library/jest-dom'
import {logRoles} from '@testing-library/dom';
import selectEvent from 'react-select-event'



/**
 * View a Person likes Animal ( by linking an existing document )
 * test change link button as well
 */
describe("Test linking existing Document links data type Property", () => {

	// view an existing document link property
	test("View Existing Document Link  property", async () => {
		
		const config = CONST.VIEW_CONFIG

		// setup FrameViewer 
		const { container } = render(<FrameViewer frame={config.frame}
			type={config.type}
			uiFrame={config.uiFrame}
			formData={config.formData}
      onSelect={<Search/>}
			onTraverse={handleTraverse}
			mode={config.mode}/>
		)

		// expect linked ID to be present in document 
		const selectedInput = document.getElementById(config.formData["likes"])
		expect(selectedInput).toBeInTheDocument()
		await userEvent.click(selectedInput) 
		
		await expect(screen.queryByText(`You have clicked on ${config.formData["likes"]} ...`))
	}) 

})

