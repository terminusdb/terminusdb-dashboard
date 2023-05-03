import React, {useState, useRef, useEffect} from "react"
import {Form,Alert} from "react-bootstrap"
import {BiError} from "react-icons/bi"
import {useAccessControl} from "../hooks/useAccessControl"

import { RoleListModal } from "./RoleList"

export const NewMemberModal = ({show, setShow, team, accessControlDashboard,options,defaultEmail,updateTable}) => {
    if(!accessControlDashboard) return ""
    const {sendInvitation,
          successMessage,
          loading,
          errorMessage,setError} =  useAccessControl(accessControlDashboard,options)
    
    const emailInput = useRef(null);
    const roles = accessControlDashboard.getRolesList()

    async function handleInvite(role){
        const email = emailInput.current.value
        //alert(email)
        if(!email || email === "") {
            setError("Email is mandatory")
            return
        }else{
            await sendInvitation(team,email,role).then(done=>{
                if(done){
                    updateTable()
                    setShow(false)
                    emailInput.current.value = ""
                    setError(false)
                }
            })
                     
        }
    }

    function handleKeyPress(e) {
        if (e.which === 13 /* Enter */) {
            e.preventDefault()
        }
    }

    const propsObj = {setShow, team:team,
                title:`Invite a new member to your team - ${team}`,
                clickButton:handleInvite}
    const value =  defaultEmail ? {value:defaultEmail} : {}

    return <RoleListModal {...propsObj} 
                loading={loading} 
                errorMessage={errorMessage} 
                successMessage={successMessage} 
                show={show}
                rolesList={roles}
                setError={setError}>
            {/*error && <span className="d-flex">
                <BiError className="text-danger mt-1 mr-1"/><p className="text-danger">Email is mandatory</p>
    </span>*/}
            <Form onKeyPress={handleKeyPress}>
                <Form.Group>
                    <Form.Control
                        ref={emailInput}
                        {...value}
                        type="text"
                        placeholder="Email"
                        aria-describedby="inputGroupPrepend"
                        required
                        onBlur={()=>{setError(false)}}
                    />
                </Form.Group>
            </Form>
        </RoleListModal>
}
