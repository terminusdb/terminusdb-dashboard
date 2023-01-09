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
    const client = woqlClient.copy()
    client.connectionConfig.api_extension = 'api/'
    const baseUrl = client.connectionConfig.dbBase("changes")
    
    const createChangeRequest = async(branchName, message) =>{
        try{
            setLoading(true)
        const payload = {tracking_branch:branchName,
                        original_branch:"main",
                        message:message,
                        author:client.user()}
        const result = await client.sendCustomRequest("POST", baseUrl,payload)
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
            await client.sendCustomRequest("PUT", `${baseUrl}/${currentChangeRequest}`,payload)
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
            const result = await client.sendCustomRequest("GET", baseUrl)
            //console.log("result ** ", result)
            setChangeRequestList(result)
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
            const result = await client.sendCustomRequest("GET", `${baseUrl}/${id}`)
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
