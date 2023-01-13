import React from "react"
import * as CONST from "./constants"
import * as util from "./utils"



/**
 * 
 * @param {*} args - includes item (property), generatedUILayout (default property UI), uiFrame (custom ui frames)
 * @returns customised ui frames to alter look and feel of property field
 */
export function addCustomUI (item, generatedUILayout, uiFrame){

	// if no custom ui found for field, return default generated UI 
	if(!uiFrame) return generatedUILayout
	if(!uiFrame.hasOwnProperty(item)) return generatedUILayout
	let customUI=generatedUILayout

	// loop through uiFrames
	for(let uiItems in uiFrame[item]){
		
		switch (uiItems) {
			case CONST.CLASSNAME: {
				customUI[CONST.CLASSNAME]=util.addCustomClassNames(generatedUILayout, uiFrame[item])
				break
			}
			case CONST.PLACEHOLDER: {
				customUI["ui:placeholder"]=util.addPlaceholder(uiFrame[item])
				break
			}
			case CONST.TITLE: {
				customUI["ui:title"]=util.addTitle(uiFrame[item])
				break
			}
			case CONST.DESCRIPTION: {
				customUI["ui:description"]=util.addDescription(uiFrame[item])
				break
			}
			case CONST.WIDGET: {
				customUI["ui:widget"]=util.displayWidget(uiFrame[item])
				break
			}
			case CONST.DIFF: {
				console.log("uiFrame[item]", uiFrame[item])
				customUI["ui:field"]=uiFrame[item][CONST.DIFF]
			}
			default:
            	break
		}
	}
	//console.log("customUI", customUI)
	return customUI
}
 