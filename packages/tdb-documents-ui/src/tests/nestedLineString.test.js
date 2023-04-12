import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/geoJSON.datatypes.constants"
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';
import selectEvent from 'react-select-event'
import { extractPropertyDocumentation } from '../helpers/widgetHelper';

describe("Create a location with Line String", () => {

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
		const { container, getByLabelText, getByTestId } = render(<FrameViewer frame={config.frame}
			type={config.type}
			uiFrame={config.uiFrame}
			formData={config.formData}
			mode={config.mode}
			onSubmit={handleSubmit}/>
		)

		
    // geometry_location
    await selectEvent.select(getByLabelText('geometry_location'), [config.input["location"]["geometry_location"]["@type"] ])
    
    let addCoordinatesButton = screen.getByRole("button", { name: "Add Coordinates"})
    await expect(addCoordinatesButton).toBeInTheDocument()
    await userEvent.click(addCoordinatesButton)

    // location coordinates 
    // latitude__0
    const latInput = document.getElementById("latitude__0")
		await expect(latInput).toBeInTheDocument()
		fireEvent.change(latInput, {target: { value: config.input["location"]["geometry_location"]["coordinates"][0][0] }})

    // longitude__1
    const lngInput = document.getElementById("longitude__0")
		await expect(lngInput).toBeInTheDocument()
		fireEvent.change(lngInput, {target: { value: config.input["location"]["geometry_location"]["coordinates"][0][1] }})
    
    // second entry 
    await userEvent.click(addCoordinatesButton)

    // latitude__1
    const latInput_1 = document.getElementById("latitude__1")
		await expect(latInput_1).toBeInTheDocument()
		fireEvent.change(latInput_1, {target: { value: config.input["location"]["geometry_location"]["coordinates"][1][0] }})
    
    // longitude__1
    const lngInput_1 = document.getElementById("longitude__1")
		await expect(lngInput_1).toBeInTheDocument()
		fireEvent.change(lngInput_1, {target: { value: config.input["location"]["geometry_location"]["coordinates"][1][1] }})
    

    // type
    await selectEvent.select(getByLabelText('type'), [config.input["location"]["geometry_location"]["type"] ])

	  // check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton) 

		return data 
  };

	// create 
	test("Create Line String", async () => {
		
		const config = CONST.CREATE_SUBDOCUMENT_LINE_STRING_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		// check if data is same as expected data
		expect(data).toStrictEqual(config.input)
	}) 

  

})

