import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/setStrings.datatypes.constants"
import '@testing-library/jest-dom'
import {logRoles} from '@testing-library/dom';

/**
 * Edit and View a Person document with Name (string type) SETs 
 */
 describe("Test input SET data type Properties", () => {

	// view a string type property 
	test("View string type property - Sets", async () => {

		// render FrameViewer in View mode
		const { container } = render(<FrameViewer frame={CONST.VIEW_CONFIG.frame}
			type={CONST.VIEW_CONFIG.type}
			uiFrame={CONST.VIEW_CONFIG.uiFrame}
			formData={CONST.VIEW_CONFIG.formData}
			mode={CONST.VIEW_CONFIG.mode}
			/>
		)

		logRoles(container)

		
		// 1st entry
    const nameInput_0 = document.getElementById(`root_name_Set_0`) 
    // check if name input is available
    await expect(nameInput_0).toBeInTheDocument()
    // check if it has filled value  
    await expect(nameInput_0.value).toStrictEqual(CONST.VIEW_CONFIG.formData["name"][0])

    // 2nd entry
    const nameInput_1 = document.getElementById(`root_name_Set_1`) 
    // check if name input is available
    await expect(nameInput_1).toBeInTheDocument()
    // check if it has filled value  
    await expect(nameInput_1.value).toStrictEqual(CONST.VIEW_CONFIG.formData["name"][1])

    // 3rd entry
    const nameInput_2 = document.getElementById(`root_name_Set_2`) 
    // check if name input is available
    await expect(nameInput_2).toBeInTheDocument()
    // check if it has filled value  
    await expect(nameInput_2.value).toStrictEqual(CONST.VIEW_CONFIG.formData["name"][2])
		
	})

})
