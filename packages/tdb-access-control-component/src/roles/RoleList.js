import React, {Fragment,useState} from "react"
import {Modal, Button, Form,Alert} from "react-bootstrap"
import {FiUserPlus} from "react-icons/fi"

export const RoleList = ({setRole,userRoles,rolesList,parentRole,type}) => {  
    let maxLength = Array.isArray(rolesList) ? rolesList.length : null
    const itemType = type || "radio"
    return <Fragment> 
        {maxLength && rolesList.map((item,index) => {
        if(item['@id']===parentRole) maxLength = index
        //I visualize only the allowed roles
        if(index > maxLength ) return
        let isChecked = userRoles.find(role=> item['@id'] === role) ? {checked:true} :{}
        //console.log("isChecked", isChecked)
        return <Fragment>
                    <Form.Check className="d-flex align-items-center mb-4" type={itemType} key={item['@id']} name="group1" >
                    <Form.Check.Input name="group1" id={item['@id']} className="p-3" type={itemType} {...isChecked} onChange={(evt)=>{setRole(evt,item['@id'])}} />
                    <Form.Check.Label className="ml-4">{item['name']}</Form.Check.Label>  
                    <div className="p-4">{item.description}</div>                 
                    </Form.Check>               
                </Fragment>      
    })  
    } 
    </Fragment> 
}

export const RoleListModal = (props)=>{
    //"Role/collaborator"
    const [userRoles, setRole]=useState(props.userRoles || [])
    
    const setNewRole = (evt,role) =>{
        const checked = evt.target.checked
        let tmpUserRoles = userRoles
        if(props.type === "checkbox"){
            if(checked){
                tmpUserRoles.push(role)
            }else{
                const index = tmpUserRoles.find(role)
                if(index>-1){
                    tmpUserRoles.splice(index,1)
                }
            }
        }else{
            //this is radio button type with only one value
            tmpUserRoles=[role]
        }

        setRole(tmpUserRoles)
    }

    const rolesList = props.rolesList
    return <Modal
            show={props.show}
            size="lg"
            onHide={(e) => props.setShow(false)}>
        <Modal.Header closeButton>
            <h5 className="text-light fw-bold mt-3 mb-3">{props.title}</h5>
        </Modal.Header>
        <Modal.Body>
            {props.successMessage &&
            <Alert variant="success">the invitation has been sent</Alert>}
            {props.errorMessage &&  <Alert variant="danger"  onClose={() => props.setError(false)} dismissible>{props.errorMessage}</Alert>}

            {props.children}
            {rolesList &&
                <RoleList type={props.type} setRole={setNewRole} userRoles={userRoles} rolesList={rolesList} parentRole={props.parentRole}/>
            }
        </Modal.Body>
        <Modal.Footer>
            <Button
                disabled={props.loading}
                id ="add_element_button"
                variant="info" 
                title={`Add New User`} 
                onClick={()=>{props.clickButton(userRoles)}}>
                    <FiUserPlus className="mr-2"/>{props.loading ? 'Sending Request ...' : "Send"} 
            </Button>
        </Modal.Footer>
        </Modal>
}