import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/setChoiceSubDocuments.datatypes.constants"
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';
import selectEvent from 'react-select-event'

// checks if fields are filled
async function expectElemenstToBeFilled (config) {
	// expect Botony_notes to be filled 
	const botonyNotesInput=document.getElementById("root_favorite_subject_0__0_Botony_notes")
	//const botonyNotesInput=screen.getByRole("textbox", { name: "Botony_notes" })
	await expect(botonyNotesInput).toBeInTheDocument()
	expect(botonyNotesInput.value).toStrictEqual(config.formData["favorite_subject"][0]["Botony_notes"])

	// expect Botony_grade to be filled
	const botonyGradeInput=document.getElementById("root_favorite_subject_0__0_Botony_grade")
	expect(botonyGradeInput).toBeInTheDocument()
	expect(botonyGradeInput.value).toStrictEqual(config.formData["favorite_subject"][0]["Botony_grade"])

	// expect subject_name to be filled
	const subjectNameInput=document.getElementById("root_favorite_subject_0__0_subject_name")
	expect(subjectNameInput).toBeInTheDocument()
	expect(subjectNameInput.value).toStrictEqual(config.formData["favorite_subject"][0]["subject_name"])

}


/**
 * EDIT a Student document with favorite_subject property which points to 
 * an array of choices of subdocuments
 */
describe("Test Choice Subdocuments - Sets - EDIT MODE", () => {

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

		// checks if fields are filled for Botony
		expectElemenstToBeFilled (config)

		// change selection
		await selectEvent.select(getByLabelText('favorite_subject'), [config.input["favorite_subject"][0]["@type"]])
		
		// add Zoology_notes 
		const zoologyInput=document.getElementById("root_favorite_subject_0__0_Zoology_notes")
		await expect(zoologyInput).toBeInTheDocument()
		fireEvent.change(zoologyInput, {target: {value: config.input["favorite_subject"][0]["Zoology_notes"]}})
		
		// add subject_name 
		const subjectNameInput=document.getElementById("root_favorite_subject_0__0_subject_name")
		await expect(subjectNameInput).toBeInTheDocument()
		fireEvent.change(subjectNameInput, {target: {value: config.input["favorite_subject"][0]["subject_name"]}})
		
		
		// check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton)  

		return data 
  };

	// Edit a choice subdocument type property
	test("Edit Choice SubDocument property", async () => {
		
		const config = CONST.EDIT_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.SET_CHOICE_SUBDOCUMENT_DATA_TYPE_EDIT_DATA)
	})


})

