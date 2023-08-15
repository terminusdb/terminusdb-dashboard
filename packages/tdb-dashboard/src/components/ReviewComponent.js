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
import { RiArrowGoBackFill } from "react-icons/ri"
import { OriginHeader, TrackingHeader } from "./DiffView"
import { useOpenAI } from "../hooks/useOpenAI"
import { OpenAIModal } from "./OpenAiModal"
import {SiOpenai} from "react-icons/si"
import {openAIMessage} from "./panelMessage"
import { RadioButton } from "./RadioButton"

const ConflictActions = () => {

    const { setCurrentCRObject, exitChangeRequestBranch, currentCRObject }= WOQLClientObj()
    const { organization, dataProduct , changeid } = useParams()
    const  [loadingMessage, setLoadingMessage] = useState(`Merge Conflicts ...`)
    const navigate = useNavigate() 

    const { updateChangeRequestStatus, loading } = ChangeRequest()

    async function doAction(submitAction) {
        let status = CONST.MERGED, message = `Merging Conflicts ...`
        if(submitAction === CONST.REJECT) {
            status = CONST.REJECTED
            message = `Rejecting Conflicts ...`
        }
        else if(submitAction === "reopen") {
            status = CONST.OPEN
            message = `Reopening CR ...`
        }  
        setLoadingMessage(message)
        let res=await updateChangeRequestStatus(message, status, changeid)
        const originalBranch = currentCRObject.original_branch
        if(res && submitAction === "reopen"){
            // reopen
            setCurrentCRObject(res) 
            navigate(`/${organization}/${dataProduct}/change_requests?status=${status}`)
        }
        else {
            // aprove or reject
            setCurrentCRObject(false)
            exitChangeRequestBranch(originalBranch)
            navigate(`/${organization}/${dataProduct}/change_requests?status=${status}`)
        }
    }

    if(loading) return <Loading message={loadingMessage}/>

    return <Card className="bg-transparent border border-dark mb-3">
            <Card.Header className="bg-light text-dark border border-dark">
              Here are a list of actions which can be performed to merge conflicts
            </Card.Header>
            <Card.Body>
                <Stack direction="horizontal" gap={1} className="mb-3">
                    <div>{`Merge Conflicts in`}</div>
                    <div><OriginHeader branch={currentCRObject.original_branch}/></div>
                    <div>{`with changes of`}</div>
                    <div><TrackingHeader branch={currentCRObject.name}/></div>
                    <AiOutlineCheck className="mr-1 mb-1 success__color  ms-auto"/>
                    <Button className='btn-success btn btn-sm text-dark'  
                        title="Merge Conflicts"
                        onClick={(e) => doAction(CONST.APPROVE)}>
                        Merge Conflicts
                    </Button>
                </Stack>
                <Stack direction="horizontal" gap={1} className="mb-3">
                    <div>{`Reject Conflicts & keep changes in`}</div>
                    <div><OriginHeader branch={currentCRObject.original_branch}/></div>
                    <AiOutlineClose className="mr-1 mb-1 text-danger ms-auto"/>
                    <Button className='btn-danger btn btn-sm text-dark' 
                        title="Reject Conflicts"
                        onClick={(e) => doAction(CONST.REJECT)}>
                        Reject Conflicts
                    </Button>
                </Stack>
                <Stack direction="horizontal" gap={1} className="mb-3">
                    <div>{`Reopen CR and keep editing in`}</div>
                    <div><TrackingHeader branch={currentCRObject.name}/></div>
                    <div>{`to continue with changes `}</div>
                    <RiArrowGoBackFill className="text-light ms-auto"/>
                    <Button className='btn-light btn btn-sm text-dark'  
                        title="Reopen Conflicts"
                        onClick={(e) => doAction("reopen")}>
                        Reopen CR
                    </Button>
                </Stack>
            </Card.Body>
        </Card>
}

