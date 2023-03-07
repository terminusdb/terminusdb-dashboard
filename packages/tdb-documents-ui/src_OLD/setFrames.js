import * as util from "./utils"
import * as CONST from "./constants"
import * as helper from "./arrayFrames/helpers"
import {addCustomUI} from "./addCustomUI"
import {generateLabel} from "./helpers/labelHelper"


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
export function makeSetFrames (frame, item, uiFrame, mode, formData, documentation) {
    let uiLayout={} 
     
    let layout={ 
        "type": "array",  
        "title": util.generateTitle(item, formData, mode, documentation),//getPropertyLabelFromDocumentation(item, documentation),
        "minItems": helper.getSetMinItems(mode, formData),
        "items":helper.gatherItemsLayout(frame, item, mode, formData),
        "additionalItems":helper.extractAdditionalLayout(frame, item),
        [CONST.INFO]: CONST.SET,
        "@name": item
    }

    if(mode === CONST.VIEW) {
        // hide Add array button in View mode
        uiLayout=helper.getViewArrayUILayout(frame, item, formData, documentation)
        // hide the widget if no filled data available 
        //if(!util.isFilled(item, formData)) {
          //  uiLayout["ui:widget"] = 'hidden'
        //}
    }
    else { 
        // Create and Edit 
        uiLayout=helper.getArrayUILayout(frame, item, mode, documentation)
    }
    
    // custom ui:schema - add to default ui schema
    //let addedCustomUI=addCustomUI(item, uiFrame, uiLayout)
    //uiLayout=addedCustomUI 
    let generatedCustomUI=addCustomUI(item, uiLayout, uiFrame)
    //console.log("generatedCustomUI", generatedCustomUI)
    let generatedLabel=generateLabel(frame.properties, item, documentation)
    uiLayout["ui:title"]=generatedLabel 

    

    // hide non filled data from View mode
    /*if(mode === CONST.VIEW && formData && Array.isArray(formData) && !formData.length) {
        //uiLayout= { "ui:field" : util.hidden } 
        uiLayout= {"ui:widget":"hidden"}
    }*/

    return {layout, uiLayout}
}
