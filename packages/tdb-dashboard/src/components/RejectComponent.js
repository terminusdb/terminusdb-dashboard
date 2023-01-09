import React, {useState} from "react"
import {Button, Form} from "react-bootstrap"
import {WOQLClientObj} from "../init-woql-client"
import {ChangeRequest} from "../hooks/ChangeRequest"
import {
    REJECT,
    REJECTED
} from "./constants"
import {Loading} from "./Loading"
import {useNavigate } from "react-router-dom"
import {VscGitPullRequest} from "react-icons/vsc"

export const RejectComponent = ({setKey}) => {
	const {
        currentCRObject
    } = WOQLClientObj()

    const {
        updateChangeRequestStatus,
        getChangeRequestList,
		loading
    } = ChangeRequest()

    const [val, setVal]=useState("")
    const navigate = useNavigate() // to navigate

    /** handle Reject */
    async function handleReject () {
        let res=await updateChangeRequestStatus(val, REJECTED)
        let cr=await getChangeRequestList()
        navigate(`/change_requests/`)
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
			onClick={handleReject}>
			{loading ? <Loading message={REJECT}/> : <><VscGitPullRequest className="mt-1 mr-2 h6 fw-bold text-danger"/>{REJECT}</>} 
		</Button>
		<br/>
	</Form.Group>
        
}