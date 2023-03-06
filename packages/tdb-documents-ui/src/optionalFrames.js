import React from "react"
import * as util from "./utils"
//import {generateLabel, LabelComponent} from "./helpers/labelHelper"

/**
 * 
 * @param {*} optional - extracted optional frames
 * @param {*} property - property name
 * @returns an optional data field 
 */
export function makeOptionalFrames (optional, property) {
    // extracted frames will already be available at this point
    
    let layout = {}, uiLayout={} 

    if(optional && optional.hasOwnProperty("properties")) {
        layout=optional.properties[property]
    }

    if(optional && optional.hasOwnProperty("uiSchema")) {
        uiLayout = optional.uiSchema[property]
    }

    return {layout, uiLayout}

}