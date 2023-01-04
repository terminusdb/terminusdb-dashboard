import {
    ORIGINAL_UI_FRAME, 
    CHANGED_UI_FRAME,
    ONEOFVALUES
} from "../constants"
import {
    isDataType,
    isOptionalType,
    isDocumentType,
    isSubDocumentType,
    isSetType,
    isListType,
    isEnumType,
    isChoiceSubDocumentType,
    isChoiceDocumentType,
    isSysDataType
} from "../utils_old" 
import {getDataFieldDiffs} from "./dataFieldDiffs"
import {getListFieldDiffs} from "./listFieldDiffs"
import {getSubDocumentFieldDiffs} from "./subDocumentFieldDiffs"
import {getDocumentFieldDiffs} from "./documentFieldDiffs"
import {getChoiceSubDocumentFieldDiffs} from "./choiceSubDocumentFieldDiffs"
import {getChoiceDocumentFieldDiffs} from "./choiceDocumentFieldDiffs"
import {getSetFieldDiffs} from "./setFieldDiffs"
import {getOneOfFieldDiffs} from "./oneOfFieldDiffs"
import {getEnumFieldDiffs} from "./enumFieldDiffs"
import {getSysJSONFieldDiffs} from "./sysFieldDiffs"


function constructOptionalFrame (frame, item, metadata) {
    let optionalFrame = {[item]: frame["@class"]}
    if(metadata) {
        // extract metaData and append to optionalFrame
        optionalFrame[METADATA]=metadata
    }
    return optionalFrame
}


