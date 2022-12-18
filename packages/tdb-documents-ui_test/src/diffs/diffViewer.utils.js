import * as util from "../utils"
import * as CONST from "../constants"
import * as DIFFCONST from "./diff.constants"
import {getDataFieldDiffs} from "./dataFieldDiffs"
import {getArrayFieldDiffs} from "./arrayFieldDiffs"

export function generateDiffUIFrames (fullFrame, frame, type, oldValue, newValue, diffPatch) {
    let diffUIFrames={
        originalUIFrame: {},
        changedUIFrame: {}
    }  

    for(var item in frame) {
        if(item === "@id") continue
        else if(item === "@key") continue
        else if(item === "@type") continue
        else if(item === "@id") continue
        else if(item === CONST.SUBDOCUMENT) continue
        else if(item === CONST.DOCUMENTATION) continue
        else if(util.isMandatory(frame, item)) {
            let diff=diffPatch.hasOwnProperty(item) ? diffPatch[item] : {}
            let ui=getDataFieldDiffs(diff)
            
            diffUIFrames[DIFFCONST.ORIGINAL_UI_FRAME][item]=ui.originalUIFrame
            diffUIFrames[DIFFCONST.CHANGED_UI_FRAME][item]=ui.changedUIFrame
        }
        else if(util.isOptional(frame, item)) {
            let diff=diffPatch.hasOwnProperty(item) ? diffPatch[item] : {}
            let ui=getDataFieldDiffs(diff)
            
            diffUIFrames[DIFFCONST.ORIGINAL_UI_FRAME][item]=ui.originalUIFrame
            diffUIFrames[DIFFCONST.CHANGED_UI_FRAME][item]=ui.changedUIFrame
        }
        else if(util.isSet(frame, item)) {
            let diff=diffPatch.hasOwnProperty(item) ? diffPatch[item] : {}
            let ui=getArrayFieldDiffs(diff, item, oldValue, newValue)
            
            diffUIFrames[DIFFCONST.ORIGINAL_UI_FRAME][item]=ui.originalUIFrame
            diffUIFrames[DIFFCONST.CHANGED_UI_FRAME][item]=ui.changedUIFrame
        }
        else if(util.isList(frame, item)) {
            let diff=diffPatch.hasOwnProperty(item) ? diffPatch[item] : {}
            let ui=getArrayFieldDiffs(diff, item, oldValue, newValue)
            
            diffUIFrames[DIFFCONST.ORIGINAL_UI_FRAME][item]=ui.originalUIFrame
            diffUIFrames[DIFFCONST.CHANGED_UI_FRAME][item]=ui.changedUIFrame
        }
    }
    

    //console.log("generated diffUIFrames", diffUIFrames, item)
    return diffUIFrames
}