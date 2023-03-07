 
import React from "react"
import * as CONST from "../constants"



export function  getUILayout(extractedFrames) {
    let uiLayout= {} 
    
    console.log("extractedFrames.anyOfUiSchema",extractedFrames.anyOfUiSchema)

    uiLayout=extractedFrames.anyOfUiSchema
    uiLayout["classNames"]=`card bg-secondary p-4 mt-4 mb-4 tdb__anyOf__frames`
    uiLayout["@type"]={"ui:widget": "hidden"}

    return uiLayout
} 