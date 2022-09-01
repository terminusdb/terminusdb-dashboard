import React, {useState, useRef, useEffect} from "react"
import {Form} from "react-bootstrap"
import {BiError} from "react-icons/bi"
import {AccessControlHook} from "../hooks/AccessControlHook"
import { GET_ALL_USERS } from "../utils/default"
import { RoleListModal } from "./RoleList"

//create user if do not exists and add to team
export const ManageUserCapabilityModal = ({showModal, setShowModal, team, parentRole, currentRoleToUpdate, accessControlDashboard,options,updateTable}) => {
    if(!accessControlDashboard) return ""
    const {successMessage,createUserRole,updateUserRole,
          loading,
          errorMessage} =  AccessControlHook(accessControlDashboard,options)

    const roles = accessControlDashboard.getRolesList()

    const changeUserRole = (userRoles) =>{
        //alert(role)
        const role = userRoles[0]
        if(currentRoleToUpdate.capability){
            updateUserRole(team,currentRoleToUpdate.userid,currentRoleToUpdate.capability,role,currentRoleToUpdate.scope)
                .then((done)=>{   
                    if(done){          
                        updateTable()
                        setShowModal(false)
                    }
            })
        }else{
            createUserRole(team,currentRoleToUpdate.userid,role,currentRoleToUpdate.scope).then((done)=>{              
                if(done){
                    updateTable() 
                    setShowModal(false) 
                }             
            })
        }
    }

    const propsObj = {setShow:setShowModal, team:team,
                title:`Change role to the user - ${team}`,
                clickButton:changeUserRole}
    //const value =  defaultName ? {value:defaultName, disabled:true} : {}

    return <RoleListModal {...propsObj}
                title={`Change the user role for the ${currentRoleToUpdate.name} ${currentRoleToUpdate.type}`}
                userRoles={[currentRoleToUpdate.role]}
                loading={loading} 
                errorMessage={errorMessage} 
                successMessage={successMessage} 
                show={showModal}
                rolesList={roles}
                parentRole={parentRole}>
            </RoleListModal>
}