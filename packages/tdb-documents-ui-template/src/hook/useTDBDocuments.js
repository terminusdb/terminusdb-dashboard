import React, {useState} from 'react'
import {sortAlphabetically} from "./utils"
import {getTotalNumberOfDocuments} from "./queryTemplates"

export const useTDBDocuments = (woqlClient) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    // bool|Array
    const [documentClasses, setDocumentClasses] = useState(false)

    // bool|Object
    const [perDocumentCount, setPerDocument]=useState(false)
    // bool|Number 
    const [totalDocumentCount, setTotalDocumentCount]=useState(false)
    
    // bool|Object
    //the  default value is null and false if it will be failed
    //start status null 
    //after the call can be an object or false
    const [documentTablesConfig,setDocumentTablesConfig]=useState(null)
    
    // bool|Object
    const [selectedDocument, setSelectedDocument] = useState(false)
    // bool|Object
    const [frames, setFrames]=useState(false)

    // store the state of formData  entered by the user
    const [formData, setFormData]= useState()

    //get all the Document Classes (no abstract or subdocument)
    //improve performance with check last commit
    async function getDocumentClasses() {
        try{
        // to be review I'm adding get table config here
            if(woqlClient){
                setLoading(true)
                setError(false)
                const dataProduct = woqlClient.db()
                // the list of classes
                const classDocumentsResult = await woqlClient.getClassDocuments(dataProduct)
                const classDocumentOrder=sortAlphabetically(classDocumentsResult, true) 
                setDocumentClasses(classDocumentOrder)
            } 
        }catch(err){
            setError(err.data || {message:err.message})
            console.log("Error in init woql while getting classes of data product", err.message)
        }finally{setLoading(false)}
    }

    // count the number of document I need this in 
    // docHome and query builder
    // I need to reload the class too
    async function getDocumentNumbers(){
        try{
            setLoading(true)
            setError(false)
            const dataProduct = woqlClient.db()
            // I need to reload because I do not know if this can change
            //let classDocumentOrder
            const classDocumentsResult = await woqlClient.getClassDocuments(dataProduct)
            const classes =sortAlphabetically(classDocumentsResult, true) 
            if(Array.isArray(classes) && classes.length>0){
                const totalQ=getTotalNumberOfDocuments(classes)
                //give me back count with the total documents number and total for classes too
                const totalDocumentCount = await woqlClient.query(totalQ)
                //get the total number
                const getTotal = totalDocumentCount.bindings[0].Count["@value"]
                delete totalDocumentCount.bindings[0].Count        
                setTotalDocumentCount(getTotal)
                //pass the count per class
                setPerDocument(totalDocumentCount.bindings[0])
            }
            setDocumentClasses(classes)
            
        }catch(err){
            setError(err.data || {message:err.message})
            console.log("Error in init woql while getting classes of data product", err.message)
        }finally{setLoading(false)}
    }

    function getGraphqlTablesConfig ( ){
        if(woqlClient){
            setLoading(true)
            // create a  new client instance copying all the settings
            const clientCopy = woqlClient.copy()
            clientCopy.connectionConfig.api_extension = 'api/'
            // I need to remove the team name in the url
            // this call is for the cloud-api
            if(clientCopy.connectionConfig.baseServer){
                clientCopy.connectionConfig.server = clientCopy.connectionConfig.baseServer
            }
            const baseUrl = clientCopy.connectionConfig.branchBase("tables")
            clientCopy.sendCustomRequest("GET", baseUrl).then(result=>{
                setDocumentTablesConfig(result)  
            }).catch(err=>{
                setError(err.data || {message:err.message})
                console.log(err)
                setDocumentTablesConfig(false)
            }).finally(setLoading(false))
        }
    }

    function getDocumentFrames() {
        if(woqlClient){
            setLoading(true)
            woqlClient.getSchemaFrame().then((res) => {
                setFrames(res)
            })
            .catch((err) =>  {
                setError(err.data || {message:err.message})
            }).finally(setLoading(false))
        }
    }

  async function createDocument(jsonDocument){
        try{
            setLoading(true)
            const res = await woqlClient.addDocument(jsonDocument)
            //return the new document id
            return res
        }catch(err){ 
            setFormData(jsonDocument)
            setError(err.data || {message:err.message})
        }finally{
            setLoading(false)
        }
    }

 
    async function getSelectedDocument(documentId){
        try{
            setLoading(true)
            setError(false)
            const params={id:documentId}
            const res = await woqlClient.getDocument(params)
            setSelectedDocument(res)
        }catch(err){
            setError(err.data || {message:err.message})
        }finally{
            setLoading(false)
        }
    }

    async function getDocumentById(documentId){
        try{
            setLoading(true)
            setError(false)
            const params={id:documentId}
            const res = await woqlClient.getDocument(params)
            return res
        }catch(err){
            setError(err.data || {message:err.message})
        }finally{
            setLoading(false)
        }
    }


    // delete documents
    async function deleteDocument(documentId) {
        try{
            setLoading(true)
            setError(false)
            const params={id:documentId}
            let commitMsg=`Deleting document ${documentId}` 
            const res = await woqlClient.deleteDocument(params, null, commitMsg)
            return true
        }catch(err){
            setError(err.data || {message:err.message})
       }finally{setLoading(false)}
    }


    async function updateDocument(jsonDocument) {
        try{
            setLoading(true)
            setError(false)
            let commitMsg=`Updating document ${jsonDocument["@id"]}`
            // pass create:true 
            await woqlClient.updateDocument(jsonDocument, {}, null, commitMsg, false, false, false, true)
            return true
        }catch(err){
            //display conflict
            setSelectedDocument(jsonDocument)
            setError(err.data || {message:err.message})
       }finally{setLoading(false)}
    }

    return {
            setError,
            formData, 
            selectedDocument,
            getSelectedDocument,
            getDocumentById,
            deleteDocument,
            createDocument,
            updateDocument,
            getDocumentNumbers,
            getDocumentFrames,
            loading,
            getDocumentClasses,
            error,
            perDocumentCount,
            totalDocumentCount,
            documentClasses,
            getGraphqlTablesConfig,
            documentTablesConfig,
            frames,
    }
}

