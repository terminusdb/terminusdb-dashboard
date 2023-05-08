import React,{useState,useEffect,useRef} from "react";
import {FiCopy} from "react-icons/fi"
import {Button} from 'react-bootstrap'
require('codemirror/lib/codemirror.css');
require('codemirror/theme/shadowfox.css');
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';
import 'codemirror/addon/display/autorefresh.js'
import {UnControlled as CodeMirror} from 'react-codemirror2';
import {copyToClipboard} from "../utils"
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
            <CodeMirror value={queryToDisplay}    options={QLEDITOR_READ_OPTIONS}  className="readOnly"/>
            
            <hr></hr>
            <div className="d-flex justify-content-end mr-2">
                <Button title ="copy variables"  onClick={()=>{copyTest(variablesObj)}}><FiCopy/></Button>
            </div>  
            <CodeMirror value={JSON.stringify(variablesObj,null,4)}  options={QLVAR_READ_OPTIONS}  className="readOnly"/>
            
         </React.Fragment>
}
    