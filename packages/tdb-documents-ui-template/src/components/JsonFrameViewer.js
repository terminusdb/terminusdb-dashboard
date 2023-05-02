import React, {useState, useEffect} from "react"
import * as CONST from "./constants"
import {Button,Alert} from "react-bootstrap"
import { UnControlled as CodeMirror } from "react-codemirror2";

export const JsonFrameViewer = ({type, jsonData, mode, setExtracted}) => {
    const [data, setData]=useState(false) 
    const [error,setError] = useState(false)

    useEffect(() => {
        if(jsonData) setData(jsonData)
    }, [jsonData])
    
    let cmOptions={
        //gutters: ["CodeMirror-lint-markers"],
        mode: "application/ld+json",
        theme: "material-darker",
        lineNumbers: true,
        lineWrapping: true,
        //lint: true,
        matchBrackets: true, 
        autoCloseBrackets: true,
        height: "auto", 
        //viewportMargin: Infinity,
        indentWithTabs: true,
        tabSize: 2,
        //extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        placeholder: `Start adding a JSON document of type ${type}...`,
        readOnly: mode===CONST.VIEW_DOCUMENT ? true : false
    }

    function handleSubmit(data) {
        if(setExtracted) setExtracted(data)
    }

    const onBlurHandler = (value) =>{
        try{
            const parsedData = JSON.parse(value)
            setData(parsedData)
        }catch(err){
            setError(err.message)
        }
    }
    
    // onBlur 
    return <React.Fragment>
        {error && <Alert variant="light" onClose={() => setError(false)} dismissible>
                Syntax Error: {error} </Alert>}
            
        <CodeMirror 
            value={JSON.stringify(data || {}, null, 2)}
            options={cmOptions}
            className={"document__interface__main"}
            onBlur={(editor, data, value) => {
                const editorValue =editor.doc.getValue()
                onBlurHandler(editorValue)
            }}
        />
        {mode!==CONST.VIEW_DOCUMENT &&
            <Button className="btn mt-2 float-left" variant="info" onClick={(e) => handleSubmit(data)}>
                {"Submit"}
            </Button>
        }
    </React.Fragment>
}