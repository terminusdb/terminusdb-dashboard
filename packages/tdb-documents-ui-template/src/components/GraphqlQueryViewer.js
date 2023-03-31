import React,{useState,useEffect,useRef} from "react";
import {FiCopy} from "react-icons/fi"
import {Button} from 'react-bootstrap'
//import 'codemirror/theme/ayu-dark.css'
import * as CodeMirror from 'codemirror';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';
import 'codemirror/addon/display/autorefresh.js'
// i have to fix this anbd update to codemiro 6
export const GraphqlQueryView = ({queryToDisplay,start,limit,orderBy,filterBy}) => {

    const variablesObj = {"offset":start,"limit":limit,"orderBy":orderBy || {} ,"filter":filterBy || {}}
    const textInput = useRef(null);
    const variables = useRef(null);

    const [textInputEditor,setTextInputEditor] = useState(null) 
    const [variablesEditor,setVariablesEditor] = useState(null) 

    useEffect(() => {
        // if the instance already exists we do not create it again
        if(textInputEditor && variablesEditor) return
        if(textInput && textInput.current && variables && variables.current ){
            const tmpEditor = CodeMirror.fromTextArea(textInput.current, {
                mode: 'graphql',
                height: "auto",
                readOnly:true,
                theme:"shadowfox",
                refresh:true,
                autoRefresh: true,
              }) 
          
            const tmpVariables = CodeMirror.fromTextArea(variables.current, {
                mode: 'json',
                height: "auto",
                theme:"shadowfox",
                autoRefresh: true,
                refresh:true,
                readOnly:true})
            setTextInputEditor( tmpEditor )
            setVariablesEditor( tmpVariables )       
        }
     },[variables.current]);


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