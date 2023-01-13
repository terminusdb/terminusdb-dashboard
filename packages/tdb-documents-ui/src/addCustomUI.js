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

	if(Array.isArray(uiFrame[item])) {
		// diff element of a subdocument 
		uiFrame[item].map(uiElements => {
			for(let property in uiElements) { 
				if(property === CONST.CLASSNAME) {
					// adds on border color to subdocument 
					customUI[property] =  `${customUI[property]} ${uiElements[property]}`
				}
				else if(customUI.hasOwnProperty(property) && 
					customUI[property].hasOwnProperty(CONST.CLASSNAME)) {
						// adds on diff color to subdocument properties
						customUI[property][CONST.CLASSNAME] =  `${customUI[property][CONST.CLASSNAME]} ${uiElements[property][CONST.CLASSNAME]}`
				}
			}
		})
		return customUI
	}

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
				//console.log("uiFrame[item]", uiFrame[item])
				customUI["ui:field"]=uiFrame[item][CONST.DIFF]
			}
			default:
            	break
		}
	}
	//console.log("customUI", customUI)
	return customUI
}
 