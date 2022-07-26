import React,{useState,useEffect, Fragment} from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
require('codemirror/mode/css/css')
require('codemirror/mode/javascript/javascript')
import {AiOutlineCloseCircle, AiOutlineEdit, AiOutlineSave} from "react-icons/ai"
import {FaRegEdit} from 'react-icons/fa'

export const EDITOR_OPTIONS = {
    theme: "ayu-dark",
    height: "auto",
    viewportMargin: Infinity,
    mode: {
      name: "javascript",
      json: true,
      statementIndent: 2
    },
    lineNumbers: true,
    lineWrapping: true,
    indentWithTabs: false,
    tabSize: 2,
    readOnly:true
}

import {GraphContextObj} from '../hook/graphObjectContext'

export const JsonMode = (props)=>{	
    const {mainGraphObj,updateGraphNode} = GraphContextObj()
    const nodeData =props.nodeData || {}
    const jsonSchema = nodeData.schema || {}
    
    const [value, setValue]=useState(JSON.stringify(jsonSchema, null, 2)) // sets value from editor 
    const [editMode, setEditMode]=useState(false)

    EDITOR_OPTIONS.readOnly=!editMode

    const saveChange = ()=>{
        nodeData.schema=JSON.parse(value)
        nodeData.needToSave=true;
        setEditMode(false)
        updateGraphNode()
    }

    return <React.Fragment>
        <div className="tdb__panel__bar">
       
				<div role="group" className="btn-group">
                    {editMode &&
                        <Fragment>
                            <button  type="button" className="btn btn-outline-light btn-lg border-0" onClick={saveChange}>
                                <AiOutlineSave/>
                            </button>
                            <button  type="button" className="btn btn-outline-light btn-lg border-0" onClick={()=>{setEditMode(false)}}>
                                <AiOutlineCloseCircle/>
                            </button>
                        </Fragment>
                    }
                    {!editMode &&
					<button  type="button" className="btn btn-outline-light btn-lg border-0" onClick={()=>{setEditMode(true)}}>
						<FaRegEdit/>
					</button>
                    }
			</div>
        </div>
        <CodeMirror           
            onBlur={(editor, data) => {
                setValue(editor.doc.getValue())
            }}
            value={JSON.stringify(jsonSchema, null, 2)}
            options={EDITOR_OPTIONS}
        />
    </React.Fragment>

}