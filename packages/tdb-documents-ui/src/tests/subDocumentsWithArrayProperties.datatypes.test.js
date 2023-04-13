import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/subDocumentsWithArrayProperties.datatypes.constants"
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';



/**
 * Create/ Edit and View a Student document with subdocuments with Array properties
 * */
describe("Test Nested Subdocuments", () => {

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
		const { container } = render(<FrameViewer frame={config.frame}
			type={config.type}
			uiFrame={config.uiFrame}
			formData={config.formData}
			mode={config.mode}
			onSubmit={handleSubmit}/>
		)

		logRoles(container)

		// click on Add name button
		const name_button = screen.getByRole("button", { name: "Add name" })
		await expect(name_button).toBeInTheDocument()
		await userEvent.click(name_button)

		// 1st entry 
		const nameInput_0 = document.getElementById(`root_studies_name__0__0`) 
		// check if name input is available
		await expect(nameInput_0).toBeInTheDocument()
		fireEvent.change(nameInput_0, {target: {value: config.input["studies"]["name"][0] }})

		// 2nd entry
		await userEvent.click(name_button)

		const nameInput_1 = document.getElementById(`root_studies_name__1__1`) 
		// check if name input is available
		await expect(nameInput_1).toBeInTheDocument()
		fireEvent.change(nameInput_1, {target: {value: config.input["studies"]["name"][1] }})

		// click on Add information button
		const information_button = screen.getByRole("button", { name: "Add information" })
		await expect(information_button).toBeInTheDocument()
		await userEvent.click(information_button)

		// 1st entry information
		const information_0 = document.getElementById(`root_studies_information__0__0_level`) 
		await expect(information_0).toBeInTheDocument()
		fireEvent.change(information_0, {target: {value: config.input["studies"]["information"][0]["level"] }})

		const minimumScore_0 = document.getElementById(`root_studies_information__0__0_minimumScore`) 
		await expect(minimumScore_0).toBeInTheDocument()
		fireEvent.change(minimumScore_0, {target: {value: config.input["studies"]["information"][0]["minimumScore"] }})

		// second entry
		await userEvent.click(information_button)

		const information_1 = document.getElementById(`root_studies_information__1__1_level`) 
		await expect(information_1).toBeInTheDocument()
		fireEvent.change(information_1, {target: {value: config.input["studies"]["information"][1]["level"] }})

		const minimumScore_1 = document.getElementById(`root_studies_information__1__1_minimumScore`) 
		await expect(minimumScore_1).toBeInTheDocument()
		fireEvent.change(minimumScore_1, {target: {value: config.input["studies"]["information"][1]["minimumScore"] }})

		// check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton)
			
		return data 
  };

	/**
	 * 
	 * @returns submitted data from <FrameViewer/>
	*/
	const setupEdit = async(config) => {
    // submitted data via <FrameViewer/>
		let data=false

		// callback function which returns back data submitted via <FrameViewer/>
		function handleSubmit (submittedData) {
			data=submittedData
			return data 
		}

		// render FrameViewer 
		const { container } = render(<FrameViewer frame={config.frame}
			type={config.type}
			uiFrame={config.uiFrame}
			formData={config.formData}
			mode={config.mode}
			onSubmit={handleSubmit}/>
		)

		logRoles(container)

		// click on Add name button
		const name_button = screen.getByRole("button", { name: "Add name" })
		await expect(name_button).toBeInTheDocument()

		// 1st entry 
		const nameInput_0 = document.getElementById(`root_studies_name__0__0`) 
		// check if name input is available
		await expect(nameInput_0).toBeInTheDocument()
		await expect(nameInput_0.value).toStrictEqual(config.input["studies"]["name"][0])

		const nameInput_1 = document.getElementById(`root_studies_name__1__1`) 
		// check if name input is available
		await expect(nameInput_1).toBeInTheDocument()
		await expect(nameInput_1.value).toStrictEqual(config.input["studies"]["name"][1])

		// 3rd entry
		await userEvent.click(name_button)

		const nameInput_2 = document.getElementById(`root_studies_name__2__2`) 
		// check if name input is available
		await expect(nameInput_2).toBeInTheDocument()
		fireEvent.change(nameInput_2, {target: {value: config.input["studies"]["name"][2] }})


		// click on Add information button
		const information_button = screen.getByRole("button", { name: "Add information" })
		await expect(information_button).toBeInTheDocument()

		// 1st entry information
		const information_0 = document.getElementById(`root_studies_information__0__0_level`) 
		await expect(information_0).toBeInTheDocument()
		await expect(information_0.value).toStrictEqual(config.input["studies"]["information"][0]["level"] )

		const minimumScore_0 = document.getElementById(`root_studies_information__0__0_minimumScore`) 
		await expect(minimumScore_0).toBeInTheDocument()
		await expect(minimumScore_0.value).toStrictEqual(config.input["studies"]["information"][0]["minimumScore"] )

		// second entry
		const information_1 = document.getElementById(`root_studies_information__1__1_level`) 
		await expect(information_1).toBeInTheDocument()
		await expect(information_1.value).toStrictEqual(config.input["studies"]["information"][1]["level"] )

		const minimumScore_1 = document.getElementById(`root_studies_information__1__1_minimumScore`) 
		await expect(minimumScore_1).toBeInTheDocument()
		await expect(minimumScore_1.value).toStrictEqual(config.input["studies"]["information"][1]["minimumScore"] )

		// 3rd entry 
		await userEvent.click(information_button) 
		const information_2 = document.getElementById(`root_studies_information__2__2_level`) 
		await expect(information_2).toBeInTheDocument()
		fireEvent.change(information_2, {target: {value: config.input["studies"]["information"][2]["level"] }})

		const minimumScore_2 = document.getElementById(`root_studies_information__2__2_minimumScore`) 
		await expect(minimumScore_2).toBeInTheDocument()
		fireEvent.change(minimumScore_2, {target: {value: config.input["studies"]["information"][2]["minimumScore"] }})


		// check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton)
			
		return data 
  };

	// create a SubDocument with array properties
	test("Create a SubDocument with array properties", async () => {
		
		const config = CONST.CREATE_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		// check if data is same as expected data
		await expect(data).toStrictEqual(CONST.SUBDOCUMENT_DATA_TYPE_CREATE_DATA)
	}) 

	// edit a subdocument  with array properties
	/*test("Edit SubDocument with array properties", async () => {
		
		const config = CONST.EDIT_CONFIG

		// setup FrameViewer 
		let data=await setupEdit(config) 

		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.SUBDOCUMENT_DATA_TYPE_EDIT_DATA)
	})*/



})

