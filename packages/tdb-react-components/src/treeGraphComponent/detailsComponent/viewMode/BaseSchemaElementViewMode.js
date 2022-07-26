import React from 'react';
import {BaseLabelsElementViewMode} from './BaseLabelsElementViewMode'
import {GET_ICON_NAME,CARDINALITY_MIN_TITLE,CARDINALITY_MAX_TITLE,ELEMENT_BASE_CONST} from '../../../constants/details-labels';
import { BiBorderNone } from 'react-icons/bi';
import {PROPERTY_TYPE_NAME} from '../../utils/elementsName';

export const BaseSchemaElementViewMode = (props)=>{

	let onClickEvent={}

	const currentNodeJson = props.currentNodeJson || {}

	const selectNode=(elementName)=>{
		props.changeCurrentNode(elementName,true)
	}

	const filterRangeValue=()=>{		
		let rangeStr=currentNodeJson.range;
		//I have to review this
		if(currentNodeJson.type===PROPERTY_TYPE_NAME.CHOICE_PROPERTY || PROPERTY_TYPE_NAME.OBJECT_PROPERTY){			
			if(props.mainGraphObj){
				const node=props.mainGraphObj.getElement(currentNodeJson.range);
				if(node){
					rangeStr=node.id;
				}
			}
			onClickEvent={onClick:selectNode}
		}

		return rangeStr;
	}

	const onClickId = props.idLink===true ? {onClick:selectNode} : {}			
	const rangeValue=currentNodeJson.range ? filterRangeValue() : ''
	
	return(
		<div className="tdb__panel__box tdb__panel__box--hideEmpty">		 
			{currentNodeJson.abstract && <div className="tdb__panel__row">
				<BiBorderNone className="tdb__panel__title__icon" title="Abstract Class"/>
			</div>}
			
			{currentNodeJson.id && <BaseLabelsElementViewMode name={currentNodeJson.name} {...onClickId} label={ELEMENT_BASE_CONST.ID_TEXT} value={currentNodeJson.id} />}

			{currentNodeJson.comment && <BaseLabelsElementViewMode label={ELEMENT_BASE_CONST.DESCRIPTION_TEXT} value={currentNodeJson.comment} />}			
			{currentNodeJson.min && <BaseLabelsElementViewMode label={CARDINALITY_MIN_TITLE} value={currentNodeJson.min} />}
			{currentNodeJson.max && <BaseLabelsElementViewMode label={CARDINALITY_MAX_TITLE} value={currentNodeJson.max} />}
			{currentNodeJson.range && 
				<BaseLabelsElementViewMode {...onClickEvent} name={currentNodeJson.range} label="Range Type" value={rangeValue} />
			}				
		</div>		
	)
}