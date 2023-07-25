import React from 'react';
import {BaseSchemaElementViewMode} from './BaseSchemaElementViewMode'
import {PropertiesComponentViewMode} from './PropertiesComponentViewMode'
import {Accordion} from '../../../form/Accordion'
import {GraphContextObj} from '../../hook/graphObjectContext';

export const ParentsElementViewMode =(props)=> {

	const {mainGraphObj,selectedNodeObject,changeCurrentNode} = GraphContextObj()

	const getParentElement=()=>{
		const parentElementArr=selectedNodeObject.parents;

		let parents=[];

		const displayAll=props.displayAll===false ? false : true;

		if(parentElementArr){
			parents=parentElementArr.map((parentName,index)=>{
				const elementData=mainGraphObj.getElement(parentName);
				return ( <Accordion titleClassName="tdb__accordion__head--green"
									leftIconClassName = "custom-img-inherit-line"
									title={elementData.label}  
									tooltip={elementData.comment}
									key={`parent__${parentName}`}>
					    	<BaseSchemaElementViewMode changeCurrentNode={changeCurrentNode} idLink={true} currentNodeJson={elementData} />					     	
					     </Accordion>)
			})
		}
		return parents;
	}

	let parentsElementArr=props.parentsElementArr || [];
	const parentsElements=getParentElement(parentsElementArr);

	return (<div>{parentsElements}</div>)
}
