import React, {useRef, useState} from "react"
import {Alert, Modal, Button, Form} from "react-bootstrap" 
import {ChangeRequest} from "../hooks/ChangeRequest"
import {useNavigate} from "react-router-dom"

export const CreateChangeRequestModal = ({showModal, setShowModal , updateViewMode, type}) => { 
    //const nameRef = useRef(null);
    const messageRef = useRef(null);
    const {loading,errorMessage,setError,createChangeRequest} =  ChangeRequest()
    const navigate = useNavigate()

    const closeModal = () => {
        navigate(-1)
    }

    const runCreate = async () => {
      //  const name = nameRef.current.value
        const message = messageRef.current.value
        if(!message || message === "") {
            setError("Change request message is mandatory")
            return
        }else{
            const {changeRequestId,branchName} = await createChangeRequest(message)         
            if(changeRequestId){
                //nameRef.current.value = ""
                messageRef.current.value = ""
                updateViewMode(branchName,changeRequestId)
                setShowModal(false)
            }                  
        }
    }

 
    //<Loading message={`Deleting Data Product ${dataProductDetails.label} ...`} type={PROGRESS_BAR_COMPONENT}/>}
    return <Modal size="lg" className="modal-dialog-right" show={showModal} onHide={closeModal}>
        <Modal.Header>
            <Modal.Title className="text-success h6 fw-bold">Start a new change request</Modal.Title>
            <Button variant="close" aria-label="Close" onClick={closeModal} />
        </Modal.Header>
        <Modal.Body className="p-3">
            {errorMessage && 
             <Alert variant="danger"  onClose={() => setError(false)} dismissible>{errorMessage}</Alert>}
            <Form>              
                <Form.Group className="tdb__input">
                    <Form.Control required 
                        ref={messageRef}
                        id="add_message" 
                        type="text"
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
                title={`Start a change request`} 
                onClick={runCreate}>{loading ? 'Sending Request ...' : "Start a change request"} 
            </Button>
        </Modal.Footer>
    </Modal>
}

/*<Form.Group className="mb-3 tdb__input">
                    <Form.Control required  
                        ref={nameRef}
                        id="add_changerequest_name" 
                        type="text"
                        placeholder={`Please type the change request name`} />
                   
                </Form.Group>*/

