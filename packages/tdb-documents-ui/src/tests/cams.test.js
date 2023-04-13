import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/cams.constants"
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';
import selectEvent from 'react-select-event'


/**
 * Create/ Edit  an Asset in CAMS Data Product
 */
describe("Create/ Edit an Asset in CAMS Data Product", () => {

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

		//logRoles(container)
    
    // applicable hazard
    const applicableHazardsButton = screen.getByRole("button", { name : "Add applicable_hazards" })
		await expect(applicableHazardsButton).toBeInTheDocument()
    await userEvent.click(applicableHazardsButton)

    // applicable hazard grade
    const applicableHazardsGradeInput = document.getElementById("root_applicable_hazards_0__0_Grade")
		await expect(applicableHazardsGradeInput).toBeInTheDocument()
		fireEvent.change(applicableHazardsGradeInput, {target: { value: config.input["applicable_hazards"][0]["Grade"] }})
		
    //  applicable hazard hazard
    await selectEvent.select(getByLabelText('hazard'), [config.input["applicable_hazards"][0]["hazard"]])

    //  asset Type
    await selectEvent.select(getByLabelText('assetType'), [config.input["assetType"]])

    // asset_identifier
    const assetIdentifierInput = document.getElementById("root_asset_identifier")
		await expect(assetIdentifierInput).toBeInTheDocument()
		fireEvent.change(assetIdentifierInput, {target: { value: config.input["asset_identifier"] }})

    // design_standards
    const designStandardsInput = document.getElementById("root_design_standards")
		await expect(designStandardsInput).toBeInTheDocument()
		fireEvent.change(designStandardsInput, {target: { value: config.input["design_standards"] }})

    // location city
    const cityInput = document.getElementById("root_location_city")
		await expect(cityInput).toBeInTheDocument()
		fireEvent.change(cityInput, {target: { value: config.input["location"]["city"] }})

    // location postal code
    const postalCodeInput = document.getElementById("root_location_postal_code")
		await expect(postalCodeInput).toBeInTheDocument()
		fireEvent.change(postalCodeInput, {target: { value: config.input["location"]["postal_code"] }})

    // location state
    const stateInput = document.getElementById("root_location_state")
		await expect(stateInput).toBeInTheDocument()
		fireEvent.change(stateInput, {target: { value: config.input["location"]["state"] }})

    // location street
    const streetInput = document.getElementById("root_location_street")
		await expect(streetInput).toBeInTheDocument()
		fireEvent.change(streetInput, {target: { value: config.input["location"]["street"] }})

    // geometry_location
    await selectEvent.select(getByLabelText('geometry_location'), [config.input["location"]["geometry_location"]["@type"] ])

    // location coordinates 
    // latitude__0
    const latInput = document.getElementById("latitude__0")
		await expect(latInput).toBeInTheDocument()
		fireEvent.change(latInput, {target: { value: config.input["location"]["geometry_location"]["coordinates"][0] }})

    // longitude__1
    const lngInput = document.getElementById("longitude__1")
		await expect(lngInput).toBeInTheDocument()
		fireEvent.change(lngInput, {target: { value: config.input["location"]["geometry_location"]["coordinates"][1] }})

    // type
    await selectEvent.select(getByLabelText('type'), [config.input["location"]["geometry_location"]["type"] ])
    
    // name
    const nameInput = document.getElementById("root_name")
		await expect(nameInput).toBeInTheDocument()
		fireEvent.change(nameInput, {target: { value: config.input["name"] }})

    // cost
    const costInput = document.getElementById("root_cost")
		await expect(costInput).toBeInTheDocument()
		fireEvent.change(costInput, {target: { value: config.input["cost"] }})

    // operating
    await selectEvent.select(getByLabelText('operating'), [config.input["operating"] ])
   
    // description 
    const descriptionButton = screen.getByRole("button", { name : "Add description" })
		await expect(descriptionButton).toBeInTheDocument()
    await userEvent.click(descriptionButton)

    // description first entry
    const descrInput = document.getElementById("root_description_0__0")
		await expect(descrInput).toBeInTheDocument()
		fireEvent.change(descrInput, {target: { value: config.input["description"][0] }})

    // spatial_web_identifier  create new 
		const createNew = document.getElementById("Create New Document__1")
		await expect(createNew).toBeInTheDocument()
		await userEvent.click(createNew); 

    // spatial_web_identifier
    const spatialWedInput = document.getElementById("root_spatial_web_identifier_id_1")
		await expect(spatialWedInput).toBeInTheDocument()
		fireEvent.change(spatialWedInput, {target: { value: config.input["spatial_web_identifier"]["id"] }})
		
    // add test to check date widgets 
		// commisioning_date
    const commisioningDate = getByTestId("date-picker__commisioning_date");
    await expect(commisioningDate).toBeInTheDocument()

    // last_maintained
    const lastMaintainedDate = getByTestId("date-picker__last_maintained");
    await expect(lastMaintainedDate).toBeInTheDocument()

  
   // expect(commisioningDate.value).toBe("06 April, 2023");
    
    // add test to check date widgets 
    // last_maintained
    // last_modified

	  // check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton)

		return data 
  };

	// create 
	test("Create an Asset", async () => {
		
		const config = CONST.CREATE_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		// check if data is same as expected data
		expect(data).toStrictEqual(config.input)
	}) 

  // view
	test("View as Asset", async () => {

    let config = CONST.VIEW_CONFIG

		// render FrameViewer in View mode
		const { container, getByTestId } = render(<FrameViewer frame={CONST.VIEW_CONFIG.frame}
			type={CONST.VIEW_CONFIG.type}
			uiFrame={CONST.VIEW_CONFIG.uiFrame}
			formData={CONST.VIEW_CONFIG.input}
			mode={CONST.VIEW_CONFIG.mode}
			/>
		)

		//logRoles(container)

    // applicable hazard grade
    const applicableHazardsGradeInput = document.getElementById("root_applicable_hazards_0__0_Grade")
		await expect(applicableHazardsGradeInput).toBeInTheDocument()
    await expect(applicableHazardsGradeInput.value).toStrictEqual(config.input["applicable_hazards"][0]["Grade"])
		
    // asset_identifier
    const assetIdentifierInput = document.getElementById("root_asset_identifier")
		await expect(assetIdentifierInput).toBeInTheDocument()
    await expect(assetIdentifierInput.value).toStrictEqual(config.input["asset_identifier"])

    // design_standards
    const designStandardsInput = document.getElementById("root_design_standards")
		await expect(designStandardsInput).toBeInTheDocument()
    await expect(designStandardsInput.value).toStrictEqual(config.input["design_standards"])

    // location city
    const cityInput = document.getElementById("root_location_city")
		await expect(cityInput).toBeInTheDocument()
    await expect(cityInput.value).toStrictEqual(config.input["location"]["city"])

    // location postal code
    const postalCodeInput = document.getElementById("root_location_postal_code")
		await expect(postalCodeInput).toBeInTheDocument()
    await expect(postalCodeInput.value).toStrictEqual(config.input["location"]["postal_code"])

    // location state
    const stateInput = document.getElementById("root_location_state")
		await expect(stateInput).toBeInTheDocument()
    await expect(stateInput.value).toStrictEqual(config.input["location"]["state"])

    // location street
    const streetInput = document.getElementById("root_location_street")
		await expect(streetInput).toBeInTheDocument()
    await expect(streetInput.value).toStrictEqual(config.input["location"]["street"])


    // location coordinates 
    const map = getByTestId("map-leaflet-id");
    await expect(map).toBeInTheDocument()
    
    
    // name
    const nameInput = document.getElementById("root_name")
		await expect(nameInput).toBeInTheDocument()
    await expect(nameInput.value).toStrictEqual(config.input["name"])

    // cost
    const costInput = document.getElementById("root_cost")
		await expect(costInput).toBeInTheDocument()
    await expect(costInput.value).toStrictEqual(config.input["cost"])
   

    // description first entry
    const descrInput = document.getElementById("root_description_0__0")
		await expect(descrInput).toBeInTheDocument()
    await expect(descrInput.value).toStrictEqual(config.input["description"][0])

	
	})

})

