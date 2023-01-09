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
    
	return <Form.Group className="mt-3 mb-5">
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
			className="text-dark btn-sm fw-bold float-right mt-2 mb-5 d-flex" 
			variant="light"
			disabled={loading}
			onClick={handleMessage}>
			{loading ? <Loading message={COMMENT}/> : <><VscCommentDiscussion className="mt-1 mr-2 h6 fw-bold"/>{COMMENT}</>} 
		</Button>
	</Form.Group>
        
}