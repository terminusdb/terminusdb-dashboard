import React,{useState,useEffect,useRef} from "react";
import {FiCopy} from "react-icons/fi"
import {Button} from 'react-bootstrap'
//import 'codemirror/theme/ayu-dark.css'
//import CodeMirror from 'codemirror';
//import CodeMirror from 'codemirror/lib/codemirror.js';
//import 'codemirror/addon/hint/show-hint';
//import 'codemirror/addon/lint/lint';
//import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';
import 'codemirror/addon/display/autorefresh.js'
import {UnControlled as CodeMirror} from 'react-codemirror2';
import {copyToClipboard} from "../utils"
// i have to fix this anbd update to codemiro 6
export const GraphqlQueryView = ({queryToDisplay,start,limit,orderBy,filterBy}) => {

    const variablesObj = JSON.stringify({"offset":start,"limit":limit,"orderBy":orderBy || {} ,"filter":filterBy || {}},null,4)

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
            <CodeMirror value={queryToDisplay}    options={QLEDITOR_READ_OPTIONS}  className="readOnly"/>
            
            <hr></hr>
            <div className="d-flex justify-content-end mr-2">
                <Button title ="copy variables"  onClick={()=>{copyTest(variablesObj)}}><FiCopy/></Button>
            </div>  
            <CodeMirror value={variablesObj}  options={QLVAR_READ_OPTIONS}  className="readOnly"/>
            
         </React.Fragment>
}
    
