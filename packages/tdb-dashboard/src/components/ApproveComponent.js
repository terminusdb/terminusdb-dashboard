import React, {useState} from "react"
import {Button, Form} from "react-bootstrap"
import {ChangeRequest} from "../hooks/ChangeRequest"
import {
	APPROVE,
    MERGED
} from "./constants"
import {Loading} from "./Loading"
import {useNavigate } from "react-router-dom"
import {VscCheck} from "react-icons/vsc"

//import {WOQLClientObj} from "../init-woql-client"

export const ApproveComponent = () => {
	/*const {
        currentCRObject
    } = WOQLClientObj()*/

    const {
        updateChangeRequestStatus,
        getChangeRequestList,
		loading
    } = ChangeRequest()

    const [val, setVal]=useState("")
	const navigate = useNavigate() // to navigate
    
    /** handle Merge */
    async function handleMerge () {
        let res=await updateChangeRequestStatus(val, MERGED)
        let cr=await getChangeRequestList()
        navigate(`/change_requests/`)
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
			className="text-dark btn-lg fw-bold float-right mt-2 mb-5 d-flex col-md-2 justify-content-center" 
			variant="success"
			title="Aprove Change Request"
			onClick={handleMerge}> 
			{loading ? <Loading message={APPROVE}/> : <><VscCheck className="mt-1 mr-2 h6 fw-bold text-dark"/>
				<h6 className="text-dark fw-bold">{APPROVE}</h6>
			</>} 
		</Button>
	</Form.Group>
        
}