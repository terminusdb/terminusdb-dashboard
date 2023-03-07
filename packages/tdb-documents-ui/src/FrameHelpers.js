import { makeMandatoryFrames } from "./mandatoryFrames"
import { makeOptionalFrames } from "./optionalFrames"
import * as util from "./utils"
import * as CONST from "./constants"

// function to store reference of document type definition 
// to be used later on ...
function addToReference(args, layout) { 
	let { reference, setReference, type } = args
	// add reference only if not available 
	if(!util.availableInReference(reference, type)) { 
		let tempReference = reference
		tempReference[type] = layout
		setReference(tempReference)
	}
}


export function getProperties (args) {
  let properties = {}, propertiesUI = {}, required = []

	let { documentFrame } = args
    
	for(let property in documentFrame) {

		if(property === "@id") continue
		else if(property === "@key") continue
		else if(property === "@type") continue 
		else if(property === "@id") continue
		else if(property === "@inherits") continue
		else if(property === CONST.DOCUMENTATION) continue
		else if(property === CONST.SUBDOCUMENT) continue
		else if(util.isMandatory(documentFrame, property)) {
			let mandatoryFrames=makeMandatoryFrames(args, property)
			//set property layout & uiLayout
			properties[property] = mandatoryFrames.layout
			propertiesUI[property] = mandatoryFrames.uiLayout
			//set property as required since Mandatory
			required.push(property)
		}
		else if(util.isOptional(documentFrame, property)) { 
			let extractedFrames = util.extractFrames(documentFrame, property)
			// make a copy
			let argsHolder = {...args}
			let documentFrameHolder=argsHolder.documentFrame
			argsHolder.documentFrame=extractedFrames
			let optional = getProperties(argsHolder)
			// place back original document frames
			argsHolder.documentFrame=documentFrameHolder
			let optionalFrames = makeOptionalFrames(optional, property) 
		 
			//set property layout & uiLayout
			properties[property] = optionalFrames.layout
			propertiesUI[property] = optionalFrames.uiLayout
		}
	}

	let layout = {
		properties: properties,
		required: required,
		uiSchema: propertiesUI
	}

	// add to reference
	addToReference(args, layout)

	return layout

}
