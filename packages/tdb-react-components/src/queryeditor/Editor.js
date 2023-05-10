import React from "react";


import CodeMirror from "@uiw/react-codemirror"
//import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';

import {EDITOR_READ_OPTIONS, EDITOR_WRITE_OPTIONS} from "./constants.querypane"

export const CodeViewer = ({text, language, theme}) => {

    let cmoptions = EDITOR_READ_OPTIONS
    cmoptions.language = getCMLanguage(language)
    if(theme == "dark") cmoptions.theme = "shadowfox"
    if(language == "json"){
        cmoptions['json'] = true
        cmoptions['jsonld'] = true
    }
    return  <CodeMirror className="readOnly" 
                        extensions={[javascript()]} 
                        //theme={vscodeDark} 
                        value={ text }    
                onBlur={(editor, data) => {
                    setValue(editor.doc.getValue())
            }}/>
    //return (<CodeMirror value={ text } options={ cmoptions } className="readOnly" />)
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
        <CodeMirror className="qp-CodeMirror"
                        extensions={[javascript()]} 
                       // theme={vscodeDark} 
                        value={ text }    
                        onChange={(editor, data, value) => {
                            if(onChange) onChange(value);
                        }}
                        onBlur={(editor, data) => {
                            if(onBlur) onBlur(editor.doc.getValue());
                        }}/>
       
    )
}

/*
 <CodeMirror value={ text } options={ cmoptions } className="qp-CodeMirror"
            onChange={(editor, data, value) => {
                if(onChange) onChange(value);
            }}
            onBlur={(editor, data) => {
                if(onBlur) onBlur(editor.doc.getValue());
            }}
        />*/

function getCMLanguage(language){
    if(language == "python") return language
    if(language == "json") return "javascript"
    return "javascript"
}
