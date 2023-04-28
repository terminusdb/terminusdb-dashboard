import React, {useState, useRef} from "react"
import {useAccessControl} from "../hooks/useAccessControl"
import {Modal, Button, Form,Row,Col,Alert} from "react-bootstrap"
import {BsFillPeopleFill} from "react-icons/bs"
//import {PROGRESS_BAR_COMPONENT, TERMINUS_DANGER,TERMINUS_SUCCESS} from "./constants"
import {UTILS} from "@terminusdb/terminusdb-client"

export const CreateRoleModal= ({show, setShow, accessControlDashboard,options,updateRolesList}) => {
    if(!accessControlDashboard) return ""
    const {createRole,errorMessage,loading,setError} =  useAccessControl(accessControlDashboard,options)     
    const [actionsSelected, setActions] = useState({})

    const roleName = useRef(null);
    
    const runCreateRole = async () => {
        //const id = roleId.current.value
        const name = roleName.current.value
        //alert(email)
        if(!name || name === "") {
            setError("Role name is mandatory")
            return
        }else{
            const actions = Object.values(actionsSelected)
            const done = await createRole(name,actions)         
            if(done){
                roleName.current.value = ""
                updateRolesList()  
                setShow(false)
            }                  
        }
    }

    function checkName (){
        const name = roleName.current.value
        if(!name || name === "") {
            setError("Role name is mandatory")
            return
        }
        setError(false)
    }

    function addAction(evt){
        const action = evt.currentTarget.name
        const check = evt.currentTarget.checked
        if(check){
            actionsSelected[action]=action
        }else if(actionsSelected[action]){
            delete actionsSelected[action]
        }
    }

    function handleKeyPress(e) {
        if (e.which === 13 /* Enter */) {
            e.preventDefault()
        }
    }

    function ActionList (){
        const actArr = Object.values(UTILS.ACTIONS)
        const checkList = []
        
        for(let i=0; i<actArr.length; i+=2) {
           const item = actArr[i]
           const itemleft =  actArr[i+1]     
           let row = <Row key={`row__${i}`}>
                            <Col>
                                <Form.Check className="d-flex align-items-center mb-4" type="checkbox" key={item}  >
                                <Form.Check.Input  name={item} id={item} className="p-3" type="checkbox" onClick={addAction} />
                                <Form.Check.Label className="ml-4">{item}</Form.Check.Label>                 
                                </Form.Check>
                            </Col>
                            {itemleft && <Col>
                                <Form.Check className="d-flex align-items-center mb-4" type="checkbox" key={itemleft}  >
                                <Form.Check.Input name={itemleft}  id={itemleft} className="p-3" type="checkbox" onClick={addAction} />
                                <Form.Check.Label className="ml-4">{itemleft}</Form.Check.Label>                 
                                </Form.Check>
                           
                            </Col> }
                        </Row>
             checkList.push(row)     
        }
        return checkList
    }

    return <Modal show={show}  size="lg"onHide={(e) => setShow(false)}>
        <Modal.Header closeButton>
            <h5 className="text-success mt-3 mb-3">{options.labels.addRole}</h5>
        </Modal.Header>
    <Modal.Body>
        {errorMessage &&  <Alert variant="danger"  onClose={() => setError(false)} dismissible>
            {errorMessage}</Alert>}
        <Form>
            <Form.Group className="mt-3">
                <Form.Control
                    ref={roleName}
                    type="text"
                    id="name"
                    onBlur={checkName}
                    placeholder="Role name"
                    aria-describedby="inputGroupPrepend"
                    required
                />
            </Form.Group>
                <h6 className="mt-3 mb-3">The roles are grouping of actions that the user can perform.</h6>
                <h6 className="mt-3 mb-3">Please select the actions for your role</h6>
                <ActionList/>
            
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button disabled={loading} className="btn-info" onClick={()=>{runCreateRole(errorMessage)}} id="create_new_team_button">
            <BsFillPeopleFill className="mr-2"/>{loading ? 'Sending Request ...' : options.labels.createRole} 
        </Button>
    </Modal.Footer>
    </Modal>
}

//<Form.Check type="radio" aria-label="radio 1" />
