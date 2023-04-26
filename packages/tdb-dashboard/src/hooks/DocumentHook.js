import React, {useState,useEffect} from "react";
import { WOQLClientObj } from "../init-woql-client";

export function DocumentHook(){
    const {woqlClient,currentChangeRequest} = WOQLClientObj()

    const [result, setResult] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const [originalValue, setOriginalValue] =  useState(false)
    const [changedValue, setChangedValue] =  useState(false)
    
    /**
     * 
     * @param {*} branch branch to get document from
     * @param {*} documentID documentID clicked from diff accordians
     * @returns An array of documents from tracking branch
     */

   //insert - delete - change
    async function getDocumentByBranches(branch, documentID, action) {
        try{
            setLoading(true)
            let changedValueResult  ={}
            let originalValueResult = {}
            const clientCopy = woqlClient.copy()
            switch(action){
                case "Insert":
                    clientCopy.checkout(branch) 
                    changedValueResult = await clientCopy.getDocument({id: documentID})
                    break
                case "Delete":
                    clientCopy.checkout("main") 
                    originalValueResult = await clientCopy.getDocument({id: documentID})
                    break
                default :
                    clientCopy.checkout(branch) 
                    changedValueResult = await clientCopy.getDocument({id: documentID})
                    clientCopy.checkout("main") 
                    originalValueResult = await clientCopy.getDocument({id: documentID})
            }            
            setOriginalValue(originalValueResult)    
            setChangedValue(changedValueResult)
        }
        catch(err){
           setError(err.message)
           setOriginalValue(false)    
           setChangedValue(false)
       }finally{setLoading(false)}
    }

    async function getDiffList(changeRequestID,start=0,count=5) {
        try{
            const client = woqlClient.copy()
            client.connectionConfig.api_extension = 'api/'
            const baseUrl = client.connectionConfig.dbBase("changes")
            const result = await client.sendCustomRequest("GET", `${baseUrl}/${changeRequestID}/diff?count=${count}&start=${start}`)
            setResult(result)
        }
        catch(err){
            setError(err.message)
            setResult(false)
        }finally{setLoading(false)}
    } 


    async function getDocumentById(documentID) {
        try{
            setLoading(true)
            const result = await woqlClient.getDocument({id:documentID})
            setResult(result)
        }catch(err){
            setError(err.message)
            setResult(false)
        }finally{setLoading(false)}
    }

        // check if the current change request is still open
    async function checkStatus (){ 
        // I can decide to change a document 
        // in a new branch without using the change request workflow
        // in this case currentChangeRequest is false
        if(!currentChangeRequest) return 
            const CRObject = await getChangeRequestByID(currentChangeRequest)
            if(CRObject.status !== "Open"){
                throw Error(`The current Change Request has been ${CRObject.status}. 
                            Please exit the change request and create a new one`)
        }
    }

    return {result, 
            checkStatus,
            getDocumentByBranches,
            getDiffList,
            getDocumentById,
            loading,
            error,
            originalValue,
            changedValue}
}