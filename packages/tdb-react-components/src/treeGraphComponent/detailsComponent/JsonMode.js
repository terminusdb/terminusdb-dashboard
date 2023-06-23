import React,{useState,useEffect, Fragment} from 'react';
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { json } from '@codemirror/lang-json';

import {AiOutlineCloseCircle, AiOutlineEdit, AiOutlineSave} from "react-icons/ai"
import {FaRegEdit} from 'react-icons/fa'

import {GraphContextObj} from '../hook/graphObjectContext'

export const JsonMode = (props)=>{	
    const {mainGraphObj,updateGraphNode} = GraphContextObj()
    const nodeData =props.nodeData || {}
    const jsonSchema = nodeData.schema || {}
    
    const [value, setValue]=useState(JSON.stringify(jsonSchema, null, 2)) // sets value from editor 
    const [editMode, setEditMode]=useState(false)

    const saveChange = ()=>{
        nodeData.schema=JSON.parse(value)
        nodeData.needToSave=true;
        setEditMode(false)
        updateGraphNode()
    }

    const onChangeHandler = React.useCallback((value, viewUpdate) => {
        setValue(value);
      }, []);

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
        <div className='w-100'><CodeMirror extensions={[json()]} 
                theme={vscodeDark} 
                value={JSON.stringify(jsonSchema, null, 2)}     
                readOnly={!editMode}
                onChange={onChangeHandler}/></div>
        
    </React.Fragment>
}