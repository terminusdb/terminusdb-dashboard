import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/choiceSubDocuments.datatypes.constants"
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';
import selectEvent from 'react-select-event'



/**
 * Create a Student document with favorite_subject property which points to 
 * an array of choices of subdocuments
 */
describe("Test Choice Subdocuments", () => {

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

		await selectEvent.select(getByLabelText('favorite_subject'), [config.input["favorite_subject"]["@type"]])
		
		// add Botony_notes 
		const botonyNotesInput=document.getElementById("root_favorite_subject_Botony_notes")
		await expect(botonyNotesInput).toBeInTheDocument()
		fireEvent.change(botonyNotesInput, {target: {value: config.input["favorite_subject"]["Botony_notes"]}})
		
		// add Botony_grade
		const botonyGradeInput=document.getElementById("root_favorite_subject_Botony_grade")
		expect(botonyGradeInput).toBeInTheDocument()
		fireEvent.change(botonyGradeInput, {target: {value: config.input["favorite_subject"]["Botony_grade"]}})

		// add subject_name
		const subjectNameeInput=document.getElementById("root_favorite_subject_subject_name")
		expect(subjectNameeInput).toBeInTheDocument()
		fireEvent.change(subjectNameeInput, {target: {value: config.input["favorite_subject"]["subject_name"]}})

		// check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton) 

		return data 
  };

	// create a choice subdocument type property
	test("Create Choice SubDocument property", async () => {
		
		const config = CONST.CREATE_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.CHOICE_SUBDOCUMENT_DATA_TYPE_CREATE_DATA)
	})

})

