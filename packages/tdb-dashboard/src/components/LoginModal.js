import React, {useRef,useState} from "react"
import {Modal, Button, Form} from "react-bootstrap" 
import { WOQLClient } from "@terminusdb/terminusdb-client";
import {localSettings} from "../../localSettings"
import {formatErrorMessage } from '../hooks/hookUtils'
import { Alert } from "react-bootstrap";

export const LoginModal = ({showModal, setShowModal, isCloseble }) => { 
    const [errorMessage,setErrorMessage] = useState(false)
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
   // const orgRef = useRef(null);
// to be review
    const loading = false
    const handleClose = () => {
        if(setShowModal)setShowModal(false);
    }

    const changeLoggeduser = async () => {
        const name = nameRef.current.value
        const password = passwordRef.current.value
        //const organization = orgRef.current.value
        if(!name || name === "" || !password || password === "") {
            setError("Team name and password are mandatory")
            return
        }else{
            const client = new WOQLClient(localSettings.server,{user:name,key:password})
            client.info().then(response=>{
                if(response["api:info"] && response["api:info"]['authority'] === "anonymous"){
                    setErrorMessage("Incorrect authentication information, please enter your username and password again")
                }else{
                    localStorage.setItem("Terminusdb-USER",name) 
                    localStorage.setItem("Terminusdb-KEY",password)
                    //localStorage.setItem("Org",organization)
                    // to be review using routing
                    const base = process.env.BASE_URL ? `/${process.env.BASE_URL}` : ""
                    window.location.replace(`${base}`) 
                }  
            }).catch(err=>{
                const message = formatErrorMessage(err)
                setErrorMessage(message)
            })

                           
        }
    }

    const onHide = isCloseble ? {onHide:handleClose} : {}

 
    //<Loading message={`Deleting Data Product ${dataProductDetails.label} ...`} type={PROGRESS_BAR_COMPONENT}/>}
    return <Modal size="lg" className="modal-dialog-right" show={showModal}  {...onHide}>
        <Modal.Header>
            <Modal.Title className="h6">Login to TerminusDB</Modal.Title>
            {isCloseble && <Button variant="close" aria-label="Close" onClick={handleClose} />}
        </Modal.Header>
        <Modal.Body className="p-5">
            {errorMessage && 
             <Alert variant="danger"  onClose={() => setErrorMessage(false)} dismissible>{errorMessage}</Alert>}
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control required
                        onBlur={()=>setErrorMessage(false)}
                        ref={nameRef}
                        id="add_element_name" 
                        type="text"
                        placeholder={`Please type the user name`} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control required 
                        onBlur={()=>setErrorMessage(false)}
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
                title={`Login With a different user`} 
                onClick={changeLoggeduser}>{loading ? 'Loading ...' : "Login"} 
            </Button>
        </Modal.Footer>
    </Modal>
}

