import {CREATE, DOCUMENT, EDIT, VIEW, CHOICESUBCLASSES, CHOICECLASSES, SYS_JSON_TYPE,ENUM, DATA_TYPE, SUBDOCUMENT_TYPE} from "../constants"
import {
    getCreateSetDataTypeLayout,
    getCreateSetDataTypeUILayout,
    getEditSetDataTypeLayout,
    getEditSetDataTypeUILayout,
    getViewSetDataTypeLayout,
    getViewSetDataTypeUILayout,
    getCreateListSysDataTypeLayout,
    getCreateListSysDataTypeUILayout,
    getEditListSysDataTypeLayout,
    getEditListSysDataTypeUILayout,
    getViewListSysDataTypeLayout,
    getViewListSysDataTypeUILayout,
    getCreateSetSubDocumentTypeLayout,
    getCreateSetSubDocumentTypeUILayout,
    getEditSetSubDocumentTypeLayout,
    getEditSetSubDocumentTypeUILayout,
    getViewSetSubDocumentTypeLayout,
    getViewSetSubDocumentTypeUILayout,
    getDiffViewSetSubDocumentType,
    getCreateSetDocumentTypeLayout,
    getCreateSetDocumentTypeUILayout,
    getEditSetDocumentTypeLayout,
    getEditSetDocumentTypeUILayout,
    getViewSetDocumentTypeLayout,
    getViewSetDocumentTypeUILayout,
    getCreateSetEnumTypeLayout,
    getCreateSetEnumTypeUILayout,
    getEditSetEnumTypeLayout,
    getEditSetEnumTypeUILayout,
    getViewSetEnumTypeLayout,
    geViewSetEnumTypeUILayout,
    getCreateSetChoiceDocumentTypeLayout,
    getCreateSetChoiceDocumentTypeUILayout,
    getEditSetChoiceDocumentTypeLayout,
    getEditSetChoiceDocumentTypeUILayout,
    getViewSetChoiceDocumentTypeLayout,
    getViewSetChoiceDocumentTypeUILayout,
    getCreateSetSubChoiceDocumentTypeLayout,
    getCreateSetSubChoiceDocumentTypeUILayout,
    getEditSetChoiceSubDocumentTypeLayout,
    getEditSetChoiceSubDocumentTypeUILayout,
    getViewSetChoiceSubDocumentTypeLayout,
    getViewSetChoiceSubDocumentTypeUILayout,

} from "./listType.utils"



// set sub choice document types
export function makeSetSubChoiceTypeFrames (frame, item, uiFrame, mode, formData, documentation) {
    let properties={}, propertiesUI={}, layout ={}, uiLayout={}

    if (mode === CREATE) {
        layout=getCreateSetSubChoiceDocumentTypeLayout(frame, item, documentation)
        uiLayout=getCreateSetSubChoiceDocumentTypeUILayout(frame, item, uiFrame)
    }

    if (mode === EDIT) {
        layout=getEditSetChoiceSubDocumentTypeLayout(frame, item, formData, documentation)
        uiLayout=getEditSetChoiceSubDocumentTypeUILayout(frame, item, uiFrame)
    }

    if (mode === VIEW) {
        layout=getViewSetChoiceSubDocumentTypeLayout(frame, item, formData, documentation)
        uiLayout=getViewSetChoiceSubDocumentTypeUILayout(frame, item, uiFrame, formData)
    }

    // schema
    properties[item]=layout
    // ui schema
    propertiesUI[item]=uiLayout

    return {properties, propertiesUI}
}

// set choice document types
export function makeSetChoiceTypeFrames (frame, item, uiFrame, mode, formData) {
    let properties={}, propertiesUI={}, layout ={}, uiLayout={}

    if (mode === CREATE) {
        layout=getCreateSetChoiceDocumentTypeLayout(frame, item)
        uiLayout=getCreateSetChoiceDocumentTypeUILayout(frame, item)
    }

    if (mode === EDIT) {
        layout=getEditSetChoiceDocumentTypeLayout(frame, item, formData)
        uiLayout=getEditSetChoiceDocumentTypeUILayout(frame, item)
    }

    if (mode === VIEW) {
        layout=getViewSetChoiceDocumentTypeLayout(frame, item, formData)
        uiLayout=getViewSetChoiceDocumentTypeUILayout(frame, item, uiFrame, formData)
    }

    // schema
    properties[item]=layout
    // ui schema
    propertiesUI[item]=uiLayout

    return {properties, propertiesUI}
}

