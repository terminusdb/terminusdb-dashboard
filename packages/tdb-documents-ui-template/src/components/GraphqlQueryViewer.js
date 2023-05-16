import React,{useState,useEffect,useRef} from "react";
import {FiCopy} from "react-icons/fi"
import {Button} from 'react-bootstrap'
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from "@codemirror/view";
import {copyToClipboard} from "../utils"
import { json } from '@codemirror/lang-json';
// i have to fix this anbd update to codemiro 6
export const GraphqlQueryView = ({queryToDisplay,start,limit,queryFilters,queryOrders}) => {

    const variablesObj = {"offset":start,"limit":limit,"orderBy":queryOrders || {} ,"filter":queryFilters || {}}

     const copyTest = (text)=>{
        copyToClipboard(text);
    }

    const basicSetup = {EditorView:{
        lineNumbers: true,
        lineWrapping: true,
        indentWithTabs: false}
    }

    //console.log("JAVASCRIPT TYPE", typeof javascript)
    //console.log("EditorView.lineWrapping TYPE", typeof EditorView.lineWrapping)

   //EditorView.lineWrapping()
   return <React.Fragment>
            <div className="d-flex justify-content-end mr-2">
                <Button title = "copy grapl query" onClick={()=>{copyTest(queryToDisplay)}}><FiCopy/></Button>
            </div> 
            <CodeMirror 
                basicSetup={basicSetup}
                readOnly={true}
                theme={vscodeDark}
                //extensions={[javascript(),EditorView.lineWrapping]} 
                value={queryToDisplay}      
                className="readOnly"/>
            
            <hr></hr>
            <div className="d-flex justify-content-end mr-2">
                <Button title ="copy variables"  onClick={()=>{copyTest(variablesObj)}}><FiCopy/></Button>
            </div>  
            <CodeMirror 
                minHeight="150px"
                indentWithTab={false}
                readOnly={true}
                theme={vscodeDark}
                //extensions={[json(),EditorView.lineWrapping]}  
                value={JSON.stringify(variablesObj,null,4)}   
                className="readOnly"/>
            
         </React.Fragment>
}



/*

export const EDITOR_READ_OPTIONS = {
    noHScroll: false,
    readOnly: true,
    lineNumbers: true,
    lineWrapping: true,
    indentWithTabs: false,
    tabSize: 2,
    theme: "eclipse",
    viewportMargin: Infinity,
}*/
    