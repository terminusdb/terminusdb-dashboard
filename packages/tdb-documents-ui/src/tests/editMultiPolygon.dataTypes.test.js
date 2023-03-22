import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/geoJSON.datatypes.constants"
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';
import selectEvent from 'react-select-event'


/**
 * Edit and View a MULTIPOLYGON type GEO JSON 
 */
describe("Test edit multipolygon data type Property", () => {

	/**
	 * 
	 * @returns submitted data from <FrameViewer/>
	*/
	const setup = async(config) => {
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
		const latitudeInput = screen.getByRole("textbox", { name: "latitude__0" })
		expect(latitudeInput).toBeInTheDocument()
		expect(latitudeInput.value).toStrictEqual(config.formData["coordinates"][0][0][0] )

		// longitude
		const longitudeInput = screen.getByRole("textbox", { name: "longitude__0" })
		expect(longitudeInput).toBeInTheDocument()
		expect(longitudeInput.value).toStrictEqual(config.formData["coordinates"][0][0][1] ) 

		// first entry 
		const latitudeInput_1 = screen.getByRole("textbox", { name: "latitude__1" })
		expect(latitudeInput_1).toBeInTheDocument()
		expect(latitudeInput_1.value).toStrictEqual(config.formData["coordinates"][0][1][0] )


		// first entry 
		const longitudeInput_1 = screen.getByRole("textbox", { name: "longitude__1" })
		expect(longitudeInput_1).toBeInTheDocument()
		expect(longitudeInput_1.value).toStrictEqual(config.formData["coordinates"][0][1][1] )

	
  };



	// edit  multi polygon type property 
	test("Edit multi polygon type property", async () => {
		
		const config = CONST.MULTI_POLYGON_EDIT_CONFIG


		// setup FrameViewer 
		let data=await setup(config)
		// check if data is same as expected data
		//expect(data).toStrictEqual(CONST.MULTI_POLYGON_DATA_TYPE_EDIT_DATA)

		
	})  
 

})

