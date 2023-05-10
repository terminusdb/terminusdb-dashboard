import React,{useState} from "react";

import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
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
                        readOnly={true}
                        extensions={[javascript()]} 
                        theme={vscodeDark} 
                        value={ text }/>
    //return (<CodeMirror value={ text } options={ cmoptions } className="readOnly" />)
}

export const CodeEditor = ({text, language, onChange, onBlur, theme}) => {
    const [value,setValue] = useState(text || "")
    
    const onChangeHandler = React.useCallback((value, viewUpdate) => {
        setValue(value)
    }, []);

    return (
        <CodeMirror className="qp-CodeMirror"
                    height="400px"
                        extensions={[javascript()]} 
                        theme={vscodeDark} 
                        value={ value }    
                        onChange={onChangeHandler}
                        onBlur={() => {
                            if(onBlur) onBlur(value);
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
