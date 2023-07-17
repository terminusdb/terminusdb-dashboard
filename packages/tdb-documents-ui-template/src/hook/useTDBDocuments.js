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

    // store history of document 
    const [history, setHistory]=useState()
    const [startHistory, setStartHistory] = useState(0)
    const [diffCommitObject, setDiffCommitObject]=useState(false)
    const [diffObject, setDiffObject]=useState(false)
   

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
            let baseUrl = clientCopy.connectionConfig.branchBase("tables")
            if(clientCopy.db()==="_system"){
                baseUrl = baseUrl.replace("_system","admin/_system")
            }
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

    // get document history
    async function getDocumentHistory(documentID, start=0, count=5) {
        try{
            if(woqlClient && woqlClient.db()=== "_system"){
                setHistory([])
                return true
            }
            setLoading(true) 
            setError(false) 
            setStartHistory(start)
            const result = await woqlClient.getDocumentHistory(documentID, { start: start, count:6 })
            setHistory(result)
            return true
        }catch(err){
            setError(err.data || {message:err.message})
       }finally{
            setLoading(false)
        }
    }

    // get document history diffs
    async function getDocumenVersionDiff(beforeVersion, afterVersion, documentID, options) {
        try{
            setLoading(true)
            setError(false)
            // get original from beforeVersion
            const client_before = woqlClient.copy()
            await client_before.ref(beforeVersion)
            let originalValueResult = await client_before.getDocument({ id: documentID })
            // get changed from afterVersion
            const client_after = woqlClient.copy()
            await client_after.ref(afterVersion)
            let changedValueResult = await client_after.getDocument({ id: documentID })
          
            //await woqlClient.getVersionDiff(documentID, { start:0, count:5 }).then(result=>{
            //await clientCopy.clientCopy.checkout(branch) 
            await woqlClient.getVersionDiff(beforeVersion, afterVersion, documentID, { start:0, count:5 }).then(result=>{
                let diffObjectResult = {
                    originalValue: originalValueResult,
                    changedValue: changedValueResult,
                    diff: result
                }
                setDiffObject(diffObjectResult)
            })
            return true
        }catch(err){
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
            getDocumentHistory,
            history,
            getDocumenVersionDiff,
            diffCommitObject,
            setDiffCommitObject,
            diffObject,
            startHistory
    }
}

/* //this will return the last 5 commits for the Person/Anna document
* client.checkout("mybranch")
* client.docHistory("Person/Anna",{start:0,count:5}).then(result=>{
*    console.log(result)
* })
* //this will return the last and the first commit for the Person/Anna document
* client.docHistory("Person/Anna",{updated:true,created:true}).then(result=>{
*    console.log(result)
* })
*/


