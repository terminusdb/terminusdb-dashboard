import React,{useState} from 'react';
import {mainGraphDescriptionText,ELEMENT_DESCRIPTIONS} from '../../constants/details-labels';
import {GraphContextObj} from '../hook/graphObjectContext';
import {CLASS_TYPE_NAME_LABEL,CLASS_TYPE_NAME} from "../utils/elementsName";
import {BaseLabelsElementViewMode} from "./viewMode/BaseLabelsElementViewMode"
import {ELEMENT_ICONS} from '../../constants/details-labels'
import {BiNetworkChart} from "react-icons/bi"

export const InfoObjectComponent =(props)=> {

	const {mainGraphObj,changeCurrentNode} = GraphContextObj();
	const imageType=ELEMENT_ICONS[props.panelType]

	let elementList=[];
	let title='';
	let description=''

	switch(props.panelType){
		case CLASS_TYPE_NAME.DOCUMENT_CLASSES:
			 title=CLASS_TYPE_NAME_LABEL.DOCUMENT_CLASSES;
			 description=ELEMENT_DESCRIPTIONS.Document;
			 elementList=mainGraphObj.getDocumentTypeList();
			 break;
	    case CLASS_TYPE_NAME.OBJECT_CLASSES:
	    	 title=CLASS_TYPE_NAME_LABEL.OBJECT_CLASSES;
			 description=ELEMENT_DESCRIPTIONS.Object;
			 elementList=mainGraphObj.getObjectTypeList();
			 break;
		case CLASS_TYPE_NAME.CHOICE_CLASSES:
	    	 title=CLASS_TYPE_NAME_LABEL.CHOICE_CLASSES;
			 description=ELEMENT_DESCRIPTIONS.ChoiceClass;
			 elementList=mainGraphObj.getObjectChoices();
			 break;

	}

	const selectNode=(elementName)=>{
		changeCurrentNode(elementName,true)
	}

	const getElementList=()=>{
		return elementList.map((element,index)=>{
			const elementName = element.name || element;

			const nodeElement=mainGraphObj.getElement(elementName);
			if(nodeElement)
				return <BaseLabelsElementViewMode key={'element__'+index}  name={elementName}
						onClick={selectNode} value={nodeElement.label || nodeElement.id} />
			else return '';
		})
	}

	if(props.custom) {
		return <div class="px-0 col-12 ml-3 mr-3 pr-3">
			<div class="shadow-sm card border-light">
				<div class="card-body">
					<div className="d-flex">
						{<BiNetworkChart className="schema-summary-icons mr-3"/>}
						<h5>{title}</h5>
					</div>
					<p>{description}</p>
					<div className="d-flex-column text-info align-items-center justify-content-between border-light pb-3 mt-3 mb-3">
						 {getElementList()}
		            </div>
				</div>
			</div>
		</div>
	}

	return(
			<div className="RRT__container RRT__container--viewmode">
				<div className="tdb__panel__title">
	  	 			<i className={`tdb__panel__title__icon ${imageType}`}></i>
	  	 			{title}
	  	 		</div>
	  	 		<div className="tdb__panel">
					 <div className="tdb__panel__box">
					 {description}
					</div>
					<div className="tdb__panel__box">
					 {getElementList()}
					</div>
				</div>
			</div>
	)
}
