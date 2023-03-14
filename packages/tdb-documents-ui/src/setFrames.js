import React from "react"
import * as util from "./utils"
import * as CONST from "./constants"
import * as helper from "./arrayFrames/helpers"
import { uiHelper } from "./helpers/uiHelper"
import { typeHelper } from "./helpers/typeHelper"
import { getDisplay } from "./arrayFrames/fieldDisplay"
import * as template from "./arrayFrames/templates"

/**
 * 
 * @param {*} frame - frame of document
 * @param {*} item - property 
 * @param {*} uiFrame - custom UI to change appearance
 * @param {*} mode - mode in which FrameViewer is being called
 * @param {*} formData - filled data to be displayed in form 
 * @param {*} documentation - formData - filled data to be displayed in form 
 * @returns a data field 
 */  
export function makeSetFrames(args, property)  {
    
	let { mode, documentFrame } = args
		
	/*let layout={ 
		"type": CONST.ARRAY_TYPE,  
		"title": property,
		"minItems": helper.getSetMinItems(),
		"items": { type: dataFrames.properties[property].type }
	}

	if(mode === CONST.VIEW) {
			// hide Add array button in View mode
			uiLayout=helper.getViewArrayUILayout(args, dataFrames, property)
	}
	else { 
			// Create and Edit 
			uiLayout=helper.getArrayUILayout(args, CONST.SET, dataFrames, property)
	} */
    


	/** gather layout of property  */ 
	let layout = { 
		"type": CONST.ARRAY_TYPE,  
		"title": property,
		"minItems": helper.getSetMinItems(),
		"items": { type: "string" }
	} 

	let argsHolder = {...args}
	if(!documentFrame[property].hasOwnProperty(CONST.CLASS)) {
		throw new Error (`Expected to have class defintion for Set frames ...`)
	}
	argsHolder.documentFrame[property] = documentFrame[property][CONST.CLASS]
 
	function showEachField(props) {
		return template.ArrayFieldTemplate(args, props, null, property)
	}

  let uiLayout={}
	
	uiLayout={
		"ui:options": mode === CONST.VIEW ? CONST.SET_UI_HIDDEN_ARRAY_OPTIONS : CONST.SET_UI_ARRAY_OPTIONS,
		"ui:ArrayFieldTemplate" : showEachField
	}

	return {layout, uiLayout}
}
