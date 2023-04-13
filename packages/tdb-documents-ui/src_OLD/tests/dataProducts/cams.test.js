import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { FrameViewer } from "../../FrameViewer"
import * as CONST from "../constants/cams.constants"
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';
//import { handleSubmit } from "../utils/functions"

describe("Test CAMS data product", () => {

	const setup = async (config) => {

		// submitted data via <FrameViewer/>
		let data=false

		// callback function which returns back data submitted via <FrameViewer/>
		function handleSubmit (submittedData) {
			data=submittedData
			return data 
		} 

		// render a frame viewer
		const { container }=render(<FrameViewer frame={config.frame}
			type={config.type}
			uiFrame={config.uiFrame}
			formData={config.formData}
			mode={config.mode}
			onSubmit={handleSubmit}/>
		)

		logRoles(container)

		// input asset type enum
		const assetTypeEnum = document.getElementById("root_assetType")
		fireEvent.change(assetTypeEnum, { target: { value: config.input["assetType"] } } )

		// input name 
		const nameInput = document.getElementById("root_name")
		// add name
		await userEvent.type(nameInput, config.input["name"])

		// asset_identifier
		const assetIdentifier = document.getElementById("root_asset_identifier")
		await userEvent.type(assetIdentifier, config.input["asset_identifier"])

		// commisioning_date
		const commisioningDateInput  = document.getElementById("root_commisioning_date")
		expect(commisioningDateInput).toBeInTheDocument()
		await userEvent.type(commisioningDateInput, "01/01/2011,01:00:37")

		// design_standards
		const designStandardsInput = document.getElementById("root_design_standards")
		await userEvent.type(designStandardsInput, config.input["design_standards"])

		// last_maintained
		const lastMaintainedInput  = document.getElementById("root_last_maintained")
		await userEvent.type(lastMaintainedInput, "01/01/2011,01:00:37")

		// last_modified
		const lastModifiedInput  = document.getElementById("root_last_modified")
		await userEvent.type(lastModifiedInput, "01/01/2011,01:00:37")

		// click on subdocument location to expand
		const locationSubDocumentInput = document.getElementById("root_location")
		expect(locationSubDocumentInput).toBeInTheDocument();
		await userEvent.click(locationSubDocumentInput)
		
		// location
		const locationAccordionContentContainer = (await screen.findByText("location")).parentElement;
		// expect location accordian to be available
		await waitFor(() => expect(locationAccordionContentContainer).toBeVisible());
		// click on location sub document to expand
		await userEvent.click(locationAccordionContentContainer);
		// wait for expand
		await waitFor(() => expect(locationAccordionContentContainer).toBeVisible());
		
		// city
		const locationCityInput = document.getElementById("root_location_city")
		expect(locationCityInput).toBeInTheDocument();
		await userEvent.type(locationCityInput, config.input["location"]["city"])

		// postal_code
		const locationPostalCodeInput = document.getElementById("root_location_postal_code")
		await userEvent.type(locationPostalCodeInput, config.input["location"]["postal_code"])

		// state
		const locationStateInput = document.getElementById("root_location_state")
		await userEvent.type(locationStateInput, config.input["location"]["state"])

		// street
		const locationStreetInput = document.getElementById("root_location_street")
		await userEvent.type(locationStreetInput, config.input["location"]["street"])

		// latitude
		const locationLatitudeInput = document.getElementById("root_coordinates_0")
		await userEvent.type(locationLatitudeInput, config.input["location"]["geometry_location"]["coordinates"][0])

		// longitude
		const locationLongitudeInput = document.getElementById("root_coordinates_1")
		await userEvent.type(locationLongitudeInput, config.input["location"]["geometry_location"]["coordinates"][1])
		
		// geometry location type 
		const locationTypeEnum = document.getElementById("root_type")
		fireEvent.change(locationTypeEnum, { target: { value: config.input["location"]["geometry_location"]["type"] } } )

		// applicable_hazards
		// applicable_hazards is a set, so we add only 1 applicable_hazards
		const applicableHazardButton=screen.getByTestId("add_applicable_hazards");
		// click on add applicable_hazards
		await userEvent.click(applicableHazardButton)



		
		// expand applicable_hazards sub document
		//const applicableHazardContentContainer = (document.getElementById("root_applicable_hazards_0")).parentElement;
		const applicableHazardContentContainer = document.getElementById("root_applicable_hazards_0")
		expect(applicableHazardContentContainer).toBeInTheDocument()
		// expect applicable_hazards accordian to be available
		await waitFor(() => expect(applicableHazardContentContainer).toBeVisible());
		// click on applicable_hazards sub document to expand
		await userEvent.click(applicableHazardContentContainer);
		// wait for expand
		//await waitFor(() => expect(applicableHazardContentContainer).toBeVisible());

		



		// applicable_hazards => Grade 
		/*const gradeInput=document.getElementById("root_applicable_hazards_0_Grade")
		// await waitFor(() => expect(gradeInput).toBeVisible());
		await userEvent.type(gradeInput, 3)*/
		//await userEvent.type(gradeInput, config.input["applicable_hazards"][0]["Grade"])

		// applicable_hazards => hazard 
		//const hazardTypeEnum = document.getElementById("root_applicable_hazards_0_hazard")
		//fireEvent.change(hazardTypeEnum, { target: { value: config.input["applicable_hazards"][0]["hazard"] } } )

		// click on submit button 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton)

		return data 
	}

	// create an asset
	test("Create an Asset", async() => {

		let config=CONST.CREATE_ASSET_CONFIG
		let data = await setup (config)

		//console.log("data /////", JSON.stringify(data, null, 2))

		expect(data).toStrictEqual(CONST.ASSET_CREATE)
	})
})