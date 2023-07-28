import React, { useState,Fragment } from 'react'
import {BasePropertyComponent} from './BasePropertyComponent'
import {ObjectProperty} from './ObjectProperty'
import { OneOfProperty } from "./OneOfProperty"
import {PropertyMenuList} from './PropertyMenuList'
import {Accordion} from '../../form/Accordion';
import Badge from 'react-bootstrap/Badge'; 
import {PROPERTY_TYPE_NAME,CLASS_TYPE_NAME_LABEL} from '../utils/elementsName'
import {STRING_TYPE_DATAPROVIDER,NUMBER_PROPERTY_PRECISION_DATAPROVIDER,BOOLEAN_TYPE_DATAPROVIDER,
		JSON_TYPE_DATAPROVIDER,
		GEOMETRY_PROPS_DATAPROVIDER,TEMPORAL_PROPERTY_DATAPROVIDER,ELEMENT_HELP} from '../../constants/details-labels';

import {GraphContextObj} from '../hook/graphObjectContext';
import { DraggableComponent } from "./DraggableComponent"
import { mapByOrder, sortAlphabetically } from "../../utils"
import { Card } from 'react-bootstrap'

export const renderProperties = (propertyItem, view, isDisabled) => {
	const {mainGraphObj,
		nodePropertiesList,
		addNewProperty,
		removeElement,
		objectPropertyList,
		objectChoicesList,
		getDocumentOrdering 
		} = GraphContextObj();

	let showBody=false
	if(!propertyItem.id || propertyItem.id === "") showBody=true

	let  baseObj= {
		showBody: showBody,
		currentNodeJson:propertyItem,
		removeElement: removeElement,
		isDisabled: isDisabled 
	}

	//if(propertyItem.type!==PROPERTY_TYPE_NAME.CHOICE_PROPERTY){
		//the property description from the json schema
	baseObj['nodeSchemaData'] = mainGraphObj.getPropertyInfo(propertyItem.id)
	//}
	switch(propertyItem.type){
			 case PROPERTY_TYPE_NAME.CHOICE_PROPERTY:
				 baseObj['comboDataProvider']=objectChoicesList || [];
				 baseObj['title']=`${CLASS_TYPE_NAME_LABEL.CHOICE_CLASS} Type *`
				 baseObj['placeholder']=`Select ${CLASS_TYPE_NAME_LABEL.CHOICE_CLASS} Type` 
			baseObj['help']=ELEMENT_HELP.enum_property	
				 return <ObjectProperty  {...baseObj} key={propertyItem.name} view={view}/>;
			 
			 case PROPERTY_TYPE_NAME.NUMERIC_PROPERTY:
				 baseObj['selectDataProvider']=NUMBER_PROPERTY_PRECISION_DATAPROVIDER;
			baseObj['help']=ELEMENT_HELP.number_subtype	 
				 return <BasePropertyComponent {...baseObj} key={propertyItem.name} view={view}/>

			 case PROPERTY_TYPE_NAME.STRING_PROPERTY:
				 baseObj['selectDataProvider']=STRING_TYPE_DATAPROVIDER;	
			baseObj['help']=ELEMENT_HELP.string_subtype		 	   				   			
				 return <BasePropertyComponent {...baseObj} key={propertyItem.name} view={view}/>

		case PROPERTY_TYPE_NAME.BOOLEAN_PROPERTY: 
			baseObj['selectDataProvider']=BOOLEAN_TYPE_DATAPROVIDER;	
			baseObj['help']=ELEMENT_HELP.string_subtype			   				   			
			return <BasePropertyComponent {...baseObj} key={propertyItem.name} view={view}/>
		 
		case PROPERTY_TYPE_NAME.JSON_PROPERTY:
				baseObj['selectDataProvider']=JSON_TYPE_DATAPROVIDER;	
				baseObj['help']=ELEMENT_HELP.string_subtype			   				   			
				return <BasePropertyComponent {...baseObj} key={propertyItem.name} view={view}/>

			 case PROPERTY_TYPE_NAME.GEO_PROPERTY:
				 baseObj['selectDataProvider']=GEOMETRY_PROPS_DATAPROVIDER;
			baseObj['help']=ELEMENT_HELP.geo_subtype		
				 return <BasePropertyComponent {...baseObj} key={propertyItem.name} view={view}/>
			 case PROPERTY_TYPE_NAME.TEMPORAL_PROPERTY:
			baseObj['help']=ELEMENT_HELP.time_subtype	
				 baseObj['selectDataProvider']=TEMPORAL_PROPERTY_DATAPROVIDER;
				 return <BasePropertyComponent {...baseObj}  key={propertyItem.name} view={view} />
			 case PROPERTY_TYPE_NAME.OBJECT_PROPERTY:
				 baseObj['title']='Links To *'
				 baseObj['placeholder']='Select Document'
				 baseObj['comboDataProvider']=objectPropertyList || [];
				baseObj['help']=ELEMENT_HELP.link_property	
				 return <ObjectProperty  {...baseObj} key={propertyItem.name} view={view}/>;
			case PROPERTY_TYPE_NAME.ONEOF_PROPERTY:
				baseObj['title']='Links To One of *'
				baseObj['placeholder']='Select Document'
				 baseObj['comboDataProvider']=objectPropertyList || [];
				baseObj['help']=ELEMENT_HELP.oneOf_type	
				 return <OneOfProperty  {...baseObj} 
				 	key={propertyItem.name}
					isDisabled={isDisabled}
					view={view}/>;
			 default:
				 return ''; 
	}
}

