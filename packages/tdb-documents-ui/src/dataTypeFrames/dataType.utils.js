import {
    getTitle, 
    getCommentFromDocumentation, 
    getDefaultValue, 
    addCustomUI, 
    getLabelFromDocumentation, 
    checkIfKey, 
    isFilled
} from "../utils"
import {
    getDateUIWidget,
    getDateTimeUIWidget,
    getDataType,
    getURIUIWidget
} from "./widget" 
import {
    XSD_DATE_TIME,
    DATA_TYPE,
    XSD_DATE,
    XDD_URL,
    XSD_ANY_URI
} from "../constants"

// Create Layout
export function getCreateLayout(frame, item, documentation) { 
    
    let label=getLabelFromDocumentation (item, documentation)
    if(item === "comments") {
        console.log("found it", label, documentation)
    }
    let type=getDataType(frame[item])
    let layout = {
        type: type,
        info: DATA_TYPE,
        title: label
    }
    if(frame[item] === XSD_ANY_URI) layout["format"]="uri"
    if(frame[item] === XSD_DATE_TIME) layout["format"]="date-time"

    return layout 
}


// Create UI Layout
export function getCreateUILayout(frame, item, uiFrame, documentation) {
    
    let title = getTitle(item, checkIfKey(item, frame["@key"]), documentation)
    let description = getCommentFromDocumentation(item, documentation)
    
    let uiLayout = {
        "ui:placeholder": frame[item],
        "ui:title": title,
        classNames: "tdb__input mb-3 mt-3"
    }   
    if(description) uiLayout["ui:description"]=description
    
    if(frame[item] === XSD_DATE_TIME) {
        uiLayout=getDateTimeUIWidget(title) // if xsd:dateTime, use a separate widget to display
    }
    else if(frame[item] === XSD_DATE) {
        uiLayout=getDateUIWidget(title)
    }
    // custom ui:schema - add to default ui schema
    let addedCustomUI=addCustomUI(item, uiFrame, uiLayout)
    return addedCustomUI
}

// Edit Layout
export function getEditLayout(frame, item, formData, documentation) {
    let type=getDataType(frame[item])
    let label = getLabelFromDocumentation (item, documentation)
    let layout = {
        type: type,
        info: DATA_TYPE,
        title: label,
    }
    // get default value
    let defaultValue=getDefaultValue(item, formData)
    if(defaultValue) layout["default"]=defaultValue
    if(frame[item] === XSD_ANY_URI) layout["format"]="uri"
    return layout
}

// Edit UI Layout
export function getEditUILayout(frame, item, formData, uiFrame, documentation) {

    let title = getTitle(item, checkIfKey(item, frame["@key"]), documentation)
    
    let uiLayout = {
        "ui:placeholder": frame[item],
        "ui:disabled": checkIfKey(item, frame["@key"]) && isFilled(formData, item) ? true : false,
        "ui:title": title,
        classNames: "tdb__input mb-3 mt-3"
    }

    if(frame[item] === XSD_DATE_TIME) {
        uiLayout = {
            "ui:widget": "alt-datetime",
            "ui:title": title,
            "ui:options": {
                yearsRange: [1980, 2030],
                hideNowButton: false,
                hideClearButton: false,
            }
        }
        uiLayout["classNames"] = "tdb__input mb-3 mt-3 date-list-style"
    }
    else if(frame[item] === XSD_DATE) {
        uiLayout=getDateUIWidget(title)
    }
    let description = getCommentFromDocumentation(item, documentation)
    if(description) uiLayout["ui:description"]=description

    // custom ui:schema - add to default ui schema
    let addedCustomUI=addCustomUI(item, uiFrame, uiLayout)
    return addedCustomUI
}

// View Layout
export function getViewLayout(frame, item, formData, documentation) {
    let type=getDataType(frame[item])
    let label = getLabelFromDocumentation (item, documentation)
    let layout = {
        type: type,
        info: DATA_TYPE,
        title: label
    }
    if(frame[item] === XDD_URL) layout["format"]="email"
    let defaultValue = getDefaultValue(item, formData)
    if(frame[item] === XSD_ANY_URI) layout["format"]="uri"
    if(defaultValue) layout["default"]= defaultValue
    return layout
}

// View UI Layout
export function getViewUILayout(frame, item, formData, uiFrame, documentation) {
    // hide widget if formData of item is empty
    // check for info - coz at this point there mayb be data
    // fields which belongs to subdocument sets and we do not want to hide the widget
    
    if(!isFilled(formData, item)
        && !frame.hasOwnProperty("info")) {
        uiLayout={
            "ui:widget" : "hidden"
        }
        return uiLayout
    }

    let title = getTitle(item, checkIfKey(item, frame["@key"]), documentation)

    let uiLayout = {
        "ui:placeholder": frame[item],
        "ui:title": title,
        classNames: "tdb__input mb-3 mt-3"
    } 
    if(frame[item] === XSD_DATE_TIME) {
        uiLayout=getDateTimeUIWidget(title) // if xsd:dateTime, use a separate widget to display
    }
    else if(frame[item] === XSD_DATE) {
        uiLayout=getDateUIWidget(title)
    }
    else if(frame[item] === XSD_ANY_URI) {
        uiLayout=getURIUIWidget(title)
    }
    let description = getCommentFromDocumentation(item, documentation)
    if(description) uiLayout["ui:description"]=description


    // custom ui:schema - add to default ui schema
    let addedCustomUI=addCustomUI(item, uiFrame, uiLayout)
    return addedCustomUI
}