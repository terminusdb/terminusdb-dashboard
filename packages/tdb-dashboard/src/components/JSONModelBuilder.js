import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { json } from '@codemirror/lang-json';
import { EditorView } from "@codemirror/view";

import {PROGRESS_BAR_COMPONENT, TERMINUS_SUCCESS} from "./constants"
import {Loading} from "./Loading"
import {Alert} from "react-bootstrap"
import {MODEL_BUILDER_EDITOR_OPTIONS} from "./constants"
import { BiUndo } from "react-icons/bi"
import { BsSave } from "react-icons/bs"
import {FaRegEdit, FaSave} from 'react-icons/fa'
import {TERMINUS_DANGER,DOCUMENT_PREFIX} from "./constants"
import {GRAPH_TAB, DOCUMENT_TAB} from "../pages/constants"
import {GraphContextObj} from "@terminusdb-live/tdb-react-components"
import {CopyButton} from "./utils"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Stack from "react-bootstrap/Stack"
import {modelCallServerHook} from "@terminusdb-live/tdb-react-components"
import {ErrorMessageReport} from "../components/ErrorMessageReport"

// we moved the save data at this level or we lost our change if there is an error
export const JSONModelBuilder = ({tab,accessControlEditMode}) => {
    
    const {getSchemaGraph,mainGraphObj,updateMainGraphData} = GraphContextObj();
    const {dataProduct,woqlClient} = WOQLClientObj()
   // const [loading, setLoading] = useState(false)
    const [commitMsg, setCommitMessage]=useState("Add new schema")
    
    const [jsonSchema, setJsonSchema]=useState(false)

    const [editMode, setEditMode]=useState(false)
	const [value, setValue]=useState(false) 

    let branch = "main"
    let ref = ""
 

    const {saveGraphChanges,
        reportMessage,  
        setReport,
        callServerLoading:loading,
    } = modelCallServerHook(woqlClient, branch, ref,dataProduct)
    

    const onChangeHandler = React.useCallback((value, viewUpdate) => {
        setValue(value);
      }, []);


    async function loadSchema () {
        setEditMode(false); 
        setReport(false)
        //get the schema from the mainGraphObj
        //the result is the schema in json format
        const resultJson = await getSchemaGraph()// await woqlClient.getDocument(params, dataProduct)
        setJsonSchema(resultJson)
        setValue(resultJson)
    }
    
    useEffect(() => {
        if(tab === GRAPH_TAB) return
        if(tab === DOCUMENT_TAB) return
        loadSchema()
    }, [tab,dataProduct,mainGraphObj])

    

    //MODEL_BUILDER_EDITOR_OPTIONS.readOnly=!editMode

    function handleCommitMessage (e) {
        setCommitMessage(e.target.value)
    }


    async function saveGraph (){
        if(value) {
            const result = await saveGraphChanges(value, commitMsg)
            if(result){
                const resultJson = JSON.stringify(result,null,4)
                updateMainGraphData(result)
                setJsonSchema(resultJson)
                setValue(resultJson)
                setEditMode(false); 
            }   
        }
    }

    const editStyle = editMode ? {className:"border rounded border-warning position-sticky"} : {}
    const editMessage = editMode ? "Save schema or you will lose your changes" : ""

    const ToolButtons = ({ id, title, onClick, icon}) => {
        return 	<Button title={title}
            id={id}
            type="button" 
            variant="light"
            className="btn-lg border border-light bg-transparent"
            onClick={onClick}>
                {icon}
        </Button>
    }

    function handleEditMode() {
        setEditMode(true)
    }
    
    //console.log("editMode", editMode) 
    return <>
        <label className="text-warning mt-4">{editMessage}</label>
        {reportMessage && <ErrorMessageReport error={reportMessage} setError={setReport}/>}
       
        <Card className={`border border-secondary mr-5`} {...editStyle}>
            {loading && <Loading message={"Updating schema"} type={PROGRESS_BAR_COMPONENT}/>}       
            <Card.Header>
                <Stack direction='horizontal' gap={2} className={` w-100 justify-content-end`}>
                    {editMode && <>
                        <input id="schema_save_description" 
                            data-cy="schema_save_description" 
                            placeholder={"Enter a description to tag update"} 
                            type="text" 
                            className="form-control border border-light" 
                            onBlur={handleCommitMessage}/>
                        <ToolButtons title={`Save`}
                            id="schema_save_button"
                            onClick={(e) => saveGraph()}
                            icon={<FaSave size="26" className="h2 text-light"/>}/>
                        <ToolButtons title={`Undo`}
                            id="schema_reset_button"
                            onClick={ (e) => loadSchema() }
                            icon={<BiUndo size="26" className="h2 text-light"/>}/>
                    </>}
                    {accessControlEditMode && !editMode &&
                        <button  type="button" className="btn-edit-json-model btn btn-md btn-light text-dark float-right mr-2" 
                            onClick={handleEditMode}>
                            <FaRegEdit className="mb-1"/> Edit Schema
                        </button>
                    }
                    <CopyButton text={jsonSchema} 
                        label={""}
                        title={`Copy JSON schema`} 
                        css={`btn ${editMode ? `btn-lg` : `btn-md`}  bg-transparent text-light border border-light float-right`}/>
                </Stack>
                
            </Card.Header>
            <div className="h-100">
                <CodeMirror  
                    onChange={onChangeHandler}
                    readOnly={!editMode}
                    value={value || ""}
                    extensions={[json(),EditorView.lineWrapping]} 
                    theme={vscodeDark} 
                    className="model-builder-code-mirror"
                />
            </div>
        </Card>
    </>
}
