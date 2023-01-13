import * as CONST from "../constants"
import {getProperties} from "../FrameHelpers"

/*@id: "Graduate/48b77e8c7d3d9880ca82e2e5f2f9bf1a8020bdae4fb2ba862c6ae296d69ca41a"
@type: "Graduate"
grade: "A"*/


function getOneOfDocumentLayout(fullFrame, oneOfDocumentName, oneOfDocumentFrame, uiFrame, mode, formData, onTraverse, onSelect, documentation) {
    
    let oneOfDocumentData = formData.hasOwnProperty(oneOfDocumentName) ? formData[oneOfDocumentName] : {}
    let exractedProperties = getProperties(fullFrame, oneOfDocumentName, oneOfDocumentFrame, uiFrame, mode, oneOfDocumentData, onTraverse, onSelect, documentation) 
    console.log("exractedProperties", exractedProperties)
    return exractedProperties
}

// sort the one of choices so as the filled value appears first in the list 
function  sortOneOfChoices (mode, oneOf) {
	if(mode === CONST.CREATE) return oneOf
	let sortedArray=[], filled = []
	oneOf.map( arr => {
		let choice = Object.keys(arr.properties)[0]
		if(arr.properties[choice].hasOwnProperty("default") && 
			arr.properties[choice]["default"]) {
				// selected choice - so this should be displayed as the first option in the list of choices
				filled.push(arr)
			}
	})
	// copy array with first element being the filled element 
	//sortedArray = [...new Set([...filled,...oneOf])]
	sortedArray=filled
	return sortedArray
}
 
function fillExtractedProperties (oneOfDocumentName, mode, exractedProperties, formData, ) {
	if(mode === CONST.CREATE) return exractedProperties
	// fill in default values 
	if(formData && formData.hasOwnProperty(oneOfDocumentName)) {
		if(exractedProperties.properties.hasOwnProperty(oneOfDocumentName)) {
			exractedProperties.properties[oneOfDocumentName]["default"]=formData[oneOfDocumentName]
		}
	}
}


// mandatory
export function makeOneOfTypeFrames (fullFrame, item, frame, uiFrame, mode, formData, onTraverse, onSelect, documentation) {
    let properties={}, uiSchema={}, exractedProperties={}
	console.log("formData", formData)
	let oneOf = []
    frame[item].map(oneOfs => {
        for(let oneOfDoc in oneOfs) {
            let oneOfDocumentName=oneOfDoc
            let oneOfDocumentFrame={[oneOfDocumentName]: oneOfs[oneOfDoc]}
            exractedProperties=getOneOfDocumentLayout(fullFrame, oneOfDocumentName, oneOfDocumentFrame, uiFrame, mode, formData, onTraverse, onSelect, documentation)
            
			fillExtractedProperties(oneOfDocumentName, mode, exractedProperties, formData)
			
			// populate one of frames
			oneOf.push({
                "title": oneOfDocumentName,
                "type": CONST.OBJECT_TYPE,
                "properties": exractedProperties.properties,
                "required": [oneOfDocumentName]
            })
			// populate one of ui Layout 
			uiSchema[oneOfDocumentName]= exractedProperties.uiSchema[oneOfDocumentName]
        }
    })

		
	//let sortedArray = sortOneOfChoices (mode, oneOf)
		
    //oneOf = sortedArray
    oneOf = [
		{	
			"title": "One",
			"type": "object",
			"properties": {
				"lorem": {
					"type": "string",
				"default": "kjdh"
				}
			},
			"required": [
				"lorem"
			]
		},
		{	
			"title": "two",
			"type": "object",
			"properties": {
				"ipsum": { 
					"type": "string"
				}
			},
			"required": [
				"ipsum"
			]
		}
	]

    console.log("oneOf", oneOf)
    return {oneOf, uiSchema} 
}