// set Enum Types
export function  makeSetEnumTypeFrames(frame, item, uiFrame, mode, formData, documentation) {

    let properties={}, propertiesUI={}, layout ={}, uiLayout={}

    if (mode === CREATE) {
        layout=getCreateSetEnumTypeLayout(frame, item, documentation)
        uiLayout=getCreateSetEnumTypeUILayout(frame, item)
    }

    if (mode === EDIT) {
        layout=getEditSetEnumTypeLayout(frame, item, formData, documentation)
        uiLayout=getEditSetEnumTypeUILayout(frame, item)
    }

    if (mode === VIEW) {
        layout=getViewSetEnumTypeLayout(frame, item, formData, documentation)
        uiLayout=geViewSetEnumTypeUILayout(frame, uiFrame, item)
    }

    // schema
    properties[item]=layout
    // ui schema
    propertiesUI[item]=uiLayout
    console.log("--- properties", properties)
    return {properties, propertiesUI}
}

// set document types
export function makeSetDocumentTypeFrames (frame, item, uiFrame, mode, formData, onTraverse, onSelect, documentation) {

    let properties={}, propertiesUI={}, layout ={}, uiLayout={}
    console.log("*** KJ enter", mode, frame, item)
    if (mode === CREATE) {
        layout=getCreateSetDocumentTypeLayout(frame, item, documentation)
        uiLayout=getCreateSetDocumentTypeUILayout(frame, item) 
    }

    if (mode === EDIT) {
        layout=getEditSetDocumentTypeLayout(frame, item, formData, documentation)
        uiLayout=getEditSetDocumentTypeUILayout(frame, item, onSelect, documentation)
    }

    if (mode === VIEW) {
        layout=getViewSetDocumentTypeLayout(frame, item, formData, documentation)
        uiLayout=getViewSetDocumentTypeUILayout(frame, uiFrame, item, onSelect, documentation, formData)
    }

    // schema
    properties[item]=layout
    // ui schema
    propertiesUI[item]=uiLayout

    return {properties, propertiesUI}
}

// set subDocument types
export function makeSubDocumentTypeFrames (frame, item, uiFrame, mode, formData, onTraverse, onSelect, documentation) {
    let properties={}, propertiesUI={}, layout ={}, uiLayout={}

    if (mode === CREATE) {
        layout=getCreateSetSubDocumentTypeLayout(frame, item, documentation)
        uiLayout=getCreateSetSubDocumentTypeUILayout(frame, item, uiFrame)
    }

    if (mode === EDIT) {
        layout=getEditSetSubDocumentTypeLayout(frame, item, formData, documentation)
        uiLayout=getEditSetSubDocumentTypeUILayout(frame, item, uiFrame)
    }

    if (mode === VIEW) {
        let uiDiffFound=false, modifiedUiFrame=[], diffCount=0
        if(uiFrame && uiFrame.hasOwnProperty(item) && Array.isArray(uiFrame[item])) {
            uiFrame[item].map(ui => {
                if(ui.hasOwnProperty("ui:diff")) {
                    uiDiffFound=true
                    diffCount+=1
                    modifiedUiFrame.push({"ui:field": ui["ui:diff"]})
                    //console.log("ui", ui, frame.uiSchema[item])
                    //modifiedUiFrame.push(frame.uiSchema[item])
                }
                else modifiedUiFrame.push(ui)
            })
        }
        if(uiDiffFound) {
            let uiDiffChanges=getDiffViewSetSubDocumentType(frame, item, formData, uiFrame, modifiedUiFrame, diffCount)
            layout=uiDiffChanges.layout
            uiLayout=uiDiffChanges.uiLayout
        }
        else {
            layout=getViewSetSubDocumentTypeLayout(frame, item, formData, documentation)
            uiLayout=getViewSetSubDocumentTypeUILayout(frame, item, formData, uiFrame)
        }
    }

    // schema
    properties[item]=layout
    // ui schema
    propertiesUI[item]=uiLayout

    return {properties, propertiesUI}
}

// list data types
export function makeListDataTypeFrames (frame, item, uiFrame, mode, formData, onTraverse, onSelect, documentation) {
    let properties={}, propertiesUI={}, layout ={}, uiLayout={}

    if (mode === CREATE) {
        layout=getCreateSetDataTypeLayout(frame, item, documentation)
        uiLayout=getCreateSetDataTypeUILayout(frame, item, uiFrame)
    }

    if (mode === EDIT) {
        layout=getEditSetDataTypeLayout(frame, item, formData, documentation)
        uiLayout=getEditSetDataTypeUILayout(frame, item, uiFrame)
    }

    if (mode === VIEW) {
        layout=getViewSetDataTypeLayout(frame, item, formData, documentation)
        uiLayout=getViewSetDataTypeUILayout(frame, item, formData, uiFrame)
    }

    // schema
    properties[item]=layout
    // ui schema
    propertiesUI[item]=uiLayout

    return {properties, propertiesUI}
}

