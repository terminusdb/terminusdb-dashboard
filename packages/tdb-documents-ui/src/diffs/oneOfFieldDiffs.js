
import React from "react"
import {generateDiffUIFrames} from "./diffViewer.utils"
import {ORIGINAL_UI_FRAME, CHANGED_UI_FRAME} from "../constants"
import {isDataType, isSysDataType} from "../utils"

function getValueFromFormData(data, oneOf) {
    let extracted
    for(var item in data) {
        if(typeof data[item] === "object") {
            extracted=getValueFromFormData(data[item], oneOf)
        }
        if(item === oneOf) {
            return {[oneOf]: data[item]}
        }
    }
    return extracted
}

export const getOneOfFieldDiffs = (fullFrame, frame, diffPatch, item, type, oldValue, newValue) => {
    let diffUIFrames={
        originalUIFrame: {
            [type]:{
                "ui:diff": {}
            }
        },
        changedUIFrame: { 
            [type]:{
                "ui:diff": {}
            }
        }
    }

    if(!Array.isArray(frame[item])) return <div/>

    let constructedFrame, alteredOldValue, alteredNewValue, alteredDiffPatch
    for(let oneOf in frame[item][0]) {
        if(diffPatch.hasOwnProperty(oneOf)) {
            let documentClass=frame[item][0][oneOf]
            let documentClassIRI = `${documentClass}` // xsd:string
            if(typeof documentClass === "object" && documentClass.hasOwnProperty("@class")) documentClassIRI=documentClass["@class"] // document class
            
            if(isDataType(documentClassIRI)) {
                constructedFrame={[oneOf]: documentClassIRI}
                alteredOldValue=getValueFromFormData(oldValue, oneOf)
                alteredNewValue=getValueFromFormData(newValue, oneOf)
                alteredDiffPatch={[oneOf]: diffPatch[oneOf]}
            } 
            else if(isSysDataType(documentClassIRI)) {
                constructedFrame={[oneOf]: "sys:Unit"}
                alteredOldValue=getValueFromFormData(oldValue, oneOf)
                alteredNewValue=getValueFromFormData(newValue, oneOf)
                alteredDiffPatch={[oneOf]: diffPatch[oneOf]}
            }
            else {
                constructedFrame = fullFrame[documentClassIRI]
                alteredOldValue=getValueFromFormData(oldValue, oneOf)
                alteredNewValue=getValueFromFormData(newValue, oneOf)
                alteredDiffPatch=diffPatch.hasOwnProperty(oneOf) ? diffPatch[oneOf] : diffPatch
            }
        }
    }
    

    // swap value 
    let oneOfDocumentDiff = generateDiffUIFrames(fullFrame, constructedFrame, type, alteredOldValue, alteredNewValue, alteredDiffPatch)
    
    diffUIFrames[ORIGINAL_UI_FRAME][type]["ui:diff"]=oneOfDocumentDiff[ORIGINAL_UI_FRAME]
    diffUIFrames[CHANGED_UI_FRAME][type]["ui:diff"]=oneOfDocumentDiff[CHANGED_UI_FRAME]

    return diffUIFrames
}