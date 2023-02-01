import React, {useState} from "react"
import {Button, Form} from "react-bootstrap"
import {WOQLClientObj} from "../init-woql-client"
import {ChangeRequest} from "../hooks/ChangeRequest"
import {
    COMMENT,
    MESSAGES
} from "./constants"
import {extractID} from "./utils"
import {Loading} from "./Loading"
import {VscCommentDiscussion} from "react-icons/vsc"

export const CommentComponent = ({setKey}) => {
	const {
        currentCRObject
    } = WOQLClientObj()

    const {
        updateChangeRequestStatus,
        getChangeRequestByID,
		loading
    } = ChangeRequest() 

    const [val, setVal]=useState("")
    
    async function handleMessage() {
		let res=await updateChangeRequestStatus(val, currentCRObject.status)
        let id=extractID(currentCRObject["@id"])
        let cr=await getChangeRequestByID(id) 
        if(setKey) {
			setKey(MESSAGES)
			setVal("")
		}
    }
    
	return <Form.Group className="mt-3 mb-5 ml-3 mr-4">
		<Form.Control
			className="bg-dark text-light border-secondary" 
			as="textarea"
			rows="3"
			placeholder="Please leave a comment or a message ..."
			value={val}
			onChange={e => setVal(e.target.value)}
			type="text"
		/>
		<Button
			className="text-dark btn-lg float-right mt-2 mb-5 d-flex border border-dark col-md-2 justify-content-center" 
			variant="light"
			disabled={loading}
			title="Leave a Comment"
			onClick={handleMessage}>
			{loading ? "Saving Comment ..." : <><VscCommentDiscussion className="mr-2 mt-1 h6 fw-bold text-dark"/>
				<h6 className="text-dark fw-bold">{COMMENT}</h6>
			</>} 
		</Button>
	</Form.Group>
        
}