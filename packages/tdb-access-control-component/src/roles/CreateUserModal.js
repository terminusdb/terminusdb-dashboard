import React, {useRef, useState} from "react"
import {Alert, Modal, Button, Form} from "react-bootstrap" 
import {AiOutlineDelete} from "react-icons/ai"
import {AccessControlHook} from "../hooks/AccessControlHook"
import {CREATE_USER} from "../utils/default"

export const CreateUserModal = ({accessControlDashboard,showModal, setShowModal, updateTable }) => { 
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const {loading,errorMessage,setError,createElementByName} =  AccessControlHook(accessControlDashboard,{})
    
    const closeModal = () => setShowModal(false)

    const runCreate = async () => {
        const name = nameRef.current.value
        const password = passwordRef.current.value
        if(!name || name === "" || !password || password === "") {
            setError("Username and Password are mandatory")
            return
        }else{
            const done = await createElementByName(CREATE_USER, name, password)         
            if(done){
                nameRef.current.value = ""
                passwordRef.current.value = ""
                updateTable()
                setShowModal(false)
            }                  
        }
    }

 
    //<Loading message={`Deleting Data Product ${dataProductDetails.label} ...`} type={PROGRESS_BAR_COMPONENT}/>}
    return <Modal size="lg" className="modal-dialog-right" show={showModal} onHide={closeModal}>
        <Modal.Header>
            <Modal.Title className="h6">Create a new User</Modal.Title>
            <Button variant="close" aria-label="Close" onClick={closeModal} />
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
                        placeholder={`Please type the user name`} />
                   
                </Form.Group>
                <Form.Group>
                    <Form.Control required 
                        ref={passwordRef}
                        id="add_element_password" 
                        type="password"
                        placeholder={`Please type the user password`} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button
                disabled={loading}
                id ="add_element_button"
                variant="info" 
                title={`Add New User`} 
                onClick={runCreate}>{loading ? 'Sending Request ...' : "Add New User"} 
            </Button>
        </Modal.Footer>
    </Modal>
}

