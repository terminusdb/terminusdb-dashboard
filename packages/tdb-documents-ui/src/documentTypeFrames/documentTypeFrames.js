import * as CONST from "../constants"
import * as util from "../utils"
import * as helper from "../choiceSubDocumentTypeFrames/helpers"
import {getProperties} from "../FrameHelpers"
import * as linkHelper from "./helpers"

function getViewAnyOfFrames(frame, item, exractedProperties, unfoldable) {
	//console.log("exractedProperties ...", exractedProperties)

	if(!unfoldable) {
		return null
	}

	let anyOfFrame=[
		{
		  "title": CONST.LINK_NEW_DOCUMENT,
		  "description": linkHelper.getLinkedDescription(frame[item]),
		  "properties": exractedProperties["properties"],
		  "uiSchema": exractedProperties.uiSchema
		}
	]
	return anyOfFrame
}

/**
 * 
 * @param {*} exractedProperties  from FrameHelpers
 * @param {*} unfoldable  unfoldable true or not
 * @returns frames only with one option which we will hide from Ui 
 */
function getEditAnyOfFrames  (frame, item, exractedProperties, unfoldable) {
	//console.log("exractedProperties ...", exractedProperties)

	if(!unfoldable) {
		return null
	}

	let anyOfFrame=[
		{
		  "title": CONST.LINK_NEW_DOCUMENT,
		  "description": linkHelper.getLinkedDescription(frame[item]),
		  "properties": exractedProperties["properties"],
		  "uiSchema": exractedProperties.uiSchema
		}
	]
	return anyOfFrame
}

/**
 * 
 * @param {*} exractedProperties  from FrameHelpers
 * @returns frames on CREATE mode with 2 options to create New Document or link an existing document
 */
function getCreateAnyOfFrames (frame, item, exractedProperties) {

	let link_frames={
		"title": CONST.LINK_EXISTING_DOCUMENT,
		"description": linkHelper.getLinkExistingDescription(frame, item),
		"properties": {
		  [CONST.LINK_EXISTING_DOCUMENT]: {
			  "type": CONST.STRING_TYPE
		  }
		}
	}

	if(util.checkIfKey(item, frame["@key"])) {
		let anyOfFrame = [link_frames]
		return anyOfFrame
	}

	let anyOfFrame = [
		link_frames,
		{
		  "title": CONST.LINK_NEW_DOCUMENT,
		  "description": linkHelper.getCreateDescription(frame, item),
		  "properties": exractedProperties["properties"],
		  "uiSchema": exractedProperties.uiSchema
		}
	]
	return anyOfFrame
}

function checkIfCycleExists(property, linked_to_frames, linked_to, docType) {
	if(linked_to_frames.hasOwnProperty(property)) return true
	if(linked_to && docType) {
		// doc Type is the type of document to be displayed in <FrameViewer/>
		// checks if linked to is same as the parent document class
		if(linked_to === docType) return true
	}
	return false 
}

/** make documentation frames basaed on mode */
export const makeDocumentTypeFrames = (args) => {
  
    let {fullFrame, frame, item, uiFrame, documentation, mode, formData, onTraverse, onSelect, docType}=args 

    let anyOf = []
    let linked_to = frame[item]


    let linked_to_frames=fullFrame[linked_to]  
	let unfoldable=util.isUnfoldable(fullFrame[linked_to])

	let ifCycleExists=checkIfCycleExists(item, linked_to_frames, linked_to, docType)

	/** if a property is pointing to its own parent document class
	 * then display only Link an Existing Document 
	 */
	if(ifCycleExists) {
		let anyOf = [
			{
				"title": CONST.LINK_EXISTING_DOCUMENT,
				"description": linkHelper.getLinkExistingDescription(frame, item),
				"properties": {
				  [CONST.LINK_EXISTING_DOCUMENT]: {
					  "type": CONST.STRING_TYPE
				  }
				}
			}
		]
		return {anyOf, linked_to}
	}
	
	/** extract frames to pass to any of when user chooses to Create a new Document */
	let linkedDocType=linked_to
	// pass the linked doc type instead to check if there are cycles
    let exractedProperties = getProperties(
        fullFrame, 
        linked_to, 
        linked_to_frames, 
        uiFrame, mode, formData, onTraverse, onSelect, documentation, linkedDocType) 
    
    // adding type of linked data  
    exractedProperties["properties"]["@type"] = {
        "type": CONST.STRING_TYPE,
        "default": linked_to
    }

	// check if extracted Document has @metadata in them
	let order=util.getOrderFromMetaData(linked_to_frames)
	// add @type & CONST.LINK_EXISTING_DOCUMENT to ui order else ui order will complain 
	// ui:order is included for all elements displayed in form 
	if(order) {
		order.push("@type")
		order.push(CONST.LINK_EXISTING_DOCUMENT)
		exractedProperties.uiSchema["ui:order"] = order
	}

    //console.log("exractedProperties", exractedProperties)
	// CREATE MODE
	if (mode === CONST.CREATE) {
		anyOf= getCreateAnyOfFrames (frame, item, exractedProperties)
	}
	else if (mode === CONST.EDIT) {
		// EDIT or VIEW MODE
		anyOf=getEditAnyOfFrames  (frame, item, exractedProperties, unfoldable)
	}
	else if (mode === CONST.VIEW){
		// VIEW
		anyOf=getViewAnyOfFrames  (frame, item, exractedProperties, unfoldable)
	}
    return {anyOf, linked_to}
} 