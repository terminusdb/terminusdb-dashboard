import React,{useState,useEffect,useRef} from "react";
import {FiCopy} from "react-icons/fi"
import {Button} from 'react-bootstrap'
import 'codemirror/theme/ayu-dark.css'
import CodeMirror from 'codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';
import 'codemirror/addon/display/autorefresh.js'

export const GraphqlQueryView = ({queryToDisplay,start,limit,orderBy,filterBy}) => {

    const variablesObj = {"offset":start,"limit":limit,"orderBy":orderBy || {} ,"filter":filterBy || {}}
    const textInput = useRef(null);
    const variables = useRef(null);

    let textInputEditor = null 
    let variablesEditor = null

    useEffect(() => {
        if(textInput && textInput.current ){
            textInputEditor = CodeMirror.fromTextArea(textInput.current, {
                mode: 'graphql',
                height: "auto",
                readOnly:true,
                theme:"shadowfox",
                refresh:true,
                autoRefresh: true,
              });     
        }
        if(variables && variables.current){
            variablesEditor = CodeMirror.fromTextArea(variables.current, {
                mode: 'json',
                height: "auto",
                theme:"shadowfox",
                autoRefresh: true,
                refresh:true,
                readOnly:true
              });     
        }
     },[textInput.current,variables.current]);


     const copyTest = (editor)=>{
        navigator.clipboard.writeText(editor.getValue());
    }

   return <React.Fragment>
            <div className="d-flex justify-content-end mr-2">
                <Button title = "copy grapl query" onClick={()=>{copyTest(textInputEditor)}}><FiCopy/></Button>
            </div>              
            <textarea readOnly key="textInput" id="textInput" ref={textInput} value={queryToDisplay}></textarea>                       
            
            <hr></hr>
            <div className="d-flex justify-content-end mr-2">
                <Button title ="copy variables"  onClick={()=>{copyTest(variablesEditor)}}><FiCopy/></Button>
            </div>  
            <textarea readOnly  key="variables" id="variables" ref={variables} value={JSON.stringify(variablesObj,null,4)}></textarea>
        </React.Fragment>
}