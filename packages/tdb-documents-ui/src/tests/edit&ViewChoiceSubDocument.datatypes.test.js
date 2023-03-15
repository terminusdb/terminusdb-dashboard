import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/choiceSubDocuments.datatypes.constants"
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';
import selectEvent from 'react-select-event'

// checks if fields are filled
function expectElemenstToBeFilled (config) {
	// expect Botony_notes to be filled
	const botonyNotesInput=document.getElementById("root_favorite_subject_Botony_notes")
	expect(botonyNotesInput).toBeInTheDocument()
	expect(botonyNotesInput.value).toStrictEqual(config.formData["favorite_subject"]["Botony_notes"])

	// expect Botony_grade to be filled
	const botonyGradeInput=document.getElementById("root_favorite_subject_Botony_grade")
	expect(botonyGradeInput).toBeInTheDocument()
	expect(botonyGradeInput.value).toStrictEqual(config.formData["favorite_subject"]["Botony_grade"])

	// expect subject_name to be filled
	const subjectNameInput=document.getElementById("root_favorite_subject_subject_name")
	expect(subjectNameInput).toBeInTheDocument()
	expect(subjectNameInput.value).toStrictEqual(config.formData["favorite_subject"]["subject_name"])

}

/**
 * Edit a Student document with favorite_subject property which points to 
 * an array of choices of subdocuments
 * subject_name is an inheritted property
 * 1 - expect filled data to be availale
 * 2 - select Zoology and make sure fields are empty 
 * 3 - select back Botony and make sure that Botony has all the filled values like before
 * 4 - swap back to Zoology and enter new Zoology details
 */
describe("Test Edit Choice Subdocuments", () => {

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
		
		// swap to Zoology 
		await selectEvent.select(getByLabelText('favorite_subject'), [config.input["favorite_subject"]["@type"]])
		
		// expect subject_name to be empty 
		const zoologySubjectNameInput=document.getElementById("root_favorite_subject_subject_name")
		expect(zoologySubjectNameInput).toBeInTheDocument()
		expect(zoologySubjectNameInput).toBeEmptyDOMElement()

		// swap back to Botony
		await selectEvent.select(getByLabelText('favorite_subject'), [config.formData["favorite_subject"]["@type"]])
		
		// checks if fields are filled for Botony
		expectElemenstToBeFilled (config)

		// swap to Zoology 
		await selectEvent.select(getByLabelText('favorite_subject'), [config.input["favorite_subject"]["@type"]])
		
		// fill in Zoology_notes details
		const zoologyNotesInput=document.getElementById("root_favorite_subject_Zoology_notes")
		expect(zoologyNotesInput).toBeInTheDocument()
		fireEvent.change(zoologyNotesInput, {target: {value: config.input["favorite_subject"]["Zoology_notes"] }})

		// fill in Zoology_notes details
		const subjectNameInput=document.getElementById("root_favorite_subject_subject_name")
		expect(subjectNameInput).toBeInTheDocument()
		fireEvent.change(subjectNameInput, {target: {value: config.input["favorite_subject"]["subject_name"] }})
		
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
		expect(data).toStrictEqual(CONST.CHOICE_SUBDOCUMENT_DATA_TYPE_EDIT_DATA)
	})

	// View a choice subdocument type property
	test("View Choice SubDocument property", async () => {
		
		const config = CONST.VIEW_CONFIG

		// render FrameViewer 
		const { container } = render(<FrameViewer frame={config.frame}
			type={config.type}
			uiFrame={config.uiFrame}
			formData={config.formData}
			mode={config.mode}/>
		)

		logRoles(container)
		
		// checks if fields are filled for Botony
		expectElemenstToBeFilled (config)
	})

})

