import React, { useState,Fragment } from 'react'
import {BasePropertyComponent} from './BasePropertyComponent'
import {ObjectProperty} from './ObjectProperty'
import {PropertyMenuList} from './PropertyMenuList'
import {PROPERTY_TYPE_NAME,CLASS_TYPE_NAME_LABEL} from '../utils/elementsName'
import {STRING_TYPE_DATAPROVIDER,NUMBER_PROPERTY_PRECISION_DATAPROVIDER,BOOLEAN_TYPE_DATAPROVIDER,
		GEOMETRY_PROPS_DATAPROVIDER,TEMPORAL_PROPERTY_DATAPROVIDER,ELEMENT_HELP} from '../../constants/details-labels';

import {GraphContextObj} from '../hook/graphObjectContext';

export const PropertiesComponent = (props)=> {
	
	const {mainGraphObj,
		  nodePropertiesList,
		  addNewProperty,
		  removeElement,
		  objectPropertyList,
		  objectChoicesList,
		  } = GraphContextObj();

	const enumDisabled=!objectChoicesList || objectChoicesList.length===0 ? true : false;
	
	const propertyList = nodePropertiesList || {}

	const getPropertiesPanels=()=>{
		let showBody=false;
		/*
		*I open the first property if there is only one property
		*/
		
		return propertyList.map((propertyItem,index)=>{

			/*
			* if it is a new property without id I show it open
			*/
			if(!propertyItem.id)showBody=true;

			const baseObj= {showBody:showBody,
				            currentNodeJson:propertyItem,
				            removeElement:removeElement}

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
		   			return <ObjectProperty  {...baseObj} key={propertyItem.name}/>;
		   		
		   		case PROPERTY_TYPE_NAME.NUMERIC_PROPERTY:
		   			baseObj['selectDataProvider']=NUMBER_PROPERTY_PRECISION_DATAPROVIDER;
					baseObj['help']=ELEMENT_HELP.number_subtype	
		   			return <BasePropertyComponent {...baseObj} key={propertyItem.name} />

		   		case PROPERTY_TYPE_NAME.STRING_PROPERTY:
		   			baseObj['selectDataProvider']=STRING_TYPE_DATAPROVIDER;	
					baseObj['help']=ELEMENT_HELP.string_subtype			   				   			
		   			return <BasePropertyComponent {...baseObj} key={propertyItem.name} />

				case PROPERTY_TYPE_NAME.BOOLEAN_PROPERTY:
					baseObj['selectDataProvider']=BOOLEAN_TYPE_DATAPROVIDER;	
					baseObj['help']=ELEMENT_HELP.string_subtype			   				   			
					return <BasePropertyComponent {...baseObj} key={propertyItem.name} />

		   		case PROPERTY_TYPE_NAME.GEO_PROPERTY:
		   			baseObj['selectDataProvider']=GEOMETRY_PROPS_DATAPROVIDER;
					baseObj['help']=ELEMENT_HELP.geo_subtype		
		   			return <BasePropertyComponent {...baseObj} key={propertyItem.name} />
		   		case PROPERTY_TYPE_NAME.TEMPORAL_PROPERTY:
					baseObj['help']=ELEMENT_HELP.time_subtype	
		   			baseObj['selectDataProvider']=TEMPORAL_PROPERTY_DATAPROVIDER;
		   			return <BasePropertyComponent {...baseObj}  key={propertyItem.name} />
		   		case PROPERTY_TYPE_NAME.OBJECT_PROPERTY:
		   			baseObj['title']='Links To Type *'
		   			baseObj['placeholder']='Select Type'
		   			baseObj['comboDataProvider']=objectPropertyList || [];
					baseObj['help']=ELEMENT_HELP.link_property	
		   			return <ObjectProperty  {...baseObj} key={propertyItem.name} />;
		   			default:
		   				return '';
				}
		});	
	}
	const propertiesPanels=getPropertiesPanels(nodePropertiesList);
	return(
	    <Fragment>
	    	<PropertyMenuList enumDisabled={enumDisabled} 
	    				  buttonIconClassName="menuWithLabel"
						  iconClassName="fa fa-caret-down iconWithLabel" 
		                  dropdownMenuClassName="dropdownMenuProperty rightPosition" 
		                  addNewProperty={addNewProperty}/>				     
	    	{propertiesPanels}
	    </Fragment>
	)
}
