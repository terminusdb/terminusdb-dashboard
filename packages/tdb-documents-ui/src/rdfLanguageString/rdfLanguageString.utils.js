import {
    getTitle, 
    getCommentFromDocumentation, 
    getDefaultValue, 
    addCustomUI, 
    getLabelFromDocumentation, 
    checkIfKey, 
    isFilled
} from "../utils"

import {SUBDOCUMENT_TYPE} from "../constants"

// Create Layout
export function getCreateLayout(frame, item, documentation) { 
    
    let label=getLabelFromDocumentation (item, documentation)

    let layout = {
        type: "object",
        title: label,
        info: SUBDOCUMENT_TYPE, // we treat as sub document type 
        properties: {
            "@lang": {
                "type": "string",
                title: "langauge"
            },
            "@value": {
                "type": "string",
                title: "value"
            }
        }
    }

    return layout 
}


// Create UI Layout
export function getCreateUILayout(frame, item, uiFrame, documentation) {
    
    let title = getTitle(item, checkIfKey(item, frame["@key"]), documentation)
    let description = getCommentFromDocumentation(item, documentation)
    
    let uiLayout = {
        "ui:placeholder": frame[item],
        "ui:title": title,
        "@lang": {
            classNames: "tdb__input mb-3 mt-3",
            "ui:placeholder": "xsd:string"
        },
        "@value": {
            classNames: "tdb__input mb-3 mt-3",
            "ui:placeholder": "xsd:string"
        }
    }   
    if(description) uiLayout["ui:description"]=description
    
    let addedCustomUI=addCustomUI(item, uiFrame, uiLayout)

    uiLayout["classNames"]=`card bg-secondary border-light p-4 mt-4 mb-4`

    return addedCustomUI
}


// View Layout
export function getViewLayout(frame, item, formData, documentation) { 
    
    let label=getLabelFromDocumentation (item, documentation)

    let layout = {
        type: "object",
        title: label,
        info: SUBDOCUMENT_TYPE, // we treat as sub document type 
        properties: {
            "@lang": {
                "type": "string",
                title: "langauge"
            },
            "@value": {
                "type": "string",
                title: "value"
            }
        }
    }

    return layout 
}


// View UI Layout
export function getViewUILayout(frame, item, formData, uiFrame, documentation) {
    
    let title = getTitle(item, checkIfKey(item, frame["@key"]), documentation)
    let description = getCommentFromDocumentation(item, documentation)
    
    let uiLayout = {
        "ui:placeholder": frame[item],
        "ui:title": title,
        "@lang": {
            classNames: "tdb__input mb-3 mt-3",
            "ui:placeholder": "xsd:string"
        },
        "@value": {
            classNames: "tdb__input mb-3 mt-3",
            "ui:placeholder": "xsd:string"
        }
    }   
    if(description) uiLayout["ui:description"]=description
    
    let addedCustomUI=addCustomUI(item, uiFrame, uiLayout)

    uiLayout["classNames"]=`card bg-secondary border-light p-4 mt-4 mb-4`

    return addedCustomUI
}