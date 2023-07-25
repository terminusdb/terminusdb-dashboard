import React, { useState,Fragment } from 'react'
import {BasePropertyComponent} from './BasePropertyComponent'
import {ObjectProperty} from './ObjectProperty'
import { OneOfProperty } from "./OneOfProperty"
import {PropertyMenuList} from './PropertyMenuList'
import {PROPERTY_TYPE_NAME,CLASS_TYPE_NAME_LABEL} from '../utils/elementsName'
import {STRING_TYPE_DATAPROVIDER,NUMBER_PROPERTY_PRECISION_DATAPROVIDER,BOOLEAN_TYPE_DATAPROVIDER,
		JSON_TYPE_DATAPROVIDER,
		GEOMETRY_PROPS_DATAPROVIDER,TEMPORAL_PROPERTY_DATAPROVIDER,ELEMENT_HELP} from '../../constants/details-labels';

import {GraphContextObj} from '../hook/graphObjectContext';
import { DraggableComponent } from "./DraggableComponent"
import { mapByOrder, sortAlphabetically } from "../../utils"

export const renderProperties = (propertyItem, view, isOneOfProperty) => {
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
		removeElement: removeElement
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
					view={view}/>;
			 default:
				 return ''; 
	}
}

export const getPropertiesPanels=(propertyList, view)=>{
	return propertyList.map((propertyItem,index)=>{
		if(!propertyItem.oneOfDomain) {
			return renderProperties(propertyItem, view)
		}
	});	
}


export const PropertiesComponent = (props)=> {
	
	const {mainGraphObj,
		  nodePropertiesList,
		  addNewProperty,
		  removeElement,
		  objectPropertyList,
		  objectChoicesList,
			getDocumentOrdering 
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
				<DraggableComponent propertyPanelList={propertiesPanels}/>
	    </Fragment>
	)
}
