import {ORIGINAL_UI_FRAME, CHANGED_UI_FRAME} from "../constants"
import {
    isDataType,
    isOptionalType,
    isDocumentType,
    isSubDocumentType,
    isSetType,
    isListType,
    isEnumType
} from "../utils"
import {getDataFieldDiffs} from "./dataFieldDiffs"
import {getDocumentFieldDiffs} from "./documentFieldDiffs"
import {getSubDocumentFieldDiffs} from "./subDocumentFieldDiffs"
import {getSetFieldDiffs} from "./setFieldDiffs"
import {getListFieldDiffs} from "./listFieldDiffs"
import {getEnumFieldDiffs} from "./enumFieldDiffs"
import {constructOptionalFrame, constructSetFrame} from "../FrameHelpers"

export function generateDiffUIFrames (fullFrame, frame, type, oldValue, newValue, diffPatch) {
    let diffUIFrames={
        originalUIFrame: {},
        changedUIFrame: {}
    }

    for(var item in frame) {
        if(item === "@key") continue
        if(item === "@type") continue
        if(item === "@subdocument") continue
        if(frame[item] && isDataType(frame[item])) { 
            // datatype properties like xsd:/ xdd:
            if(diffPatch.hasOwnProperty(item)) {
                if(diffPatch[item].hasOwnProperty("@op")) {

                    let diffUI=getDataFieldDiffs(diffPatch, item)
                    diffUIFrames[ORIGINAL_UI_FRAME][item]=diffUI[ORIGINAL_UI_FRAME][item]
                    diffUIFrames[CHANGED_UI_FRAME][item]=diffUI[CHANGED_UI_FRAME][item]

                }
            }
            else { // nochange
                diffUIFrames[ORIGINAL_UI_FRAME][item] = {
                        "classNames": "tdb__input mb-3"
                    }

                diffUIFrames[CHANGED_UI_FRAME][item]= {
                        "classNames": "tdb__input mb-3"
                }
            }
        }
        if (frame[item] && isOptionalType(frame[item])) { 
            // optional 
            if(diffPatch.hasOwnProperty(item)) {
                let constructedOptionalFrame = constructOptionalFrame(frame[item], item)
                let optionalProperties = generateDiffUIFrames(fullFrame, constructedOptionalFrame, type, oldValue, newValue, diffPatch)
                diffUIFrames[ORIGINAL_UI_FRAME][item]=optionalProperties[ORIGINAL_UI_FRAME][item]
                diffUIFrames[CHANGED_UI_FRAME][item]=optionalProperties[CHANGED_UI_FRAME][item]
            }
            else { // nochange
                diffUIFrames[ORIGINAL_UI_FRAME][item] = {
                        "classNames": "tdb__input mb-3"
                }

                diffUIFrames[CHANGED_UI_FRAME][item] = {
                        "classNames": "tdb__input mb-3"
                }
            }
        }
        if(frame[item] && isDocumentType(frame[item], fullFrame)) { 
            //link documents 
            if(diffPatch.hasOwnProperty(item)) {
                if(diffPatch[item].hasOwnProperty("@op")) {

                    let diffUI=getDocumentFieldDiffs(diffPatch, item)
                    diffUIFrames[ORIGINAL_UI_FRAME][item]=diffUI[ORIGINAL_UI_FRAME][item]
                    diffUIFrames[CHANGED_UI_FRAME][item]=diffUI[CHANGED_UI_FRAME][item]

                }
            }
        }
        if(frame[item] && isSubDocumentType(frame[item])) { 
            //subdocument - patch for sub documents would not have an @op 
            if(diffPatch.hasOwnProperty(item) && Object.keys(diffPatch[item]).length > 0) { 
                let diffUI=getSubDocumentFieldDiffs(fullFrame, frame, diffPatch, item, type, oldValue, newValue,)
                diffUIFrames[ORIGINAL_UI_FRAME][item]=diffUI[ORIGINAL_UI_FRAME][item]
                diffUIFrames[CHANGED_UI_FRAME][item]=diffUI[CHANGED_UI_FRAME][item]
                
            }
        }

        if (frame[item] && isListType(frame[item])) { 
            // list 
            if(diffPatch.hasOwnProperty(item)) { 
                let constructedListFrame = constructOptionalFrame(frame[item], item)
                let diffUI=getListFieldDiffs(fullFrame, constructedListFrame, diffPatch, item, type, oldValue, newValue)
                diffUIFrames[ORIGINAL_UI_FRAME][item]=diffUI[ORIGINAL_UI_FRAME][item]
                diffUIFrames[CHANGED_UI_FRAME][item]=diffUI[CHANGED_UI_FRAME][item]
            }
        }

        if (frame[item] && isSetType(frame[item])) { 
            //set
            if(diffPatch.hasOwnProperty(item)) { 
                let constructedSetFrame = constructOptionalFrame(frame[item], item)
                let setProperties = generateDiffUIFrames(fullFrame, constructedSetFrame, type, oldValue, newValue, diffPatch)
                //onsole.log("constructedSetFrame", constructedSetFrame)
                let diffUI=getSetFieldDiffs(fullFrame, constructedSetFrame, diffPatch, item, type, oldValue, newValue)
                diffUIFrames[ORIGINAL_UI_FRAME][item]=diffUI[ORIGINAL_UI_FRAME][item]
                diffUIFrames[CHANGED_UI_FRAME][item]=diffUI[CHANGED_UI_FRAME][item]
            }
        }

        if (frame[item] && isEnumType(frame[item])) { 
            // enums
            if(diffPatch.hasOwnProperty(item)) {
                if(diffPatch[item].hasOwnProperty("@op")) {

                    let diffUI=getEnumFieldDiffs(diffPatch, item)
                    diffUIFrames[ORIGINAL_UI_FRAME][item]=diffUI[ORIGINAL_UI_FRAME][item]
                    diffUIFrames[CHANGED_UI_FRAME][item]=diffUI[CHANGED_UI_FRAME][item]

                }
            }
        }
    }

    console.log("diffUIFrames", diffUIFrames)
    return diffUIFrames
}