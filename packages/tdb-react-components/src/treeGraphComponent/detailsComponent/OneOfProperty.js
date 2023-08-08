import React, { useState, useEffect } from 'react'
import {BasePropertyComponent} from './BasePropertyComponent'; 
import {BaseMultiSelectReactElement} from './BaseMultiSelectReactElement';
import {GraphContextObj} from '../hook/graphObjectContext'; 
import { FormGroupComponent } from "./FormGroupComponent"
import {GET_ICON_NAME} from '../../constants/details-labels';
import {HelpComponent} from './HelpComponent' 
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import {Accordion} from '../../form/Accordion';
import { GetAccordianTitle } from "./BasePropertyComponent"
import { PropertyMenuList } from "./PropertyMenuList"
import { renderProperties } from "./PropertiesComponent"
import {RemoveElementComponent} from './RemoveElementComponent';

const DisplayPropertyList = ({ oneOf, view }) => {
	if(!oneOf) return <></>
	let oneOfArrayElements = []
	//oneOf.PropertyList.map(prop => { 
	for(let eachProps in oneOf) {
		if(oneOf[eachProps].oneOfDomain) {
			oneOfArrayElements.push( 
				renderProperties(oneOf[eachProps], view)
			)
		}
	}
	return oneOfArrayElements
}  

const DisplayEachOneOfSection = ({ addNew, currentNodeJson, view, isDisabled }) => {
	const {addNewProperty} =GraphContextObj()
	let el = []
	
	if(Array.isArray(currentNodeJson.PropertyList)) {
		for(let number=0; number < addNew; number++) {
			el.push(
				<Card className='mt-2'>
					<Card.Header>{number+1}</Card.Header>
					<Card.Body>  
						{!isDisabled &&  <PropertyMenuList  
							title={`Add Choice Properties`}
							oneOfDomain={true} // tell property menu list that these props belongs to one ofs 
							oneOfIndex={number}
							buttonIconClassName="menuWithLabel"
							iconClassName="fa fa-caret-down iconWithLabel" 
							dropdownMenuClassName="dropdownMenuProperty rightPosition" 
							addNewProperty={addNewProperty}/>}
						{currentNodeJson.hasOwnProperty("PropertyList") && <DisplayPropertyList 
							oneOf={currentNodeJson.PropertyList[number]} 
							view={view}/>}
					</Card.Body>
				</Card>
			) 
		}
		return el
	}

	// single entry 
	return 	<Card className='mt-2'>
		<Card.Header>{1}</Card.Header>
		<Card.Body>  
			{!isDisabled && <PropertyMenuList  
				title={`Add Choice Properties`}
				oneOfDomain={true} // tell property menu list that these props belongs to one ofs 
				oneOfIndex={0}
				buttonIconClassName="menuWithLabel"
				iconClassName="fa fa-caret-down iconWithLabel" 
				dropdownMenuClassName="dropdownMenuProperty rightPosition" 
				addNewProperty={addNewProperty}/>}
				<DisplayPropertyList 
					oneOf={currentNodeJson.PropertyList} 
					view={view}/>
			</Card.Body>
		</Card>
	
}

function getNumberOfOneOfs(currentNodeJson) {
	if(!currentNodeJson) return 0
	if(currentNodeJson && !currentNodeJson.hasOwnProperty("PropertyList")) {
		return 0
	}
	return Array.isArray(currentNodeJson.PropertyList) ? currentNodeJson.PropertyList.length : 1
}

export const OneOfProperty =(props)=>{
	const { removeElement }=GraphContextObj() 
	const [oneOfArray, setOneOfArray] = useState([]) 
	

	let currentNodeJson=props.currentNodeJson || {}
	let nodeSchemaData = props.nodeSchemaData || {}

	const [addNew, setAddNew] = useState(getNumberOfOneOfs(currentNodeJson))
 
	const id=props.id;
	const leftIconClassName=GET_ICON_NAME[currentNodeJson.type] || "custom-img-string"


	function addOneOf() {
		//setOneOfArray(arr => [...arr, <GetOneOfElement oneOf={oneOfArray} index={oneOfArray.length}/>]);
		setAddNew(addNew+1)
	}  

	function handleRemoveOneOf (elementId, elementType) {
		if(removeElement) removeElement(elementId, elementType)
	}

	return <Accordion showBody={true} 
		arrowOpenClassName = "accordion__arrow fa fa-caret-up"
		arrowCloseClassName = "accordion__arrow fa fa-caret-down"
		title={<GetAccordianTitle propId={id} nodeSchemaData={nodeSchemaData} currentNodeJson={currentNodeJson}/>}
		className='w-100'
		leftIconClassName={leftIconClassName}
		tooltip={currentNodeJson.type || ''}>
			{!props.isDisabled && <Button onClick={addOneOf} className="btn btn-sm bg-light text-dark">Add One of</Button>}
			<RemoveElementComponent 
				//hasConstraints={props.hasConstraints} 
				elementId={"@oneOf"} 
				displayAsIcon={false}
				isDisabled={props.isDisabled}
				size={"17"}
				className={'btn-sm border-0 bg-transparent float-right'}
				elementType={"OneOfProperty"}
				removeElement={handleRemoveOneOf}
			/>
			<DisplayEachOneOfSection addNew={addNew} 
				currentNodeJson={currentNodeJson} 
				isDisabled={props.isDisabled}
				view={props.view}/>
			{/*<DisplayOneOfArray oneOfArray={oneOfArray} view={props.view}/>*/}
	</Accordion>		
	
}