const ToggleActions = ({ message, updateChangeRequestStatus , loading}) => {
    
    const { setCurrentCRObject, exitChangeRequestBranch,currentCRObject }= WOQLClientObj()
    const { organization, dataProduct , changeid} = useParams()
    const [show,showModal] = useState(false)
    const [radioValue, setRadioValue]=useState(false)

    const {hasOpenAIKEY,hasKey,pollingCall} = useOpenAI() 

    useEffect(()=>{
        hasOpenAIKEY(organization)
    },[organization])


    const  [loadingMessage,setLoadingMessage] = useState(`Approving Change Request ...`)
    const navigate = useNavigate() 

    async function doAction(submitAction) {
        if(submitAction !== CONST.APPROVE ) {
            setLoadingMessage(`Rejecting Change Request ...`)
        }

        updateStatus (submitAction)
    }

    async function updateStatus (submitAction) {
        let status = submitAction === CONST.APPROVE ? CONST.MERGED : CONST.REJECTED
        let res=await updateChangeRequestStatus(message, status, changeid)
        const originalBranch = currentCRObject.original_branch
        if(res){
            if(res.tracking_branch_last_commit){
                pollingCall(res.tracking_branch_last_commit)
            }
            setCurrentCRObject(false)
            exitChangeRequestBranch(originalBranch)
            navigate(`/${organization}/${dataProduct}/change_requests?status=${status}`)
        }
    }

    const reviewButtons = [
        { name: CONST.APPROVE, label: CONST.APPROVE, value: CONST.APPROVE, className: "rounded-left fw-bold text-success", variant: "outline-success", icon: <AiOutlineCheck className="mr-1 mb-1 success__color"/> },
        { name: CONST.REJECT, label: CONST.REJECT, value: CONST.REJECT , className: "rounded-right fw-bold text-danger", variant: "outline-danger", icon: <AiOutlineClose className="mr-1 mb-1 text-danger"/> }
    ];

    if(loading) return <Loading message={loadingMessage}/>

    
    const infoMessage = openAIMessage[hasKey]

    const getActiveClassName = (radioLabel, radioValue) => {
        /*if(radioLabel === CONST.APPROVE && radioValue === "Active") return `btn fw-bold bg-success text-black`
        if(radioLabel === CONST.REJECT && radioValue === "Inactive") return `btn fw-bold bg-warning text-black`
        */return ``
    }

    return <Stack direction="horizontal" className="float-right">  
       {/* <small className="text-muted fst-italic fw-light mr-2 ms-auto">
            {`Approve or Reject Change Request`}
        </small>*/}
        {/*infoMessage && <small className="fst-italic text-muted">{infoMessage}</small>*/}
        {hasKey && <div >
            <SiOpenai size={20} title={infoMessage} className=" mr-2 text-muted"/>
        </div>}
        <RadioButton radioList={reviewButtons} 
            radioValue={radioValue} 
            onChange={doAction}
            getActiveClassName={getActiveClassName}/>
        {/*<ButtonGroup className="align-items-center">
            {infoMessage && <small>{infoMessage}</small>}
            {hasKey && <SiOpenai size={24} className="mx-3 mr-3"/>}
            {reviewButtons.map((button) => (
            <Button
                key={button.name}
                id={button.name}
                type="radio"
                variant={button.variant}
                name={button.name}
                value={button.value}
                data-cy={button.name}
                className={button.className}
                onClick={(e) => doAction(e.currentTarget.value)}
>
                {button.icon}{button.name}
            </Button>
            ))}
        </ButtonGroup>*/}
    </Stack>
}

export const ReviewComponent = () => {
    const {
        userHasMergeRole,
        currentCRObject
    }= WOQLClientObj()

    const { updateChangeRequestStatus, loading, errorMessage, setError, manageConflict, setManageConflict } = ChangeRequest()
    // feedback constants
    const [message, setMessage]=useState("")

    // comment for now
    /*if(!userHasMergeRole) {
        // for collaborator or reader role
        return <MessageComponent/>
    }*/

    if(currentCRObject.manageConflict) {
        // manage conflicts
        return <ConflictActions/>
    }

    return <div className="mb-5 mt-4">
        {errorMessage && <Alerts message={errorMessage} type={CONST.TERMINUS_DANGER} onCancel={setError}/>}
        <MessageBox setMessage={setMessage} message={message}/>
        <ToggleActions message={message} loading={loading} updateChangeRequestStatus={updateChangeRequestStatus}/>
    </div>

    return <React.Fragment>
    {errorMessage && <Alerts message={errorMessage} type={CONST.TERMINUS_DANGER} onCancel={setError}/>}
        <Card className="bg-transparent border border-0 m-3">
            <Card.Header className="bg-transparent border border-0">
                <Stack direction="horizontal" gap={3} className="text-right w-100">
                    <h6>Submit your Review</h6>
                   {/* <span className="text-light ms-auto">{`Status:`}</span>*/}
                    {/*status[currentCRObject.status]*/}
                </Stack>
            </Card.Header>
            <Card.Body>
                <MessageBox setMessage={setMessage} message={message}/>
                
                <ToggleActions message={message} loading={loading} updateChangeRequestStatus={updateChangeRequestStatus}/>
            </Card.Body>
        </Card>
    </React.Fragment>
        
}
