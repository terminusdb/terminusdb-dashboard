import React from "react";
require('codemirror/lib/codemirror.css');
require('codemirror/theme/eclipse.css');
require('codemirror/theme/shadowfox.css');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/mode/python/python.js');
import {UnControlled as CodeMirror} from 'react-codemirror2';
import {EDITOR_READ_OPTIONS, EDITOR_WRITE_OPTIONS} from "./constants.querypane"

export const CodeViewer = ({text, language, theme}) => {

    let cmoptions = EDITOR_READ_OPTIONS
    cmoptions.language = getCMLanguage(language)
    if(theme == "dark") cmoptions.theme = "shadowfox"
    if(language == "json"){
        cmoptions['json'] = true
        cmoptions['jsonld'] = true
    }

    return (<CodeMirror value={ text } options={ cmoptions } className="readOnly"/>)
}

export const CodeEditor = ({text, language, onChange, onBlur, theme}) => {
    function getThemeForEditor(lang){
        return "eclipse"
    }

    let cmoptions = EDITOR_WRITE_OPTIONS
    cmoptions.language = getCMLanguage(language)
    if(theme == "dark") cmoptions.theme ="shadowfox"
    if(language == "json"){
        cmoptions['json'] = true
        cmoptions['jsonld'] = true
    }

    

    return (
        <CodeMirror value={ text } options={ cmoptions } className="qp-CodeMirror"
            onChange={(editor, data, value) => {
                if(onChange) onChange(value);
            }}
            onBlur={(editor, data) => {
                if(onBlur) onBlur(editor.doc.getValue());
            }}
        />
    )
}

function getCMLanguage(language){
    if(language == "python") return language
    if(language == "json") return "javascript"
    return "javascript"
}
