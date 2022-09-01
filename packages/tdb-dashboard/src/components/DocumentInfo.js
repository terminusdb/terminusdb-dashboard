
import React, {useEffect, useState} from "react"
import {Form, Row, Card, Col, Button} from "react-bootstrap"
import {AiOutlineDelete} from "react-icons/ai"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT, EDITOR_READ_OPTIONS, JSON_VIEW, EDIT_DOCUMENT, GET_FRAMES_DOCUMENT, VIEW_DOCUMENT, FORM_VIEW} from "./constants"
import {deleteDocument} from "../hooks/DocumentControl"
import {ToggleJsonAndFormControl} from "./ToggleJsonAndFormControl"
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
require('codemirror/mode/css/css')
require('codemirror/mode/javascript/javascript')
import {BiEdit, BiEditAlt} from "react-icons/bi"
import {checkIfObject} from "./utils"
import {WOQLClientObj} from '../init-woql-client'
import {DocumentControlObj} from '../hooks/DocumentControlContext'
import {FaRegHandPointUp} from "react-icons/fa"
import { FrameViewer } from "@terminusdb/terminusdb-documents-ui"

export const DocumentInfo = () => {
    const {
        woqlClient,
        documentClasses,
        docs,
        frames
    } = WOQLClientObj()

    const {
        documentObjectWithFrames,
        documentObject,
        setDocumentObject,
        actionControl
    } = DocumentControlObj()

    const [currentView, setCurrentView]=useState(documentObject.view)

    function handleClick (view) { // on toggle of json and form controls
        let docObj = documentObjectWithFrames
        docObj.view=view
        setCurrentView(view)
        setDocumentObject(docObj)
    }


    function onDelete () {
        let docObj = documentObject
        docObj.loading =  <Loading message={`Deleting document ${documentObject.currentDocument} ...`} type={PROGRESS_BAR_COMPONENT}/>
        deleteDocument(woqlClient, setDocumentObject, documentObject)
    }

    const JsonDocument = ({documentObject}) => {
        let docInfo = documentObject.filledFrame
        var options = EDITOR_READ_OPTIONS

        const [value, setValue]=useState(false) // sets value from editor


        return <React.Fragment>
            <CodeMirror
                value={JSON.stringify(docInfo, null, 2)}
                options={options}
            />
        </React.Fragment>
    }

    function handleEdit () {
        setDocumentObject({
            action: EDIT_DOCUMENT,
            type: documentObjectWithFrames.type,
            view: documentObject.view,
            submit: false,
            currentDocument: documentObjectWithFrames.currentDocument,
            frames: documentObjectWithFrames.frames,
            filledFrame: documentObjectWithFrames.filledFrame,
            update:Date.now()
        })
    }

    function onTraverse(clicked) {
       
        var previous = []
        if(Array.isArray(documentObject.previous)) {
            previous = documentObject.previous
        }
        previous.push(documentObject.currentDocument)
        setDocumentObject({
            action: VIEW_DOCUMENT,
            type: documentObject.frames["@type"],
            view: FORM_VIEW,
            submit: false,
            currentDocument: clicked,
            frames: {},
            filledFrame: {},
            loading: <Loading message={`Fetching document ${clicked} ...`} type={PROGRESS_BAR_COMPONENT}/>,
            message: false,
            update:false,
            previous: previous
        })
    }

    const DocumentContents = ({documentObject, currentView}) => {

        if (currentView == JSON_VIEW) return <JsonDocument documentObject={documentObject}/>
        return <FrameViewer frame={frames}
            type={documentObjectWithFrames.type}
            mode={documentObjectWithFrames.action}
            documents={docs}
            formData={documentObjectWithFrames.filledFrame}
            onTraverse={onTraverse}
        />
    }

    return <main className="content mr-3 ml-5 w-100">
        <Row className="w-100 mb-5">
            <Col md={11}>
                {documentObjectWithFrames.message && documentObjectWithFrames.message}
                <Card className="d-flex w-100">
                    {documentObjectWithFrames.loading && documentObjectWithFrames.loading}
                    <Card.Header className="d-flex w-100 text-break">
                        <span className="float-left w-100">
                            <h5><strong className="text-success">{documentObjectWithFrames.currentDocument}</strong></h5>
                        </span>
                        <span className="w-100 float-right">
                            {actionControl.write && <React.Fragment>
                                <Button className="float-right btn btn-sm btn-light mr-2 text-dark" onClick={handleEdit} title={`Edit ${documentObjectWithFrames.currentDocument}`}>
                                    <BiEdit className="mr-1"/> Edit
                                </Button>

                                <Button className="float-right btn btn-sm btn-danger mr-2" title={`Delete ${documentObjectWithFrames.currentDocument}`} onClick={onDelete}>
                                    <AiOutlineDelete className="mr-1"/> Delete
                                </Button>
                            </React.Fragment>}

                            <ToggleJsonAndFormControl onClick={handleClick} documentObject={documentObjectWithFrames}/>

                        </span>

                    </Card.Header>
                    <Card.Body className="text-break">
                        <Form>
                            {currentView && <DocumentContents documentObject={documentObjectWithFrames} currentView={currentView}/>}
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </main>


}


