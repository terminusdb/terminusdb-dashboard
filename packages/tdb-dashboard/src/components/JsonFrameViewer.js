import React, {useState} from "react"
import * as CONST from "./constants"
import Button from "react-bootstrap/Button"
import { UnControlled as CodeMirror } from "react-codemirror2";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-darker.css'
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/lint/javascript-lint';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/hint/javascript-hint';
//import { JSHINT } from 'jshint';
//window.JSHINT = JSHINT;
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/show-hint.css'; // without this css hints won't show
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/markdown-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/display/placeholder.js'
import {useParams} from "react-router-dom"

function displayJson(json) {
    if(json) return JSON.stringify(json, null, 2)
    return false
}

export const JsonFrameViewer = ({jsonData, mode, setExtracted}) => {

    const [value, setValue]=useState(displayJson(jsonData))
    const {type} = useParams()
    
    let cmOptions={
        gutters: ["CodeMirror-lint-markers"],
        mode: "application/ld+json",
        theme: "material-darker",
        lineNumbers: true,
        lineWrapping: true,
        lint: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        height: "auto", 
        viewportMargin: Infinity,
        indentWithTabs: true,
        tabSize: 2,
        //extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
        //foldGutter: true,
        //gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        placeholder: `Start adding a JSON document of type ${type}...`,
        readOnly: mode===CONST.VIEW_DOCUMENT ? true : false
    }

    function handleSubmit(data) {
        if(setExtracted) setExtracted(data)
    }

    return <React.Fragment>
        <CodeMirror
            value={value}
            options={cmOptions}
            onChange={(editor, data, value) => {
                setValue(value)
            }}
        />
        <Button className="btn btn-sm mt-2 float-left" variant="info" onClick={(e) => handleSubmit(value)}>
            {"Submit"}
        </Button>
    </React.Fragment>

}