import React, {useState, useRef, useEffect} from "react"
import {Form} from "react-bootstrap"
import {BiError} from "react-icons/bi"
import {AccessControlHook} from "../hooks/AccessControlHook"
import { GET_ALL_USERS } from "../utils/default"
import { RoleListModal } from "./RoleList"

//create user if do not exists and add to team
export const AddUserCapabilityModal = ({showModal, defaultUser, setShowModal, title, resourceId, accessControlDashboard,options,updateTable}) => {
    if(!accessControlDashboard) return ""
    const {successMessage,
            manageCapability,getRolesList,rolesList,
            resultTable, getResultTable,
            loading,setError,
            errorMessage} =  AccessControlHook(accessControlDashboard,options)


    useEffect(() => {
        if(rolesList.length===0)getRolesList()
        if(!defaultUser)updateResultTable()
    }, [])

    const updateResultTable = () =>{
        getResultTable(GET_ALL_USERS)
    }

    const userId = useRef(null);
    const password = useRef(null);
    const userName = useRef(null)

    const roles = rolesList//accessControlDashboard.getRolesList()
//teamId,operation,roles, username,password
    function addUser(role){
        let userId = defaultUser
        if(!defaultUser){
            userId = userName.current.value
            if(!userId || userId ==="NoSelect"){
                setError("User id is mandatory")
                return
            }
        }

        manageCapability(resourceId,"grant",role,userId).then(done=>{
            if(done){
                updateTable()
                setShowModal(false)
            }
        })
        //userId.current.value = ""
        //if(!defaultName)password.current.value = ""
        setError(false)                     
        //}
    }

    function handleKeyPress(e) {
        if (e.which === 13 /* Enter */) {
            e.preventDefault()
        }
    }

    const propsObj = {setShow:setShowModal,
                title:title,
                clickButton:addUser}
    //const value =  defaultName ? {value:defaultName, disabled:true} : {}

    return <RoleListModal {...propsObj}
                type="checkbox"
                loading={loading} 
                errorMessage={errorMessage} 
                successMessage={successMessage} 
                show={showModal}
                rolesList={roles}>
            <Form onKeyPress={handleKeyPress}>
            {!defaultUser && <Form.Group className="mb-3">
                <Form.Select ref={userName} onChange={()=>{setError(false)}}>
                    <option value="NoSelect">Select The User Name</option>
                    {resultTable && resultTable.map(item=>{
                        return <option value={item["@id"]}>{item.name}</option>
                    })
                    }
                </Form.Select>
            </Form.Group>
            }          
            </Form>
        </RoleListModal>
}