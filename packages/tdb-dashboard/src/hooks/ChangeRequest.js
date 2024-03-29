import React, { useState, useEffect } from "react";
//import { ClientObj } from "../cms-init-client"
//import {errorMessageFormatter} from "../utils/errorMessage"
import { getCRConflictError } from "../components/utils"
import {WOQLClientObj} from '../init-woql-client'
import { formatErrorMessage } from './hookUtils'
import {getChangesUrl} from './hookUtils'
 
export function ChangeRequest(){  
    const { woqlClient, currentCRObject, setCurrentCRObject } = WOQLClientObj()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setError] = useState(false)
    const [changeRequestList, setChangeRequestList]  = useState([])
    const [manageConflict, setManageConflict]=useState(false)
 
    //I'm using the client to get my custom url
    function getUrl(){
        return getChangesUrl(woqlClient)
    }
    
    const createChangeRequest = async(name,message,fromBranch) =>{
        try{
            setLoading(true)
        const payload = {original_branch:fromBranch || "main",
                        name:name,
                        message:message,
                        author:woqlClient.user()}
        const result = await woqlClient.sendCustomRequest("POST", getUrl(),payload)
        //{changeRequestId,branchName}
        return result
        }catch(err){
            const errMessage = formatErrorMessage(err)
            setError(errMessage)
            return false
        }finally{
            setLoading(false)
        }
    }

    const addNewMessage = async(message, crID = false) =>{
        try{
            setLoading(true)
            const payload = {message}
            const currentCR = crID 
            const changeRequestDoc = await woqlClient.sendCustomRequest("POST", `${getUrl()}/${currentCR}/messages`,payload)
            return changeRequestDoc
        }catch(err){ 
            const errMessage = formatErrorMessage(err)
            setError(errMessage)
            return false
        }finally{
            setLoading(false)
        }  
    }

    const updateChangeRequestStatus = async(message, status="Submitted", crID = false) =>{
        try{
            setLoading(true)
            const payload = {message,status}
            const currentCR = crID 
            const changeRequestDoc = await woqlClient.sendCustomRequest("PUT", `${getUrl()}/${currentCR}`,payload)
            return changeRequestDoc
        }catch(err){ 
            const errMessage = formatErrorMessage(err)
            setError(errMessage)
            return false
        }finally{
            setLoading(false)
        }  
    }

    const getChangeRequestList = async(branchName, message) =>{
        try{
            setLoading(true)  
            const result = await woqlClient.sendCustomRequest("GET", getUrl())
            setChangeRequestList(result)
            return result
        }catch(err){
            const errMessage = formatErrorMessage(err)
            console.log("getChangeRequestList", errMessage)
            setError(errMessage)
        }finally{
            setLoading(false)
        }     
    }


    const rebaseChangeRequestBranch = async(id) =>{
        try{ 
            setLoading(true) 
           // const payload = {id}
            const result = await woqlClient.sendCustomRequest("PUT", `${getUrl()}/${id}/rebase`,{})
            return result
        }catch(err){
            if (err.data && err.data["api:status"]==="api:conflict") { 
                // manage Conflict  
                const errMessage = getCRConflictError(err.data["api:witnesses"], currentCRObject, setCurrentCRObject)
                setError(errMessage)
            }
            else {
                const errMessage = formatErrorMessage(err)
                setError(errMessage)
            }
        }finally{
            setLoading(false)
        }     
    }


// TO BE REVIEW ?????
    const getChangeRequestByID = async(id,check_head) =>{
        try{ 
            setLoading(true) 
           // const payload = {id}
            const queryParams = check_head ? `?check_head=true` : ""
            const result = await woqlClient.sendCustomRequest("GET", `${getUrl()}/${id}${queryParams}`)
            return result
        }catch(err){
            const errMessage = formatErrorMessage(err)
            setError(errMessage)
        }finally{
            setLoading(false)
        }     
    } 

    return {
        loading,
        setError,
        addNewMessage,
        errorMessage,
        changeRequestList,
        createChangeRequest,
        addNewMessage,
        getChangeRequestList,
        updateChangeRequestStatus,
        getChangeRequestByID,
        rebaseChangeRequestBranch,
        manageConflict,
        setManageConflict
    }

}
