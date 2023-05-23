import React from "react";
import {FiCopy} from "react-icons/fi"
import {Button} from 'react-bootstrap'
import CodeMirror from "@uiw/react-codemirror"
import { okaidia } from "@uiw/codemirror-theme-okaidia"
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from "@codemirror/view";
import {copyToClipboard} from "../utils"
import { json } from '@codemirror/lang-json';
// i have to fix this anbd update to codemiro 6
export const GraphqlQueryView = ({queryToDisplay,start,limit,queryFilters,queryOrders}) => {

    const variablesObj = JSON.stringify({"offset":start,"limit":limit,"orderBy":queryOrders || {} ,"filter":queryFilters || {}},null,4)

     const copyTest = (text)=>{
        copyToClipboard(text);
    }

    const basicSetup = {EditorView:{
        lineNumbers: true,
        lineWrapping: true,
        indentWithTabs: false}
    }

   return <React.Fragment>
            <div className="d-flex justify-content-end mr-2">
                <Button title = "copy grapl query" onClick={()=>{copyTest(queryToDisplay)}}><FiCopy/></Button>
            </div> 
            <CodeMirror 
                basicSetup={basicSetup}
                readOnly={true}
                theme={okaidia}
                extensions={[javascript(),EditorView.lineWrapping]} 
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
                theme={okaidia}
                extensions={[json(),EditorView.lineWrapping]}  
                value={variablesObj}   
                className="readOnly"/>
            
         </React.Fragment>
}
    
