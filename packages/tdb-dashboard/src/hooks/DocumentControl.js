import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {executeQueryHook} from "./executeQueryHook"
//import {getDocumentClasses, getDocumentsOfType} from "../queries/GeneralQueries"
import {SCHEMA_GRAPH_TYPE, TERMINUS_SUCCESS, TERMINUS_DANGER, CREATE_DOCUMENT, EDIT_DOCUMENT,VIEW_DOCUMENT, GET_FRAMES_DOCUMENT, FORM_VIEW} from "../components/constants"
import {Alerts} from "../components/Alerts"
import {Loading} from "../components/Loading"
import {PROGRESS_BAR_COMPONENT} from "../components/constants"
//import {pendoMsgAfterCreateDocument} from "../trackWithPendo"

export const DocumentControl = () => {
    const [loading, setLoading]=useState(false)
    const [reportAlert, setReportAlert] = useState(false)


    const {
        woqlClient,
    } = WOQLClientObj()

    /***** REVIEW THIS BIT  *****/
    // get info of a chosen Document Id from a frame select
    const [subClassType, setSubClassType]= useState(false)
    const [subClassTypeResults, setSubClassTypeResults]= useState(false)
    useEffect(() => {
        if(!subClassType) return
        setLoading(true)
        getCurrentDocumentInfo (woqlClient, subClassType, setSubClassTypeResults, false, false,setLoading, setReportAlert)
    // (woqlClient, documentObject, asList, setResult, setError)
    }, [subClassType])



    return {
        loading,
        setLoading,
        reportAlert,
        setReportAlert,
        setSubClassType,
        subClassTypeResults

    }

}

// get schema frames of a document class
export const getDocumentFrame = async (woqlClient, documentObject, setResult, setError) =>{
    let documentType = documentObject.type
    try{
        let db=woqlClient.db()
        const result = await woqlClient.getSchemaFrame(documentType, db)
        //console.log("documentObject", documentObject)
        let docObj=documentObject
        docObj.type=documentType
        docObj.frames=result
        docObj.loading=false
        setResult(docObj)
    }catch(err){
        let message=`Error in fetching frames of class ${documentType} : ${err}`
        setError(message)
    }
}

// making a separate function for sub document frame so i dont have to alter document object
export async function getSubDocumentFrame (woqlClient, documentType, setFrame) {
    let db=woqlClient.db()
    await woqlClient.getSchemaFrame(documentType, db).then((res) => {
        setFrame(res)
    })
    .catch((err) => {
        console.log(`error in fetching sub document ${documentType}`)
    })
}

//create a new document
export const addNewDocument = async(woqlClient, newDocumentInfo, setResult, setError) => {
    try{
        let db=woqlClient.db()
        let commitMsg=`Adding a new instance of type ${newDocumentInfo["@type"]}`
        const result = await woqlClient.addDocument(newDocumentInfo, null, db, commitMsg)
        let message=`Success in creating new ${newDocumentInfo["@type"]}`
        let docObj={
            action: false, // reload everything and display all documents list
            type: newDocumentInfo["type"],
            view: false,
            submit: false,
            currentDocument: false,
            frames: {},
            filledFrame: {},
            loading: false,
            message: <Alerts message={message} type={TERMINUS_SUCCESS}/>,
            update: Date.now()
        }
        setResult(docObj)

        // loading pendo guide after create
       // pendoMsgAfterCreateDocument()
    }catch(err){
        let message=`Error in creating new Document of type ${newDocumentInfo["@type"]}: ${err}`
        setError(message)
    }
}

// gets all documents of a class of interest (to show in select of frames)
export async function getDocumentsOfClassOfInterest (woqlClient, classOfInterest, setDocumentsOfClassOfInterest, setLoading, setReportAlert) {
    let db=woqlClient.db()
    let params={}
    params['type'] = classOfInterest
    params['as_list'] = true
    await woqlClient.getDocument(params, db).then((res) => {
        if (setLoading) setLoading(false)
        setDocumentsOfClassOfInterest(res)
        return res
    })
    .catch((err) => {
        let message=`Error in fetching documents of class ${classOfInterest}: ${err}`
        if(setReportAlert) setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        if (setLoading) setLoading(false)
    })
}

