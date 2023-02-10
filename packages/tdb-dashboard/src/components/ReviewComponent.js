import React, {useEffect, useState} from "react"
import * as CONST from "./constants"
import Card from "react-bootstrap/Card"
import {useNavigate,useParams } from "react-router-dom"
import {WOQLClientObj} from "../init-woql-client"
import Stack from "react-bootstrap/Stack"
import {status} from "./utils" 
import {ChangeRequest} from "../hooks/ChangeRequest"
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import {Loading} from "../components/Loading"
import { MessageBox, MessageComponent } from "./Messages"
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai"

const ToggleActions = ({ message }) => {
    const [action, setAction] = useState(false);
    const { setCurrentCRObject, exitChangeRequestBranch }= WOQLClientObj()
    const { updateChangeRequestStatus, loading } = ChangeRequest()
    const { organization, dataProduct , id} = useParams()
    const navigate = useNavigate() 
    

    useEffect(() => {
        async function doAction() {
            let status = action === CONST.APPROVE ? CONST.MERGED : CONST.REJECTED
            let res=await updateChangeRequestStatus(message, status, id) 
            if(res){
                setCurrentCRObject(false)
                exitChangeRequestBranch()
                navigate(`/${organization}/${dataProduct}`)
            }
        }
        if(action) doAction()
    }, [action])

    const reviewButtons = [
        { name: CONST.APPROVE, value: CONST.APPROVE, className: "rounded-left", variant: "outline-success", icon: <AiOutlineCheck className="mr-1 mb-1 text-success"/> },
        { name: CONST.REJECT, value: CONST.REJECT , className: "rounded-right", variant: "outline-danger", icon: <AiOutlineClose className="mr-1 mb-1 text-danger"/> }
    ];

    if(loading) return <Loading message={action === CONST.APPROVE ? `Approving Change Request ...` : `Rejecting Change Request ...`}/>

    return <Stack directtion="horizontal" className="float-right">
        <small className="text-muted fst-italic fw-light mr-2 ms-auto">
            {`Approve or Reject Change Request`}
        </small>
        <ButtonGroup>
            {reviewButtons.map((button) => (
            <ToggleButton
                key={button.name}
                id={button.name}
                type="radio"
                variant={button.variant}
                name={button.name}
                value={button.value}
                className={button.className}
                checked={action === button.value}
                onChange={(e) => setAction(e.currentTarget.value)}
            >
                {button.icon}{button.name}
            </ToggleButton>
            ))}
        </ButtonGroup>
    </Stack>
}


/**
 * @returns view based on CR actions
 */
export const Review = ({ message, setMessage }) => {
    return <React.Fragment>
        <MessageBox setMessage={setMessage} message={message}/>
        <ToggleActions message={message}/>
    </React.Fragment>
}

export const ReviewComponent = () => {
    const {
        userHasMergeRole,
        currentCRObject
    }= WOQLClientObj()

    // feedback constants
    const [message, setMessage]=useState("")

    if(!userHasMergeRole) {
        // for collaborator or reader role
        return <MessageComponent/>
    }

    return <Card className="bg-transparent border border-dark m-3">
        <Card.Header className="bg-transparent border border-dark">
            <Stack direction="horizontal" gap={3} className="text-right w-100">
                <h6>Submit your Review</h6>
                <span className="text-light ms-auto">{`Status:`}</span>
                {status[currentCRObject.status]}
            </Stack>
        </Card.Header>
        <Card.Body>
            <Review message={message} setMessage={setMessage}/>
        </Card.Body>
    </Card>
        
}