import React from "react"
import { BiHistory } from "react-icons/bi"
import { Button } from "react-bootstrap"
import { TOOLBAR_BUTTON_STYLES } from "./constants"

export const ViewDocumentHistoryButton = ({ setShowInfo }) => {
  
  function handleViewFrames () {
    let info = { history: Date.now(), frames: false }
    setShowInfo(info)
  }
  return <Button variant="light" style={TOOLBAR_BUTTON_STYLES} className="text-dark btn btn-sm" title={`View Document History`}
    onClick={handleViewFrames}>
    <BiHistory/> {/*"History"*/} 
  </Button>
}  