import React, { useEffect, useState, useMemo }  from "react";
import { Modal, ProgressBar } from 'react-bootstrap'
import * as CONST from "../constants"
import Stack from 'react-bootstrap/Stack'
//import {FrameViewer} from "@terminusdb/terminusdb-documents-ui"
import Button from 'react-bootstrap/Button'
import { AiOutlineArrowRight } from "react-icons/ai"
import Card from "react-bootstrap/Card"
import { AiOutlineClose } from "react-icons/ai"
import { v4 as uuidv4 } from 'uuid';
import { TDBLabel } from "./LabelComponent"
import * as util from "../utils"
import { documentInternalProperties } from "../helpers/documentHelpers"
import { DisplayLinkID, getClassNames } from "./DisplayLink"
/**
 * 
 * @param {*} clicked document clicked by user to traverse
 * @param {*} setClicked function to store which document has been clicked by user
 * this function is only used in DocumentView & for Traversing via documents
 */
export function onTraverse(documentID, setClicked) { 
    if(setClicked) setClicked(documentID)
}

function checkIfUIFrameAvailable(uiFrame) {
	if(uiFrame && Object.keys(uiFrame).length && uiFrame.hasOwnProperty(documentLinkPropertyName)) {
		return linkProps.uiFrame[documentLinkPropertyName] 
	}
	return {}
}


const ShowLinkRoute = ({ linkArray, setDocumentID }) => {
	let elements=[]
	linkArray.map((link, index) => {
		elements.push(<span>
		{/*	<Button variant="link" onClick={(e) => {handleTraverse(link)}}>{`${link}`}</Button>*/}
			<Button variant="link" onClick={ (e) => setDocumentID(link) }>{`${link}`}</Button>
			{index !== linkArray.length-1 && <AiOutlineArrowRight className="fw-bold h4 mt-2 "/>}
		</span>
		)
	})

	if(linkArray && linkArray.length) {
		return <Card className="border bg-dark border-secondary mb-4">
			<Card.Header className="small fw-bold text-muted">
				{`Click through below links to traverse through documents ...`}
			</Card.Header>
			<Card.Body>
				{elements}
			</Card.Body>
		</Card>
	}

	return <div/>
}


