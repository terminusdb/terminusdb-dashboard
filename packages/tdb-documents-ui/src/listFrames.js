import * as util from "./utils"
import * as CONST from "./constants"
import * as helper from "./arrayFrames/helpers"


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
export function makeListFrames (args, dataFrames, property) {
    let uiLayout={} , layout ={}
    let { mode, extractedDocumentation } = args
     
    /*let layout={ 
        "type": CONST.ARRAY_TYPE,  
        "title": property,
        "minItems": helper.getListMinItems(),
        "items": { type: dataFrames.properties[property].type }
    }

    if(mode === CONST.VIEW) {
        // hide Add array button in View mode
        uiLayout=helper.getViewArrayUILayout(mode, dataFrames, property, extractedDocumentation)
    }
    else { 
        // Create and Edit 
        uiLayout=helper.getArrayUILayout(mode, CONST.LIST, dataFrames, property, extractedDocumentation)
    }  */
    

    
    return {layout, uiLayout}
}
