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

const DisplayPropertyList = ({ oneOf, view }) => {
	
	if(!oneOf.hasOwnProperty("PropertyList"))  return <></>
	let oneOfArrayElements = []
	oneOf.PropertyList.map(prop => { 
		if(prop.oneOfClass) {
			oneOfArrayElements.push(
				renderProperties(prop, view)
			)
		}
	})
	return oneOfArrayElements
}

const GetOneOfElement = ({ oneOf, index, view }) => {
	const {addNewProperty} =GraphContextObj()
	return <Card className='mt-2'>
		<Card.Header>{index+1}</Card.Header>
		<Card.Body> 
			<PropertyMenuList  
				enumDisabled={false}  // review
				title={`Add Choice Properties`}
				oneOfClass={true} // tell property menu list that these props belongs to one ofs 
				buttonIconClassName="menuWithLabel"
				oneOfIndex={index}
				iconClassName="fa fa-caret-down iconWithLabel" 
				dropdownMenuClassName="dropdownMenuProperty rightPosition" 
				addNewProperty={addNewProperty}/>
			<DisplayPropertyList oneOf={oneOf} view={view}/>	
		</Card.Body>
	</Card>
}

const DisplayOneOfArray = ({ oneOfArray, view }) => {
	const {
		nodePropertiesList
	} = GraphContextObj();

	let oneOfRef = nodePropertiesList.filter(arr =>arr.id === "@oneOf") 
	if(oneOfRef.length===1 && oneOfRef[0].hasOwnProperty("ref")) {
		oneOfArray = [...oneOfArray, ...oneOfRef[0].ref];
	} 

	if(!oneOfArray.length) return oneOfArray
	let el = []
	oneOfArray.map((oneOf, index) => {
		if(oneOf.hasOwnProperty("key")) {
			el.push(<GetOneOfElement oneOf={oneOf} index={index} view={view}/>)
		}
	})
	return <div>{el}</div>
}



export const ObjectSetProperty =(props)=>{
	const {mainGraphObj} =GraphContextObj() 
	const [oneOfArray, setOneOfArray] = useState(mainGraphObj.getOneOfArray()) 
	const [addNew, setAddNew] = useState(false)

	let currentNodeJson=props.currentNodeJson || {}
	let nodeSchemaData = props.nodeSchemaData || {}
	const id=props.id;
	const leftIconClassName=GET_ICON_NAME[currentNodeJson.type] || "custom-img-string"


	function addOneOf() {
		setOneOfArray(arr => [...arr, <GetOneOfElement oneOf={oneOfArray} index={oneOfArray.length}/>]);
		setAddNew(Date.now())
	}

	useEffect (() => {
		if(addNew && oneOfArray.length) {
			setAddNew(false)
			mainGraphObj.setOneOfArray(oneOfArray.length)
		
		}
	},[addNew])

	console.log("/// test ///", mainGraphObj.getOneOfArray())


	return <Accordion showBody={props.showBody} 
		arrowOpenClassName = "accordion__arrow fa fa-caret-up"
		arrowCloseClassName = "accordion__arrow fa fa-caret-down"
		title={<GetAccordianTitle propId={id} nodeSchemaData={nodeSchemaData} currentNodeJson={currentNodeJson}/>}
		className='w-100'
		leftIconClassName={leftIconClassName}
		tooltip={currentNodeJson.type || ''}>
			<Button onClick={addOneOf} className="btn btn-sm bg-light text-dark">Add One of</Button>
			<DisplayOneOfArray oneOfArray={oneOfArray} view={props.view}/>
	</Accordion>		
	
}

