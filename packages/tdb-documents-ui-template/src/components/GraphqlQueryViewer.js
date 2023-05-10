import React,{useState,useEffect,useRef} from "react";
import {FiCopy} from "react-icons/fi"
import {Button} from 'react-bootstrap'
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import {copyToClipboard} from "../utils"
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
// i have to fix this anbd update to codemiro 6
export const GraphqlQueryView = ({queryToDisplay,start,limit,orderBy,filterBy}) => {

    const variablesObj = {"offset":start,"limit":limit,"orderBy":orderBy || {} ,"filter":filterBy || {}}
   
    const [textInputEditor,setTextInputEditor] = useState(null) 
    const [variablesEditor,setVariablesEditor] = useState(null) 

    const QLEDITOR_READ_OPTIONS = {
        mode: 'graphql',
        height: "auto",
        readOnly:true,
        theme:"shadowfox",
        refresh:true,
        autoRefresh: true,
    }

    const QLVAR_READ_OPTIONS = {
        mode: 'json',
        height: "auto",
        theme:"shadowfox",
        autoRefresh: true,
        refresh:true,
        readOnly:true
    }

     const copyTest = (text)=>{
        copyToClipboard(text);
    }

   return <React.Fragment>
            <div className="d-flex justify-content-end mr-2">
                <Button title = "copy grapl query" onClick={()=>{copyTest(queryToDisplay)}}><FiCopy/></Button>
            </div> 
            <CodeMirror extensions={[javascript()]} theme={vscodeDark} value={queryToDisplay}      className="readOnly"/>
            
            <hr></hr>
            <div className="d-flex justify-content-end mr-2">
                <Button title ="copy variables"  onClick={()=>{copyTest(variablesObj)}}><FiCopy/></Button>
            </div>  
            <CodeMirror extensions={[json()]}  theme={vscodeDark} value={JSON.stringify(variablesObj,null,4)}   className="readOnly"/>
            
         </React.Fragment>
}
    