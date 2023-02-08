import React, {useState} from "react"
import * as CONST from "./constants"
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button'
import {useNavigate,useParams } from "react-router-dom"
import {WOQLClientObj} from "../init-woql-client"
import Form from "react-bootstrap/Form"
import Stack from "react-bootstrap/Stack"
import {status, extractID} from "./utils" 
import {ChangeRequest} from "../hooks/ChangeRequest"
import Spinner from 'react-bootstrap/Spinner';

const ActionButton = ({variant, title, content, onClick, loading, icon}) => {
    return <Button
        className="text-dark btn btn-sm fw-bold d-flex mt-3 float-end" 
        variant={variant}
        title={title}
        onClick={onClick}> 
            {loading && <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                className="mr-1 mt-1"
                aria-hidden="true"
            />}
            <div className="d-flex">
                {icon}
                <label>{content}</label>
            </div>
    </Button>
}

/**
 * @returns buttons to reject commit or approve based on user action 
 */
const Actions = ({checked, message, setKey, setMessage}) => {

    const {
        currentCRObject,
        setCurrentCRObject,
        exitChangeRequestBranch
    }= WOQLClientObj()

    const {
        updateChangeRequestStatus,
        getChangeRequestList,
		loading
    } = ChangeRequest()

    const {organization,dataProduct,id} = useParams()
    const navigate = useNavigate() // to navigate

    /** handle Message */
    async function handleMessage() {
        let id=extractID(currentCRObject["@id"])
        // this call return the changeRequestObj Updated
        let res=await updateChangeRequestStatus(message, currentCRObject.status, id)
        // we'll see if add need rebase check every time
        res.needRebase = currentCRObject.needRebase
        setCurrentCRObject(res)
        if(setKey) setKey(CONST.MESSAGES)
        if(setMessage) setMessage("")
    }

    /** handle Merge */
    async function handleMerge () { 
        let res=await updateChangeRequestStatus(message, CONST.MERGED, id)
		if(res){
            setCurrentCRObject(false)
			exitChangeRequestBranch()
			navigate(`/${organization}/${dataProduct}`)
		}
    }

    /** handle Reject */
    async function handleReject () {
        let res=await updateChangeRequestStatus(message, CONST.REJECTED, id)
        if(res){
            setCurrentCRObject(false)
			exitChangeRequestBranch()
			navigate(`/${organization}/${dataProduct}`)
		}
    }

    let chosen = CONST.REVIEW_OPTIONS.filter(arr => arr.title === checked)

    if(checked === CONST.APPROVE) {
        return <ActionButton variant="success" 
            loading={loading}
            title={"Approve Changes"} 
            content={checked} 
            icon={chosen[0].icon}
            onClick={handleMerge}/>
    }
    else if (checked === CONST.COMMENT) {
        return <ActionButton variant="light" 
            title={"Leave a Comment or message"} 
            content={checked} 
            loading={loading}
            icon={chosen[0].icon}
            onClick={handleMessage}/>
    }
    else if(checked ===CONST.REJECT) {
        return <ActionButton variant="danger" 
            title={"Reject Changes"} 
            content={checked} 
            loading={loading}
            icon={chosen[0].icon}
            onClick={handleReject}/>
    }
    return <div/>
}

/**
 * @returns help texts 
 */
function getHelpText (checked) {
    const arr = CONST.REVIEW_OPTIONS.filter(arr => arr.title === checked)
    if (!arr) return <div/>
    return <small className="fw-light">{arr[0].helpText}</small>
}
 
function getChecked (checked, id) {
    return checked === id ? true : false
}

/**
 * @returns Check boxes for CR actions
 */
const FormCheck = ({checked, setChecked}) => {
    return CONST.REVIEW_OPTIONS.map(arr => {
        let id=arr.title
        return <>
            <Form.Check 
                checked={getChecked(checked, id)}
                onChange={(e) => setChecked(id)}
                className="mr-4"
                type={"radio"}
                id={id}
                label={arr.title}
            />
        </>
    })
}

/**
 * @returns view based on CR actions
 */
export const Review = ({message, setMessage, checked, setKey}) => {
    return <React.Fragment>
        <Form.Control as="textarea" 
            rows={5} 
            value={message}
            onChange={e => setMessage(e.target.value)}
            style={{color: "white"}}
            className="bg-dark border-secondary" 
            placeholder={"Add a new comment or message ..."}/>

        <Actions checked={checked} message={message} setMessage={setMessage} setKey={setKey}/>
    </React.Fragment>
}

export const ReviewComponent = ({setKey}) => {
    const {
        userHasMergeRole,
        currentCRObject
    }= WOQLClientObj()

    // set default action as COMMENT
    const [checked, setChecked]=useState(CONST.APPROVE)
    // feedback constants
    const [message, setMessage]=useState("")

    if(!userHasMergeRole) {
        // for collaborator or reader role
        return <Review message={message} setMessage={setMessage} checked={checked}/>
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

            <div className="d-flex mb-1">
                <Stack direction="horizontal" gap={3} className="text-right w-100">
                    <FormCheck checked={checked} setChecked={setChecked}/>
                    <span className="text-light ms-auto">{getHelpText(checked)}</span>
                </Stack>
            </div>
            
            <Review message={message} setMessage={setMessage} checked={checked} setKey={setKey}/>
        </Card.Body>
    </Card>
        
}