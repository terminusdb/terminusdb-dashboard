import React  from 'react'
import {RelationshipBox} from './RelationshipBox'
import {GraphContextObj} from '../hook/graphObjectContext'
import {PROPERTY_TYPE_NAME} from '../utils/elementsName'
 
export const RelationshipView = (props)=>{
	const {changeCurrentNode,
		  selectedNodeObject,
		  objPropsRelatedToClass,
		  mainGraphObj,nodePropertiesList} = GraphContextObj();

	const propertyList = nodePropertiesList || {}
	/*
	* get all the relationship where the select node is a target
	*/
	const relObjArr= objPropsRelatedToClass.map((complexPropertyObj,index)=>{
            const propertyDomainName=mainGraphObj.getElement(complexPropertyObj.nodeName,false) || {};
            
			const property = mainGraphObj.getObjectProperty(complexPropertyObj.nodeName,complexPropertyObj.propName)
			if(property){
				const label = property.id || ''

				return <RelationshipBox source={propertyDomainName} 
									sourceAction={changeCurrentNode}
									target={selectedNodeObject}
									propId={label} 
									key={'rel__'+index}/>
			}
	})

	/*
	* get all the relationship where the select node is a source
	* current node properties 
	*/
	const domainToProp = propertyList.map((propertyItem,index)=>{
		
		if(propertyItem.type===PROPERTY_TYPE_NAME.CHOICE_PROPERTY || 
		   propertyItem.type===PROPERTY_TYPE_NAME.OBJECT_PROPERTY){
		   const info = mainGraphObj.getPropertyInfo(propertyItem.id)
           
		   if(info.range){
           		const label =  propertyItem.id
				
           		const rangeElement=mainGraphObj.getElement(info.range,false) 

		   		return(<RelationshipBox source={selectedNodeObject} 
            					targetAction={changeCurrentNode}
	   	                        target={rangeElement}
	   	                        propId={label} 
	   	                        key={'dom__'+index}/>)
           }
           
		}
	})
		
	return(
		<div className="tdb__panel__box">
		   {relObjArr}
		   {domainToProp}
		</div>
	)
	
}