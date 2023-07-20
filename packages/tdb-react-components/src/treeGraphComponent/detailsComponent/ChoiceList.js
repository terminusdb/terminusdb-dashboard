import React, {useState} from 'react'
import {BaseInputElement} from './BaseInputElement';
import {ListComponent} from './ListComponent';
import {GraphContextObj} from '../hook/graphObjectContext';
import {ELEMENT_HELP} from '../../constants/details-labels';
import { FormGroupComponent } from "./FormGroupComponent"
import Stack from "react-bootstrap/Stack"
import Button from 'react-bootstrap/Button';

//import Select from 'react-select';
//import {ADD_NEW_CHOICE,REMOVE_CHOICE} from '../../constants/ActionTypes'

export const ChoiceList =(props)=> {
	const {mainGraphObj} = GraphContextObj();
	const choicesList = mainGraphObj.getEnumValues()

	const [needUpate,setNeedUpdate] =useState('')
	const [idValue,setId]=useState('')
	const [idReqError,setIdReqError] =useState('')
	

	const addNewBox =()=>{
		if(!idValue){
				('This item is required')
		}else{
			const tmpList=choicesList.slice();		
			tmpList.push(idValue);			
			setId("")
			mainGraphObj.updateEnumValues(tmpList);
			setNeedUpdate(Date.now())
		}
	}

	const removeChoice=(choiceName)=>{
		const index= choicesList.findIndex(x => x ===choiceName);
		const tmpList=choicesList.slice();
		tmpList.splice(index,1);
		mainGraphObj.updateEnumValues(tmpList);
		setNeedUpdate(Date.now())
	}

	const onBlur=(name,value)=>{		
		switch (name){
			case "id":
				const idval=value.trim();
				setId(idval)				
	            if(idval.indexOf(" ")>-1){
	                setIdReqError("Please remove all the white space");
	                return;
	            }
	            if(idval===""){
	                setIdReqError("Please enter a valid ID");
	                return;
	            }
				if(idval!=='')setIdReqError('')
				break
		}
	}

	//const title='Values';
	const title='Values';
	const choiceTitle='Add'

	if(props.view === `UI_VIEW`) {
		return <div className='w-100 mt-3'>
			<Stack direction="horizontal" className='w-100' gap={2}>
				<BaseInputElement 
					groupClassName={"w-100"} 
					view={props.view} 
					help={ELEMENT_HELP.choice_id} 
					placeholder={ELEMENT_HELP.choice_id} 
					itemError={idReqError} title="Add Value" name="id"  onBlur={onBlur} defaultValue={idValue}/>
				<Button className="btn btn-sm" variant="light" onClick={addNewBox}>{choiceTitle}</Button>  			  
			</Stack>
			
			<FormGroupComponent 
				labelComponent = {<span>{title}</span>	  }
				fieldComponent = {
					<div className='d-block'>
						<ListComponent dataProvider={choicesList} removeItem={removeChoice} />
					</div>
				}/>
		</div> 
	}
	 
	return(<>
		<div className="tdb__panel__box tdb__panel__box--edit"> 
		  <span className="tdb__panel__subtitle">{title}</span>	  
		  <ListComponent dataProvider={choicesList} removeItem={removeChoice} />		 
		</div>
		<div className="tdb__panel__box" >		   
	   		<span className="tdb__panel__subtitle">New Value</span>		  		
  			<BaseInputElement help={ELEMENT_HELP.choice_id} itemError={idReqError} title="ID" name="id"  onBlur={onBlur} defaultValue={idValue}/>
	  		<button className="tdb__button__base tdb__button__base--green" onClick={addNewBox}>{choiceTitle}</button>  			  
		</div>
		</>
	)
}

//<Select onChange={this.onChangeSelection} isClearable={true} options={modelChoicesListValue} placeholder="Add a Choice"/>

