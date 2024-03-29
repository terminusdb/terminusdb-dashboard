import React from "react"
import {useAccessControl} from "../hooks/useAccessControl"
import { DeleteElementModal } from "./DeleteElementModal"

export const DeleteTeamUser = ({accessControlDashboard,showModal, setShowModal, userSelected, team, updateTable }) => {
   
    const {loading,errorMessage,setError,deleteUserFromOrganization} =  useAccessControl(accessControlDashboard,{})

    const deleteElement = (name) =>{
        const userid= userSelected.userid
        deleteUserFromOrganization(team,userid).then(done=>{
            if(done){
                updateTable()
                setShowModal(false)
            }
        })
   }

   const vars = {showModal, setShowModal, elementType:"User", elementName:userSelected.email,loading,errorMessage,setError}
   return <DeleteElementModal deleteElement={deleteElement} {...vars} />
    
}