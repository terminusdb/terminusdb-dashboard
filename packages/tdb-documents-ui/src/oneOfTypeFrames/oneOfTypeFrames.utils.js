 
import React from "react"
import * as CONST from "../constants"

function gatherUI (extracted) {
    let uiLayout={}
    for(let ui in extracted) {
        if(typeof extracted[ui] === CONST.OBJECT_TYPE) {
            uiLayout[ui]=gatherUI(extracted[ui])
        }
        else uiLayout[ui]=extracted[ui]
    }
    return uiLayout
}

export function  getUILayout(extractedFrames, frame, item, uiFrame, mode, formData, onSelect, onTraverse, documentation) {
    let uiLayout= {} 
 
    
    /*for(let ui in extractedFrames.uiSchema) {
        uiLayout[ui]=extractedFrames.uiSchema[ui]
    }*/

    if(extractedFrames.hasOwnProperty("anyOfUiSchema")) {
        uiLayout=gatherUI(extractedFrames["anyOfUiSchema"])
    }
    uiLayout["classNames"]=`card bg-secondary p-4 mt-4 mb-4 tdb__anyOf__frames`
    //uiLayout["from"]={"ui:placeholder": "kitty"}
    console.log("one of ui, ", extractedFrames, uiLayout, uiLayout.uiSchema)

    return uiLayout
} 