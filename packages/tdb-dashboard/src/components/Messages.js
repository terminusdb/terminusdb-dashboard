import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client' 
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import {Button} from "react-bootstrap"
import {ChangeRequest} from "../hooks/ChangeRequest"
import ProgressBar from 'react-bootstrap/ProgressBar'
import {useParams } from "react-router-dom"
import {
    extractID, 
    getDays
} from "./utils"
import {VscCommentDiscussion} from "react-icons/vsc"
import {Loading} from "./Loading"

const CommentSection = () => {
   
    const {
        currentCRObject
    } = WOQLClientObj()

    if (!currentCRObject.hasOwnProperty("messages")) 
        return <div className="mt-2">No messages to display ...</div>

    let elements=[]

    if(Array.isArray(currentCRObject["messages"])) {
        currentCRObject["messages"].slice(0).reverse().map((curr,index) => {
            elements.push(
                <React.Fragment  key={`${index}__fragment`} >
                    {curr.text}
                    <Card.Text key={`${index}__card`} className="text-muted">{getDays(curr.timestamp)} days ago by {curr.author} </Card.Text>
                    <hr/>
                </React.Fragment>
            )
        })
    }
    return <Card className="mb-3 w-100 mt-2 p-5 border-secondary">{elements}</Card>
}

const AddNewMessage=()=> {
    const {id} = useParams()
    const {
        currentCRObject,
    } = WOQLClientObj()

    const {
        updateChangeRequestStatus,
        getChangeRequestByID,
        loading
    } =  ChangeRequest() 

    const [comment, setComment]=useState("")
   // const [add, setAdd]=useState(false)

   async function updateMessages() { 
        await updateChangeRequestStatus(comment, currentCRObject.status,id)
        await getChangeRequestByID(id)
        setComment("")
    }

   /* useEffect(() => {
        async function updateMessages() { 
            await updateChangeRequestStatus(comment, currentCRObject.status,id)
            await getChangeRequestByID(id)
            setComment("")
        }
        if(comment!=="") updateMessages()
    }, [add])*/

    function addComment() {
        updateMessages()
    }
    
    function handleMessage(e) {
        //if(setComment) {
        setComment(e.target.value)
        //}
    }

    return <Form className="mt-4 new__message__container mb-4">
        {loading && <ProgressBar variant="info" animated now={100}/>}
        <Form.Group className="mb-3" controlId="form_change_request_textarea">
            <Form.Control as="textarea" 
                rows={5} 
                onChange={handleMessage}
                value={comment}
                style={{color: "white"}}
                className="bg-dark border-secondary" 
                placeholder={"Add a new Comment or Message ..."}/>
            <Button className="bg-light text-dark btn-sm fw-bold float-right mt-2 mb-2 d-flex" 
                disabled={loading}
                onClick={addComment}>
                {loading ? <Loading message={"Adding Comment ..."}/> : "Comment"} 
            </Button>
        </Form.Group>
    </Form>
}

export const Messages = () => {

    return <React.Fragment>
        <AddNewMessage/>
        <br/>
        <h5 className="fw-bold text-muted mt-3 mb-3">
            <VscCommentDiscussion/> Previous Messages
        </h5>
        <CommentSection/>
    </React.Fragment>
  
}