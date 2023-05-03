import React, {useRef, useState} from "react"
import {Alert, Modal, Button, Form} from "react-bootstrap" 
import {AiOutlineDelete} from "react-icons/ai"
import {useAccessControl} from "../hooks/useAccessControl"
import {CREATE_ORGANIZATION} from "../utils/default"
import {UTILS} from "@terminusdb/terminusdb-client"
export const CreateOrganizationModal = ({accessControlDashboard,showModal, setShowModal, updateTable }) => { 
    const nameRef = useRef(null);
    const {loading,errorMessage,setError,createElementByName} =  useAccessControl(accessControlDashboard,{})
    
    const runCreate = async () => {
        const name = nameRef.current.value
        if(!UTILS.checkValidName(name)) {
            setError("Team name is mandatory and can only contain underscores and alphanumeric characters.")
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
            setError("Team name is mandatory")
            return
        }
        setError(false)
    }
 
    //<Loading message={`Deleting Data Product ${dataProductDetails.label} ...`} type={PROGRESS_BAR_COMPONENT}/>}
    return <Modal size="lg" className="modal-dialog-right" show={showModal} onHide={()=>setShowModal(false)}>
        <Modal.Header>
            <Modal.Title className="text-success mt-3 mb-3 ">Create a new Team</Modal.Title>
            <Button variant="close" aria-label="Close" onClick={()=>setShowModal(false)} />
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
                        placeholder={`Please type the Team name`} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button
                disabled={loading}
                id ="add_element_button"
                variant="info" 
                title={`Create new Team`} 
                onClick={runCreate}>{loading ? 'Sending request ...' : "Create new Team"} 
            </Button>
        </Modal.Footer>
    </Modal>
}

