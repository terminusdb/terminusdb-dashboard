import React, {useState} from "react";
//import { ClientObj } from "../cms-init-client"
//import {errorMessageFormatter} from "../utils/errorMessage"

import {WOQLClientObj} from '../init-woql-client'
import { formatErrorMessage } from './hookUtils'

export function ChangeRequest(){  
    const {woqlClient ,currentChangeRequest, setCurrentCRObject } = WOQLClientObj() 

    const [loading, setLoading] = useState(false)
    const [errorMessage, setError] = useState(false)
    const [changeRequestList, setChangeRequestList]  = useState([])

    //I'm using the client to get my custom url
    function getUrl(){
        const client = woqlClient.copy()
        client.connectionConfig.api_extension = 'api/'
        return client.connectionConfig.dbBase("changes")
    }
    
    const createChangeRequest = async(branchName, message) =>{
        try{
            setLoading(true)
        const payload = {tracking_branch:branchName,
                        original_branch:"main",
                        message:message,
                        author:woqlClient.user()}
        const result = await woqlClient.sendCustomRequest("POST", getUrl(),payload)
        return result.change_request_id
        }catch(err){
            const errMessage = formatErrorMessage(err)
            setError(errMessage)
            return false
        }finally{
            setLoading(false)
        }
    }

    const updateChangeRequestStatus = async(message, status="Submitted") =>{
        try{
            setLoading(true)
            const payload = {message,status}
            await woqlClient.sendCustomRequest("PUT", `${getUrl()}/${currentChangeRequest}`,payload)
            return true
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
            //console.log("result ** ", result)
            setChangeRequestList(result)
            return result
        }catch(err){
            const errMessage = formatErrorMessage(err)
            setError(errMessage)
        }finally{
            setLoading(false)
        }     
    }

// TO BE REVIEW ?????
    const getChangeRequestByID = async(id) =>{
        try{ 
            setLoading(true) 
           // const payload = {id}
            const result = await woqlClient.sendCustomRequest("GET", `${getUrl()}/${id}`)
            if(setCurrentCRObject) {
                result.map(res=>{
                    if(res["@id"] === `ChangeRequest/${id}`){
                        setCurrentCRObject(res) 
                    }
                })
            }
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
        errorMessage,
        changeRequestList,
        createChangeRequest,
        getChangeRequestList,
        updateChangeRequestStatus,
        getChangeRequestByID
    }

}
