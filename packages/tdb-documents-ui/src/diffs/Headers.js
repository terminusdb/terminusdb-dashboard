
import React from "react"
import { Card } from "react-bootstrap"
import * as DIFFCONST from "./diff.constants"

/**
 * 
 * @param {*} oldValueHeader Custom React Element to display in Card Header of old branch  
 * @returns A React Element to display in Card Header of old branch
*/
export const OldValueHeader = ({oldValueHeader}) => {
	if(oldValueHeader) return oldValueHeader
	
	return <React.Fragment>
		{DIFFCONST.ORIGINAL_VALUE}
		<Card.Subtitle className="mt-1 text-muted">
			<small>Old Values are highlighted in 
				<small className="text-danger fw-bold m-1">red</small>
			</small>
		</Card.Subtitle>
	</React.Fragment>
}

/**
 * 
 * @param {*} newValueHeader Custom React Element to display in Card Header of tracking branch  
 * @returns A React Element to display in Card Header of tracking branch
*/
export const NewValueHeader = ({newValueHeader}) => {
	if(newValueHeader) return newValueHeader
	
	return <React.Fragment>
		{DIFFCONST.CHANGED_VALUE}
		<Card.Subtitle className="mt-1 text-muted">
			<small>Changes are highlighted in 
				<small className="text-success fw-bold m-1">green</small>
			</small>
		</Card.Subtitle>
	</React.Fragment>
}