export const getPropertiesPanels=(propertyList, view)=>{
	return propertyList.map((propertyItem,index)=>{
		if(!propertyItem.oneOfDomain) {
			return renderProperties(propertyItem, view, false)
		}
	});	
}

const GatherProperties = ({ properties, view }) => {
	
	const property = properties.map((propertyItem) => {
		// disable editing of inherrited properties
		return renderProperties(propertyItem, view, true)
	})

	if(!property.length) return <label className='text-muted small fst-italic fw-bold'>No Inherited Properties ... </label>
	return <>{property}</>
	
}

const InheritedProperties = (props) => {
	const {
		mainGraphObj,
		selectedNodeObject 
	} = GraphContextObj();

	if(!selectedNodeObject.parents) return <div/>
	if(!selectedNodeObject.parents.length) return <div/>

	let displayElements = []

	selectedNodeObject.parents.map(par => {
		const properties = mainGraphObj.getPropertyListByDomain(par)
		//console.log("test prop", test ) 
		displayElements.push(
			<Card className='mb-3'>
				<Card.Header className='bg-transparent'>
					<Badge bg="dark" className='fst-italic fw-bold mr-2'>
						<label className='text-info '>{`Inherited from`}</label>
					</Badge>
					<label>{par} </label>
				</Card.Header>
				<Card.Body>
					<GatherProperties properties={properties} view={props.view}/>
				</Card.Body>
			</Card>
		)
	})


	return <Accordion showBody={false} 
		arrowOpenClassName = "accordion__arrow fa fa-caret-up"
		arrowCloseClassName = "accordion__arrow fa fa-caret-down"
		title={<label className='text-muted fw-bold fst-italic'>{`Inherited properties`}</label>}
		className='w-100 mb-3'
		tooltip={`View inherited properties`}>
		{displayElements}
	</Accordion>
}


export const PropertiesComponent = (props)=> {
	
	const {mainGraphObj,
		  nodePropertiesList,
		  addNewProperty,
		  removeElement,
		  objectPropertyList,
		  objectChoicesList,
			getDocumentOrdering,
			selectedNodeObject 
		  } = GraphContextObj();



	const enumDisabled=!objectChoicesList || objectChoicesList.length===0 ? true : false;
	
	const propertyList = nodePropertiesList || {}

	
	
	let order = getDocumentOrdering()

	let list = (order && order.length) ? mapByOrder(propertyList, order, 'id') : sortAlphabetically(propertyList, 'id')

	const propertiesPanels=getPropertiesPanels(nodePropertiesList, props.view, propertyList);
	return(
	    <Fragment>
	    	<PropertyMenuList enumDisabled={enumDisabled} 
					title={"Add Properties"}
					oneOfDomain={false}
	    		buttonIconClassName="menuWithLabel"
					iconClassName="fa fa-caret-down iconWithLabel" 
					dropdownMenuClassName="dropdownMenuProperty rightPosition" 
					addNewProperty={addNewProperty}/>	
				<InheritedProperties/>
				<DraggableComponent propertyPanelList={propertiesPanels}/>
	    </Fragment>
	)
}
