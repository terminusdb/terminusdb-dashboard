import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/diffViewer.datatypes.constants"
import '@testing-library/jest-dom'
import {logRoles} from '@testing-library/dom';
import {DiffViewer} from '@terminusdb/terminusdb-documents-ui'



/**
 * Test if diff viewer have correct class names assosciated with fields 
 */
describe("Test if diff viewer have correct class names assosciated with fields ", () => {

	// VIEW MODE
	// diffviewer is only supported in VIEW Mode
	test("Test if diff viewer have correct class names assosciated with fields ", async () => {

		let type = CONST.VIEW_CONFIG.type

		// render FrameViewer in View mode
		const { container } = render(<DiffViewer 
			oldValue={CONST.ORIGINAL_DATA[type]} 
			newValue={CONST.CHANGED_DATA[type]}
			frame={CONST.VIEW_CONFIG.frame}
			type={type}
			diffPatch={CONST.DIFF}/>
		)

		logRoles(container)

		// check if all inputs have the correct class names 
		
	})

})

