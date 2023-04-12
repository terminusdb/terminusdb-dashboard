import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/setDocumentLinkUnfolded.datatypes.constants"
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
  const button = screen.getByRole("button", { name: "Add likes" })
  await expect(button).toBeInTheDocument()
  await userEvent.click(button)

  // FILLING DEPTH 1 ( likes Animal )
  const createNew = document.getElementById("Create New Document__root_likes_0__0__1")
  await expect(createNew).toBeInTheDocument()
  await userEvent.click(createNew); 

  // enter category 
  const category_0 = document.getElementById(`root_likes_category_root_likes_0__0__1`) 
  // check if name input is available
  await expect(category_0).toBeInTheDocument()
  // enter a name
  await userEvent.type(category_0, config.input["likes"][0]["category"])

  const nickName_0 = document.getElementById(`root_likes_nickName_root_likes_0__0__1`) 
  // check if name input is available
  await expect(nickName_0).toBeInTheDocument()
  // enter a name
  await userEvent.type(nickName_0, config.input["likes"][0]["nickName"])

  // second entry 
  await userEvent.click(button)

  // FILLING DEPTH 2 ( likes Animal )
  const createNew_1 = document.getElementById("Create New Document__root_likes_1__1__1")
  await expect(createNew_1).toBeInTheDocument()
  await userEvent.click(createNew_1); 

  // enter category 
  const category_1 = document.getElementById(`root_likes_category_root_likes_1__1__1`) 
  // check if name input is available
  await expect(category_1).toBeInTheDocument()
  // enter a name
  await userEvent.type(category_1, config.input["likes"][1]["category"])

  const nickName_1 = document.getElementById(`root_likes_nickName_root_likes_1__1__1`) 
  // check if name input is available
  await expect(nickName_1).toBeInTheDocument()
  // enter a name
  await userEvent.type(nickName_1, config.input["likes"][1]["nickName"])
  
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
		await expect(data).toStrictEqual(CONST.SET_UNFOLDED_DATA_TYPE_CREATE_DATA)
	})


})
