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
import {RxCross2} from "react-icons/rx"

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
    
	return <Form.Group className="mt-3 mb-5 ml-3 mr-4">
		<Form.Control
			className="bg-dark text-light border-secondary" 
			as="textarea"
			rows="3"
			placeholder="Please leave a comment or a message stating the reason for Rejecting ..."
			value={val}
			onChange={e => setVal(e.target.value)}
			type="text"
		/>
		<Button
			className="text-dark btn-lg float-right mt-2 mb-5 d-flex col-md-2 justify-content-center" 
			title="Reject Change Request"
			variant="danger"
			onClick={handleReject}>
			{loading ? "Rejecting ..." : <><RxCross2 className="mr-2 text-dark"/>
				<h6 className="text-dark fw-bold">{REJECT}</h6>
			</>} 
		</Button>
		<br/>
	</Form.Group>
        
}