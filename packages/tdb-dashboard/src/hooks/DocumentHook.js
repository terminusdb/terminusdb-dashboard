import React, {useState,useEffect} from "react";
import * as CONST from "../components/constants"
import { useNavigate, useParams } from "react-router-dom";
import { ChangeRequest } from "./ChangeRequest";
import { WOQLClientObj } from "../init-woql-client";

// to be review this
export function CheckStatusObj() {
    const {currentChangeRequest} = WOQLClientObj()
    const {getChangeRequestByID} = ChangeRequest()
    
    async function checkStatus (){   
        const CRObject = await getChangeRequestByID(currentChangeRequest)
        if(CRObject.status !== "Open"){

            throw Error(`The current Change Request has been ${CRObject.status}. 
                        Please exit the change request and create a new one`)
        }
    }

    return {checkStatus}

}

/**
 * Create a new document
 * @param {*} client TerminusDB Client
 * @param {*} document document JSON
 * @param {*} setLoading constant for loading
 * @param {*} setErrorMsg constant to store error message
 */
export function CreateDocumentHook(client,document, setLoading, setErrorMsg) {
    const [result, setResult] = useState(false)
    const {organization, dataProduct, type}=useParams()
    const navigate = useNavigate()
    const {checkStatus} = CheckStatusObj()
 
    async function addDocument() {
        try{
            setLoading(true)
            await checkStatus()
            const res = await client.addDocument(document, null, client.db())
            //let type=document["@type"]
            setResult(res)
            navigate(`/${organization}/${dataProduct}/documents/${type}`)
            setLoading(false)
        }
        catch(err){ 
            setLoading(false)
            if(setErrorMsg) setErrorMsg(err.message)
       }
    }

    useEffect(() => {
        if (Object.keys(document).length) addDocument()
    }, [document])

    return result
}


// delete documents
export function DeleteDocumentHook(client, documentId, type, clickedDelete, setLoading, setErrorMsg) {
    const [result, setResult] = useState(false)
    const {organization, dataProduct}=useParams()
    const navigate=useNavigate()
    const {checkStatus} = CheckStatusObj()
    async function deleteDocument() {
        try{
            setLoading(true)
            await checkStatus ()
            let params={}
            params['id'] = documentId
            let commitMsg=`Deleting document ${documentId}` 
            const res = await client.deleteDocument(params, client.db(), commitMsg)
            navigate(`/${organization}/${dataProduct}/documents/${type}`)
            setLoading(false)
        }
        catch(err){
            if(setErrorMsg) setErrorMsg(err.message)
            setLoading(false)
       }
    }

    useEffect(() => {
        // delete doc only if user has clicked on delete document 
        if (documentId && clickedDelete) deleteDocument()
    }, [documentId, clickedDelete])

    return result
}

/**
 * View a document
 * @param {*} client TerminusDB Client
 * @param {*} documentID documentID to be viewed 
 * @param {*} setData constant to store document JSON
 * @param {*} setLoading constant for loading
 * @param {*} setErrorMsg constant to store error message
 */
export function GetDocumentHook(client, documentId, setData, setLoading, setErrorMsg){// setLoading, setSuccessMsg, setErrorMsg) {
        const [result, setResult] = useState(false)
    
        async function getDocument() {
            try{
                let params={}
                params['id']=documentId
                if(setLoading) setLoading(true)
                const res = await client.getDocument(params, client.db())
                if(setData) setData(res)
                setResult(res)
                if(setLoading) setLoading(false)
                return res
            }
            catch(err){
                if(setLoading) setLoading(false)
                if(setErrorMsg) setErrorMsg(err.message)
           }
        }
    

        useEffect(() => {
            if (documentId) getDocument()
        }, [documentId])
    
        return result
}


/**
 * Edit a document
 * @param {*} client TerminusDB Client
 * @param {*} extractedUpdate extracted data from Form
 * @param {*} setLoading constant for loading
 * @param {*} setErrorMsg constant to store error message
 */
export function EditDocumentHook(client, extractedUpdate, setLoading, setErrorMsg) {
    const [result, setResult] = useState(false)
    const navigate=useNavigate()
    const {checkStatus} = CheckStatusObj()
    async function updateDocument() {
        try{

            let params={}
            let update = extractedUpdate
            let documentId = extractedUpdate["@id"]
            let commitMsg=`Updating document ${documentId}`
            setLoading(true)
            await checkStatus ()
            const res = await client.updateDocument(update, params, client.db(), commitMsg)
            setLoading(false)
            navigate(-1)
        }
        catch(err){
           setErrorMsg(err.message)
           setLoading(false)
       }
    }

    useEffect(() => {
        if (extractedUpdate) updateDocument()
    }, [extractedUpdate])

    return result
}


/**
 * 
 * @param {*} client TerminusDB Client
 * @param {*} branch branch to get document from
 * @param {*} documentID documentID clicked from diff accordians
 * @param {*} setValue Constant to set document JSON
 * @param {*} setError Constant to catch error 
 * @returns An array of documents from tracking branch
 */
export function GetDocumentByBranches(client, branch, documentID, setValue, setError, refresh){
    const [result, setResult] = useState(false)

    async function getDocument() {
        try{
            const clientCopy = client.copy()
            clientCopy.checkout(branch) 
            let value = await clientCopy.getDocument({id: documentID})
            if(setValue) setValue(value)         
        }
        catch(err){
           if(setError) setError(err.message)
           if(setValue) setValue(false)
       }
    }

    useEffect(() => {
        if (documentID && branch && refresh) getDocument()
    }, [documentID, branch, refresh])

    return result
}



/**
 * 
 * @param {*} client TerminusDB Client
 * @param {*} changeRequestID Change Request ID
 * @param {*} setError Constant to catch error 
 * @returns diff list from branches
 */ 
export function GetDiffList(woqlClient, changeRequestID, setLoading, setError){
    const [result, setResult] = useState(false)

    async function getDiffList() {
        try{
            const client = woqlClient.copy()
            client.connectionConfig.api_extension = 'api/'
            const baseUrl = client.connectionConfig.dbBase("changes")
            //let id = extractID(changeRequestID)
            const result = await client.sendCustomRequest("GET", `${baseUrl}/${changeRequestID}/diff`)
            setResult(result)
            if(setLoading) setLoading(false)
        }
        catch(err){
            if(setError) setError(err.message)
       }
    } 

    useEffect(() => {
        if (changeRequestID && woqlClient) getDiffList()
    }, [changeRequestID, woqlClient])

    return result
}
