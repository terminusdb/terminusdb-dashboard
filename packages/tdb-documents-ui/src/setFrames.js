import React, { useState } from "react"
import * as util from "./utils"
import * as CONST from "./constants"
import * as helper from "./arrayFrames/helpers"
import { uiHelper } from "./helpers/uiHelper"
import { typeHelper } from "./helpers/typeHelper"
import * as template from "./arrayFrames/templates"
import { getPlaceholder } from "./helpers/placeholderHelper"
import { getDisplay } from "./arrayFrames/fieldDisplay"

// get each field display 
function getFieldDisplay (args, props, property) {


	function handleFieldChange(data, fieldName, something) {
		console.log("data //// ", fieldName, data, something)
		//if(props)
	}
	

	let placeholder=getPlaceholder(args.documentFrame[property]) 
	let newProps = { 
		dataType: placeholder,
		name: property,//props.title,
		//formData: "",
		//formData: fieldData,//getFormData(fieldData, property), 
		mode: args.mode,
		id: props.idSchema["$id"], 
		placeholder: placeholder, 
		className: "tdb__doc__input",
		hideFieldLabel: true,
		onChange: handleFieldChange,
		hideFieldLabel: true
	}  

	let fieldDisplay=getDisplay(newProps, args, property)
	return fieldDisplay
}

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
    
	let { mode, documentFrame, fullFrame } = args

	/** gather layout of property  */ 
	let layout = { 
		"type": CONST.ARRAY_TYPE,  
		"title": property, 
		"minItems": helper.getSetMinItems(),
		"items": { type: typeHelper (documentFrame, property, fullFrame) },// { type: [CONST.STRING_TYPE, CONST.OBJECT_TYPE] },
		[CONST.PLACEHOLDER]: getPlaceholder(args.documentFrame[property]) ,
	} 
 
	let argsHolder = {...args}

	argsHolder.documentFrame[property] = documentFrame[property].hasOwnProperty(CONST.CLASS) ? 
		documentFrame[property][CONST.CLASS] : documentFrame[property]
 
	function showEachField(props) {
		return template.ArrayFieldTemplate(args, props, property)
	} 

  let uiLayout={}
	
	uiLayout={
		"ui:options": mode === CONST.VIEW ? CONST.SET_UI_HIDDEN_ARRAY_OPTIONS : CONST.SET_UI_ARRAY_OPTIONS,
		"ui:ArrayFieldTemplate" : showEachField
	}

	return {layout, uiLayout}
}
