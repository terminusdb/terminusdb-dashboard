import React, {useState} from 'react'
import {sortAlphabetically} from "./utils"
import {getTotalNumberOfDocuments} from "./GeneralQueries"

export const DocumentsUIHook = (woqlClient) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const [documentClasses, setDocumentClasses] = useState(false)
    const [perDocumentCount, setPerDocument]=useState(false)
    const [totalDocumentCount, setTotalDocumentCount]=useState(false)
    // null nothing is done
    // object - complete
    // false - failed
    const [documentTablesConfig,setDocumentTablesConfig]=useState(null)
    const [selectedDocument, setSelectedDocument] = useState(null)
    const [frames, setFrames]=useState(null)

    //get all the Document Classes (no abstract or subdocument)
    // I can need to call this again
    // improve performance with check last commit
    async function getUpdatedDocumentClasses() {
        try{
        // to be review I'm adding get table config here
            if(woqlClient){
                setDocumentClasses(false)
                setLoading(true)
                setError(false)
                const dataProduct = woqlClient.db()
                // the list of classes
                const classDocumentsResult = await woqlClient.getClassDocuments(dataProduct)
                const classDocumentOrder=sortAlphabetically(classDocumentsResult, true) 
                setDocumentClasses(classDocumentOrder)
            } 
        }catch(err){
            setError(err.data || err.message)
            console.log("Error in init woql while getting classes of data product", err.message)
        }finally{setLoading(false)}
    }

    // count the number of document I need this in 
    // docHome and query builder
    // I need to reload the class too
    async function getDocNumber(){
        try{
            setDocumentClasses(false)
            setTotalDocumentCount(false)
            setPerDocument(false)
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
            setError(err.data || err.message)
            console.log("Error in init woql while getting classes of data product", err.message)
        }finally{setLoading(false)}
    }

    // next step good cache policy
    // I needd a way to cache this so I can
    // not call frame for a specific dataP if not changes
    // classes and frames we need only one but count can change
    // we reset all the object
   /* useEffect(() => {
        resetAll()
        // reset frames and table....
    },[dataProduct])


    function resetAll(){
        setDocumentClasses(false)
        setTotalDocumentCount(false)
        setPerDocument(false)
        setFrames(null)
        setSelectedDocument(null)
        setDocumentTablesConfig(null)
    }*/

 /*  useEffect(() => {
        //remove the error from the preview page
        if(error!== false)setError(false)
    },[window.location.pathname])*/

    // this work in edit and view 
    // not works for new document, I have to add it inside new document too
    // I prefer do the call in the single page maybe ??
    // to review
    // we need frame in the diff page too for this we are listening changeid status
   /* useEffect(() => {
        // only if I'm in change request mode 
        // I do not need to reload because the schema can not change
        //if(!currentChangeRequest || documentTablesConfig === null) 
        // we need in edit/insert
        if(id || changeid) {              
            getUpdatedFrames()  
            if(id){
                getGraphqlTableConfig()
                let documentID=decodeUrl(id)
                getDocument(documentID)
            }
        }
    },[id,changeid])*/


    function getGraphqlTableConfig ( ){
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
                setError(err.data || err.message)
                console.log(err)
                setDocumentTablesConfig(false)
            }).finally(setLoading(false))
        }
    }

    function getUpdatedFrames() {
       // setFrames(null)
        if(woqlClient){
            setLoading(true)
            woqlClient.getSchemaFrame().then((res) => {
                setFrames(res)
            })
            .catch((err) =>  {
                setFrames(false)
                setError(err.data || err.message)
            }).finally(setLoading(false))
        }
    }

  async function createDocument(jsonDocument) {
        try{
            setLoading(true)
            //await checkStatus()
            const res = await woqlClient.addDocument(jsonDocument)
            return res
        }catch(err){ 
            setError(err.data || err.message)
        }finally{
            setLoading(false)
        }
    }

 
    async function getDocument(documentId){
        try{
            setLoading(true)
            setError(false)
            const params={id:documentId}
            const res = await woqlClient.getDocument(params)
            setSelectedDocument(res)
        }catch(err){
            setError(err.data || err.message)
        }finally{
            setLoading(false)
        }
    }


    // delete documents
    async function deleteDocument(documentId) {
        try{
            setLoading(true)
            setError(false)
           // await checkStatus ()
            const params={id:documentId}
            let commitMsg=`Deleting document ${documentId}` 
            const res = await woqlClient.deleteDocument(params, null, commitMsg)
            return true
        }catch(err){
            setError(err.data || err.message)
       }finally{setLoading(false)}
    }



    
    async function updateDocument(jsonDoc) {
        try{
            setLoading(true)
            setError(false)
           // await checkStatus ()
            let commitMsg=`Updating document ${jsonDoc["@id"]}`
            // pass create:true 
            const res = await woqlClient.updateDocument(jsonDoc, {}, null, commitMsg, false, false, false, true)
            return res
        }
        catch(err){
            //display conflict
            setError(err.data || err.message)
       }finally{setLoading(false)}
    }

    return {
                setError,
                selectedDocument,
                getDocument,
                deleteDocument,
                createDocument,
                updateDocument,
                getDocNumber,
                getUpdatedFrames,
                loading,
                getUpdatedDocumentClasses,
                error,
                perDocumentCount,
                totalDocumentCount,
                documentClasses,
                getGraphqlTableConfig,
                documentTablesConfig,
                frames,
    }
}

