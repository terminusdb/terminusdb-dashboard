import React, {useEffect, useState} from "react"
import * as CONST from "./constants"
import Card from "react-bootstrap/Card"
import {useNavigate,useParams } from "react-router-dom"
import {WOQLClientObj} from "../init-woql-client"
import Stack from "react-bootstrap/Stack"
import {status} from "./utils" 
import {ChangeRequest} from "../hooks/ChangeRequest"
import {ButtonGroup, Button} from 'react-bootstrap';
import ToggleButton from 'react-bootstrap/ToggleButton';
import {Loading} from "../components/Loading"
import { MessageBox, MessageComponent } from "./Messages"
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai"
import {Alerts} from "./Alerts"

const ToggleActions = ({ message, updateChangeRequestStatus , loading}) => {
    const { setCurrentCRObject, exitChangeRequestBranch,currentCRObject }= WOQLClientObj()
    const { organization, dataProduct , changeid} = useParams()
    const  [loadingMessage,setLoadingMessage] = useState(`Approving Change Request ...`)
    const navigate = useNavigate() 

    async function doAction(submitAction) {
        if(submitAction !== CONST.APPROVE ) setLoadingMessage(`Rejecting Change Request ...`)
        let status = submitAction === CONST.APPROVE ? CONST.MERGED : CONST.REJECTED
        let res=await updateChangeRequestStatus(message, status, changeid)
        const originalBranch = currentCRObject.original_branch
        if(res){
            setCurrentCRObject(false)
            exitChangeRequestBranch(originalBranch)
            navigate(`/${organization}/${dataProduct}/change_requests?status=${status}`)
        }
    }

    const reviewButtons = [
        { name: CONST.APPROVE, value: CONST.APPROVE, className: "rounded-left", variant: "outline-success", icon: <AiOutlineCheck className="mr-1 mb-1 success__color"/> },
        { name: CONST.REJECT, value: CONST.REJECT , className: "rounded-right", variant: "outline-danger", icon: <AiOutlineClose className="mr-1 mb-1 text-danger"/> }
    ];

    if(loading) return <Loading message={loadingMessage}/>

    return <Stack directtion="horizontal" className="float-right">
        <small className="text-muted fst-italic fw-light mr-2 ms-auto">
            {`Approve or Reject Change Request`}
        </small>
        <ButtonGroup>
            {reviewButtons.map((button) => (
            <Button
                key={button.name}
                id={button.name}
                type="radio"
                variant={button.variant}
                name={button.name}
                value={button.value}
                className={button.className}
                onClick={(e) => doAction(e.currentTarget.value)}
>
                {button.icon}{button.name}
            </Button>
            ))}
        </ButtonGroup>
    </Stack>
}

export const ReviewComponent = () => {
    const {
        userHasMergeRole,
        currentCRObject
    }= WOQLClientObj()

    const { updateChangeRequestStatus, loading, errorMessage, setError } = ChangeRequest()
    // feedback constants
    const [message, setMessage]=useState("")

    // comment for now
    /*if(!userHasMergeRole) {
        // for collaborator or reader role
        return <MessageComponent/>
    }*/

    return <React.Fragment>
           {errorMessage && <Alerts message={errorMessage} type={CONST.TERMINUS_DANGER} onCancel={setError}/>}
            <Card className="bg-transparent border border-dark m-3">
                <Card.Header className="bg-transparent border border-dark">
                    <Stack direction="horizontal" gap={3} className="text-right w-100">
                        <h6>Submit your Review</h6>
                        <span className="text-light ms-auto">{`Status:`}</span>
                        {status[currentCRObject.status]}
                    </Stack>
                </Card.Header>
                <Card.Body>
                    <MessageBox setMessage={setMessage} message={message}/>
                    <ToggleActions message={message} loading={loading} updateChangeRequestStatus={updateChangeRequestStatus}/>
                </Card.Body>
            </Card>
        </React.Fragment>
        
}
