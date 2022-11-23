import {
    getSubDocumentTitle, 
    getSubDocumentDescription, 
    getCommentFromDocumentation,
    getDefaultValue, 
    isFilled, 
    addCustomUI, 
    extractUIFrameSubDocumentTemplate
} from "../utils"
import {SUBDOCUMENT_TYPE} from "../constants"
import {addCustomUISubDocuments} from "../utils"


// create layout
export function getCreateLayout (frame, item) {
    let layout= {
        type: "object",
        title: item,
        info: SUBDOCUMENT_TYPE,
        properties: frame.properties
        //required: Array.isArray(frame.required) ? frame.required : []
    }

    return layout
}

// create ui layout
export function getCreateUILayout (frame, item, uiFrame, documentation) { 
    let uiLayout= {}
    let subDocuemntBg = extractUIFrameSubDocumentTemplate(uiFrame) ? extractUIFrameSubDocumentTemplate(uiFrame) : 'bg-secondary'
    if(frame.hasOwnProperty("uiSchema")) {
        uiLayout=frame["uiSchema"]
    }
    uiLayout["ui:field"]="collapsible"
    uiLayout["collapse"]={
        field: "ObjectField",
        classNames:"tdb__subdocument__collapse_headers"
    }
    uiLayout["classNames"]=`card ${subDocuemntBg} p-4 mt-4 mb-4`
    let description = getCommentFromDocumentation(item, documentation, true)
    uiLayout["ui:description"]=getSubDocumentDescription(item, description) 
    uiLayout["ui:title"]=getSubDocumentTitle(item, documentation)
    // custom ui:schema - add to default ui schema
    let addedCustomUI=addCustomUI(item, uiFrame, uiLayout) 
    return addedCustomUI
}

// edit layout
export function getEditLayout (frame, item, formData) {
    let layout= {
        type: "object",
        title: item,
        info: SUBDOCUMENT_TYPE,
        properties: frame.properties
        //required: Array.isArray(frame.required) ? frame.required : []
    }

    // get default value
    let defaultValue=getDefaultValue(item, formData)
    if(defaultValue) layout["default"]=defaultValue

    return layout
}

// edit ui layout
export function getEditUILayout (frame, item, formData, uiFrame, documentation) {
    let uiLayout= {}
    let subDocuemntBg = extractUIFrameSubDocumentTemplate(uiFrame) ? extractUIFrameSubDocumentTemplate(uiFrame) : 'bg-secondary'

    if(frame.hasOwnProperty("uiSchema")) {
        uiLayout=frame["uiSchema"]
    }
    uiLayout["ui:field"]="collapsible"
    uiLayout["collapse"]={
        field: "ObjectField",
        classNames:"tdb__subdocument__collapse_headers"
    }
    uiLayout["classNames"]=`card ${subDocuemntBg} p-4 mt-4 mb-4`
    let description = getCommentFromDocumentation(item, documentation, true)
    uiLayout["ui:description"]=getSubDocumentDescription(item, description) 
    uiLayout["ui:title"]=getSubDocumentTitle(item, documentation) 

    // custom ui:schema - add to default ui schema
    let addedCustomUI=addCustomUI(item, uiFrame, uiLayout)
    return addedCustomUI
}

// View Layout
export function getViewLayout(frame, item, formData) {

    let layout = {
        type: "object",
        title: item,
        info: SUBDOCUMENT_TYPE,
        properties: frame.properties
    }

    // get default value
    let defaultValue=getDefaultValue(item, formData)
    if(defaultValue) layout["default"]=defaultValue

    if(!isFilled(formData, item)) {
        layout = {
            type: "object",
            title: item,
            info: SUBDOCUMENT_TYPE,
            //properties: frame.properties
        }
    }

    return layout
}

// View UI Layout
export function getViewUILayout(frame, item, formData, uiFrame, documentation) {
    let uiLayout= {}
    let subDocuemntBg = extractUIFrameSubDocumentTemplate(uiFrame) ? extractUIFrameSubDocumentTemplate(uiFrame) : 'bg-secondary'
    
    // hide widget if formData of item is empty
    if(!isFilled(formData, item)) {
        if( uiFrame && uiFrame[item] && uiFrame[item].hasOwnProperty("ui:field")) {
            uiLayout={"ui:field": uiFrame[item]["ui:field"]}
        }
        else uiLayout={ "ui:widget" : "hidden" }
        return uiLayout
    }

    if(frame.hasOwnProperty("uiSchema")) {
        uiLayout=frame["uiSchema"]
    }
    uiLayout["ui:field"]="collapsible" 
    uiLayout["collapse"]={
        field: "ObjectField",
        classNames:"tdb__subdocument__collapse_headers"
    } 

    let headingColor = uiFrame && uiFrame.hasOwnProperty(item) && uiFrame[item] && uiFrame[item].hasOwnProperty("styleObject") && uiFrame[item]["styleObject"].hasOwnProperty("headingClassNames") ? uiFrame[item]["styleObject"]["headingClassNames"] : false
    uiLayout["ui:title"]=getSubDocumentTitle(item, documentation, headingColor) 
    let borderColor = uiFrame && uiFrame.hasOwnProperty(item) && uiFrame[item] && uiFrame[item].hasOwnProperty("styleObject") && uiFrame[item]["styleObject"].hasOwnProperty("borderClassNames") ? uiFrame[item]["styleObject"]["borderClassNames"] : false
    let backgroundColor = uiFrame && uiFrame.hasOwnProperty("classNames") ? uiFrame["classNames"] : ""
    uiLayout["classNames"]=`card ${subDocuemntBg} p-4 mt-4 mb-4 ${borderColor} ${backgroundColor}`
    let description = getCommentFromDocumentation(item, documentation, true)
    uiLayout["ui:description"]=getSubDocumentDescription(item, description) 
    // custom   ui:schema - add to default ui schema

    return uiLayout
    
    //let addedCustomUI=addCustomUISubDocuments(item, uiFrame, uiLayout)
    //return addedCustomUI
} 
//  classNames: `card ${subDocumentStyles} p-4 mt-4 mb-4`,
