
import React from "react"
import {generateDiffUIFrames} from "./diffViewer.utils"
import {ORIGINAL_UI_FRAME, CHANGED_UI_FRAME} from "../constants"
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai"
import Stack from 'react-bootstrap/Stack'
import {
    AFTER, 
    BEFORE, 
    REST,  
    PATCH
} from "./diff.constants" 
import {isDataType} from "../utils"

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
            [item]:{
                "ui:diff": {}
            }
        },
        changedUIFrame: { 
            [item]:{
                "ui:diff": {}
            }
        }
    }

    if(!Array.isArray(frame[item])) return <div/>

    
    let constructedFrame, alteredOldValue, alteredNewValue
    for(var oneOf in frame[item][0]) {
        if(diffPatch.hasOwnProperty(oneOf)) {
            let documentClass=frame[item][0][oneOf]
            let documentClassIRI = `${documentClass}` // xsd:string
            if(typeof documentClass === "object" && documentClass.hasOwnProperty("@class")) documentClassIRI=documentClass["@class"] // document class
            
            if(isDataType(documentClassIRI)) {
                constructedFrame={[oneOf]: documentClassIRI}
                alteredOldValue=getValueFromFormData(oldValue, oneOf)
                alteredNewValue=getValueFromFormData(newValue, oneOf)
            } else {
                constructedFrame = fullFrame[documentClassIRI]
            }
        }
    }
    

    // swap value 
    let oneOfDocumentDiff = generateDiffUIFrames(fullFrame, constructedFrame, type, alteredOldValue, newValue, alteredNewValue)
    console.log("oneOfDocumentDiff", oneOfDocumentDiff)
    diffUIFrames[ORIGINAL_UI_FRAME][item]["ui:diff"]=oneOfDocumentDiff[ORIGINAL_UI_FRAME]
    diffUIFrames[CHANGED_UI_FRAME][item]["ui:diff"]=oneOfDocumentDiff[CHANGED_UI_FRAME]

    return diffUIFrames
}