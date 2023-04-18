import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/geoJSON.datatypes.constants"
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';
import selectEvent from 'react-select-event'
import { extractPropertyDocumentation } from '../helpers/widgetHelper';

describe("Edit a location with Line String", () => {

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

		
    
    let addCoordinatesButton = screen.getByRole("button", { name: "Add Coordinates"})
    await expect(addCoordinatesButton).toBeInTheDocument()
		

    // location coordinates 
    // latitude__0
    const latInput = document.getElementById("latitude__0")
		await expect(latInput).toBeInTheDocument()
		expect(latInput.value).toStrictEqual(config.formData["location"]["geometry_location"]["coordinates"][0][0])

    // longitude__0
    const lngInput = document.getElementById("longitude__0")
		await expect(lngInput).toBeInTheDocument()
		expect(lngInput.value).toStrictEqual(config.formData["location"]["geometry_location"]["coordinates"][0][1])
    
		// latitude__1
    const latInput_1 = document.getElementById("latitude__1")
		await expect(latInput_1).toBeInTheDocument()
		expect(latInput_1.value).toStrictEqual(config.formData["location"]["geometry_location"]["coordinates"][1][0])

    // longitude__1
    const lngInput_1 = document.getElementById("longitude__1")
		await expect(lngInput_1).toBeInTheDocument()
		expect(lngInput_1.value).toStrictEqual(config.formData["location"]["geometry_location"]["coordinates"][1][1])
    
		// change first entry 
		fireEvent.change(latInput, {target: { value: config.input["location"]["geometry_location"]["coordinates"][0][0] }})
    fireEvent.change(lngInput, {target: { value: config.input["location"]["geometry_location"]["coordinates"][0][1] }})
    
    // add another entry 
		await userEvent.click(addCoordinatesButton)

    
    // latitude__2
    const latInput_2 = document.getElementById("latitude__2")
		await expect(latInput_2).toBeInTheDocument()
		fireEvent.change(latInput_2, {target: { value: config.input["location"]["geometry_location"]["coordinates"][2][0] }})
    
    // longitude__2
    const lngInput_2 = document.getElementById("longitude__2")
		await expect(lngInput_2).toBeInTheDocument()
		fireEvent.change(lngInput_2, {target: { value: config.input["location"]["geometry_location"]["coordinates"][2][1] }})
    


	  // check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton) 

		return data 
  };

	// edit 
	test("Edit Line String", async () => { 
		
		const config = CONST.EDIT_SUBDOCUMENT_LINE_STRING_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		// check if data is same as expected data
		//console.log("config.input", JSON.stringify(config.input))
		//console.log("data", JSON.stringify(data))
		expect(data).toStrictEqual(config.input)
	}) 

  

})

