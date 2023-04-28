import React from "react"
import {useAccessControl} from "../hooks/useAccessControl"
import { DeleteElementModal } from "./DeleteElementModal"
export const DeleteElementByName = ({accessControlDashboard,showModal, setShowModal, elementType, elementName, methodName,updateTable }) => {
   
    const {deleteElementByName,loading,errorMessage,setError} =  useAccessControl(accessControlDashboard,{})

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