export const TraverseDocumentLinks = ({ onHide, clicked, linkProps }) => {
	const [documentID, setDocumentID]=useState(linkProps.dataID)
	const [linkDetails, setlinkDetails]=useState(linkProps)
	const [type, setType]=useState(linkProps.documentLinkPropertyName)
	const calculation = useMemo(() => constructDisplayElements(linkDetails), [linkDetails]);

	// document tarverse array
	const [linkArray, setLinkArray]=useState([])
	//let linkArray=[]

	useEffect(() => {
		if(clicked) {
			setDocumentID(clicked)
		}
	}, [clicked])
	
	function removeDocumentIDFromLinkArray(setLinkArray) {
		// clear array on close
		setLinkArray([])
	}
	
	function handleClose (e) {
		removeDocumentIDFromLinkArray(setLinkArray) 
		onHide()
	}

	
	
	function constructDisplayElements (linkProps) {
		let fields = []
		let { dataID, documentData, args, uiFrame, propertyDocumentation, reference, cardKey, onTraverse, setDocumentData, unfoldable, action, formData, onChange, documentLinkPropertyName, extracted, required, mode, linked_to } = linkProps
		
		function handleChange(data, fieldName) {
			let tempDocumentData = documentData
			// if field name is undefined
			// at this point means that its the document link's data 
			// so we pass linked_to as param
			tempDocumentData[fieldName ? fieldName : documentLinkPropertyName]=data
			setDocumentData(tempDocumentData)
			if(onChange) onChange(tempDocumentData)
		}
	
		// definitions will have definitions of linked_to frames
		let definitions = util.availableInReference(reference, linked_to) ?  reference[linked_to]: extracted.properties
	
		let defaultClassName="tdb__doc__input"
	
		for(let field in definitions.properties) {  
					
			linked_to = definitions.properties[field][CONST.PLACEHOLDER]
			if(util.availableInReference(reference, linked_to)) {
				// unfolderdLinkPropertyName stores the property name which is linked to unfolded Document
				// we need this value to understand diff uis 
				if(!formData.hasOwnProperty(field)) fields.push(<div className="empty"/>) 
				else {
			 
					let field_linked_to=linkProps.extracted.properties[field][CONST.PLACEHOLDER]
					let newExtracted = linkProps.reference[field_linked_to]

					function handleInternalClick(linkProps) {
						setDocumentID(linkProps.formData[field]["@id"])
						let newProps = {
							mode: linkProps.mode,
							action: linkProps.action,
							extracted: newExtracted,
							required: linkProps.required,
							args: linkProps.args,
							unfoldable: linkProps.unfoldable,
							onTraverse: linkProps.onTraverse,
							uiFrame: checkIfUIFrameAvailable(linkProps.uiFrame),
							onChange: linkProps.onChange,
							linked_to: field_linked_to,
							propertyDocumentation: linkProps.propertyDocumentation,
							cardKey:linkProps.cardKey,
							reference:linkProps.reference,
							formData:linkProps.formData[field],
							dataID:linkProps.formData[field]["@id"],
							documentLinkPropertyName:field,
							documentData:linkProps.formData[field],
							id:linkProps.cardKey,
							hideFieldLabel:false,
							child:true,
							setDocumentData:linkProps.SetDocumentData
						}
						setlinkDetails(newProps)
					}
					
					let className = getClassNames(checkIfUIFrameAvailable(linkProps.uiFrame), field)

					fields.push(<div className="d-flex mb-3">
						<TDBLabel name={field} 
							//required={linkProps.required} 
							comment={linkProps.comment} 
							className={"tdb__label__width"} />
						<DisplayLinkID linkProps={linkProps}
							hideFieldLabel={true}
							className={className}
							onClick={(e) => handleInternalClick(linkProps)}
							selected={linkProps.formData[field]["@id"]}/></div>
						)
				}
			}
			else {
	
				// internal properties
				let fieldName = definitions.properties[field].title
				let fieldID=`root_${documentLinkPropertyName}_${fieldName}_${cardKey}`
				let defaultClassName="tdb__doc__input"
				//let fieldUIFrame= util.getFieldUIFrame (uiFrame, documentLinkPropertyName, defaultClassName, index)
	
				//let fieldUIFrame= util.getFieldUIFrame (uiFrame, documentLinkPropertyName, defaultClassName, null)
				
				let fieldUIFrame = linkProps.uiFrame && linkProps.uiFrame.hasOwnProperty(documentLinkPropertyName)
					&& linkProps.uiFrame[documentLinkPropertyName].hasOwnProperty(field) && 
					linkProps.uiFrame[documentLinkPropertyName][field].hasOwnProperty(CONST.CLASSNAME) ? 
					linkProps.uiFrame[documentLinkPropertyName][field][CONST.CLASSNAME] : "tdb__doc__input"

	
				let config = {
					properties: definitions.properties,
					propertyName: documentLinkPropertyName,
					id: fieldID,
					key: `${linked_to}__${uuidv4()}`,
					formData: { [fieldName] : util.getFormDataPerProperty(documentData, fieldName) },
					required: definitions.required.includes(fieldName),
					mode: mode,
					args: args,
					hideFieldLabel: true,
					fieldUIFrame: { [field]: { [CONST.CLASSNAME] : fieldUIFrame} }, 
					onChange: handleChange,
					defaultClassName: defaultClassName,
					propertyDocumentation: propertyDocumentation
				}
	
				// review fix order_by
				fields.push(documentInternalProperties(config, field))
			}
		}

		if(linkProps.dataID) {
			//getDocument(documentID)
			//let extractedType = documentID.substring(0, documentID.indexOf("/"))
			//setType(extractedType)
      let tempArray=linkArray ? linkArray : []
			if(tempArray.includes(linkProps.dataID)) {
				//tempArray.filter(arr => arr !== documentID)
				//let elemsToDelete = tempArray.length - 1 - tempArray.indexOf(linkProps.dataID)
				let elemsToDelete = tempArray.length - tempArray.indexOf(linkProps.dataID)
				tempArray.splice(tempArray.length - elemsToDelete, elemsToDelete)
			}
			else tempArray.push(linkProps.dataID)
    }
	
		return <Modal.Body>
			{/*<ShowLinkRoute linkArray={linkArray} 
				setDocumentID={setDocumentID}/>*/}
			{fields}
		</Modal.Body>
	}

	return <Modal
		show={true}
		dialogClassName="modal-90w"
		onHide={handleClose}
		size="md"
		aria-labelledby="traverse__document__links"
		centered>
		<Modal.Header> 
			<Modal.Title as="h6" className="w-100">
				<Stack direction="horizontal" gap={3}>
					<div className="text-break">
						<small className="text-muted">{`id: `}</small>
						{documentID}
					</div>
					<Button className=" ms-auto btn btn-sm bg-transparent text-muted border-0" 
						title="Close"
						onClick={handleClose}>
						<AiOutlineClose/>
					</Button>
				</Stack>
			</Modal.Title>
		</Modal.Header>
		<Modal.Body style={{height: "auto"}} className="p-4">
			{/*constructDisplayElements (linkDetails)*/}
			{ calculation }
		</Modal.Body>
	</Modal>
}