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
  const button = screen.getByRole("button", { name: "Add name" })
  await expect(button).toBeInTheDocument()
  await userEvent.click(button)

  // enter 1st 
  const nameInput_0 = document.getElementById(`root_name_Set_0`) 
  // check if name input is available
  await expect(nameInput_0).toBeInTheDocument()
  // clear 
  await userEvent.clear(nameInput_0);
  // enter a name
  await userEvent.type(nameInput_0, config.input.name[0])

  // enter 2nd
  // click on Add name button
  await userEvent.click(button)

  const nameInput_1 = document.getElementById(`root_name_Set_1`) 
  // check if name input is available
  await expect(nameInput_1).toBeInTheDocument()
  // clear 
  await userEvent.clear(nameInput_1);
  // enter a name
  await userEvent.type(nameInput_1, config.input.name[1])

  // enter 2rd
  // click on Add name button
  await userEvent.click(button)

  const nameInput_2 = document.getElementById(`root_name_Set_2`) 
  // check if name input is available
  await expect(nameInput_2).toBeInTheDocument()
  // clear 
  await userEvent.clear(nameInput_2);
  // enter a name
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
 * Create/ Edit and View a Person document with Name (string type) SETs 
 */
 describe("Test input SET data type Properties", () => {


	// create a string type property - Sets
	test("Create string type property - Sets", async () => {
		
		const config = CONST.CREATE_CONFIG

		// setup FrameViewer 
		let data=await setupCreate(config)
		// check if data is same as expected data
		await expect(data).toStrictEqual(CONST.SET_STRING_DATA_TYPE_CREATE_DATA)
	})

})
