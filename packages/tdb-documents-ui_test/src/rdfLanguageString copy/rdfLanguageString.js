import {
    CREATE,
    VIEW,
    EDIT
} from "../constants"

import {
    getCreateLayout,
    getCreateUILayout,
    getViewLayout,
    getViewUILayout
} from "./rdfLanguageString.utils"

import {addCustomUI} from "../utils"

// get data type frames
function languageTypeFrames (frame, item, uiFrame, mode, formData, documentation) {
    let properties={}, propertiesUI={}, layout ={}, uiLayout={}

    if (mode === CREATE) {
        layout=getCreateLayout(frame, item, documentation)
        uiLayout=getCreateUILayout(frame, item, uiFrame, documentation)
    }
    /*else if (mode === EDIT) {
        layout=getEditLayout(frame, item, formData, documentation)
        uiLayout=getEditUILayout(frame, item, formData, uiFrame, documentation)
    }*/
    else if (mode === VIEW) {
        layout=getViewLayout(frame, item, formData, documentation)
        uiLayout=getViewUILayout(frame, item, formData, uiFrame, documentation)
    }

    // custom ui:schema - add to default ui schema
    let addedCustomUI=addCustomUI(item, uiFrame, uiLayout)

    // schema
    properties[item] = layout
    // ui schema
    propertiesUI[item] = addedCustomUI

    return {properties, propertiesUI}
}

// get optional frames
export function makeRdfLangDataTypeFrames (frame, item, uiFrame, mode, formData, documentation) {
    let madeFrames = languageTypeFrames (frame, item, uiFrame, mode, formData, documentation)
    let properties = madeFrames.properties
    let propertiesUI = madeFrames.propertiesUI
    return {properties, propertiesUI}
}
