import {addCustomUI} from "../utils"
import {getLayout, getUILayout} from "./dataType.utils" 
 
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
export function makeDataTypeFrames (frame, item, uiFrame, mode, formData, documentation) {
    let layout ={}, uiLayout={}

    //layout=getLayout(frame, item, mode, formData, documentation)
    uiLayout=getUILayout(frame, item, mode, formData, uiFrame, documentation)

    // custom ui:schema - add to default ui schema
    uiLayout=addCustomUI(item, uiFrame, uiLayout)

    return {layout, uiLayout}
}
