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

  // add an existing link
  const button = screen.getByRole("button", { name: "Add likes" })
  await expect(button).toBeInTheDocument()
  await userEvent.click(button)

  // click on link existing document 
  const linkExisting = document.getElementById("Link an existing Document__root_likes_0__0__1")
  await expect(linkExisting).toBeInTheDocument()
  await userEvent.click(linkExisting); 

  // expect search component to appear 
  // add an ID from Search component  
  const divInput = document.getElementById("ID 2")
  // check if divInput input is available
  expect(divInput).toBeInTheDocument()
  // select ID 3
  await userEvent.click(divInput); 
  
  // add another entry
  await userEvent.click(button); 

  const createNew = document.getElementById("Create New Document__root_likes_1__1__1")
  await expect(createNew).toBeInTheDocument()
  await userEvent.click(createNew); 

  const likes_category_1 = document.getElementById("root_likes_category_root_likes_1__1__1")
  // check if likes_category_1 root input is available
  expect(likes_category_1).toBeInTheDocument()
  // enter a likes_category_1 root value
  fireEvent.change(likes_category_1, {target: {value: config.input["likes"][1]["category"]}})

  const likes_nickName_1 = document.getElementById("root_likes_nickName_root_likes_1__1__1")
  // check if likes_nickName_1 root input is available
  expect(likes_nickName_1).toBeInTheDocument()
  // enter a likes_nickName_1 root value
  fireEvent.change(likes_nickName_1, {target: {value: config.input["likes"][1]["nickName"]}})


  // check if submit button is available 
  const submitButton = screen.getByText("Submit")
  // check if submit button is available
  expect(submitButton).toBeInTheDocument()
  // click on submit button 
  await userEvent.click(submitButton) 
    
  return data 
};

/**
 * Create a Person rdf lang property SET 
 */
 describe("Create SET rdf language type Properties", () => {


	// Edit a rdf language property - Sets
	test("Edit set rdf language property - Sets", async () => {
		
		const config = CONST.CREATE_CONFIG

		// setup FrameViewer 
		let data=await setup(config)
    
		// check if data is same as expected data
    await expect(data).toStrictEqual(CONST.SET_UNFOLDED_DATA_TYPE_CREATE_DATA)
	})


})
