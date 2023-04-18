import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/geoJSON.datatypes.constants"
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';
import selectEvent from 'react-select-event'



/**
 * Create/ Edit and View a INE STRING type GEO JSON 
 */
describe("Test line string data type Property", () => {

	/**
	 * 
	 * @returns submitted data from <FrameViewer/>
	*/
	const setup = async(config) => {
    // submitted data via <FrameViewer/>
		let data=false

		// callback function which returns back data submitted via <FrameViewer/>
		function handleSubmit (submittedData) {
			console.log("submittedData///", submittedData)
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
		
		// enter lat & lng
		// B_BOX coordinates 
		// left
		const leftInput = screen.getByRole("spinbutton", { name: "west__0" })
		expect(leftInput).toBeInTheDocument()
		fireEvent.change(leftInput, {target: {value: config.input["bbox"][0] }})

		// bottom 
		const bottomInput = screen.getByRole("spinbutton", { name: "south__1" })
		expect(bottomInput).toBeInTheDocument()
		fireEvent.change(bottomInput, {target: {value: config.input["bbox"][1] }})

		// right
		const rightInput = screen.getByRole("spinbutton", { name: "east__2" })
		expect(rightInput).toBeInTheDocument()
		fireEvent.change(rightInput, {target: {value: config.input["bbox"][2] }})

		// top
		const topInput = screen.getByRole("spinbutton", { name: "north__3" })
		await expect(topInput).toBeInTheDocument()
		fireEvent.change(topInput, {target: {value: config.input["bbox"][3] }})

		// Add coordinates 
		const buttonInput = screen.getByRole("button", { name: "Add Coordinates"})
		await expect(buttonInput).toBeInTheDocument()
		await userEvent.click(buttonInput)


		// LINE STRING  coordinates
		// FIRST ENTRY
		// enter latitude
		const latitudeInput = document.getElementById("latitude__0")
		expect(latitudeInput).toBeInTheDocument()
		fireEvent.change(latitudeInput, {target: {value: config.input["coordinates"][0][0] }})

		// enter longitude
		const longiudeInput = screen.getByRole("spinbutton", { name: "longitude__0" })
		expect(longiudeInput).toBeInTheDocument()
		
		fireEvent.change(longiudeInput, {target: {value: config.input["coordinates"][0][1] }}) 

		// SECOND ENTRY
		await userEvent.click(buttonInput)

		// enter latitude
		const latitudeInput_1 = document.getElementById("latitude__1")
		await expect(latitudeInput_1).toBeInTheDocument()
		fireEvent.change(latitudeInput_1, {target: {value: config.input["coordinates"][1][0] }})

		// enter longitude
		const longiudeInput_1 = screen.getByRole("spinbutton", { name: "longitude__1" })
		expect(longiudeInput_1).toBeInTheDocument()
		fireEvent.change(longiudeInput_1, {target: {value: config.input["coordinates"][1][1] }}) 

		// THIRD 
		await userEvent.click(buttonInput)
		// enter latitude
		const latitudeInput_2 = document.getElementById("latitude__2")
		await expect(latitudeInput_2).toBeInTheDocument()
		fireEvent.change(latitudeInput_2, {target: {value: config.input["coordinates"][2][0] }})

		// enter longitude
		const longiudeInput_2 = screen.getByRole("spinbutton", { name: "longitude__2" })
		expect(longiudeInput_2).toBeInTheDocument()
		fireEvent.change(longiudeInput_2, {target: {value: config.input["coordinates"][2][1] }}) 


		// select point type
		await selectEvent.select(getByLabelText('type'), [config.input["type"]])
		
		// check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		await expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton) 
			
		return data 
  };

	// create a LINE STRING type GEO JSON  type property
	test("Create line string type property", async () => {
		
		const config = CONST.LINE_STRING_CREATE_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
	
		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.LINE_STRING_DATA_TYPE_CREATE_DATA)
	})  

	// simple check if all info is available
	/*test("Edit line string type property", async () => {
		
		const config = CONST.LINE_STRING_EDIT_CONFIG

		// setup FrameViewer 
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

		// latitude
		const latitudeInput = screen.getByRole("spinbutton", { name: "latitude__0" })
		expect(latitudeInput).toBeInTheDocument()
		expect(latitudeInput.value).toStrictEqual(config.formData["coordinates"][0][0])

		// longitude
		const longitudeInput = screen.getByRole("spinbutton", { name: "longitude__0" })
		expect(longitudeInput).toBeInTheDocument()
		expect(longitudeInput.value).toStrictEqual(config.formData["coordinates"][0][1])


		// latitude first entry 
		const latitudeInput_1 = screen.getByRole("spinbutton", { name: "latitude__1" })
		expect(latitudeInput_1).toBeInTheDocument()
		expect(latitudeInput_1.value).toStrictEqual(config.formData["coordinates"][1][0])

		// longitude first entry 
		const longitudeInput_1 = screen.getByRole("spinbutton", { name: "longitude__1" })
		expect(longitudeInput_1).toBeInTheDocument()
		expect(longitudeInput_1.value).toStrictEqual(config.formData["coordinates"][1][1])

		// latitude second entry 
		const latitudeInput_2 = screen.getByRole("spinbutton", { name: "latitude__2" })
		expect(latitudeInput_2).toBeInTheDocument()
		expect(latitudeInput_2.value).toStrictEqual(config.formData["coordinates"][2][0])

		// longitude second entry 
		const longitudeInput_2 = screen.getByRole("spinbutton", { name: "longitude__2" })
		expect(longitudeInput_2).toBeInTheDocument()
		expect(longitudeInput_2.value).toStrictEqual(config.formData["coordinates"][2][1])

	})  */
 
	// add test to view binding box later ...

})

