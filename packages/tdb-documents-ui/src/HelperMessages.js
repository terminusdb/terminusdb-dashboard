import React from "react"
import { VIEW } from "./constants"

export const HelperMessages = ({ frame, mode, type, formData }) => {
  
  if(!frame) return <div>No schema provided!</div>

	if(!mode) return  <div>Please include a mode - Create/ Edit/ View</div>

	if(mode === VIEW && !formData) return <div>Mode is set to View, please provide filled form data</div>

	if(!type) return  <div>Please include the type of document</div>

  return <div/>
	
}