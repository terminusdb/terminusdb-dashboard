
import {
    getTitle, 
    getCommentFromDocumentation, 
    getDefaultValue, 
    addCustomUI, 
    getLabelFromDocumentation, 
    checkIfKey, 
    isFilled,
    checkForMetaData
} from "../utils"
import {
    getDateUIWidget,
    getDateTimeUIWidget,
    getDataType,
    getURIUIWidget,
    getCreateHTMLUI,
    getEditHTMLUI,
    getViewHTMLUI,
    getCreateMarkDownUI,
    getEditMarkDownUI,
    getViewMarkDownUI, 
    getTextareaUIWidget,
    getDateTimeViewUIWidget,
    getDateViewUIWidget
} from "./widget" 
import {
    XSD_DATE_TIME,
    DATA_TYPE,
    XSD_DATE,
    XDD_URL,
    XSD_ANY_URI,
    METADATA,
    RENDER_AS,
    MARKDOWN,
    HTML,
    XSD_STRING,
    XDD_HTML
} from "../constants" 


// Create Layout
export function getCreateLayout(frame, item, documentation) { 
    
    let label=getLabelFromDocumentation (item, documentation)

    let type=getDataType(frame[item]) 
    let layout = {
        type: type,
        info: DATA_TYPE, 
        title: label
    }
    // store metadata object here 
    if(checkForMetaData(frame, item)) {
        layout[METADATA] = frame[METADATA][RENDER_AS][item]
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
    else if(frame[item] === XSD_STRING) {
        uiLayout=getTextareaUIWidget(title, XSD_STRING)
    }
    else if (frame[item] === XDD_HTML) {
        uiLayout["ui:field"]=getCreateHTMLUI
    }

    let metaType=checkForMetaData(frame, item)
    if(metaType) {
        if(metaType === MARKDOWN) {
            uiLayout["ui:field"]=getCreateMarkDownUI
        }
        else if(metaType === HTML) {
            uiLayout["ui:field"]=getCreateHTMLUI
        }
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
    //if(defaultValue) layout["default"]=defaultValue
    layout["default"]=defaultValue
    if(frame[item] === XSD_ANY_URI) layout["format"]="uri"
    // stroe metadata object here 
    if(checkForMetaData(frame, item)) {
        layout[METADATA] = frame[METADATA][RENDER_AS][item]
    }
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
    else if(frame[item] === XSD_STRING) {
        let data = formData.hasOwnProperty(item) ?  formData[item] : null
        uiLayout=getTextareaUIWidget(title, XSD_STRING, data)
    }
    else if (frame[item] === XDD_HTML) {
        uiLayout["ui:field"]=getEditHTMLUI
    }
    let description = getCommentFromDocumentation(item, documentation)
    if(description) uiLayout["ui:description"]=description

    let metaType=checkForMetaData(frame, item)
    if(metaType) {
        if(metaType === MARKDOWN) {
            uiLayout["ui:field"]=getEditMarkDownUI
        }
        else if(metaType === HTML) {
            uiLayout["ui:field"]=getEditHTMLUI
        }
    }

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
    // store metadata object here 
    if(checkForMetaData(frame, item)) {
        layout[METADATA] = frame[METADATA][RENDER_AS][item]
    }
    //if(defaultValue) layout["default"]= defaultValue
    layout["default"]= defaultValue
    return layout
}

// View UI Layout
export function getViewUILayout(frame, item, formData, uiFrame, documentation) {
    // hide widget if formData of item is empty
    // check for info - coz at this point there mayb be data
    // fields which belongs to subdocument sets and we do not want to hide the widget


    if(uiFrame && uiFrame.hasOwnProperty(item) && uiFrame[item].hasOwnProperty("ui:field")) {
        let uiLayout={
            "ui:field": uiFrame[item]["ui:field"]
        }
        return uiLayout
    }
    
    if(!isFilled(formData, item)
        && !frame.hasOwnProperty("info")) {
            // to represent custom field - in diff viewer for example we want to show hidden field as a null field
            if(uiFrame && uiFrame.hasOwnProperty(item)) {
                if(!uiFrame[item].hasOwnProperty("ui:field")) {
                    uiLayout={ 
                        "ui:widget" : "hidden"
                    }
                    return uiLayout
                }
            }
            else {
                uiLayout={
                    "ui:widget" : "hidden"
                }
                return uiLayout
            }
    }
 
    let title = getTitle(item, checkIfKey(item, frame["@key"]), documentation)

    let uiLayout = {
        "ui:placeholder": frame[item],
        "ui:title": title,
        classNames: "tdb__input mb-3 mt-3"
    } 
    if(frame[item] === XSD_DATE_TIME) {
        uiLayout=getDateTimeViewUIWidget(title) // if xsd:dateTime, use a separate widget to display
    }
    else if(frame[item] === XSD_DATE) {
        uiLayout=getDateViewUIWidget(title)
    }
    else if(frame[item] === XSD_ANY_URI) {
        uiLayout=getURIUIWidget(title)
    }
    else if(frame[item] === XSD_STRING) {
        uiLayout=getTextareaUIWidget(title, XSD_STRING, formData[item])
    }
    else if (frame[item] === XDD_HTML) {
        uiLayout["ui:field"]=getViewHTMLUI
    }
    let description = getCommentFromDocumentation(item, documentation)
    if(description) uiLayout["ui:description"]=description
    let metaType=checkForMetaData(frame, item)
    if(metaType) {
        if(metaType === MARKDOWN) {
            uiLayout["ui:field"]=getViewMarkDownUI
        }
        else if(metaType === HTML) {
            uiLayout["ui:field"]=getViewHTMLUI
        }
    }
    // custom ui:schema - add to default ui schema
    let addedCustomUI=addCustomUI(item, uiFrame, uiLayout)
    return addedCustomUI
}