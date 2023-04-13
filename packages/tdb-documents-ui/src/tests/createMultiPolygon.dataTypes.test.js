import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/geoJSON.datatypes.constants"
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';
import selectEvent from 'react-select-event'


/**
 * Create a MULTIPOLYGON type GEO JSON 
 */
describe("Test Create a multipolygon data type Property", () => {

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
		
		//console.log(" --- test////////////////// ", config.input["coordinates"][0][1][0])

		// enter lat & lng
		const leftInput = screen.getByRole("spinbutton", { name: "left__0" })
		expect(leftInput).toBeInTheDocument()
		fireEvent.change(leftInput, {target: {value: config.input["bbox"][0] }})

		// bottom 
		const bottomInput = screen.getByRole("spinbutton", { name: "bottom__1" })
		expect(bottomInput).toBeInTheDocument()
		fireEvent.change(bottomInput, {target: {value: config.input["bbox"][1] }})

		// right
		const rightInput = screen.getByRole("spinbutton", { name: "right__2" })
		expect(rightInput).toBeInTheDocument()
		fireEvent.change(rightInput, {target: {value: config.input["bbox"][2] }})

		// top
		const topInput = screen.getByRole("spinbutton", { name: "top__3" })
		expect(topInput).toBeInTheDocument()
		fireEvent.change(topInput, {target: {value: config.input["bbox"][3] }})


		// MULTI POLYGON coordinates
		// Click on Add Polygon
		const addPolygonButton = screen.getByRole("button", { name: "Add Polygon" })
		await expect(addPolygonButton).toBeInTheDocument()
		await userEvent.click(addPolygonButton)

		// Click on Add Coordinates
		const addCoordinatesButton = screen.getByRole("button", { name: "Add Coordinates" })
		await expect(addCoordinatesButton).toBeInTheDocument()
		await userEvent.click(addCoordinatesButton)

		// enter latitude
		const latitudeInput = screen.getByRole("spinbutton", { name: "latitude__0" })
		expect(latitudeInput).toBeInTheDocument()
		
		fireEvent.change(latitudeInput, {target: { value: config.input["coordinates"][0][0][0] }})

		// enter longitude
		const longiudeInput = screen.getByRole("spinbutton", { name: "longitude__0" })
		expect(longiudeInput).toBeInTheDocument()
		fireEvent.change(longiudeInput, {target: { value: config.input["coordinates"][0][0][1] }})

		// Click on Add Coordinates
		await userEvent.click(addCoordinatesButton)

		// enter latitude
		const latitudeInput_1 = screen.getByRole("spinbutton", { name: "latitude__1" })
		expect(latitudeInput_1).toBeInTheDocument()
		fireEvent.change(latitudeInput_1, {target: { value: config.input["coordinates"][0][1][0] }})

		// enter longitude
		const longiudeInput_1 = screen.getByRole("spinbutton", { name: "longitude__1" })
		expect(longiudeInput_1).toBeInTheDocument()
		fireEvent.change(longiudeInput_1, {target: { value: config.input["coordinates"][0][1][1] }})

		// Click on Add Coordinates
		await userEvent.click(addCoordinatesButton)

		// enter latitude
		const latitudeInput_2 = screen.getByRole("spinbutton", { name: "latitude__2" })
		expect(latitudeInput_2).toBeInTheDocument()
		fireEvent.change(latitudeInput_2, {target: { value: config.input["coordinates"][0][2][0] }})

		// enter longitude
		const longiudeInput_2 = screen.getByRole("spinbutton", { name: "longitude__2" })
		expect(longiudeInput_2).toBeInTheDocument()
		fireEvent.change(longiudeInput_2, {target: { value: config.input["coordinates"][0][2][1] }}) 

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

	// create a multipolygon type GEO JSON  type property
	test("Create multipolygon type property", async () => {
		
		const config = CONST.MULTI_POLYGON_CREATE_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		// check if data is same as expected data 
		expect(data).toStrictEqual(CONST.MULTI_POLYGON_DATA_TYPE_CREATE_DATA)
	})  


})