// gets info of a chosen document ID
export const getCurrentDocumentInfo = async (woqlClient, documentObject, asList, setResult, setError) =>{
    try{
        let db=woqlClient.db()
        let params={}
        params['id'] = documentObject.currentDocument
        params['as_list'] = asList
        const result = await woqlClient.getDocument(params, db)
        const result2 = await woqlClient.getSchemaFrame(result["@type"], db) //get frames also, will be needed for traversing documents
        // update document object with filled frames
        let docObj=documentObject
        docObj.filledFrame = result
        docObj.frames = result2
        docObj.type=result["@type"]
        docObj.message= documentObject.message
        docObj.loading=false
        setResult(docObj)

    }catch(err){
        let message=`Error in fetching info of document ${documentObject.currentDocument}: ${err}`
        setError(message)
    }
 }


// update document
export async function updateDocument (woqlClient, documentObject, setUpdated, setError) {
    try{
        let db=woqlClient.db()
        let params={}
        let json = documentObject.frames
        let commitMsg=`Updating document ${json["@id"]}`
        const result = await woqlClient.updateDocument(json, params, db, commitMsg)

        let message = `Successfully updated document ${json["@id"]}`
        let docObj = {
            action: VIEW_DOCUMENT, // reload everything and display all documents list
            type: json["@type"],
            view: documentObject.view,
            submit: false,
            currentDocument: json["@id"],
            frames: {},
            loading: <Loading message={`Fetching document ${json["@id"]} ...`} type={PROGRESS_BAR_COMPONENT}/>,
            message: <Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setError}/>
        }
        setUpdated(docObj)
    }catch(err){
        let message=`Error in updating document : ${err}`
        setError(message)
    }
}

// get enum types
export async function getEnums(woqlClient, setEnums, setLoading, setReportAlert) {
    let db=woqlClient.db()

    await woqlClient.getEnums(db).then((res) => {
        setLoading(false)
        setEnums(res)
    })
    .catch((err) => {
        let message=`Error in fetching Enum of ${db}: ${err}`
        setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        setLoading(false)
    })
}

export async function deleteDocument  (woqlClient, setDocumentObject, documentObject) {
    let db=woqlClient.db()

    const params={}
    params['id'] = documentObject.currentDocument
    let commitMsg=`Deleting document ${documentObject.currentDocument}`
    await woqlClient.deleteDocument(params, db, commitMsg).then((res) => {
        let message=`Successfully deleted ${documentObject.currentDocument}`
        let docObj={
            action: false, // reload everything and display all documents list
            type: documentObject.type,
            view: documentObject.view,
            submit: false,
            currentDocument: false,
            frames: {},
            message: <Alerts message={message} type={TERMINUS_SUCCESS}/>,
            loading: false,
            update: Date.now()
        }

        setDocumentObject(docObj)
    })
    .catch((err) => {
        let message=`Error in deleting document ${documentObject.currentDocument}: ${err}`
        let docObj=documentObject
        docObj.message=<Alerts message={message} type={TERMINUS_DANGER}/>
        docObj.loading=false
    })
 }

 export function resetDocumentObject (setDocumentObject) {
    setDocumentObject({
        type: false,
        action: false,
        view: FORM_VIEW,
        submit: false,
        currentDocument: false,
        frames: {},
        update: Date.now(),
        message: false,
        loading: false
    })
 }

 export function executeDocumentAction (woqlClient, documentObject, setDocumentObject) {
     // on create new document
     if(documentObject.action == false) return
     if(documentObject.action == CREATE_DOCUMENT) {
        return getDocumentFrame(woqlClient, documentObject, setDocumentObject)
     }
     if(documentObject.action == EDIT_DOCUMENT) {
        return getDocumentFrame(woqlClient, documentObject, setDocumentObject)
     }
     if(documentObject.action == VIEW_DOCUMENT) {
        return getCurrentDocumentInfo (woqlClient, documentObject, setDocumentObject, false)
     }
 }

