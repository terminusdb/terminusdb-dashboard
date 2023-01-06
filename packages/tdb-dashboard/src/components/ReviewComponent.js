import React from "react"
import {
    COMMENT,
    APPROVE,
    REJECT,
} from "./constants"
import Dropdown from 'react-bootstrap/Dropdown'
import SplitButton from 'react-bootstrap/SplitButton'
import {CommentComponent} from "./CommentComponent"
import {ApproveComponent} from "./ApproveComponent"
import {RejectComponent} from "./RejectComponent"
import {WOQLClientObj} from "../init-woql-client"

const View = ({action, setKey}) => {
    if(action === COMMENT) return <CommentComponent setKey={setKey}/>
    else if (action === APPROVE) return <ApproveComponent/>
    else if (action === REJECT) return <RejectComponent/>
    return <div/>
}

export const ReviewComponent = ({setKey, action, setAction}) => {
    const {userHasMergeRole}= WOQLClientObj()

    function handleAction (action) {
        if(action === COMMENT) setAction(COMMENT)
        else if(action === APPROVE) setAction(APPROVE)
        else setAction(REJECT)
    }

    if(!userHasMergeRole) {
        // for collaborator or reader role
        return <View action={COMMENT} setKey={setKey}/>
    }
    
	return <React.Fragment>
       <SplitButton
            key={"end"}
            bsPrefix="btn btn-lg text-dark bg-light"
            id={`dropdown-button-drop-end`}
            drop={"end"}
            variant="light"
            title={"Submit Review"}>
            <Dropdown.Item eventKey={COMMENT} onClick={(e) => handleAction(e.target.text)}>{COMMENT}</Dropdown.Item>
            <Dropdown.Item eventKey={APPROVE} onClick={(e) => handleAction(e.target.text)}>{APPROVE}</Dropdown.Item>
            <Dropdown.Item eventKey={REJECT} onClick={(e) => handleAction(e.target.text)}>{REJECT}</Dropdown.Item>
          </SplitButton>
        <View action={action} setKey={setKey}/>
    </React.Fragment>
        
}