import React, {useState,useEffect} from "react";
import { WOQLClientObj } from "../init-woql-client";

export function DocumentHook(){
    const {woqlClient} = WOQLClientObj()

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

    async function getDiffList(changeRequestID) {
        try{
            const client = woqlClient.copy()
            client.connectionConfig.api_extension = 'api/'
            const baseUrl = client.connectionConfig.dbBase("changes")
            const result = await client.sendCustomRequest("GET", `${baseUrl}/${changeRequestID}/diff`)
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
            const result = await woqlClient.getDocument(documentID)
            setResult(result)
        }
        catch(err){
            setError(err.message)
            setResult(false)
        }finally{setLoading(false)}
    }

    return {result, 
            getDocumentByBranches,
            getDiffList,
            getDocumentById,
            loading,
            error,
            originalValue,
            changedValue}
}