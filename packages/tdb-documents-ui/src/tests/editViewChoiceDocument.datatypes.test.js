import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/choiceDocuments.datatypes.constants"
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';
import selectEvent from 'react-select-event'

 
/**
 * Edit a Teacher document with teach property which points to 
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

		//logRoles(container)

		// check if everything is readily available 
		const nameInput = document.getElementById("root_name")
		await expect(nameInput).toBeInTheDocument()
		expect(nameInput.value).toStrictEqual(config.formData["name"])
		
		// botony notes
		const botonyNotesInput = document.getElementById("root_teach_Botony_notes_1")
		// check if likes_category_3 root input is available
		expect(botonyNotesInput).toBeInTheDocument()
		expect(botonyNotesInput.value).toStrictEqual(config.formData["teach"]["Botony_notes"])

		// select unlink 
		const unlinkButton = document.getElementById("1")
		await expect(unlinkButton).toBeInTheDocument()
		await userEvent.click(unlinkButton)

		// select zoology
		await selectEvent.select(getByLabelText('teach'), [config.input["teach"]["@type"]])

		// FILLING DEPTH 1 ( Create New Zoology Notes )
		const createNew = document.getElementById("Create New Document__1")
		await expect(createNew).toBeInTheDocument()
		await userEvent.click(createNew); 
		

		// FILLING DEPTH 1 ( Create New Zoology Notes )
		const zoologyNotesInput=document.getElementById("root_teach_Zoology_notes_1")
		await expect(zoologyNotesInput).toBeInTheDocument()
		fireEvent.change(zoologyNotesInput, {target: {value: config.input["teach"]["Zoology_notes"]}})

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

	// edit a choice document type property
	test("Edit Choice Document property", async () => {
		
		const config = CONST.EDIT_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.CHOICE_DOCUMENT_DATA_TYPE_EDIT_DATA)
	})

	// view a choice document type property
	test("View Choice Document property", async () => {
		
		const config = CONST.VIEW_CONFIG

		// setup FrameViewer 
		// render FrameViewer 
		const { container, getByLabelText } = render(<FrameViewer frame={config.frame}
			type={config.type}
			uiFrame={config.uiFrame}
			formData={config.formData}
			mode={config.mode}/>
		)

		//logRoles(container)

		// check if everything is readily available 
		const nameInput = document.getElementById("root_name")
		await expect(nameInput).toBeInTheDocument()
		expect(nameInput.value).toStrictEqual(config.formData["name"])
		
		// botony notes
		const botonyNotesInput = document.getElementById("root_teach_Botony_notes_1")
		expect(botonyNotesInput).toBeInTheDocument()
		expect(botonyNotesInput.value).toStrictEqual(config.formData["teach"]["Botony_notes"])

		// botony grade
		const botonyGradeInput = document.getElementById("root_teach_Botony_grade_1")
		expect(botonyGradeInput).toBeInTheDocument()
		expect(botonyGradeInput.value).toStrictEqual(config.formData["teach"]["Botony_grade"])

		// subject name
		const subjectNameInput = document.getElementById("root_teach_subject_name_1")
		expect(subjectNameInput).toBeInTheDocument()
		expect(subjectNameInput.value).toStrictEqual(config.formData["teach"]["subject_name"])
		
	})

})

