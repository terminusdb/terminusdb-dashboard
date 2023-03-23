import React from "react"
import { COMMENT } from "./constants"

/** --- Frame Viewer templates --- */
/** 
* 
* @param {*} documentation - extracted documentation from frames
* @returns displays document's comment
*/
export const DisplayDocumentation = ({ documentation }) => {
	if(documentation && documentation.hasOwnProperty(COMMENT)) {
  	return <p className="text-muted fw-bold text-left">{ documentation[COMMENT]} </p>
 	}
 	return <div/>
}
