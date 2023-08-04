import React,{useState} from 'react';
import {mainGraphDescriptionText,ELEMENT_DESCRIPTIONS} from '../../constants/details-labels';
import {GraphContextObj} from '../hook/graphObjectContext';
import {CLASS_TYPE_NAME_LABEL} from "../utils/elementsName";
import {BiNetworkChart} from "react-icons/bi"
import {FiArrowRightCircle} from "react-icons/fi"
import {MdCallSplit} from "react-icons/md"
import Card from "react-bootstrap/Card"
import Stack from "react-bootstrap/Stack"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { TiDocumentText } from "react-icons/ti"
import { TbStatusChange } from "react-icons/tb"
 
export const InfoBoxComponent =(props)=> {

	const {mainGraphObj, dbName} = GraphContextObj();

	const elementsNumber=mainGraphObj ? mainGraphObj.getElementsNumber() : {}

	const propertiesNum=elementsNumber.properties || 0;
	const entitiesNum=elementsNumber.entities || 0;
	const ordinaryClassesNum=elementsNumber.classes || 0;
	const choiceClassesNum=elementsNumber.choiceClasses || 0

	if(props.view === `UI_VIEW`) {
		return <Row className="w-100 mt-5">
			<Col md={1}/>
			<Col md={9}>
				<Card className="mt-5 bg-transparent border-0" style={{color: "rgb(165 165 165 / 75%) !important"}}>
					<Card.Body className='tdb__muted'>
						<h1 className='ml-3'>{`${dbName} has`}</h1>
						<Stack direction='horizontal' gap={2}>
							<TiDocumentText size="60" className='m-3'/>
							<h3 className=' fw-bold'>{entitiesNum}</h3>
							<h3>{entitiesNum === 1 ? ` Document` : ` Documents`}</h3>
						</Stack>

						<Stack direction='horizontal' gap={2}>
							<TbStatusChange size="60" className=' m-3'/>
							<h3 className=' fw-bold'>{choiceClassesNum}</h3>
							<h3>{choiceClassesNum === 1 ? ` Enum` : ` Enums`}</h3>
						</Stack>

						{entitiesNum > 0 &&	<h5 className='ml-3 fst-italic'>
							{`Click on a document to view and edit its properties & settings`}
						</h5>}
						{entitiesNum === 0 &&	<h5 className='ml-3  fst-italic'>
							{`Use the sidebar to create a New Document/ SubDocument or Enum`}
						</h5>}
						<h5 className='ml-3  fst-italic'>
							{`Currently you are in UI Mode, you can swap to Graph UI Mode to view heirarchy or use the JSON Mode
							to edit schema using the JSON editor.`}
						</h5>
						
						{/*<BiNetworkChart size="66" className='text-muted m-3'/>
						<h4 className='text-muted mb-5'>
						<span >
							<span >{`There are `}</span> 
							<span className='text-white fw-bold'>{entitiesNum}</span>
							<span>{entitiesNum === 1 ? ` Document` : ` Documents`}</span>
							<span>{` and `}</span>
							<span className='text-white fw-bold'>{choiceClassesNum}</span>
							<span>{choiceClassesNum === 1 ? ` Enum` : ` Enums`}</span>
							<span>{` in this DataProduct`}</span>
						</span>
					</h4>*/}
					</Card.Body>
				</Card>
			</Col>
			<Col md={2}/>
			
		</Row>
	}

	
	return <div className="col-12  h-100 pt-4">
			{/*<h4 id="model_schema_left_panel_title"  className="mb-3 fw-bold text-light fw-bold">{props.dbName} - Schema</h4>*/}
			<p className="text-light fst-italic small fw-bold">{mainGraphDescriptionText}</p>
			<div className="d-flex mt-5 align-items-center justify-content-between pb-3 mt-3 mb-3">
				<div className="d-flex" title={ELEMENT_DESCRIPTIONS.Document}>
					<h6>{<BiNetworkChart className="schema-summary-icons text-light"/> }
					<strong className="ml-3 text-light">{CLASS_TYPE_NAME_LABEL.DOCUMENT_CLASSES} </strong></h6>
				</div>
				<h4 className="text-light fw-bold">
					{entitiesNum}
				</h4>
			</div>
			<div className="d-flex align-items-center justify-content-between pb-3 mt-3 mb-3">
				<div title={ELEMENT_DESCRIPTIONS.Properties} className="d-flex">
					<h6><FiArrowRightCircle className="schema-summary-icons text-light"/> 
					<strong className="ml-3 text-light">{(propertiesNum == 1 ? "Property" : "Properties")}</strong></h6>
				</div>
				<h4 className="text-light fw-bold">
						{propertiesNum}
				</h4>
			</div>

			<div className="d-flex align-items-center justify-content-between pb-3 mt-3 mb-3">
				<div title={ELEMENT_DESCRIPTIONS.ChoiceClass} className="d-flex">
					<h6><MdCallSplit className="schema-summary-icons text-light"/> <strong className="ml-3 text-light">{CLASS_TYPE_NAME_LABEL.CHOICE_CLASSES}</strong></h6>
				</div>
				<h4 className="text-light fw-bold">
						{choiceClassesNum}
				</h4>
			</div>			
	</div>

}
