import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/rdfLanguage.datatypes.constants"
import '@testing-library/jest-dom'
import {logRoles} from '@testing-library/dom';



/**
 * Create/ Edit and View a Person document with rdf:Language property
 */
describe("Test rdf:Language data type Property", () => {

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

		// enter a language 
		const languageInput = document.getElementById("language_root_records")
		// check if languageInput is available
		expect(languageInput).toBeInTheDocument()
		// clear 
		await userEvent.clear(languageInput);
		// enter a language
		await userEvent.type(languageInput, config.input["records"]["@lang"])

		// enter a value 
		const valueInput = document.getElementById("value_root_records")
		// check if valueInput is available
		expect(valueInput).toBeInTheDocument()
		// clear 
		await userEvent.clear(valueInput);
		// enter a language
		await userEvent.type(valueInput, config.input["records"]["@value"])
		
		// check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton) 
			
		return data 
    };

	const setUpEdit= async(config) => {
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

		
		// enter a language 
		const languageInput = document.getElementById("language_root_records")
		// check if languageInput is available
		expect(languageInput).toBeInTheDocument()
		await expect(languageInput.value).toStrictEqual(config.formData["records"]["@lang"])
		fireEvent.change(languageInput, {target: {value: config.input["records"]["@lang"]}})
	

		// enter a value 
		const valueInput = document.getElementById("value_root_records")
		// check if valueInput is available
		expect(valueInput).toBeInTheDocument()
		await expect(valueInput.value).toStrictEqual(config.formData["records"]["@value"])
		fireEvent.change(valueInput, {target: {value: config.input["records"]["@value"]}})
	
		
		// check if submit button is available 
		const submitButton = screen.getByText("Submit")
		// check if submit button is available
		expect(submitButton).toBeInTheDocument()
		// click on submit button 
		await userEvent.click(submitButton) 
 
			
		return data 
  };

	// create a rdf:Language type property
	test("Create rdf:Language type property", async () => {
		
		const config = CONST.CREATE_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.RDF_LANG_DATA_TYPE_CREATE_DATA)
	})

	// edit a rdf:Language type property 
	test("Edit rdf:Language type property", async () => {
		
		const config = CONST.EDIT_CONFIG

		// setup FrameViewer 
		let data=await setUpEdit(config)
		
		// check if data is same as expected data
		expect(data).toStrictEqual(CONST.RDF_LANG_DATA_TYPE_EDIT_DATA)
	})

	// view a rdf:Language type property 
	test("View rdf:Language type property", async () => {

		const config = CONST.VIEW_CONFIG

		// render FrameViewer in View mode
		const { container } = render(<FrameViewer frame={config.frame}
			type={config.type}
			uiFrame={config.uiFrame}
			formData={config.formData}
			mode={config.mode}
			/>
		)

		logRoles(container)

		
		// check if language is available
		const languageInput = document.getElementById("language_root_records")
		// check if languageInput is available
		expect(languageInput).toBeInTheDocument()
		await expect(languageInput.value).toStrictEqual(config.formData["records"]["@lang"])
	

		// check if value is available
		const valueInput = document.getElementById("value_root_records")
		// check if valueInput is available
		expect(valueInput).toBeInTheDocument()
		await expect(valueInput.value).toStrictEqual(config.formData["records"]["@value"])
	
		
	}) 

})

