import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
require('codemirror/mode/css/css')
require('codemirror/mode/javascript/javascript')
import 'codemirror/theme/material-darker.css'
//import 'codemirror/addon/display/autorefresh.js'
import {PROGRESS_BAR_COMPONENT, TERMINUS_SUCCESS} from "./constants"
import {Loading} from "./Loading"
import {MODEL_BUILDER_EDITOR_OPTIONS} from "./constants"
import { BiUndo } from "react-icons/bi"
import {FaRegEdit} from 'react-icons/fa'
import {Alerts} from "./Alerts"
import {TERMINUS_DANGER,DOCUMENT_PREFIX} from "./constants"
import {GRAPH_TAB} from "../pages/constants"
import {GraphContextObj} from "@terminusdb-live/tdb-react-components"
import {CopyButton} from "./utils"
import Card from "react-bootstrap/Card"
import {BsSave} from "react-icons/bs"
import Stack from "react-bootstrap/Stack"

export const JSONModelBuilder = ({tab,saveGraph,accessControlEditMode, setReportMessage}) => {
    
    const {getSchemaGraph,mainGraphObj} = GraphContextObj();
    const {dataProduct} = WOQLClientObj()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [commitMsg, setCommitMessage]=useState("Add new schema")
    const [report, setReport]=useState(false)

    const [jsonSchema, setJsonSchema]=useState(false)

    const [editMode, setEditMode]=useState(false)
	const [value, setValue]=useState(false) 

    let branch = "main"
    let ref = ""

    const onBlurHandler = (value) =>{
        setValue(value)
    }

    async function getJSONSchema () {
        //get the schema from the mainGraphObj
        //the result is the schema in json format
        const resultJson = getSchemaGraph()// await woqlClient.getDocument(params, dataProduct)
        setJsonSchema(resultJson)
        setValue(resultJson)
    }
    
    useEffect(() => {
        if(tab == GRAPH_TAB) return
        setEditMode(false)
        getJSONSchema()
    }, [tab,dataProduct,mainGraphObj])

    


    MODEL_BUILDER_EDITOR_OPTIONS.readOnly=!editMode

    function handleCommitMessage (e) {
        setCommitMessage(e.target.value)
    }


    async function saveChange (){
        setLoading(<Loading message={"Updating schema"} type={PROGRESS_BAR_COMPONENT}/>)

        if(value) {
            try{
                //save change in the server
                await saveGraph(value, commitMsg)   
                setLoading(false)
                //setEditMode(false)
             
            }catch(err){
                let jsonError= JSON.parse(JSON.stringify(err))
                setLoading(false)
                if(jsonError.data && jsonError.data["api:message"]) {
                    setReport(<Alerts message={jsonError.data["api:message"]} type={TERMINUS_DANGER}/>)
                }
                else setReport(<Alerts message={err.toString()} type={TERMINUS_DANGER}/>) 
            }       
        }
    }

    function handleUndo () {
        // sets report messagen from modelCallServerHook to false
        if(setReportMessage) setReportMessage(false)
        setEditMode(false); 
        getJSONSchema();
    }

    const editStyle = editMode ? {className:"border rounded border-warning position-sticky"} : {}
    const editMessage = editMode ? "Save schema or you will lose your changes" : ""
    
    //console.log("editMode", editMode)
    return <>
        <label className="text-warning mt-4">{editMessage}</label>
        <Card className={`border border-secondary mt-4`} {...editStyle}>
            {loading && loading} 
            <Card.Header>
                <Stack direction="horizontal" className="w-100 justify-content-end">
                    {editMode && <div className="w-100">
                        <div role="group" className="btn-group w-100">
                            <div className="col-md-10 pr-0 pl-0">
                                <input id="schema_save_description" placeholder={"Enter a description to tag update"} type="text" className="form-control" onBlur={handleCommitMessage}/>
                            </div>
                            <button  type="button" id="schema_save_button" className="btn btn-sm bg-light text-dark" onClick={saveChange}>
                                <BsSave className="small"/> {"Save"}
                            </button>
                            <button  type="button" 
                                title="Undo changes"
                                className="btn btn-sm bg-danger text-white mr-2" onClick={()=>{ handleUndo() }}>
                                <BiUndo className="h5"/> {"Undo"}
                            </button>
                        </div>
                    </div>
                    }
                    {accessControlEditMode && !editMode &&
                        <button  type="button" className="btn-edit-json-model btn btn-md btn-light text-dark float-right mr-2" 
                            onClick={()=>{setEditMode(true)}}>
                            <FaRegEdit className="mb-1"/> Edit Schema
                        </button>
                    }
                    <CopyButton text={jsonSchema} 
                        label={""}
                        title={`Copy JSON schema`} 
                        css={"btn btn-md bg-light text-dark float-right"}/>
                </Stack>
            </Card.Header>
            <div className="h-100">
                {report && <span className="w-100 m-4">{report}</span>}
                <CodeMirror  
                    onBlur={(editor, data) => {
                        const editorValue =editor.doc.getValue()
                        onBlurHandler(editorValue)
                    }}
                    value={value}
                    options={MODEL_BUILDER_EDITOR_OPTIONS}
                    className="model-builder-code-mirror"
                />
                {/*<div><pre>{schema}</pre></div>*/}
            </div>
        </Card>
    </>
}
