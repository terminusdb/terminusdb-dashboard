import React from "react"
import {HiMagnifyingGlass} from "react-icons/hi2"
import {Button} from "react-bootstrap"

// button to view frames
export const ViewFramesButton = ({setShowFrames}) => {
    function handleViewFrames () {
        setShowFrames(Date.now())
    }
    return <Button variant="light"  className="text-dark ms-auto btn btn-sm" title={`View Document Frames`}
                onClick={handleViewFrames}>
                <HiMagnifyingGlass/> {"Frames"} 
            </Button>
}