export function generateDiffUIFrames (fullFrame, frame, type, oldValue, newValue, diffPatch) {
    let diffUIFrames={
        originalUIFrame: {},
        changedUIFrame: {}
    }  

    for(var item in frame) {
        if(item === "@key") continue
        if(item === "@type") continue 
        if(item === "@subdocument") continue
        if(frame[item] && isDataType(frame[item])) { // mandatory
            if(diffPatch.hasOwnProperty(item)) {
                let dataField=getDataFieldDiffs(diffPatch, item)
                diffUIFrames[ORIGINAL_UI_FRAME][item]=dataField[ORIGINAL_UI_FRAME][item]
                diffUIFrames[CHANGED_UI_FRAME][item]=dataField[CHANGED_UI_FRAME][item]
            }
        } 
        if (frame[item] && isListType(frame[item])) { // list 
            if(diffPatch.hasOwnProperty(item)) { 
                let constructedListFrame = constructOptionalFrame(frame[item], item)
                let listField=getSetFieldDiffs(fullFrame, constructedListFrame, diffPatch, item, type, oldValue, newValue)
                //let listField=getListFieldDiffs(fullFrame, constructedListFrame, diffPatch, item, type, oldValue, newValue)
                diffUIFrames[ORIGINAL_UI_FRAME][item]=listField[ORIGINAL_UI_FRAME][item]
                diffUIFrames[CHANGED_UI_FRAME][item]=listField[CHANGED_UI_FRAME][item]
            }
        }
        if (frame[item] && isSetType(frame[item])) { //set 
            if(diffPatch.hasOwnProperty(item)) { 
                let constructedSetFrame = constructOptionalFrame(frame[item], item)
                let setField=getSetFieldDiffs(fullFrame, constructedSetFrame, diffPatch, item, type, oldValue, newValue)
                diffUIFrames[ORIGINAL_UI_FRAME][item]=setField[ORIGINAL_UI_FRAME][item]
                diffUIFrames[CHANGED_UI_FRAME][item]=setField[CHANGED_UI_FRAME][item]
            }
        }
        if(frame[item] && isOptionalType(frame[item])) { // optional
            if(diffPatch.hasOwnProperty(item)) {
                let constructedOptionalFrame = constructOptionalFrame(frame[item], item)
                let optionalProperties = generateDiffUIFrames(fullFrame, constructedOptionalFrame, type, oldValue, newValue, diffPatch)
                diffUIFrames[ORIGINAL_UI_FRAME][item]=optionalProperties[ORIGINAL_UI_FRAME][item]
                diffUIFrames[CHANGED_UI_FRAME][item]=optionalProperties[CHANGED_UI_FRAME][item]
            }
        }
        if(frame[item] && isDocumentType(frame[item], fullFrame)) { //link documents 
            if(diffPatch.hasOwnProperty(item)) {
                let diffUI=getDocumentFieldDiffs(diffPatch, item)
                diffUIFrames[ORIGINAL_UI_FRAME][item]=diffUI[ORIGINAL_UI_FRAME][item]
                diffUIFrames[CHANGED_UI_FRAME][item]=diffUI[CHANGED_UI_FRAME][item]
            }
        }
        if(frame[item] && isSubDocumentType(frame[item])) { // sub document
            if(diffPatch.hasOwnProperty(item)) {
                let subDocField=getSubDocumentFieldDiffs(fullFrame, frame, diffPatch, item, type, oldValue, newValue)
                diffUIFrames[ORIGINAL_UI_FRAME][item]=subDocField[ORIGINAL_UI_FRAME][item]
                diffUIFrames[CHANGED_UI_FRAME][item]=subDocField[CHANGED_UI_FRAME][item]
            }
        }
        if (frame[item] && isChoiceSubDocumentType(frame[item])) { // choice sub documents 
            if(diffPatch.hasOwnProperty(item)) {
                let diffUI=getChoiceSubDocumentFieldDiffs(fullFrame, frame, diffPatch, item, type, oldValue, newValue)
                diffUIFrames[ORIGINAL_UI_FRAME][item]=diffUI[ORIGINAL_UI_FRAME][item]
                diffUIFrames[CHANGED_UI_FRAME][item]=diffUI[CHANGED_UI_FRAME][item]
            }
        }
        if(frame[item] && isChoiceDocumentType(frame[item])) { // choice document 
            if(diffPatch.hasOwnProperty(item)) {
                let diffUI=getChoiceDocumentFieldDiffs(fullFrame, frame, diffPatch, item, type, oldValue, newValue)
                diffUIFrames[ORIGINAL_UI_FRAME][item]=diffUI[ORIGINAL_UI_FRAME][item]
                diffUIFrames[CHANGED_UI_FRAME][item]=diffUI[CHANGED_UI_FRAME][item]
            }
        }
        if (frame[item] && isEnumType(frame[item])) { // enums
            if(diffPatch.hasOwnProperty(item)) {
                let diffUI=getEnumFieldDiffs(diffPatch, item)
                diffUIFrames[ORIGINAL_UI_FRAME][item]=diffUI[ORIGINAL_UI_FRAME][item]
                diffUIFrames[CHANGED_UI_FRAME][item]=diffUI[CHANGED_UI_FRAME][item]
            }
        }
        if(frame[item] && isSysDataType(frame[item])) { // sys:JSON
            if(diffPatch.hasOwnProperty(item)) {
                let diffUI=getSysJSONFieldDiffs(diffPatch, item, oldValue, newValue)
                diffUIFrames[ORIGINAL_UI_FRAME][item]=diffUI[ORIGINAL_UI_FRAME][item]
                diffUIFrames[CHANGED_UI_FRAME][item]=diffUI[CHANGED_UI_FRAME][item]
            }
        }
        if(item === ONEOFVALUES) { // oneOf
            //if(diffPatch.hasOwnProperty(frame[item])) { 
                let diffUI=getOneOfFieldDiffs(fullFrame, frame, diffPatch, item, type, oldValue, newValue)
                diffUIFrames[ORIGINAL_UI_FRAME][type]=diffUI[ORIGINAL_UI_FRAME][type]
                diffUIFrames[CHANGED_UI_FRAME][type]=diffUI[CHANGED_UI_FRAME][type]
            //}
        }
    }

    //console.log("diffUIFrames", diffUIFrames)
    return diffUIFrames
}