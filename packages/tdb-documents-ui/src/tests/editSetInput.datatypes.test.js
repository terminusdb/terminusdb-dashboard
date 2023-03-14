import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/setStrings.datatypes.constants"
import '@testing-library/jest-dom'
import {logRoles} from '@testing-library/dom';



/**
 * 
 * @returns submitted data from <FrameViewer/>
*/
const setupEdit = async(config) => {
  // submitted data via <FrameViewer/>
  let data=false

  // callback function which returns back data submitted via <FrameViewer/>
  function handleSubmit (submittedData) {
    console.log("submittedData/// edit" , submittedData)
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

  // 2nd entry 
  const nameInput_1 = document.getElementById(`root_name_Set_1`) 
  // check if name input is available
  await expect(nameInput_1).toBeInTheDocument()
  // check if it has filled value  
  await expect(nameInput_1.value).toStrictEqual(config.formData["name"][1])

  // delete second entry 
  const button_delete_2 = document.getElementById(`Remove_root_name_Set_1`) 
  await expect(button_delete_2).toBeInTheDocument()
  await userEvent.click(button_delete_2)
  
  // enter 2nd
  // click on Add name button
  const button = screen.getByRole("button", { name: "Add name" })
  await expect(button).toBeInTheDocument()
  await userEvent.click(button)

  // add next entry 
  const nameInput_2= document.getElementById(`root_name_Set_2`)  
  // check if name input is available
  await expect(nameInput_2).toBeInTheDocument()
  // check if it has filled value  
  await userEvent.type(nameInput_2, config.input.name[2])

  // check if submit button is available 
  const submitButton = screen.getByText("Submit")
  // check if submit button is available
  expect(submitButton).toBeInTheDocument()
  // click on submit button 
  await userEvent.click(submitButton)
    
  return data 
};

/**
 * Edit and View a Person document with Name (string type) SETs 
 */
 describe("Test input SET data type Properties", () => {

	// edit a string type property 
	test("Edit string type property - Sets ", async () => {
		
		const config = CONST.EDIT_CONFIG

		// setup FrameViewer 
		let data=await setupEdit(config)
		// check if data is same as expected data
		await expect(data).toStrictEqual(CONST.SET_STRING_DATA_TYPE_EDIT_DATA)
	}) 

})
