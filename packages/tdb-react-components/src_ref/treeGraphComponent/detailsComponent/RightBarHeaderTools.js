import React, {useState,useRef} from 'react';
import {AiOutlineSave,AiOutlineReload} from "react-icons/ai"
import {TOOLBAR_LABELS} from '../../constants/details-labels';
import {GraphContextObj} from '../hook/graphObjectContext';

export const RightBarHeaderTools =(props)=>{
    const {resetTreeModel} = GraphContextObj();
    const [commitMessage,setCommitMessage]=useState('');

    const commitInput = useRef(null);
	
    const handleCommitMessage=(evt)=>{
		const value=evt.currentTarget.value
		setCommitMessage(value)
	}


	const handleSave=()=>{
		props.saveData(commitMessage)
		setCommitMessage('')
        if(commitInput)commitInput.current.value=''
	}

    const handleReset=()=>{
        //we have to add an alert
        window.confirm("If you continue, you'll lose the schema's changes") &&
		resetTreeModel()
    }

	return (<div className="flex-grow-1 d-flex align-item-center pt-2 pb-2 bg-dark pl-3" style={{marginTop:'1px',marginBottom:'2px'}}>
            <div className="mr-3 flex-grow-1">
                <input ref={commitInput} 
                    placeholder={TOOLBAR_LABELS.CommitLabel} 
                    type="text" 
                    id="schema_save_description"
                    className="form-control" onBlur={handleCommitMessage}/>
            </div>
            <div role="group" className="btn-group">
                <button title={TOOLBAR_LABELS.SaveButtonTooltip}
                    id="schema_save_button"
                    type="button" 
                    className="btn-product-model-save btn btn-outline-light btn-lg border-0"
                    onClick={handleSave}>
                    <AiOutlineSave size="1.6em"/>
                </button>
                <button title={TOOLBAR_LABELS.ResetButtonTooltip} type="button" className="btn btn-outline-light btn-lg border-0" onClick={handleReset}>
                    <AiOutlineReload size="1.6em"/>
                    
                </button>
            </div>
        </div>)
}