
import {getLabelFromEnumDocumentation} from "../documentationTemplates"
import * as util from "../utils"
import * as CONST from "../constants"
import React from "react"

export function makeEnumTypeFrames (fullFrame, frame, item, uiFrame, mode, formData, documentation) {
    let enumClassName=frame[item]["@id"]
    if(!enumClassName) {
        throw new Error (`Expected to get enum class name from frames, but instead received ${enumClassName}`)
    }
    //let extractedDocumentation = getEnumDocumentation(fullFrame, enumClassName)
    let language=fullFrame[CONST.SELECTED_LANGUAGE]
    let extractedDocumentation = util.extractDocumentation(fullFrame, enumClassName, language)
    let enumDocumentation=getLabelFromEnumDocumentation(item, extractedDocumentation, frame[item]["@values"])
    return {enum: enumDocumentation["@values"]}  
}

export function getUILayout (fullFrame, frame, item, uiFrame, mode, formData, documentation) {
    
    let label=item
    //let enumDocumentation=getLabelFromEnumDocumentation(item, documentation, frame[item]["@values"]) 
    //if(enumDocumentation.hasOwnProperty("@label")) label=enumDocumentation["@label"]
    
    let uiLayout = {
        "ui:placeholder": `Select ${label} ...`,
        //"ui:description": getUI(),
        classNames: "tdb__input mb-3 mt-3"
    }

    return uiLayout
}
