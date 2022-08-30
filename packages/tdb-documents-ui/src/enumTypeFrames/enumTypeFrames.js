import {
    CREATE,
    VIEW,
    EDIT
} from "../constants"
import {
    getCreateLayout,
    getCreateUILayout,
    getEditLayout,
    getEditUILayout,
    getViewLayout,
    getViewUILayout
} from "./enumTypeFrames.utils"
import {addCustomUI, extractEnumDocumentation} from "../utils"


// get enum type frames
function enumTypeFrames (fullframe, frame, item, uiFrame, mode, formData, documentation) {
    let properties={}, propertiesUI={}, layout ={}, uiLayout={}
    
    let enumClass=frame[item]["@id"]
    
    let enumDocumentation=extractEnumDocumentation(fullframe, enumClass, documentation)

    if (mode === CREATE) {
        layout=getCreateLayout(frame, item, enumDocumentation)
        uiLayout=getCreateUILayout(frame, item, uiFrame, enumDocumentation)
    }
    else if (mode === EDIT) {
        layout=getEditLayout(frame, item, formData, enumDocumentation)
        uiLayout=getEditUILayout(frame, item, formData, uiFrame, enumDocumentation)
    }
    else if (mode === VIEW) {
        layout=getViewLayout(frame, item, formData, enumDocumentation)
        uiLayout=getViewUILayout(frame, item, formData, uiFrame, enumDocumentation)
    }

    // custom ui:schema - add to default ui schema
    let addedCustomUI=addCustomUI(item, uiFrame, uiLayout)

    // schema
    properties[item] = layout
    // ui schema
    propertiesUI[item] = addedCustomUI

    return {properties, propertiesUI}
}

// mandatory
export function makeEnumTypeFrames (fullframe, frame, item, uiFrame, mode, formData, documentation) {
    let madeFrames = enumTypeFrames (fullframe, frame, item, uiFrame, mode, formData, documentation)

    let properties = madeFrames.properties
    let propertiesUI = madeFrames.propertiesUI
    return {properties, propertiesUI}
}
