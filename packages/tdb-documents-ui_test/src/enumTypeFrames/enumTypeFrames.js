
import {getLabelFromEnumDocumentation} from "../documentationTemplates"
import * as util from "../utils"


export function makeEnumTypeFrames (fullFrame, frame, item, uiFrame, mode, formData, documentation) {
    let enumDocumentation=getLabelFromEnumDocumentation(item, documentation, frame[item]["@values"])
    return {enum: enumDocumentation["@values"]} 
}

export function getUILayout (fullFrame, frame, item, uiFrame, mode, formData, documentation) {
    
    let label=item
    //let enumDocumentation=getLabelFromEnumDocumentation(item, documentation, frame[item]["@values"]) 
    //if(enumDocumentation.hasOwnProperty("@label")) label=enumDocumentation["@label"]
 
    let uiLayout = {
        //"ui:title": getEnumTitle(item, checkIfKey(item, frame[item]["@key"]), label),
        //"ui:title": util.getTitle(item, util.checkIfKey(item, frame[item]["@key"]), documentation),
        "ui:placeholder": `Select ${label} ...`,
        classNames: "tdb__input mb-3 mt-3"
    }

    return uiLayout
}
