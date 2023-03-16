import { makeMandatoryFrames } from "./mandatoryFrames"
import { makeOptionalFrames } from "./optionalFrames"
import { makeArrayFrames } from "./arrayFrames"
import * as util from "./utils"
import * as CONST from "./constants"

// add layout to references
function addLayout (args, layout, linked_to) {
	let { reference, setReference } = args
	let tempReference = reference
	tempReference[linked_to] = layout
	setReference(tempReference)
}

// function to store reference of document type definition 
// to be used later on ...
export function addToReference(args, layout, linked_to) { 
	let { reference, type } = args
	// add reference only if not available 
	if(!util.availableInReference(reference, linked_to)) { 
		addLayout (args, layout, linked_to)
	}
	// this is in case of circular document links 
	// if document link points to its own document class in this case reference[type]={}
	// we add extracted frames to reference[type] when available
	if(util.availableInReference(reference, linked_to) && 
		!Object.keys(reference[linked_to]).length) {
			addLayout (args, layout, linked_to)
		}
}


export function getProperties (args) {
  let properties = {}, propertiesUI = {}, required = []

	let { documentFrame, type } = args
    
	for(let property in documentFrame) {

		if(property === "@id") continue
		else if(property === "@key") continue
		else if(property === "@type") continue 
		else if(property === "@id") continue
		else if(property === "@inherits") continue
		else if(property === CONST.DOCUMENTATION) continue
		else if(property === CONST.SUBDOCUMENT) continue
		else if(property === CONST.UNFOLDABLE) continue
		else if(property === CONST.METADATA) continue
		else if(util.isMandatory(documentFrame, property)) {
			// MANDATORY FRAMES
			let mandatoryFrames=makeMandatoryFrames(args, property) 
			//set property layout & uiLayout
			properties[property] = mandatoryFrames.layout
			propertiesUI[property] = mandatoryFrames.uiLayout
			//set property as required since Mandatory
			required.push(property)
		}
		else if(util.isOptional(documentFrame, property)) { 
			// OPTIONAL FRAMES
			let extractedFrames = util.extractFrames(documentFrame, property)
			// make a copy
			let argsHolder = {...args}
			argsHolder.documentFrame=extractedFrames
			let optional = getProperties(argsHolder)
			let optionalFrames = makeOptionalFrames(optional, property) 
		 
			//set property layout & uiLayout
			properties[property] = optionalFrames.layout
			propertiesUI[property] = optionalFrames.uiLayout
		}
		else if(util.isArrayType(documentFrame, property)) {
			// SET/ LIST/ ARRAY FRAMES
			let extractedFrames = util.extractFrames(documentFrame, property)
			// make a copy
			let argsHolder = {...args}
			argsHolder.documentFrame=extractedFrames
			// getProperties will make set definitions available in reference
			let dataFrames = getProperties(argsHolder)
			let arrayFrames = makeArrayFrames(args, property, util.getArrayType(documentFrame, property)) 
		 
			//set property layout & uiLayout
			properties[property] = arrayFrames.layout
			propertiesUI[property] = arrayFrames.uiLayout
		}
	}

	let layout = {
		properties: properties,
		required: required,
		uiSchema: propertiesUI
	}

	return layout

}
