import React, {useRef, useState} from "react"
import {Alert, Modal, Button, Form} from "react-bootstrap" 
import {AiOutlineDelete} from "react-icons/ai"
import {AccessControlHook} from "../hooks/AccessControlHook"
import {CREATE_ORGANIZATION} from "../utils/default"
import {UTILS} from "@terminusdb/terminusdb-client"
export const CreateOrganizationModal = ({accessControlDashboard,showModal, setShowModal, updateTable }) => { 
    const nameRef = useRef(null);
    const {loading,errorMessage,setError,createElementByName} =  AccessControlHook(accessControlDashboard,{})
    
    const runCreate = async () => {
        const name = nameRef.current.value
        if(!UTILS.checkValidName(name)) {
            setError("Organization name is mandatory and can only contain underscores and alphanumeric characters.")
            return
        }else{
            const done = await createElementByName(CREATE_ORGANIZATION, name)         
            if(done){
                nameRef.current.value = ""
                updateTable()
                setShowModal(false)
            }                  
        }
    }

    function checkName (){
        const name = nameRef.current.value
        if(!name || name === "") {
            setError("Organization name is mandatory")
            return
        }
        setError(false)
    }
 
    //<Loading message={`Deleting Data Product ${dataProductDetails.label} ...`} type={PROGRESS_BAR_COMPONENT}/>}
    return <Modal size="lg" className="modal-dialog-right" show={showModal} onHide={setShowModal}>
        <Modal.Header>
            <Modal.Title className="h6">Create a new Organization</Modal.Title>
            <Button variant="close" aria-label="Close" onClick={setShowModal} />
        </Modal.Header>
        <Modal.Body className="p-5">
            {errorMessage && 
             <Alert variant="danger"  onClose={() => setError(false)} dismissible>{errorMessage}</Alert>}
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control required 
                        ref={nameRef}
                        id="add_element_name" 
                        type="text"
                        onBlur={checkName}
                        placeholder={`Please type the Organization name`} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button
                disabled={loading}
                id ="add_element_button"
                variant="info" 
                title={`Add New Organization`} 
                onClick={runCreate}>{loading ? 'Loading ...' : "Add New Organization"} 
            </Button>
        </Modal.Footer>
    </Modal>
}

