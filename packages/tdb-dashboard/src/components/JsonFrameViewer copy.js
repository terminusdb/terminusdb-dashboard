import React, {useState, useEffect} from "react"
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
require('codemirror/mode/css/css')
require('codemirror/mode/javascript/javascript')
import {EDITOR_WRITE_OPTIONS, EDIT_DOCUMENT, CREATE_DOCUMENT} from "./constants"
import {Button, Row} from "react-bootstrap"
import {BiPlus,BiEditAlt, BiReset} from "react-icons/bi"
import {WOQLClientObj} from '../init-woql-client'
import {PROGRESS_BAR_COMPONENT} from "./constants" 
import {FaInfoCircle} from "react-icons/fa" 
import {DocumentControlObj} from '../hooks/DocumentControlContext'

export const JsonFrameViewer = () => {
    const [value, setValue]=useState(false) // sets value from editor 
    const [json, setJson]=useState(false)

    const [update, setUpdate]=useState(Date.now())

    const {
        documentObject,
        setDocumentObject,
        documentObjectWithFrames
    } = DocumentControlObj()

    let options=EDITOR_WRITE_OPTIONS

    function handleCreateDocument () {
        setDocumentObject({
            action: CREATE_DOCUMENT,
            type: documentObject.type,
            view: documentObject.view,
            submit: true,
            filledFrame: {},
            frames: JSON.parse(value),
            update:false
        })
    }

    function handleUpdateDocument () {
        setDocumentObject({
            action: EDIT_DOCUMENT,
            type: documentObject.type,
            view: documentObject.view,
            submit: true,
            frames: JSON.parse(value),
            filledFrame: {},
            message: false,
            update:false
        })
    }

    useEffect(() => {
        if(documentObject.action==CREATE_DOCUMENT)
            setJson(JSON.stringify(documentObjectWithFrames.frames, null, 2))
        else if (documentObject.action==EDIT_DOCUMENT)
            setJson(JSON.stringify(documentObjectWithFrames.filledFrame, null, 2))
    }, [documentObject.action])

    
    return <React.Fragment>
        {documentObjectWithFrames.loading && <Loading message={`Add new ${documentObjectWithFrames.type} ...`} type={PROGRESS_BAR_COMPONENT}/>}
        {documentObjectWithFrames.reportAlert && documentObjectWithFrames.reportAlert}
        {
            documentObjectWithFrames.action==CREATE_DOCUMENT && update && <React.Fragment>
                <div className="w-100 d-flex">
                    <p className="fw-bold text-muted w-100"><FaInfoCircle className="mr-2"/>{`JSON structure for type ${documentObjectWithFrames.type}`}</p>
                    {/*<button title={"Reset JSON structure"} type="button" className="btn btn-outline-light text-right float-right border-0" onClick={setResetView}>
						<BiReset size="1.6em"/>
					</button>*/}
                </div>
                <CodeMirror
                    value={json}
                    options={options}
                    onChange={(editor, data, value) => {
                        setValue(value)
                    }}
                />
                <Button className="btn-create-document-json btn btn-sm mt-2 float-right" variant="info" onClick={handleCreateDocument}>
                    <BiPlus className="mr-1"/>Create
                </Button>
            </React.Fragment>
        }
        {
            documentObjectWithFrames.action==EDIT_DOCUMENT && update && <React.Fragment>
                <div className="w-100 d-flex">
                    <p className="fw-bold text-muted w-100"><FaInfoCircle className="mr-2"/>{`Filled JSON structure for document ${documentObjectWithFrames.currentDocument}`}</p>
                    {/* <button title={"Reset JSON structure"} type="button" className="btn btn-outline-light text-right float-right border-0" onClick={setResetView}>
						<BiReset size="1.6em"/>
					</button>*/}
                </div>
                 <CodeMirror
                    value={json}
                    options={options}
                    onChange={(editor, data, value) => {
                        setValue(value)
                    }}
                />
                <Button className="btn btn-sm mt-2 float-right" variant="info" onClick={handleUpdateDocument}>
                    <BiEditAlt className="mr-1"/>Update
                </Button>
            </React.Fragment>
        }
    </React.Fragment>
}