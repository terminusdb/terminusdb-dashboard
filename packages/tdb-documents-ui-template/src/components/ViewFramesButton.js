import React from "react"
import { HiMagnifyingGlass } from "react-icons/hi2"
import { Button } from "react-bootstrap"
import { TOOLBAR_BUTTON_STYLES } from "./constants"

// button to view frames
export const ViewFramesButton = ({ setShowInfo }) => {
	function handleViewFrames () {
		let info = { frames: Date.now(), history:false }
		setShowInfo(info)
	}
	return <Button variant="light"  	 className="text-dark ms-auto btn btn-sm" title={`View Document Frames`}
		onClick={handleViewFrames}>
	<HiMagnifyingGlass/> {"Frames"} 
	</Button>
}