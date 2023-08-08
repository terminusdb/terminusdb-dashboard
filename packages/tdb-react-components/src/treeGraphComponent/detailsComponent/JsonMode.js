import React,{useState,useEffect, Fragment} from 'react';
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { json } from '@codemirror/lang-json';
import { SaveBarHeaderTools } from "./SaveBarHeaderTools"
import {AiOutlineCloseCircle, AiOutlineEdit, AiOutlineSave} from "react-icons/ai"
import {FaRegEdit} from 'react-icons/fa'

import {GraphContextObj} from '../hook/graphObjectContext'

export const JsonMode = (props)=>{	
	const {mainGraphObj,updateGraphNode} = GraphContextObj()
	const nodeData =props.nodeData || {}
	const jsonSchema = nodeData.schema || {}
	
	const [value, setValue]=useState(JSON.stringify(jsonSchema, null, 2)) // sets value from editor 
	const [editMode, setEditMode]=useState(false)

	const handleSave = () => {
		nodeData.schema=JSON.parse(value)
		nodeData.needToSave=true;
		setEditMode(false)
		updateGraphNode()
		if(props.saveData) props.saveData()
	}

	const onChangeHandler = React.useCallback((value, viewUpdate) => {
		setValue(value);
	}, []);

	return <React.Fragment>
		<>
			{editMode && <SaveBarHeaderTools 
				saveData={handleSave}
				//saveData={props.saveData} 
				//hasConstraints={args.hasConstraints} 
				elementId={props.nodeData.name}
				nodeJsonData={props.nodeData}
				displayDelete={true}
				removeElement={props.removeElement}/>}
			 {!editMode && <button  type="button" className="btn btn-light btn-sm border-0 my-3" 
			 	onClick={()=>{setEditMode(true)}}>
					Edit JSON Schema
				</button>}
			</>
			<div className='w-100 mt-3'>
        <CodeMirror extensions={[json()]} 
					theme={vscodeDark} 
					value={JSON.stringify(jsonSchema, null, 2)}     
					readOnly={!editMode}
					onChange={onChangeHandler}/>
      </div>
	</React.Fragment>

    
}

/**
 * return <React.Fragment>
        <div className="tdb__panel__bar">
				<div role="group" className="btn-group w-100">
                    { editMode &&
                        <SaveBarHeaderTools 
                            saveData={handleSave}
                            //saveData={props.saveData} 
                            //hasConstraints={args.hasConstraints} 
                            elementId={props.nodeData.name}
                            nodeJsonData={props.nodeData}
                            displayDelete={true}
                            removeElement={props.removeElement}/>
                    }
                    {/*editMode &&
                        <Fragment>
                            <button  type="button" className="btn btn-light btn-sm border-0" onClick={saveChange}>
                                <AiOutlineSave/> Save Changes
                            </button>
                            <button  type="button" className="btn btn-light btn-sm border-0" onClick={()=>{setEditMode(false)}}>
                                <AiOutlineCloseCircle/> Close
                            </button>
                        </Fragment>
                    *//*} 
                    {!editMode &&
											<button  type="button" className="btn btn-light btn-sm border-0 my-3" onClick={()=>{setEditMode(true)}}>
													Edit JSON Schema
											</button>
																}
									</div>
										</div>
										<div className='w-100 mt-3'>
												<CodeMirror extensions={[json()]} 
														theme={vscodeDark} 
														value={JSON.stringify(jsonSchema, null, 2)}     
														readOnly={!editMode}
														onChange={onChangeHandler}/>
										</div>
										
								</React.Fragment>
 */
/*const saveChange = ()=>{
        nodeData.schema=JSON.parse(value)
        nodeData.needToSave=true;
        setEditMode(false)
        updateGraphNode()
    } */