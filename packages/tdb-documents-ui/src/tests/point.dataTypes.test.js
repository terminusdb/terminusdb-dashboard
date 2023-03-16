import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/geoJSON.datatypes.constants"
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';
import selectEvent from 'react-select-event'


function enterCoordinates(config) {
	// enter latitude
	const latitudeInput = screen.getByRole("textbox", { name: "latitude__0" })
	expect(latitudeInput).toBeInTheDocument()

	fireEvent.change(latitudeInput, {target: {value: config.input["coordinates"][0] }})

	// enter longitude
	const longiudeInput = screen.getByRole("textbox", { name: "longitude__1" })
	expect(longiudeInput).toBeInTheDocument()
	fireEvent.change(longiudeInput, {target: {value: config.input["coordinates"][1] }})

}


/**
 * Create/ Edit and View a Point type GEO JSON 
 */
describe("Test Point data type Property", () => {

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
		
		// enter lat & lng
		enterCoordinates(config)

		// select point type
		await selectEvent.select(getByLabelText('type'), [config.input["type"]])
		
		// check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton) 
			
		return data 
  };

	// create a point type GEO JSON  type property
	test("Create point type property", async () => {
		
		const config = CONST.POINT_CREATE_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.POINT_DATA_TYPE_CREATE_DATA)
	}) 

	// edit an enum type property 
	test("Edit enum type property", async () => {
		
		const config = CONST.POINT_EDIT_CONFIG

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
		
		// check if filled coordinates are displayed 
		// latitude
		const latitudeInput = screen.getByRole("textbox", { name: "latitude__0" })
		expect(latitudeInput).toBeInTheDocument()
		expect(latitudeInput.value).toStrictEqual(config.formData["coordinates"][0])

		// longitude
		const longitudeInput = screen.getByRole("textbox", { name: "longitude__1" })
		expect(longitudeInput).toBeInTheDocument()
		expect(longitudeInput.value).toStrictEqual(config.formData["coordinates"][1])

		
		// enter new lat & lng
		enterCoordinates(config)

		// check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton) 

		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.POINT_DATA_TYPE_EDIT_DATA)
	}) 
 
	// Add test to test VIEW 
	test("View point type property", async () => {
		
		const config = CONST.POINT_VIEW_CONFIG

		const { container, getByLabelText } = render(<FrameViewer frame={config.frame}
			type={config.type}
			uiFrame={config.uiFrame}
			formData={config.formData}
			mode={config.mode}/>
		)

		logRoles(container)
		
		// check if marker is available in UI 
		let markerButton = screen.getByRole("button", { name: "Marker" })
		expect(markerButton).toBeInTheDocument()
		await userEvent.click(markerButton)

		// add more testing to check if marker displays correct info

	}) 

})

