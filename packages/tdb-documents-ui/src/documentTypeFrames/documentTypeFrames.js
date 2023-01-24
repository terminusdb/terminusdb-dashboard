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

/** make documentation frames basaed on mode */
export const makeDocumentTypeFrames = (args) => {
  
    let {fullFrame, frame, item, uiFrame, documentation, mode, formData, onTraverse, onSelect}=args 
    
    let linked_to = frame[item]
    let linked_to_frames=fullFrame[linked_to]  
	let unfoldable=util.isUnfoldable(fullFrame[linked_to])
 
    //console.log("linked_to_frames", linked_to_frames)
    let exractedProperties = getProperties(
        fullFrame, 
        linked_to, 
        linked_to_frames, 
        uiFrame, mode, formData, onTraverse, onSelect, documentation) 
    
    // adding type of linked data  
    exractedProperties["properties"]["@type"] = {
        "type": CONST.STRING_TYPE,
        "default": linked_to
    }

    //console.log("exractedProperties", exractedProperties)

	let anyOf = []
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