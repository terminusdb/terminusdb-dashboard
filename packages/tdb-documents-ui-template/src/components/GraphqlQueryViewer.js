import React,{useState,useEffect,useRef} from "react";
import {FiCopy} from "react-icons/fi"
import {Button} from 'react-bootstrap'
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import {copyToClipboard} from "../utils"
import { json } from '@codemirror/lang-json';
// i have to fix this anbd update to codemiro 6
export const GraphqlQueryView = ({queryToDisplay,start,limit,orderBy,filterBy}) => {

    const variablesObj = {"offset":start,"limit":limit,"orderBy":orderBy || {} ,"filter":filterBy || {}}

     const copyTest = (text)=>{
        copyToClipboard(text);
    }

   return <React.Fragment>
            <div className="d-flex justify-content-end mr-2">
                <Button title = "copy grapl query" onClick={()=>{copyTest(queryToDisplay)}}><FiCopy/></Button>
            </div> 
            <CodeMirror 
                readOnly={true}
                theme={vscodeDark}
                extensions={[javascript()]} 
                value={queryToDisplay}      
                className="readOnly"/>
            
            <hr></hr>
            <div className="d-flex justify-content-end mr-2">
                <Button title ="copy variables"  onClick={()=>{copyTest(variablesObj)}}><FiCopy/></Button>
            </div>  
            <CodeMirror 
                readOnly={true}
                theme={vscodeDark}
                extensions={[json()]}  
                value={JSON.stringify(variablesObj,null,4)}   
                className="readOnly"/>
            
         </React.Fragment>
}
    