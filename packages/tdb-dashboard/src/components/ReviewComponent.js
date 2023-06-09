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

   

    const {hasOpenAIKEY,hasKey} = useOpenAI() 

    useEffect(()=>{
        hasOpenAIKEY(organization)
    },[])


    const  [loadingMessage,setLoadingMessage] = useState(`Approving Change Request ...`)
    const navigate = useNavigate() 

    async function doAction(submitAction) {
        if(submitAction !== CONST.APPROVE ) {
            setLoadingMessage(`Rejecting Change Request ...`)
        }
       // if(submitAction === CONST.APPROVE  && hasKey){
         // showModal(true)
       // }else{
            updateStatus (submitAction)
       // }
      /*  let status = submitAction === CONST.APPROVE ? CONST.MERGED : CONST.REJECTED
        let res=await updateChangeRequestStatus(message, status, changeid)
        const originalBranch = currentCRObject.original_branch
        if(res){
            setCurrentCRObject(false)
            exitChangeRequestBranch(originalBranch)
            navigate(`/${organization}/${dataProduct}/change_requests?status=${status}`)
        }*/
    }

    const showModalAndSubmit =(status) =>{
        showModal(false)
        if(status===1){
            updateStatus(CONST.APPROVE)
        }
    }

    async function updateStatus (submitAction) {
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
        {show && <OpenAIModal organization={organization} dataProduct={dataProduct} show ={show} showModal ={showModalAndSubmit}/>}
        
        <small className="text-muted fst-italic fw-light mr-2 ms-auto">
            {`Approve or Reject Change Request`}
        </small>
        <ButtonGroup className="align-items-center">
            {hasKey && <SiOpenai size={24} className="mx-3 mr-3"/>}
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
