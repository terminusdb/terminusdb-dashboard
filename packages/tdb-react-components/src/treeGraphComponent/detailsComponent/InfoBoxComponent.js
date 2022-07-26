import React,{useState} from 'react';
import {mainGraphDescriptionText,ELEMENT_DESCRIPTIONS} from '../../constants/details-labels';
import {GraphContextObj} from '../hook/graphObjectContext';
import {CLASS_TYPE_NAME_LABEL} from "../utils/elementsName";
import {BiNetworkChart} from "react-icons/bi"
import {FiArrowRightCircle} from "react-icons/fi"
import {MdCallSplit} from "react-icons/md"

export const InfoBoxComponent =(props)=> {

	const {mainGraphObj} = GraphContextObj();

	const elementsNumber=mainGraphObj ? mainGraphObj.getElementsNumber() : {}

	const propertiesNum=elementsNumber.properties || 0;
	const entitiesNum=elementsNumber.entities || 0;
	const ordinaryClassesNum=elementsNumber.classes || 0;
	const choiceClassesNum=elementsNumber.choiceClasses || 0

	
		return <div className="col-12 bg-dark h-100 pt-4">
				<h4 id="model_schema_left_panel_title"  className="mb-3 fw-bold text-success">{props.dbName} - Schema</h4>
				<p className="text-light">{mainGraphDescriptionText}</p>
				<div className="d-flex mt-5 align-items-center justify-content-between pb-3 mt-3 mb-3">
					<div className="d-flex" title={ELEMENT_DESCRIPTIONS.Document}>
						<h6><BiNetworkChart className="schema-summary-icons text-light"/> 
						<strong className="ml-3 text-light">{CLASS_TYPE_NAME_LABEL.DOCUMENT_CLASSES} </strong></h6>
					</div>
					<h4 className="text-success fw-bold">
						{entitiesNum}
					</h4>
				</div>
				<div className="d-flex align-items-center justify-content-between pb-3 mt-3 mb-3">
					<div title={ELEMENT_DESCRIPTIONS.Properties} className="d-flex">
						<h6><FiArrowRightCircle className="schema-summary-icons text-light"/> 
						<strong className="ml-3 text-light">{(propertiesNum == 1 ? "Property" : "Properties")}</strong></h6>
					</div>
					<h4 className="text-success fw-bold">
							{propertiesNum}
					</h4>
				</div>

				<div className="d-flex align-items-center justify-content-between pb-3 mt-3 mb-3">
					<div title={ELEMENT_DESCRIPTIONS.ChoiceClass} className="d-flex">
						<h6><MdCallSplit className="schema-summary-icons text-light"/> <strong className="ml-3 text-light">{CLASS_TYPE_NAME_LABEL.CHOICE_CLASSES}</strong></h6>
					</div>
					<h4 className="text-success fw-bold">
							{choiceClassesNum}
					</h4>
				</div>			
		</div>

}
