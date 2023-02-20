import React, {useState, useEffect, useContext} from 'react'
import {WOQLClientObj} from '../init-woql-client'
import * as CONST from "../components/constants"
import {sortAlphabetically} from "../components/utils"
import {getTotalNumberOfDocuments} from "../queries/GeneralQueries"
import {useParams} from "react-router-dom"
import { ChangeRequest } from "./ChangeRequest";
import {decodeUrl} from "../components/utils"

export const DocumentControlContext = React.createContext()
export const DocumentControlObj = () => useContext(DocumentControlContext)
export const DocumentControlProvider = ({children}) => {
    const {dataProduct,docid:id,changeid} = useParams()
    const {getChangeRequestByID} = ChangeRequest()

    const { 
        accessControlDashboard,
        currentChangeRequest,
        woqlClient
    } = WOQLClientObj()

    // access control constants based on access control priviliges
    const [actionControl, setActionControl]=useState({})
    // constants to display document body in Form or JSON View
    const [view, setView]= useState(CONST.FORM_VIEW)
    // constant to maintain state of json object between form & JSON View
    const [jsonContent, setJsonContent]=useState(false)
    // constant to show document frames in document interface
    const [showFrames, setShowFrames]=useState(false)

    const [error, setError] = useState(false)
    // when we are doing some server call
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
                setLoading(true)
                setError(false)
                const dataProduct = woqlClient.db()
                // the list of classes
                const classDocumentsResult = await woqlClient.getClassDocuments(dataProduct)
                const classDocumentOrder=sortAlphabetically(classDocumentsResult, true) 
                const totalQ=getTotalNumberOfDocuments(classDocumentsResult)
                //give me back count with the total documents number and total for classes too
                const totalDocumentCount = await woqlClient.query(totalQ)
                //get the total number
                const getTotal = totalDocumentCount.bindings[0].Count["@value"]
                delete totalDocumentCount.bindings[0].Count
                
                setDocumentClasses(classDocumentOrder)
                setTotalDocumentCount(getTotal)
                //pass the count per class
                setPerDocument(totalDocumentCount.bindings[0])
            } 
        }catch(err){
            setError(err.message)
            console.log("Error in init woql while getting classes of data product", err.message)
        }finally{setLoading(false)}
    }

    // next step good cache policy
    // I needd a way to cache this so I can
    // not call frame for a specific dataP if not changes
    useEffect(() => {
        getUpdatedDocumentClasses()
        // reset frames and table.... 
        setFrames(null)
        setSelectedDocument(null)
        setDocumentTablesConfig(null) 
    },[dataProduct])

    useEffect(() => {
        //remove the error from the preview page
        if(error!== false)setError(false)
    },[window.location.pathname])

    // this work in edit and view 
    // not works for new document, I have to add it inside new document too
    // I prefer do the call in the single page maybe
    // to review
    useEffect(() => {
        if(frames===null)getUpdatedFrames()
        if(id) {         
            let documentID=decodeUrl(id)
            getDocument(documentID)
        }
    },[id,changeid])

    function getGraphqlTableConfig ( ){
        if(woqlClient){
            setLoading(true)
            setError(false)
            const clientCopy = woqlClient.copy()
            clientCopy.connectionConfig.api_extension = 'api/'
            const baseUrl = clientCopy.connectionConfig.dbBase("tables")
            clientCopy.sendCustomRequest("GET", baseUrl).then(result=>{
                setDocumentTablesConfig(result)  
            }).catch(err=>{
                console.log(err)
                setDocumentTablesConfig(false)
            }).finally(setLoading(false))
        }
    }

    function getUpdatedFrames() {
        if(woqlClient){
            setLoading(true)
            setError(false)
            const dataProduct = woqlClient.db()
            woqlClient.getSchemaFrame(null, dataProduct).then((res) => {
                setFrames(res)
            })
            .catch((err) =>  {
                setFrames(false)
                setError(er.message)
            }).finally(setLoading(false))
        }
    }

// to be review
    useState(() => {
        if(accessControlDashboard) { 
            let control={
                read: false,
                write: false
            }
            if(accessControlDashboard.instanceRead()) {
                control.read=true
            }
            if(accessControlDashboard.instanceWrite()) {
                control.write=true
            }
            setActionControl(control)
        }
    }, [accessControlDashboard])

    async function createDocument(jsonDocument) {
        try{
            setLoading(true)
            setError(false)
            await checkStatus()
            const res = await woqlClient.addDocument(jsonDocument, null, dataProduct)
            return res
        }catch(err){ 
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }

 
    async function getDocument(documentId){
        try{
            setLoading(true)
            setError(false)
            const params={id:documentId}
            const res = await woqlClient.getDocument(params, dataProduct)
            setSelectedDocument(res)
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }


    // delete documents
    async function deleteDocument(documentId) {
        try{
            setLoading(true)
            setError(false)
            await checkStatus ()
            const params={id:documentId}
            let commitMsg=`Deleting document ${documentId}` 
            const res = await woqlClient.deleteDocument(params, dataProduct, commitMsg)
            return res
        }
        catch(err){
            setError(`I can not delete the document ${err.message}`)
       }finally{setLoading(false)}
    }


    // check if the current change request is still open
    async function checkStatus (){   
        const CRObject = await getChangeRequestByID(currentChangeRequest)
        if(CRObject.status !== "Open"){
            throw Error(`The current Change Request has been ${CRObject.status}. 
                        Please exit the change request and create a new one`)
        }
    }
    
    async function updateDocument(jsonDoc) {
        try{
            setLoading(true)
            setError(false)
            await checkStatus ()
            let commitMsg=`Updating document ${jsonDoc["@id"]}`
            // pass create:true 
            const res = await woqlClient.updateDocument(jsonDoc, {}, dataProduct, commitMsg, false, false, false, true)
            return res
        }
        catch(err){
           setError(err.message)
       }finally{setLoading(false)}
    }

    return (
        <DocumentControlContext.Provider
            value={{
                view, 
                selectedDocument,
                getDocument,
                deleteDocument,
                createDocument,
                updateDocument,
                setView,
                getUpdatedFrames,
                actionControl,
                jsonContent, 
                setJsonContent,
                showFrames, 
                setShowFrames,
                loading,
                getUpdatedDocumentClasses,
                error,
                perDocumentCount,
                totalDocumentCount,
                documentClasses,
                getGraphqlTableConfig,
                documentTablesConfig,
                frames

            }}
        >
            {children}
        </DocumentControlContext.Provider>
    )
}

