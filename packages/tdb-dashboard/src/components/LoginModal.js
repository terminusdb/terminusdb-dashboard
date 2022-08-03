import React, {useRef} from "react"
import {Modal, Button, Form} from "react-bootstrap" 

export const LoginModal = ({showModal, setShowModal }) => { 
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const orgRef = useRef(null);
// to be review
    const loading = false
    const handleClose = () => setShowModal(false);

    const changeLoggeduser = async () => {
        const name = nameRef.current.value
        const password = passwordRef.current.value
        const organization = orgRef.current.value
        if(!name || name === "" || !password || password === "") {
            setError("Organization name and password are mandatory")
            return
        }else{
            localStorage.setItem("User",name) 
            localStorage.setItem("Key",password)
            localStorage.setItem("Org",organization)
            // to be review using routing
            const base = process.env.BASE_URL ? `/${process.env.BASE_URL}` : ""
            window.location.replace(`${base}/${organization}`)                    
        }
    }

 
    //<Loading message={`Deleting Data Product ${dataProductDetails.label} ...`} type={PROGRESS_BAR_COMPONENT}/>}
    return <Modal size="lg" className="modal-dialog-right" show={showModal} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title className="h6">Login</Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className="p-5">
            {/*errorMessage && 
             <Alert variant="danger"  onClose={() => setError(false)} dismissible>{errorMessage}</Alert>*/}
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control required 
                        ref={nameRef}
                        id="add_element_name" 
                        type="text"
                        placeholder={`Please type the user name`} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control required 
                        ref={passwordRef}
                        id="add_element_password" 
                        type="password"
                        placeholder={`Please type the user password`} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control required 
                        ref={orgRef}
                        id="add_element_organization" 
                        type="text"
                        placeholder={`Please type the user organization`} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button
                disabled={loading}
                id ="add_element_button"
                variant="info" 
                title={`Login With a different user`} 
                onClick={changeLoggeduser}>{loading ? 'Loading ...' : "Connect with the User"} 
            </Button>
        </Modal.Footer>
    </Modal>
}

