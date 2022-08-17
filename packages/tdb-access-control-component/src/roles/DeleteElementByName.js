import React from "react"
import {AccessControlHook} from "../hooks/AccessControlHook"
import { DeleteElementModal } from "./DeleteElementModal"
export const DeleteElementByName = ({accessControlDashboard,showModal, setShowModal, elementType, elementName, methodName,updateTable }) => {
   
    const {deleteElementByName,loading,errorMessage,setError} =  AccessControlHook(accessControlDashboard,{})

    const deleteElement = (name) =>{
        deleteElementByName(methodName,name).then(done=>{
            if(done){
                updateTable()
                setShowModal(false)
            }
        })
   }

   const vars = {showModal, setShowModal, elementType, elementName,loading,errorMessage,setError}
   return <DeleteElementModal deleteElement={deleteElement} {...vars} />
    
}