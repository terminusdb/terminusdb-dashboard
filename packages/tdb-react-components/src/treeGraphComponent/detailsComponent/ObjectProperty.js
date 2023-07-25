import React from 'react'
import {BasePropertyComponent} from './BasePropertyComponent'; 
import {BaseSelectReactElement} from './BaseSelectReactElement';
import {GraphContextObj} from '../hook/graphObjectContext'; 
import { FormGroupComponent } from "./FormGroupComponent"
import {HelpComponent} from './HelpComponent' 

export const ObjectProperty =(props)=>{
	const {mainGraphObj} =GraphContextObj()

	let currentNodeJson=props.currentNodeJson || {}

	let nodeSchemaData = props.nodeSchemaData || {}
	const id=props.id;
	const dataProvider=props.comboDataProvider || [];
	const errorMessage="Please select an element"

	const getSelectedValue=()=>{
		if(nodeSchemaData.range){
			//the label is the schema class id (if the class is not saved the id can change)
			const rangeValue = dataProvider.find(element => element.label === nodeSchemaData.range);
			if(rangeValue)return {label:rangeValue.label,name:rangeValue.name,value:rangeValue.value,type:rangeValue.type}
		}
		return null;
	}
	const defaultValue=getSelectedValue();

	const onChangeValue=(propName,propValue)=>{
		//the value is for internal track of the new element the label is the real ID of the class
		mainGraphObj.setPropertyInfo(currentNodeJson,propName,propValue)
	}

	if(props.view === `UI_VIEW`) {
		return <BasePropertyComponent {...props} >
		<FormGroupComponent groupClassName={props.groupClassName}
			labelComponent = {<label className={` mr-3`} htmlFor={props.title}>{props.title}</label>}
			helpComponent = {<HelpComponent text={props.help}/>}
			//errorComponent = {<div className="hideEmpty">{errorMessage}</div>}
			fieldComponent = {
				<div className='w-100'>
					<BaseSelectReactElement
						//help={props.help}
						//itemError={errorMessage}
						//title={props.title}
						optionChange={onChangeValue}
						defaultValue={defaultValue}
						placeholder={props.placeholder} 
						resetSelection={false} 
						isClearable={false}
						dataProvider={dataProvider} name="range" 
						/>
				</div>
			}/>
			</BasePropertyComponent>
	}

	/*
	* very Important the displayAll must be === false for complex property
	* because the complex property of an EntityClass can have
	* herself as range
	*/
	return(<BasePropertyComponent {...props} >
			<BaseSelectReactElement
				help={props.help}
				itemError={errorMessage}
				title={props.title}
				optionChange={onChangeValue}
				defaultValue={defaultValue}
				placeholder={props.placeholder} 
				resetSelection={false} 
				isClearable={false}
				dataProvider={dataProvider} name="range" 
				/>
		   </BasePropertyComponent>			
	)
}