import React from "react"
import {AccessControlHook} from "../hooks/AccessControlHook"
import { DeleteElementModal } from "./DeleteElementModal"

export const RevokeCapability = ({accessControlDashboard,showModal, labels, setShowModal, revokeCapabilityObj, updateTable }) => {
   
    const {manageCapability,loading,errorMessage,setError} =  AccessControlHook(accessControlDashboard,{})
    if(!revokeCapabilityObj) return ""

    const deleteElement = () =>{
        manageCapability(revokeCapabilityObj.scope,"revoke",revokeCapabilityObj.role, revokeCapabilityObj.user).then(done=>{
            if(done){             
                setShowModal(false)
                updateTable()
            }
        })
   }

   const vars = {showModal, labels, setShowModal, elementType:revokeCapabilityObj.type, elementName:revokeCapabilityObj.name,loading,errorMessage,setError}
   return <DeleteElementModal deleteElement={deleteElement} {...vars} />
    
}