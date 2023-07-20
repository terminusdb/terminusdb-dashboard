import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { json } from '@codemirror/lang-json';
import { EditorView } from "@codemirror/view";

import {PROGRESS_BAR_COMPONENT, TERMINUS_SUCCESS} from "./constants"
import {Loading} from "./Loading"
import {Alert, Button} from "react-bootstrap"
import {MODEL_BUILDER_EDITOR_OPTIONS} from "./constants"
import { BiUndo } from "react-icons/bi"
import {FaRegEdit} from 'react-icons/fa'
import {TERMINUS_DANGER,DOCUMENT_PREFIX} from "./constants"
import {GRAPH_TAB} from "../pages/constants"
import {GraphContextObj} from "@terminusdb-live/tdb-react-components"
import {CopyButton} from "./utils"
import Card from "react-bootstrap/Card"
import {BsSave} from "react-icons/bs"
import Stack from "react-bootstrap/Stack"
import {modelCallServerHook, SaveBarHeaderTools} from "@terminusdb-live/tdb-react-components"
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
        if(tab == GRAPH_TAB) return
        loadSchema()
    }, [tab,dataProduct,mainGraphObj])

    

    //MODEL_BUILDER_EDITOR_OPTIONS.readOnly=!editMode

    function handleCommitMessage (e) {
        setCommitMessage(e.target.value)
    }

    function handleEdit () {
        setEditMode(Date.now())
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

    function handleSave(e) {
        saveGraph()
    }

    function handleReset(e) {
        loadSchema() 
    }


    const editStyle = editMode ? {className:"border rounded border-warning position-sticky"} : {}
    const editMessage = editMode ? "Save schema or you will lose your changes" : ""
    const copyButtonCss = "text-light btn btn-lg bg-transparent border-light text-light float-right btn btn-lg btn-transparent"
    
    //console.log("editMode", editMode)
    return <div className="ml-5">
        <label className="text-warning  mt-3 fst-italic fw-bold">{editMessage}</label>
        {reportMessage && <ErrorMessageReport error={reportMessage} setError={setReport}/>}
       
        <Card {...editStyle}>
             {loading && <Loading message={"Updating schema"}/>}       
            <Card.Header>
                <Stack direction="horizontal" className="w-100 justify-content-start">
                    {editMode && <SaveBarHeaderTools saveData={handleSave} 
                        handleReset={ handleReset }
                        displayDelete={false}/>}
                    {accessControlEditMode && !editMode &&
                        <Button className="btn-edit-json-model btn btn-md btn-light text-dark float-right mr-2" 
                            onClick={handleEdit}>
                            <FaRegEdit className="mb-1"/> Edit Schema
                        </Button>
                    }
                    <CopyButton text={jsonSchema} 
                        label={""}
                        title={`Copy JSON schema`} 
                        css={editMode ? `mt-3 ml-2 ${copyButtonCss}` : `ms-auto ${copyButtonCss}`}/>
                </Stack>
            </Card.Header>
            <Card.Body>
                <CodeMirror  
                    onChange={onChangeHandler}
                    readOnly={!editMode}
                    value={value || ""}
                    extensions={[json(),EditorView.lineWrapping]} 
                    theme={vscodeDark} 
                    className="model-builder-code-mirror"
                />
            </Card.Body>
        </Card>
    </div>
}
