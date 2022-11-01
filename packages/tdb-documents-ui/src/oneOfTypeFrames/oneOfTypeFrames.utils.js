import {getProperties} from "../FrameHelpers"
import React from "react"
import {
    SYS_UNIT_DATA_TYPE,
    EDIT
} from "../constants" 
import {isDataType, extractDocumentation} from "../utils"

// get view layout of document class
export function getViewDocumentLayout(documentClass, fullFrame, current, item, uiFrame, mode, formData, onTraverse, onSelect, documentation, language) {
    var layout = {}, frame
    let documentClassIRI = `${documentClass}`
    if (typeof documentClass === "object" && documentClass.hasOwnProperty("@class")) {
        documentClassIRI=documentClass["@class"]
    }
    let extractedDocumentation={}

    if(isDataType(documentClassIRI)) {
        extractedDocumentation=documentation
        frame={[current]: documentClassIRI}
    } else {
        extractedDocumentation = extractDocumentation(fullFrame, documentClassIRI, language) 
        frame = fullFrame[documentClassIRI]
    }

    // We set mode to create just to get the frames
    let exractedProperties = getProperties (fullFrame, current, frame, uiFrame, "Create", {}, onTraverse, onSelect, extractedDocumentation)
    
    if(!isDataType(documentClassIRI)) {
        // add subdocument type as @type field
        exractedProperties.properties["@type"]={
            type: "string",
            title: documentClass,
            default: documentClass
        }
        exractedProperties.properties["@choice"]={
            type: "string",
            title: current,
            default: current
        }
    }

    // add on form Data 
    if(formData && formData.hasOwnProperty(current)) {
        if(typeof formData[current] === "object") {
            for(var fds in formData[current]) {
                if(exractedProperties.properties.hasOwnProperty(fds)) { // if filled values exists
                    exractedProperties.properties[fds]["default"]=formData[current][fds]
                }
            }
        }
        else { // normal data types
            exractedProperties.properties[current]["default"]=formData[current]
        }
        
    }

    if(!isDataType(documentClassIRI)) { 
        // hide @type field
        exractedProperties.uiSchema["@type"]={"ui:widget": "hidden"}
        // hide @choice field
        exractedProperties.uiSchema["@choice"]={"ui:widget": "hidden"}
    } 

    let setReadOnlyUi = {}

    // make sure these keys are read only at this point
    for (var keys in exractedProperties.uiSchema) {
        let keyUi = exractedProperties.uiSchema[keys]
        keyUi["ui:readonly"]=true
        setReadOnlyUi[keys] = keyUi
    }

    layout = {
        title: current,
        type: "object",
        properties: exractedProperties.properties,
        uiProperties: setReadOnlyUi
    }

    return layout
}
 

// get layout of document class
export function getCreateDocumentLayout(documentClass, fullFrame, current, item, uiFrame, mode, formData, onTraverse, onSelect, documentation, language) {
    var layout = {}, frame={}
    let documentClassIRI = `${documentClass}`
    if (typeof documentClass === "object" && documentClass.hasOwnProperty("@class")) {
        documentClassIRI=documentClass["@class"]
    }
    let extractedDocumentation={}

    if(isDataType(documentClassIRI)) {
        extractedDocumentation=documentation
        frame={[current]: documentClassIRI}
    } else {
        extractedDocumentation = extractDocumentation(fullFrame, documentClassIRI, language) 
        frame = fullFrame[documentClassIRI]
    }

    let exractedProperties = getProperties (fullFrame, current, frame, uiFrame, mode, {}, onTraverse, onSelect, extractedDocumentation)
    if(!isDataType(documentClassIRI)) {
        // add subdocument type as @type field
        exractedProperties.properties["@type"]={
            type: "string",
            title: documentClass,
            default: documentClass
        }
        exractedProperties.properties["@choice"]={
            type: "string",
            title: current,
            default: current
        }
    }

    //console.log("exractedProperties", exractedProperties)

    // add on form Data 
    if(mode === EDIT && formData && formData.hasOwnProperty(current)) {
        if(typeof formData[current] === "object") {
            for(var fds in formData[current]) {
                if(exractedProperties.properties.hasOwnProperty(fds)) { // if filled values exists
                    exractedProperties.properties[fds]["default"]=formData[current][fds]
                }
            }
        }
        else { // data types
            exractedProperties.properties[current]["default"]=formData[current]
        }
    }

    if(!isDataType(documentClassIRI)) { 
        // hide @type field
        exractedProperties.uiSchema["@type"]={"ui:widget": "hidden"}
        // hide @choice field
        exractedProperties.uiSchema["@choice"]={"ui:widget": "hidden"}
    } 
    
    layout = {
        title: current,
        type: "object",
        properties: exractedProperties.properties,
        uiProperties: exractedProperties.uiSchema
    }
    return layout
}

// get layout of sys units
export function getCreateSysUnitDocumentLayout(documentClass, fullFrame, current, item, uiFrame, mode, formData, onTraverse, onSelect) {
    var layout = {}, currentData, exractedUiProperties={}
    let documentClassIRI = `${documentClass}`
    let frame = fullFrame[documentClassIRI]

    function displaySysUnit (props) {
        return <>
            {props.name}

        </>
    }

    layout = {
        title: current,
        type: "object",
        properties: {
            [current]: {"type": "string", default: SYS_UNIT_DATA_TYPE}
        },
        uiProperties: {
            //"@type": {"ui:widget": "hidden"},
            //"@choice": {"ui:widget": "hidden"},
            [current]: {"ui:field": displaySysUnit}
        }
    }



  /*  properties: {date_range: {…}, value: {…}, @type: {…}, @choice: {…}}
required: ['value']
uiSchema: {date_range: {…}, value: {…}, @type: {…}, @choice: {…}}
*/
    /*layout = {
        title: current,
        type: "object",
        properties: {
            "@type": {
                type: "string",
                title: documentClass,
                default: documentClass
            },
            "@choice": {
                type: "string",
                title: current,
                default: current
            },
            [current]: {
                type: "string",
                title: current,
                default: current
            }
        },
        uiProperties: {
            "@type": {"ui:widget": "hidden"},
            "@choice": {"ui:widget": "hidden"},
            //[current]: {"ui:field": displaySysUnit}
        }
    } */


    return layout
}


// view layout of sys units
export function getViewSysUnitDocumentLayout(documentClass, fullFrame, current, item, uiFrame, mode, formData, onTraverse, onSelect) {
    var layout = {}, currentData, exractedUiProperties={}
    let documentClassIRI = `${documentClass}`
    let frame = fullFrame[documentClassIRI]


    function displaySysUnit (props) {
        return <>
            {props.name}
        </>
    }



    layout = {
        title: current,
        type: "object",
        properties: {
            [current]: {"type": "string", default: SYS_UNIT_DATA_TYPE}
        },
        uiProperties: {
            //"@type": {"ui:widget": "hidden"},
            //"@choice": {"ui:widget": "hidden"},
            [current]: {"ui:field": displaySysUnit}
        }
    }

    return layout
}
