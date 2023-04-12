import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/choiceDocuments.datatypes.constants"
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';
import selectEvent from 'react-select-event'


/**
 * Create a Teacher document with teach property which points to 
 * an array of choices of documents 
 */
describe("Test Choice Documents", () => {

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
		const { container, getByLabelText } = render(<FrameViewer frame={config.frame}
			type={config.type}
			uiFrame={config.uiFrame}
			formData={config.formData}
			mode={config.mode}
			onSubmit={handleSubmit}/>
		)

		logRoles(container)
		
		// add name
		const nameInput = screen.getByRole("textbox", "name")
		await expect(nameInput).toBeInTheDocument()
		fireEvent.change(nameInput, {target: { value: config.input["name"] }})

		// select choice Botony
		await selectEvent.select(getByLabelText('teach'), [config.input["teach"]["@type"]])

		// FILLING DEPTH 1 ( Create New Botony Notes )
		const createNew = document.getElementById("Create New Document__1")
		await expect(createNew).toBeInTheDocument()
		await userEvent.click(createNew); 

		// add Botony_notes 
		const botonyNotesInput=document.getElementById("root_teach_Botony_notes_1")
		await expect(botonyNotesInput).toBeInTheDocument()
		fireEvent.change(botonyNotesInput, {target: {value: config.input["teach"]["Botony_notes"]}})

		// add Botony_grade
		const botonyGradeInput=document.getElementById("root_teach_Botony_grade_1")
		expect(botonyGradeInput).toBeInTheDocument()
		fireEvent.change(botonyGradeInput, {target: {value: config.input["teach"]["Botony_grade"]}})

		// add subject_name
		const subjectNameeInput=document.getElementById("root_teach_subject_name_1")
		expect(subjectNameeInput).toBeInTheDocument()
		fireEvent.change(subjectNameeInput, {target: {value: config.input["teach"]["subject_name"]}})

		// check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton)

		return data 
  };

	// create a choice document type property
	test("Create Choice Document property", async () => {
		
		const config = CONST.CREATE_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.CHOICE_DOCUMENT_DATA_TYPE_CREATE_DATA)
	})

})

