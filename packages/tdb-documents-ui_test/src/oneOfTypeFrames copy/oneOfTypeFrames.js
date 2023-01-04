<<<<<<< HEAD
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

// sort the one of choices so as the filled value appears first in the list 
function  sortOneOfChoices (mode, oneOf, formData) {
	if(mode === CONST.CREATE) return oneOf
	let sortedArray=[], filled = []

	/*if(Array.isArray(formData)) { 
		formData.map(data => {
			for(let props in data) {
				if(props === "@id") continue
				else if(props === "@type") continue
				else {
					let filledValue = oneOf.filter( arr => arr.title === props)
					filled.push(filledValue)
				}
			}
		})
	}*/
	


	oneOf.map( arr => {
		let choice = Object.keys(arr.properties)[0]
		if(arr.properties[choice].hasOwnProperty("default") && 
			arr.properties[choice]["default"]) {
				// selected choice - so this should be displayed as the first option in the list of choices
				filled.push(arr)
			}
	})
	// copy array with first element being the filled element 
	sortedArray = [...new Set([...filled, ...oneOf])]
	console.log("sortedArray", sortedArray)
	//sortedArray=filled
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
	//console.log("formData", formData)

	let oneOf = []
   	frame[item].map(oneOfs => {
        for(let oneOfDoc in oneOfs) { 
            let oneOfDocumentName=oneOfDoc
            let oneOfDocumentFrame={[oneOfDocumentName]: oneOfs[oneOfDoc]}
            exractedProperties=getOneOfDocumentLayout(fullFrame, oneOfDocumentName, oneOfDocumentFrame, uiFrame, mode, formData, onTraverse, onSelect, documentation)
			//console.log("exractedProperties of", exractedProperties)
			
			//add extra choice property so as we know the choice, user has selected  
			exractedProperties["properties"]["@choice"]={
				type: "string",
				default: oneOfDocumentName
			}
			
			fillExtractedProperties(oneOfDocumentName, mode, exractedProperties, formData)
			
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
    

    //console.log("oneOf", oneOf)
    return {oneOf, uiSchema} 
=======
import {
    CREATE,
    VIEW,
    EDIT
} from "../constants"

import {SYS_UNIT_DATA_TYPE, ONEOFVALUES} from "../constants"
import {getTitle, getDefaultValue, checkIfKey, isFilled} from "../utils"
import {
    getCreateDocumentLayout,
    getViewDocumentLayout,
    getCreateSysUnitDocumentLayout,
    getViewSysUnitDocumentLayout
} from "./oneOfTypeFrames.utils"

import {addCustomUI} from "../utils"

/** sorts the list of chosen one ofs on select  */
function sortOneOfs (anyOfArray, formData, mode) {
    if(mode === CREATE) return anyOfArray
    if(mode === EDIT) {
        let sorted = []
        // add on form Data 
        anyOfArray.map(aOf => {
            if(aOf.hasOwnProperty("title")) {
                if(formData.hasOwnProperty(aOf["title"])) { // filled match found
                    sorted.push(aOf)
                }
            }
        })
        return sorted
    }
    if(mode === VIEW) {
        let sorted = []
        // add on form Data 
        anyOfArray.map(aOf => {
            if(aOf.hasOwnProperty("title")) {
                if(formData.hasOwnProperty(aOf["title"])) { // filled match found
                    sorted.push(aOf)
                }
            }
        })
        return sorted
    }
}

// get one of  type frames
function oneOfTypeFrames (fullFrame, current, frame, item, uiFrame, mode, formData, onTraverse, onSelect, documentation, language) {

    let properties={}, propertiesUI={}

    // get choice documents
    let anyOfArray = []

    //layout
    frame[item].map(fr => {
        for(var oneOf in fr) {
            let documentName=fr[oneOf]
            let currentChoice=oneOf
            if(documentName !== SYS_UNIT_DATA_TYPE) {
                if(mode!==VIEW){
                    anyOfArray.push(getCreateDocumentLayout(documentName, fullFrame, currentChoice, item, uiFrame, mode, formData, onTraverse, onSelect, documentation, language))
                }
                else anyOfArray.push(getViewDocumentLayout(documentName, fullFrame, currentChoice, item, uiFrame, mode, formData, onTraverse, onSelect, documentation, language))
            }
            else if(documentName === SYS_UNIT_DATA_TYPE) {
                if(mode!==VIEW){
                    anyOfArray.push(getCreateSysUnitDocumentLayout(documentName, fullFrame, currentChoice, item, uiFrame, mode, formData, onTraverse, onSelect))
                }
                else anyOfArray.push(getViewSysUnitDocumentLayout(documentName, fullFrame, currentChoice, item, uiFrame, mode, formData, onTraverse, onSelect))
            }
        }
    })


    let sortedArray = sortOneOfs (anyOfArray, formData, mode)

    /*@type: "Test"
    normal: "asdsadasd" */

    let layout = {
        type: 'object',
        info: ONEOFVALUES,
        title: item,
        description: `Choose ${item} from the list ...`,
        anyOf: sortedArray.length === 0 ? anyOfArray : sortedArray
    }

    //ui layout
    let uiLayout = {
        //"ui:title": getTitle(item, checkIfKey(item, frame["@key"])),
        classNames: "tdb__input mb-3 mt-3"
    } 

    //console.log("qqq layout", layout)

    if(layout.hasOwnProperty("anyOf") && Array.isArray(layout.anyOf)) {

        layout.anyOf.map(aOf => {
            if(aOf.hasOwnProperty("properties")) {
                for(var ui in aOf.uiProperties) {
                    uiLayout[ui]=aOf.uiProperties[ui]
                }
            }
        })
    }

    // custom ui:schema - add to default ui schema
    let addedCustomUI=addCustomUI(item, uiFrame, uiLayout)

    // schema
    properties[current] = layout
    // ui schema
    propertiesUI[current] = addedCustomUI

    
    // diffs
    if(mode === VIEW) {
        if(uiFrame && uiFrame.hasOwnProperty(current) && uiFrame[current].hasOwnProperty("ui:diff")) {
            for(let diff in uiFrame[current]["ui:diff"]) {
                if(uiLayout.hasOwnProperty(diff)) {
                    if(uiFrame[current]["ui:diff"][diff].hasOwnProperty("ui:field")) {
                        uiLayout[diff]={"ui:field":uiFrame[current]["ui:diff"][diff]["ui:field"]}
                    }
                    else {
                        // fill in properties 
                        for(let it in uiFrame[current]["ui:diff"][diff]){
                            if(uiLayout[diff].hasOwnProperty(it)){
                                uiLayout[diff][it]=uiFrame[current]["ui:diff"][diff][it]
                            } 
                            if(it === "styleObject") {
                                // subdocuments border css for diffs
                                var css=""
                                for(let style in uiFrame[current]["ui:diff"][diff]["styleObject"]) {
                                    css=css + " " + uiFrame[current]["ui:diff"][diff]["styleObject"][style]
                                }
                                uiLayout[diff]["classNames"] = uiLayout[diff]["classNames"] + " " + css
                            }
                        }
                    }
                }
            }
            
            propertiesUI[current] = uiLayout
        }
    }
    


    return {properties, propertiesUI}
}
 
// mandatory
export function makeOneOfTypeFrames (fullFrame, current, frame, item, uiFrame, mode, formData, onTraverse, onSelect, documentation, language) {
    let madeFrames = oneOfTypeFrames (fullFrame, current, frame, item, uiFrame, mode, formData, onTraverse, onSelect, documentation, language)

    let properties = madeFrames.properties
    let propertiesUI = madeFrames.propertiesUI
    return {properties, propertiesUI}
>>>>>>> 016fb4099452768cf2c4aad1c25049196510c028
}
