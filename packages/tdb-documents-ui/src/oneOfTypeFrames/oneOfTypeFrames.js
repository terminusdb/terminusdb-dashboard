import * as CONST from "../constants"
import {getProperties} from "../FrameHelpers"
import * as util from "../utils"
/*@id: "Graduate/48b77e8c7d3d9880ca82e2e5f2f9bf1a8020bdae4fb2ba862c6ae296d69ca41a"
@type: "Graduate"
grade: "A"*/


function getOneOfDocumentLayout(fullFrame, oneOfDocumentName, oneOfDocumentFrame, uiFrame, mode, formData, onTraverse, onSelect, documentation) {
    
    let oneOfDocumentData = formData.hasOwnProperty(oneOfDocumentName) ? formData[oneOfDocumentName] : {}
	


	let exractedProperties = getProperties(fullFrame, oneOfDocumentName, oneOfDocumentFrame, uiFrame, mode, oneOfDocumentData, onTraverse, onSelect, documentation) 
    //console.log("exractedProperties", exractedProperties)
    return exractedProperties
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
export function makeOneOfTypeFrames_OLD (fullFrame, item, frame, uiFrame, mode, formData, onTraverse, onSelect, documentation) {
    let properties={}, uiSchema={}, exractedProperties={}
	//console.log("formData", formData)

	let oneOf = []
   	frame[item].map(oneOfs => {

        for(let oneOfDoc in oneOfs) { 
            let oneOfDocumentName=oneOfDoc
            let oneOfDocumentFrame={ [oneOfDocumentName]: oneOfs[oneOfDoc] }
            exractedProperties=getOneOfDocumentLayout(fullFrame, oneOfDocumentName, oneOfDocumentFrame, uiFrame, mode, formData, onTraverse, onSelect, documentation)
			//console.log("exractedProperties of", exractedProperties)
			
			//add extra choice property so as we know the choice, user has selected  
			exractedProperties["properties"]["@choice"]={
				type: "string",
				default: oneOfDocumentName
			}
			
			//fillExtractedProperties(oneOfDocumentName, mode, exractedProperties, formData)
			
			// populate one of frames
			oneOf.push({
                "title": oneOfDocumentName,
                "type": CONST.OBJECT_TYPE,
                "properties": exractedProperties.properties
				//"required": []
                //"required": [oneOfDocumentName]
            })

			// populate one of ui Layout 
			uiSchema[oneOfDocumentName]= exractedProperties.uiSchema[oneOfDocumentName]
			uiSchema["@choice"]= { "ui:widget": util.hidden }
        }
    })

		
	//let sortedArray = sortOneOfChoices (mode, oneOf, formData)
		
    //oneOf = sortedArray
    

    console.log("oneOf", oneOf)
    return {oneOf, uiSchema} 
}

// mandatory
export function makeOneOfTypeFrames (fullFrame, item, frame, uiFrame, mode, formData, onTraverse, onSelect, documentation) {
    let properties={}, uiSchema={}, exractedProperties={}


	let oneOf = []

   	frame[item].map(oneOfs => {

        for(let oneOfDoc in oneOfs) { 
			
            let oneOfDocumentName=oneOfDoc
            let oneOfDocumentFrame={ [oneOfDocumentName]: oneOfs[oneOfDoc] }
            exractedProperties=getOneOfDocumentLayout(fullFrame, oneOfDocumentName, oneOfDocumentFrame, uiFrame, mode, formData, onTraverse, onSelect, documentation)
			//console.log("exractedProperties of", exractedProperties)
			
			//add extra choice property so as we know the choice, user has selected  
			exractedProperties["properties"]["@choice"]={
				type: "string",
				default: oneOfDocumentName
			}
			
			//fillExtractedProperties(oneOfDocumentName, mode, exractedProperties, formData)
			
			// populate one of frames
			oneOf.push({
                "title": oneOfDocumentName,
                "type": CONST.OBJECT_TYPE,
                "properties": exractedProperties.properties
				//"required": []
                //"required": [oneOfDocumentName]
            })

			// populate one of ui Layout 
			uiSchema[oneOfDocumentName]= exractedProperties.uiSchema[oneOfDocumentName]
			uiSchema["@choice"]= { "ui:widget": util.hidden }
        }
    })

		
	//let sortedArray = sortOneOfChoices (mode, oneOf, formData)
		
    //oneOf = sortedArray
    

    console.log("oneOf", oneOf)
    return {oneOf, uiSchema} 
}
