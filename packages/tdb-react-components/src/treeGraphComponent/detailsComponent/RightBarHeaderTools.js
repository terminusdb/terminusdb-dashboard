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

		if(props.view === `UI_VIEW`) {
			return <Stack direction='horizontal' gap={2} className="mt-3">
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
				<RemoveElementComponent 
					hasConstraints={props.hasConstraints} 
					elementId={props.nodeJsonData.name}
					//displayAsIcon={true}
                    size={"26"}
                    className={'btn-lg border border-danger bg-transparent'}
					view={`UI_VIEW`} 
					elementType={props.nodeJsonData.type}
					removeElement={props.removeElement}/>
			</Stack>
		}

    /*if(props.view===`UI_VIEW`) {
        return <div className="flex-grow-1 d-flex align-item-center  bg-transparent  mt-2" >
            <InputGroup className='my-2'>
                <Form.Control
                    ref={commitInput} 
                    placeholder={TOOLBAR_LABELS.CommitLabel} 
                    type="text" 
                    id="schema_save_description"
                    className="form-control" onBlur={handleCommitMessage}
                />
               
                <Button title={TOOLBAR_LABELS.SaveButtonTooltip}
                    id="schema_save_button"
                    type="button" 
                    variant="light"
                    className="btn-sm border border-dark"
                    onClick={handleSave}><AiOutlineSave size="20"/> Save Changes</Button>
                <Button title={TOOLBAR_LABELS.ResetButtonTooltip} 
                    type="button"
                    variant="light"
                    className="btn-sm border border-dark" 
                    onClick={handleReset}><BiUndo size="20"/> Undo Changes</Button>
            </InputGroup>
        </div>
    }*/

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
                    <BiUndo size="1.6em"/>
                    
                </button>
            </div>
        </div>)
}