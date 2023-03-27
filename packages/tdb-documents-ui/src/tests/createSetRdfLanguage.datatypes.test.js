import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/setRDFLanguage.datatypes.constants"
import '@testing-library/jest-dom'
import {logRoles} from '@testing-library/dom';



/**
 * 
 * @returns submitted data from <FrameViewer/>
*/
const setupCreate = async(config) => {
  // submitted data via <FrameViewer/>
  let data=false

  // callback function which returns back data submitted via <FrameViewer/>
  function handleSubmit (submittedData) {
    //console.log("submittedData///" , submittedData)
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
  const button = screen.getByRole("button", { name: "Add lang" })
  await expect(button).toBeInTheDocument()
  
  for(let entries=0; entries < config.input["lang"].length; entries ++){
    await userEvent.click(button)
    // enter 1st 
    const lang_0 = document.getElementById(`language_root_lang_${entries}__${entries}`) 
    // check if name input is available
    await expect(lang_0).toBeInTheDocument()
    // enter a name
    await userEvent.type(lang_0, config.input["lang"][entries]["@lang"])

    const value_0 = document.getElementById(`value_root_lang_${entries}__${entries}`) 
    // check if name input is available
    await expect(value_0).toBeInTheDocument()
    // enter a name
    await userEvent.type(value_0, config.input["lang"][entries]["@value"]) 
  }
  
  // check if submit button is available 
  const submitButton = screen.getByText("Submit")
  // check if submit button is available
  expect(submitButton).toBeInTheDocument()
  // click on submit button 
  await userEvent.click(submitButton) 
    
  return data 
};

/**
 * Create/ Edit and View a Person rdf lang property SET 
 */
 describe("Test SET rdf language type Properties", () => {


	// create a rdf language property - Sets
	test("Create set rdf language property - Sets", async () => {
		
		const config = CONST.CREATE_CONFIG

		// setup FrameViewer 
		let data=await setupCreate(config)
		// check if data is same as expected data
		await expect(data).toStrictEqual(CONST.SET_RDF_LANG_DATA_TYPE_CREATE_DATA)
	})


})
