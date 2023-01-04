import React from "react"
import * as util from "./utils"
import {generateLabel, LabelComponent} from "./helpers/labelHelper"

/**
 * 
 * @param {*} frame - frame of document
 * @param {*} item - property 
 * @param {*} uiFrame - custom UI to change appearance
 * @param {*} mode - mode in which FrameViewer is being called
 * @param {*} formData - filled data to be displayed in form 
 * @returns a data field 
 */
export function makeOptionalFrames (frame, item, uiFrame, mode, formData, documentation) {
    // extracted frames will already be available at this point
    //console.log("optionalFrames ...", frame)
    
    let layout = {}, uiLayout={} 

    if(frame && frame.hasOwnProperty("properties")) {
        layout=frame.properties[item]
    }

    if(frame && frame.hasOwnProperty("uiSchema")) {
        let ui = util.removeRequired(item, documentation, frame.uiSchema[item])
        uiLayout=ui
        let generatedLabel=generateLabel(frame.properties, item, documentation)
        uiLayout["ui:title"]=generatedLabel
    }

    return {layout, uiLayout}

}