// list sys data types
export function makeSysDataTypeFrames (frame, item, uiFrame, mode, formData, onTraverse, onSelect, documentation) {
    let properties={}, propertiesUI={}, layout ={}, uiLayout={}

    if (mode === CREATE) {
        layout=getCreateListSysDataTypeLayout(frame, item, documentation)
        uiLayout=getCreateListSysDataTypeUILayout(frame, item, uiFrame)
    }

    if (mode === EDIT) {
        layout=getEditListSysDataTypeLayout(frame, item, formData, documentation)
        uiLayout=getEditListSysDataTypeUILayout(frame, item, documentation, uiFrame)
    }

    if (mode === VIEW) { 
        layout=getViewListSysDataTypeLayout(frame, item, formData, documentation)
        uiLayout=getViewListSysDataTypeUILayout(frame, item, formData, uiFrame)
    }

    // schema
    properties[item]=layout
    // ui schema
    propertiesUI[item]=uiLayout

    return {properties, propertiesUI}
}


export const makeListTypeFrames = (frame, item, uiFrame, mode, formData, onTraverse, onSelect, fullFrame, documentation) => {
    
    let madeFrames = {}

    // set Data Types
    if(frame.hasOwnProperty("properties") && frame["properties"].hasOwnProperty(item)) {
        if(frame["properties"][item].hasOwnProperty("info")
            && frame["properties"][item]["info"] === DATA_TYPE)
            madeFrames=makeListDataTypeFrames(frame, item, uiFrame, mode, formData, onTraverse, onSelect, documentation)
    }

    // list Sys Data Types
    if(frame.hasOwnProperty("properties") && frame["properties"].hasOwnProperty(item)) {
        if(frame["properties"][item].hasOwnProperty("info")
            && frame["properties"][item]["info"] === SYS_JSON_TYPE)
            madeFrames=makeSysDataTypeFrames(frame, item, uiFrame, mode, formData, onTraverse, onSelect, documentation)
    }

    // set Sub Document Types
    if(frame.hasOwnProperty("properties") && frame["properties"].hasOwnProperty(item)) {
        if(frame["properties"][item].hasOwnProperty("info")
            && frame["properties"][item]["info"] === SUBDOCUMENT_TYPE)
            madeFrames=makeSubDocumentTypeFrames(frame, item, uiFrame, mode, formData, onTraverse, onSelect, documentation)
    }
 
    // set Document Types
    if(frame.hasOwnProperty("properties") && frame["properties"].hasOwnProperty(item)) {
        if(frame["properties"][item].hasOwnProperty("info")
            && frame["properties"][item]["info"] === DOCUMENT)
            madeFrames=makeSetDocumentTypeFrames(frame, item, uiFrame, mode, formData, onTraverse, onSelect, documentation)
    }

   
    // set Enum Types
    if(frame.hasOwnProperty("properties") && frame["properties"].hasOwnProperty(item)) {
        if(frame["properties"][item].hasOwnProperty("info")
            && frame["properties"][item]["info"] === ENUM)
            madeFrames=makeSetEnumTypeFrames(frame, item, uiFrame, mode, formData, documentation)
    }

    // set Choice subDocument classes
    if(frame.hasOwnProperty("properties") && frame["properties"].hasOwnProperty(item)) {
        if(frame["properties"][item].hasOwnProperty("info")
            && frame["properties"][item]["info"] === CHOICESUBCLASSES)
            madeFrames=makeSetSubChoiceTypeFrames(frame, item, uiFrame, mode, formData, documentation)
    }

    // set Choice Document classes
    if(frame.hasOwnProperty("properties") && frame["properties"].hasOwnProperty(item)) {
        if(frame["properties"][item].hasOwnProperty("info")
            && frame["properties"][item]["info"] === CHOICECLASSES)
            madeFrames=makeSetChoiceTypeFrames(frame, item, uiFrame, mode, formData,onTraverse)
    }

    // set Choice Document classes
    
    /*if(frame.hasOwnProperty("properties") && frame["properties"].hasOwnProperty(item)) {
        if(frame["properties"][item].hasOwnProperty("info")
            && frame["properties"][item]["info"] === CHOICESUBCLASSES)
            madeFrames=makeSetChoiceTypeFrames(frame, item, uiFrame, mode, formData)
    }*/

    

    let properties = madeFrames.properties
    let propertiesUI = madeFrames.propertiesUI
    return {properties, propertiesUI}
} 