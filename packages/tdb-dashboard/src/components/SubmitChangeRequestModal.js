import React, {useRef, useState} from "react"
import {Alert, Modal, Button, Form} from "react-bootstrap" 
import {ChangeRequest} from "../hooks/ChangeRequest"
import { CHANGE_REQUEST_SUBMIT_REVIEW, CHANGE_REQUEST_MESSAGE_FOR_REVIEW } from "../cypress.constants"

export const SubmitChangeRequestModal = ({showModal, setShowModal , updateParent, updateChangeRequestID, operation}) => { 
    const messageRef = useRef(null);
    const {loading,errorMessage,setError,updateChangeRequestStatus} =  ChangeRequest()
    
    const closeModal = () => setShowModal(false)

    const titleObj= {"Submitted":'Submit the Change Request for review',
                     "Open" : "Reopen the change request",
                     "Close" : <Alert variant="danger">You are Closing this change request. You can not undo this operation</Alert>}

    const statusUpdate = operation || "Submitted"
    const title = titleObj[statusUpdate]

    const runCreate = async () => {
        const message = messageRef.current.value
        if(!message || message === "") {
            setError("Change request message are mandatory")
            return
        }else{
            const done = await updateChangeRequestStatus(message,statusUpdate,updateChangeRequestID)          
            if(done){
                messageRef.current.value = ""
                updateParent()
                setShowModal(false)
            }                  
        }
    } 
 
    //<Loading message={`Deleting Data Product ${dataProductDetails.label} ...`} type={PROGRESS_BAR_COMPONENT}/>}
    return <Modal size="lg" className="modal-dialog-right" show={showModal} onHide={closeModal}>
        <Modal.Header>
            <Modal.Title className="text-success">
                <small className="fw-bold mr-2 h6">{title}</small>
            </Modal.Title>
            <Button variant="close" aria-label="Close" onClick={closeModal} />
        </Modal.Header>
        <Modal.Body className="p-3">
            {errorMessage && 
             <Alert variant="danger"  onClose={() => setError(false)} dismissible>{errorMessage}</Alert>}
            <Form>
                <Form.Group className="mb-3 tdb__input">
                    <Form.Control required 
                        ref={messageRef}
                        data-cy={CHANGE_REQUEST_MESSAGE_FOR_REVIEW}
                        id="add_message" 
                        as="textarea" rows={3}
                        placeholder={`Please type a message`} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button
                disabled={loading}
                id ="add_element_button"
                variant="light" 
                className="text-dark btn-sm"
                data-cy={CHANGE_REQUEST_SUBMIT_REVIEW}
                title={`Submit change request`} 
                onClick={runCreate}>{loading ? 'Sending Request ...' : "Submit change request"} 
            </Button>
        </Modal.Footer>
    </Modal>
}

