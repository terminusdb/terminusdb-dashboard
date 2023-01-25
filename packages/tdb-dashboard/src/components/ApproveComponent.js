import React, {useState} from "react"
import {Button, Form} from "react-bootstrap"
import {ChangeRequest} from "../hooks/ChangeRequest"
import {
	APPROVE,
    MERGED
} from "./constants"
import {Loading} from "./Loading"
import {useNavigate,useParams } from "react-router-dom"
import {VscCheck} from "react-icons/vsc"

import {WOQLClientObj} from "../init-woql-client"

export const ApproveComponent = () => {
	const {organization,dataProduct,id} = useParams()
	const {exitChangeRequestBranch} = WOQLClientObj()

    const {
        updateChangeRequestStatus,
        getChangeRequestList,
		loading
    } = ChangeRequest()

    const [val, setVal]=useState("")
	const navigate = useNavigate() // to navigate
    
    /** handle Merge */
    async function handleMerge () {
        let res=await updateChangeRequestStatus(val, MERGED,id)
        let cr=await getChangeRequestList()
		if(res){
			exitChangeRequestBranch()
			navigate(`/${organization}/${dataProduct}`)
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
			className="text-dark btn-lg fw-bold float-right mt-2 mb-5 d-flex col-md-2 justify-content-center" 
			variant="success"
			title="Approve Change Request"
			onClick={handleMerge}> 
			{loading ? "Approving ..." : <><VscCheck className="mt-1 mr-2 h6 fw-bold text-dark"/>
				<h6 className="text-dark fw-bold">{APPROVE}</h6>
			</>} 
		</Button>
	</Form.Group>
        
}