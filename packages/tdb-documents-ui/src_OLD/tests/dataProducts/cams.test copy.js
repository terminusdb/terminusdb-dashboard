import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { FrameViewer } from "../../FrameViewer"
import * as CONST from "../constants/cams.constants"
import '@testing-library/jest-dom'
//import { handleSubmit } from "../utils/functions"

describe("Test against CAMS data product", () => {

	// create an asset
	test("Create a Person", async() => {

		let data=false

		// callback function which returns back data submitted via <FrameViewer/>
		function handleSubmit (fd) {
			console.log("data ------- ", fd)
			data=fd
			return data 
		} 

		//console.log('CONST.CAMS_FRAMES["Person"]', CONST.CAMS_FRAMES["Person"])

		// render a frame viewer
		let frameViewer=render(<FrameViewer frame={CONST.CAMS_FRAMES}
			type="Person"
			uiFrame={{}}
			formData={{}}
			mode={"Create"}
			onSubmit={handleSubmit}
			/>
		)


		// Add first_name 
		//let first_name_input = screen.findByRole("textarea", { id: "root_first_name" } )
		let first_name_input = document.getElementById("root_first_name")
		expect(first_name_input).toBeInTheDocument()
		await userEvent.type(first_name_input, "Kitty" )
		expect(first_name_input).toHaveValue("Kitty")

		// Add last_name 
		//let last_name_input = await screen.findByRole("textarea", { id: "root_last_name" })
		let last_name_input =document.getElementById("root_last_name")
		expect(last_name_input).toBeInTheDocument()
		await userEvent.type(last_name_input, "Jose" )
		expect(last_name_input).toHaveValue("Jose")

		// find submit button in FrameViewer 
		//let submitButton = screen.findByRole("button", { type: "submit" })
		let submitButton = screen.getByText('Submit')
		expect(submitButton).toBeInTheDocument()
		// user clicks on submit button 
		await userEvent.click(submitButton)
		
		console.log("CLICK ON SUBMIT ... !", data)

		let submittedData={}
		//check
		expect(data).toStrictEqual({
			"@type": "Person",
			"first_name": "Kitty",
			"last_name": "Jose"
		})

	})
})