import React, {useState, useEffect, useContext} from 'react'
export const DocumentControlContext = React.createContext()
export const DocumentControlObj = () => useContext(DocumentControlContext)
import {Alerts} from "../components/Alerts"
import {FORM_VIEW, VIEW_DOCUMENT, CREATE_DOCUMENT, EDIT_DOCUMENT, TERMINUS_DANGER, TERMINUS_SUCCESS, PROGRESS_BAR_COMPONENT} from "../components/constants"
import {WOQLClientObj} from '../init-woql-client'
import {addNewDocument, updateDocument, getDocumentFrame, getCurrentDocumentInfo} from './DocumentControl'

export const DocumentControlProvider = ({children}) => {
    const {
        woqlClient,
        selectedDocument,
        accessControlDashboard
    } = WOQLClientObj()


    // access control constants based on access control priviliges
    const [actionControl, setActionControl]=useState({})

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

    const [result, setResult] = useState(false)
    const [error, setError] = useState(false)
    const [documentObjectWithFrames, setDocumentObjectWithFrames]=useState(false)

    const [documentObject, setDocumentObject]=useState({
        type: false, // document class type
        action: false,  // create/ view/ edit
        view: FORM_VIEW,    // view in form or json
        submit: false,  // click on submit button to edit or create
        currentDocument: false, // current document id to view document details
        frames: {}, // schema frames of document class
        filledFrame: {}, // filled frames of document id
        message: false, // success or error message related to action on a document
        loading: false,  // loading bar
        update:false // to refresh updated info
    })

    useEffect(() => { // when a document is selected from a query panel
        if(selectedDocument) {
            setDocumentObject(selectedDocument)
        }
    }, [selectedDocument])

    // on change of document view to JSON or frame
    useEffect(() => {
        let docObj = documentObjectWithFrames
        docObj = documentObject.view
        setDocumentObjectWithFrames(docObj)
    }, [documentObject.view])

    // on create of a document class
    useEffect(() => {
        if(!documentObject.action) { // display all documents of a selected document class
            setDocumentObjectWithFrames(documentObject)
            return
        }
        else if(documentObject.action == VIEW_DOCUMENT) {
            getCurrentDocumentInfo(woqlClient, documentObject, false, setResult, setError)
            return
        }
        getDocumentFrame(woqlClient, documentObject, setResult, setError)
    }, [documentObject.type, documentObject.action])

    useEffect(() => {
        // get frames everytime create is clicked
        if(documentObject.action == CREATE_DOCUMENT) {
            getDocumentFrame(woqlClient, documentObject, setResult, setError)
        }
    }, [documentObject.update])

    // on click of submit on create or edit
    useEffect(() => {
        if(!documentObject.submit) return
        if(!Object.keys(documentObject.frames)) return
        //console.log("documentObject", documentObject)
        if(documentObject.action == CREATE_DOCUMENT) {
            addNewDocument(woqlClient, documentObject.frames, setResult, setError)
        }
        if(documentObject.action == EDIT_DOCUMENT) {
            updateDocument(woqlClient, documentObject, setDocumentObject, setError)
        }
    }, [documentObject.submit, documentObject.frames])



    useEffect(() => { // on success
        if(result){
            setDocumentObjectWithFrames(result)
        }
    }, [result])

    //constants on error
    const [originalFrames, setOriginalFrames]=useState(false)
    useEffect(() => { // reporting error
        if(error) {
            let docObj = documentObject
            if((documentObject.action == CREATE_DOCUMENT) || (documentObject.action == EDIT_DOCUMENT)) {
                // get back original frames on error
                getDocumentFrame(woqlClient, documentObject, setOriginalFrames, setError)
            }
            else {
                docObj.loading = false
                docObj.message=<Alerts message={error} type={TERMINUS_DANGER} onCancel={setError}/>
                setDocumentObjectWithFrames(docObj)
            }
        }
    }, [error])

    useEffect(() => {
        if(originalFrames) {
            let docObj = documentObject
            docObj.loading = false
            docObj.message=<Alerts message={error} type={TERMINUS_DANGER} onCancel={setError}/>
            //setDocumentObjectWithFrames(docObj)
        }
    }, [originalFrames])


    return (
        <DocumentControlContext.Provider
            value={{
                setDocumentObject,
                documentObject,
                documentObjectWithFrames,
                setDocumentObjectWithFrames,
                actionControl
            }}
        >
            {children}
        </DocumentControlContext.Provider>
    )
}

