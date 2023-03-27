import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/setRDFLanguage.datatypes.constants"
import '@testing-library/jest-dom'
import {logRoles} from '@testing-library/dom';



async function checkIfDataFilled (config) {
  for(let entries=0; entries < config.formData["lang"].length; entries ++){
    
    // enter 1st 
    const lang_0 = document.getElementById(`language_root_lang_${entries}__${entries}`) 
    // check if name input is available
    await expect(lang_0).toBeInTheDocument()
    expect(lang_0.value).toStrictEqual(config.formData["lang"][entries]["@lang"])

    const value_0 = document.getElementById(`value_root_lang_${entries}__${entries}`) 
    // check if name input is available
    await expect(value_0).toBeInTheDocument()
    expect(value_0.value).toStrictEqual(config.formData["lang"][entries]["@value"])
  }
}



/**
 * 
 * @returns submitted data from <FrameViewer/>
*/
const setupEdit = async(config) => {
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
  
  checkIfDataFilled (config)

  // change first entry value 
  const value_0 = document.getElementById(`value_root_lang_0__0`) 
  // check if name input is available
  await expect(value_0).toBeInTheDocument()
  fireEvent.change(value_0, {target: {value: config.input["lang"][0]["@value"] }})

  // add another entry 
  await userEvent.click(button)

  const lang_new = document.getElementById(`language_root_lang_2__2`) 
  // check if name input is available
  await expect(lang_new).toBeInTheDocument()
  // enter a name
  await userEvent.type(lang_new, config.input["lang"][2]["@lang"])

  const valueNew = document.getElementById(`value_root_lang_2__2`) 
  await expect(valueNew).toBeInTheDocument()
  // enter a name
  await userEvent.type(valueNew, config.input["lang"][2]["@value"]) 
  
  // check if submit button is available 
  const submitButton = screen.getByText("Submit")
  // check if submit button is available
  expect(submitButton).toBeInTheDocument()
  // click on submit button 
  await userEvent.click(submitButton) 
    
  return data 
};

/**
 * Edit and View a Person rdf lang property SET 
 */
 describe("Test Edit SET rdf language type Properties", () => {

  // edit a rdf language property - Sets
	test("Edit set rdf language property - Sets", async () => {
		
		const config = CONST.EDIT_CONFIG

		// setup FrameViewer 
		let data=await setupEdit(config)
		// check if data is same as expected data
		await expect(data).toStrictEqual(CONST.SET_RDF_LANG_DATA_TYPE_EDIT_DATA)
	})

})
