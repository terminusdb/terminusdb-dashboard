import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client' 
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import {Button} from "react-bootstrap"
import {ChangeRequest} from "../hooks/ChangeRequest"
import { useParams } from "react-router-dom"
import MDEditor from '@uiw/react-md-editor';
import MarkdownPreview from '@uiw/react-markdown-preview';
import {
    extractID, 
    getDays
} from "./utils"
import {VscCommentDiscussion} from "react-icons/vsc"
import {Loading} from "./Loading"
import Spinner from 'react-bootstrap/Spinner';
import * as CONST from "./constants"
import { CR_ACTION_MESSAGEBOX } from "../cypress.constants"

// displays Previous Messages
const CommentSection = () => {
    const { currentCRObject }= WOQLClientObj()

    if (!currentCRObject.hasOwnProperty("messages")) 
        return <div className="mt-2">No messages to display ...</div>

    let elements=[] 

    if(Array.isArray(currentCRObject["messages"])) {
        currentCRObject["messages"].slice(0).reverse().map(curr => {
            elements.push(
                <div class="container mb-3">
                    <div class="row row-centered pos">
                        <div class="col-xs-12 col-centered">
                            <Card.Text className="text-muted">{getDays(curr.timestamp)} days ago by {curr.author} </Card.Text>
                            <div class="well">
                                <MarkdownPreview source={curr.text}/>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>
            )
        })
    }
    return <Card className="mb-3 w-100 mt-2 p-5 border-secondary">{elements}</Card>
}

// displays textarea to write comments 
export const MessageBox = ({ setMessage, message }) => {

    const handleChange = (str) => {
        if(setMessage) setMessage(str)
    }
  
    return <> 
        <MDEditor
            value={message}
            textareaProps={{
                placeholder: "Add a new comment or message ..."
              }}
            data-cy={CR_ACTION_MESSAGEBOX}
            onChange={handleChange}/>
       
    </>

    /*return <Form.Control as="textarea" 
        rows={5}  
        value={message}
        onChange={e => setMessage(e.target.value)}
        style={{color: "white"}}
        data-cy={CR_ACTION_MESSAGEBOX}
        className="bg-dark border-secondary" 
        placeholder={"Add a new comment or message ..."}/>*/
}

// displays textarea to write comments  & button to save comments
export const MessageComponent = ({setKey}) => {
    const { currentCRObject, setCurrentCRObject }= WOQLClientObj()
    const { addNewMessage, loading } = ChangeRequest()
    const [comment, setComment]=useState("")
    const { id } = useParams()

    /** handle Message */
    async function handleMessage(comment) {
        let id=extractID(currentCRObject["@id"])
        // this call return the changeRequestObj Updated
        let res=await addNewMessage(comment,id)
        setComment("")
        // we'll see if add need rebase check every time
        res.needRebase = currentCRObject.needRebase
        setCurrentCRObject(res)
        if(setKey) setKey(CONST.MESSAGES)
       
    }

    return <React.Fragment>
        <MessageBox setMessage={setComment} message={comment}/>
        <Button className={"btn btn-sm bg-light text-dark float-right"} 
            onClick={(e) => handleMessage(comment)}>
                {loading && <Spinner as="span" animation="border" size="sm" role="status" className="mr-1 mt-1" aria-hidden="true"/>}
                {CONST.COMMENT}
        </Button>
    </React.Fragment>
}


export const Messages = ({setKey}) => {
    return <React.Fragment>
        <MessageComponent setKey={setKey}/>
        <br/>
        <h5 className="fw-bold text-muted mt-5 mb-3">
            <VscCommentDiscussion/> Previous Messages
        </h5>
        <CommentSection/>
    </React.Fragment>
}