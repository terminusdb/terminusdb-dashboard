import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client' 
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import {Button} from "react-bootstrap"
import {ChangeRequest} from "../hooks/ChangeRequest"
import ProgressBar from 'react-bootstrap/ProgressBar'
import {
    extractID, 
    getDays
} from "./utils"
import {VscCommentDiscussion} from "react-icons/vsc"
import {Loading} from "./Loading"
import {Review} from "./ReviewComponent"
import {COMMENT} from "./constants"

const CommentSection = ({currentCRObject}) => {

    if (!currentCRObject.hasOwnProperty("messages")) 
        return <div className="mt-2">No messages to display ...</div>

    let elements=[] 

    if(Array.isArray(currentCRObject["messages"])) {
        currentCRObject["messages"].slice(0).reverse().map(curr => {
            elements.push(
                <React.Fragment>
                    {curr.text}
                    <Card.Text className="text-muted">{getDays(curr.timestamp)} days ago by {curr.author} </Card.Text>
                    <hr/>
                </React.Fragment>
            )
        })
    }
    return <Card className="mb-3 w-100 mt-2 p-5 border-secondary">{elements}</Card>
}

export const Messages = () => {
    const {
        currentCRObject
    } = WOQLClientObj()
    const [comment, setComment]=useState("")

    return <React.Fragment>
        <Review message={comment} setMessage={setComment} checked={COMMENT}/>
        <br/>
        <h5 className="fw-bold text-muted mt-5 mb-3">
            <VscCommentDiscussion/> Previous Messages
        </h5>
        <CommentSection currentCRObject={currentCRObject}/>
    </React.Fragment>
  
}