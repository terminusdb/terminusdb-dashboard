import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/setMixDocumentLink.datatypes.constants"
import '@testing-library/jest-dom'
import {logRoles} from '@testing-library/dom';
import { Search } from "./constants/unfoldableDocumentLinks.datatypes.constants"



/**
 * 
 * @returns submitted data from <FrameViewer/>
*/
const setup = async(config) => {
  // submitted data via <FrameViewer/>
  let data=false

  // callback function which returns back data submitted via <FrameViewer/>
  function handleSubmit (submittedData) {
    console.log("submittedData///" , submittedData)
    data=submittedData
    return data 
  } 

  // render FrameViewer 
  const { container } = render(<FrameViewer frame={config.frame}
    type={config.type}
    uiFrame={config.uiFrame}
    formData={config.formData}
    mode={config.mode}
    onSelect={<Search/>}
    onSubmit={handleSubmit}/>
  )

  logRoles(container)

  // expect filled values 
  //  category 
  const category_0 = document.getElementById(`root_likes_category_1`) 
  // check if name input is available
  await expect(category_0).toBeInTheDocument()
  // enter a name
  expect(category_0.value).toStrictEqual(config.formData["likes"][0]["category"])

  //  nickName 
  const nickName_0 = document.getElementById(`root_likes_nickName_1`) 
  // check if name input is available
  await expect(nickName_0).toBeInTheDocument()
  expect(nickName_0.value).toStrictEqual(config.formData["likes"][0]["nickName"])

  fireEvent.change(category_0, {target: { value: config.input["likes"][0]["category"] }})
  fireEvent.change(nickName_0, {target: { value: config.input["likes"][0]["nickName"] }})
  
  // add an existing link
  const button = screen.getByRole("button", { name: "Add likes" })
  await expect(button).toBeInTheDocument()
  await userEvent.click(button)

  // click on link existing document 
  const linkExisting = document.getElementById("Link an existing Document__1")
  await expect(linkExisting).toBeInTheDocument()
  await userEvent.click(linkExisting); 

  // expect search component to appear 
  // add an ID from Search component  
  const divInput = document.getElementById("ID 3")
  // check if divInput input is available
  expect(divInput).toBeInTheDocument()
  // select ID 3
  await userEvent.click(divInput); 

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
 describe("Edit SET rdf language type Properties", () => {


	// Edit a rdf language property - Sets
	test("Edit set rdf language property - Sets", async () => {
		
		const config = CONST.EDIT_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
    
		// check if data is same as expected data
    await expect(data).toStrictEqual(CONST.SET_UNFOLDED_DATA_TYPE_EDIT_DATA)
	})


})
