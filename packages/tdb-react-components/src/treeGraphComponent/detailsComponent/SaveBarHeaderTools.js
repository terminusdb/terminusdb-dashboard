import React, {useState,useRef} from 'react';
import {AiOutlineSave,AiOutlineReload} from "react-icons/ai"
import { FaSave } from "react-icons/fa"
import { BiUndo } from "react-icons/bi"
import {TOOLBAR_LABELS} from '../../constants/details-labels';
import {GraphContextObj} from '../hook/graphObjectContext';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { RemoveElementComponent } from "./RemoveElementComponent"

export const SaveBarHeaderTools =(props)=>{ 
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
        if(commitInput) commitInput.current.value=''
	}

    const handleReset=()=>{ 
			if(props.handleReset) {
				// custom handle reset ftn passed here 
				props.handleReset();
			}
			else {
				//we have to add an alert
        window.confirm("If you continue, you'll lose the schema's changes") &&
				resetTreeModel()
			}
    }

		const ToolButtons = ({ id, title, onClick, icon}) => {
			return 	<Button title={title}
				id={id}
				type="button" 
				variant="light"
				className="btn-lg border border-light bg-transparent"
				onClick={onClick}>
					{icon}
			</Button>
		}

	
		return <Stack direction='horizontal' gap={2} className={`mt-3 w-100 ${props.className}`}>
			<input ref={commitInput}
				placeholder={TOOLBAR_LABELS.CommitLabel} 
				id="schema_save_description"
				className="form-control border border-light" 
				type="text" 
				onBlur={handleCommitMessage}/>       
			<ToolButtons title={TOOLBAR_LABELS.SaveButtonTooltip}
				id="schema_save_button"
				onClick={handleSave}
				icon={<FaSave size="26" className='text-light h2'/>}/>
			<ToolButtons title={TOOLBAR_LABELS.ResetButtonTooltip}
				id="schema_reset_button"
				onClick={handleReset}
				icon={<BiUndo size="26" className='text-light h2'/>}/>
			{props.displayDelete && <RemoveElementComponent 
				hasConstraints={props.hasConstraints} 
				elementId={props.nodeJsonData.name}
				//displayAsIcon={true}
				size={"26"}
				className={'btn-lg border border-danger bg-transparent'}
				view={props.view} 
				elementType={props.nodeJsonData.type}
				removeElement={props.removeElement}/>}
		</Stack>

}