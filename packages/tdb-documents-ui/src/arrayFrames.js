import React, { useState } from "react"
import * as util from "./utils"
import * as CONST from "./constants"
import * as helper from "./arrayHelpers/helpers"
import { uiHelper } from "./helpers/uiHelper"
import { typeHelper } from "./helpers/typeHelper"
import * as template from "./arrayHelpers/templates"
import { getPlaceholder } from "./helpers/placeholderHelper"
import { displayCollectionDocument, displayFeatureCollectionDocument } from "./helpers/displayHelper"

/**
 * 
 * @param {*} arrayType - SET/ LIST/ ARRAY
 * @returns minimum number of items to be displayed 
 * if array is of type List then we show at least one entry of array to be required
 * helper.getListMinItems() returns 1 for List ( where min one entry is required )
 * helper.getSetMinItems() returns 0 for Sets/ Array ( where no min entry required )
 */
function getMinItemsToDisplay (arrayType) {
  return arrayType===CONST.LIST ? helper.getListMinItems() : helper.getSetMinItems()
}

/**
 * 
 * @param {*} arrayType - SET/ LIST/ ARRAY
 * @param {*} mode - Create/ Edit or View mode
 * @returns if View mode then return CONST.UI_HIDDEN_ARRAY_OPTIONS where add/ delete/ order
 * components are not displayed
 * For Create/ Edit mode, check the type of array. If type is LIST/ ARRAY then 
 * return CONST.LIST_UI_ARRAY_OPTIONS where ordering components are displayed
 * if arrayType is SET return CONST.SET_UI_ARRAY_OPTIONS where ordering components 
 * are NOT displayed
 */
function getUIArrayOptions (arrayType, mode) {
  if(mode === CONST.VIEW) return CONST.UI_HIDDEN_ARRAY_OPTIONS
  return arrayType===CONST.SET ? CONST.SET_UI_ARRAY_OPTIONS : CONST.LIST_UI_ARRAY_OPTIONS 
}

// copy args document frame manually 
// reason for doing this is to not modify the original frames so we can call
// multiple frameviewer from same page ( mostly used in diffViewer )
function makeACopy(args, property) {
	let argsHolder = {} 
	for(let props in args) {
		if(props === "documentFrame") {
			argsHolder["documentFrame"] = {}
			for( let docProperty in args["documentFrame"]) {
				if(docProperty === property){
					argsHolder["documentFrame"][property] = args["documentFrame"][property].hasOwnProperty(CONST.CLASS) ? 
					args["documentFrame"][property][CONST.CLASS] : args["documentFrame"][property] 
				}
				else argsHolder["documentFrame"][docProperty]=args["documentFrame"][docProperty]
			}	
		}
		else argsHolder[props] = args[props]
	}
	return argsHolder
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
export function makeArrayFrames(args, property, arrayType)  { 
    
	let { mode, documentFrame, fullFrame } = args

	/** gather layout of property  */ 
	// construct new frame to be passed as array 
	let arrayFrame = { [property]: documentFrame[property].hasOwnProperty(CONST.CLASS) ?  
		documentFrame[property][CONST.CLASS] : documentFrame[property] },
		isArray=true

	let layout = { 
		"type": CONST.ARRAY_TYPE,  
		"title": property, 
		"minItems": getMinItemsToDisplay(arrayType), 
    "items": { type: typeHelper (arrayFrame, property, fullFrame, isArray) },
		[CONST.PLACEHOLDER]: getPlaceholder(args.documentFrame[property]) ,
	} 
 

	let argsHolder = makeACopy(args, property)

	if(mode === CONST.VIEW && 
		documentFrame[property].hasOwnProperty(CONST.CLASS) && 
		util.isGeometryCollection(documentFrame[property][CONST.CLASS])) {
		// GEOMETRY COLLECTION VIEW MODE
		function displayGeoCollection(props) {
			return displayCollectionDocument (args, property, props.id) 
		}
		let uiLayout={
			"ui:field": displayGeoCollection
		}
		return { layout, uiLayout }
	}
	if(mode === CONST.VIEW &&  
		documentFrame[property].hasOwnProperty(CONST.CLASS) && 
		documentFrame[property][CONST.CLASS] === CONST.FEATURE && 
		documentFrame.hasOwnProperty("type") && 
		documentFrame["type"][CONST.VALUES][0] === CONST.FEATURE_COLLECTION) {
		// FEATURE COLLECTION VIEW MODE
		function displayFeatureCollection(props) {
			return displayFeatureCollectionDocument (args, property, props.id, props.formData) 
		}
		let uiLayout={
			"ui:field": displayFeatureCollection
		}
		return { layout, uiLayout }
	}
	
 
	function showEachField(props) {
		return template.ArrayFieldTemplate(argsHolder, props, property)
		//return template.ArrayFieldTemplate(args, props, property)
	} 

  let uiLayout={}
	
	uiLayout={
		"ui:options": getUIArrayOptions (arrayType, mode),
		"ui:ArrayFieldTemplate" : showEachField
	}

	return { layout, uiLayout }
}
