import React from "react"
import * as util from "../utils"
import * as CONST from "../constants"
import * as template from "./templates"
import { display } from "../helpers/widgetHelper"


/**
 * 
 * @returns length of array to populate number of already stored fields in edit mode for Set
 */
export function getSetMinItems() {
  return 0
}

/**
 * 
 * @returns length of array to populate number of already stored fields in edit mode for List
 */
 export function getListMinItems() {
  return 1
}

/**
 * 
 * @param {*} frame - frame of document
 * @param {*} item - current property
 * @returns UI Layout for Set Array when in View Mode by hiding the add array button from view
 */ 
 export function getViewArrayUILayout (mode, dataFrames, property, extractedDocumentation) {

	function showEachViewField(props) {
		return template.ArrayFieldTemplate(props, dataFrames, property, mode, extractedDocumentation)
	}

	let uiLayout={
			"ui:options": CONST.SET_UI_HIDDEN_ARRAY_OPTIONS,
			"ui:ArrayFieldTemplate" : showEachViewField
	}

	return uiLayout
}


/**
 * 
 * @param {*} frame - frame of document
 * @param {*} item - current property
 * @returns UI Layout for Set Array  
 */ 
 export function getArrayUILayout (mode, dataFrames, property, extractedDocumentation) {

	function showEachField(props) {
		return template.ArrayFieldTemplate(props, dataFrames, property, mode, extractedDocumentation)
	}

	let uiLayout={}
	// default ui
	uiLayout={
		"ui:options": CONST.SET_UI_ARRAY_OPTIONS,
		"ui:ArrayFieldTemplate" : showEachField
	}
	return uiLayout
} 


/**
 * 
 * @param {*} dataFrames - frame of data type 
 * @param {*} property - property of interest 
 * @returns returns item layout
 */ 
 export function gatherItemsLayout (dataFrames, property, formData) {
	if(!dataFrames.properties.hasOwnProperty(property)) {
		throw new Error (`Expected dataframes to have ${property} definition inside ... `)
	} 
	return dataFrames.properties[property]
}

/**
 * 
 * @param {*} dataFrames - frame of document
 * @param {*} property - current property
 * @returns default layout without default populated in it
 */
 export function extractAdditionalLayout (dataFrames, property) {
	if(!dataFrames.properties.hasOwnProperty(property)) {
		throw new Error (`Expected dataframes to have ${property} definition inside ... `)
	}
	return dataFrames.properties[property]
}



