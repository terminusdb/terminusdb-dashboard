 
import React from "react"
import * as CONST from "../constants"

export function  getUILayout(extractedFrames, frame, item, uiFrame, mode, formData, onSelect, onTraverse, documentation) {
    let uiLayout= {} 

    uiLayout["classNames"]=`card bg-secondary p-4 mt-4 mb-4 `
    for(let ui in extractedFrames.uiSchema) {
        uiLayout[ui]=extractedFrames.uiSchema[ui]
    }

    //console.log("one of ui, ", uiLayout, uiLayout.uiSchema)

    return uiLayout
} 