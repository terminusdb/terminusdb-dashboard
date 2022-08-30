import {getTitle, getEnumTitle, getDefaultValue, checkIfKey, getLabelFromEnumDocumentation, getLabelFromDocumentation, isFilled, addCustomUI} from "../utils"
import {
    ENUM
} from "../constants"



// Create Layout
export function getCreateLayout(frame, item, documentation) {
    let enumDocumentation=getLabelFromEnumDocumentation(item, documentation, frame[item]["@values"]) 
    
    let layout = {
        type: 'string',
        info: ENUM,
        enum: enumDocumentation["@values"],
        title: enumDocumentation["@label"]
    } 

    return layout
}

// Create UI Layout  
export function getCreateUILayout(frame, item, uiFrame, documentation) {
    //let label = getLabelFromDocumentation(item, documentation) 
    let enumDocumentation=getLabelFromEnumDocumentation(item, documentation, frame[item]["@values"]) 
    let label=item
    if(enumDocumentation.hasOwnProperty("@label")) label=enumDocumentation["@label"]
    let uiLayout = {
        "ui:title": getEnumTitle(item, checkIfKey(item, frame[item]["@key"]), label),
        "ui:placeholder": `Select ${label} ...`,
        classNames: "tdb__input mb-3 mt-3"
    }
    // custom ui:schema - add to default ui schema
    let addedCustomUI=addCustomUI(item, uiFrame, uiLayout)
    return addedCustomUI
}

// Edit Layout
export function getEditLayout(frame, item, formData, documentation) {
    let enumDocumentation=getLabelFromEnumDocumentation(item, documentation, frame[item]["@values"]) 
    let layout = {
        type: 'string',
        info: ENUM,
        enum: enumDocumentation["@values"],
        title: enumDocumentation["@label"]
    }

    // get default value
    let defaultValue=getDefaultValue(item, formData)
    if(defaultValue) layout["default"]=defaultValue
    return layout
}

// Edit UI Layout
export function getEditUILayout(frame, item, formData, uiFrame, documentation) {
    //let label = getLabelFromDocumentation(item, documentation) 
    let enumDocumentation=getLabelFromEnumDocumentation(item, documentation, frame[item]["@values"]) 
    let label=enumDocumentation["@label"]
    let uiLayout = {
        "ui:title": getEnumTitle(item, checkIfKey(item, frame[item]["@key"]), label),
        "ui:placeholder": `Select ${label} ...`,
        classNames: "tdb__input mb-3 mt-3",
        "ui:disabled": checkIfKey(item, frame[item]["@key"]) && isFilled(formData, item) ? true : false
    }

    // custom ui:schema - add to default ui schema
    let addedCustomUI=addCustomUI(item, uiFrame, uiLayout)
    return addedCustomUI
}

// View Layout
export function getViewLayout(frame, item, formData, documentation) {
    let enumDocumentation=getLabelFromEnumDocumentation(item, documentation, frame[item]["@values"]) 
    let layout = {
        type: 'string',
        info: ENUM,
        enum: enumDocumentation["@values"],
        title: enumDocumentation["@label"]
    }

    // get default value
    let defaultValue=getDefaultValue(item, formData)
    if(defaultValue) layout["default"]=defaultValue
    return layout
}

// View UI Layout
export function getViewUILayout(frame, item, formData, uiFrame, documentation) {
    let uiLayout={}
    // hide widget if formData of item is empty
    // check for info - coz at this point there mayb be data
    // fields which belongs to subdocument sets and we do not want to hide the widget
    if(!isFilled(formData, item)
        && !frame.hasOwnProperty("info")) {
        uiLayout={ "ui:widget" : "hidden" }
        return uiLayout
    }

    //let label = getLabelFromDocumentation(item, documentation) 
    let enumDocumentation=getLabelFromEnumDocumentation(item, documentation, frame[item]["@values"]) 
    let label=enumDocumentation["@label"]
    uiLayout= {
        "ui:title": getEnumTitle(item, checkIfKey(item, frame[item]["@key"]), label),
        "ui:placeholder": `Select ${label} ...`,
        classNames: "tdb__input mb-3 mt-3 tdb__view__enum__input"
    }
    // custom ui:schema - add to default ui schema
    let addedCustomUI=addCustomUI(item, uiFrame, uiLayout)
    return addedCustomUI
}