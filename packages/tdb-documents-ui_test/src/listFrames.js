import * as util from "./utils"
import * as CONST from "./constants"
import * as helper from "./arrayFrames/helpers"
import {generateLabel} from "./helpers/labelHelper"
import {getInfo} from "./helpers/infoHelper"
import {addCustomUI} from "./addCustomUI"

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
export function makeListFrames (frame, item, uiFrame, mode, formData, documentation) {
    let uiLayout={}
    
    let layout={  
        "type": "array", 
        "minItems": helper.getListMinItems(mode, formData), 
        //"title": item, //util.getLabelFromDocumentation(item, documentation),//getPropertyLabelFromDocumentation(item, documentation),
        "items":helper.gatherItemsLayout(frame, item, mode, formData),
        "additionalItems":helper.extractAdditionalLayout(frame, item),
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
        uiLayout=helper.getListArrayUILayout(frame, item, documentation)
    }

    let generatedCustomUI=addCustomUI(item, uiLayout, uiFrame)

    let generatedLabel=generateLabel(frame.properties, item, documentation)
    uiLayout["ui:title"]=generatedLabel
    //uiLayout["ui:title"]="BUMBY"
    // custom ui:schema - add to default ui schema
    //let addedCustomUI=addCustomUI(item, uiFrame, uiLayout)
    //uiLayout=addedCustomUI
    // hide non filled data from View mode
    // hide non filled data from View mode
    /*if(mode === CONST.VIEW && formData && Array.isArray(formData) && !formData.length) {
        //uiLayout= { "ui:field" : util.hidden } 
        uiLayout= {"ui:widget":"hidden"}
    }*/
 
    return {layout, uiLayout}
}
