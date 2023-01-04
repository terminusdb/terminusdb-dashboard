import * as DIFFCONST from "./diff.constants"
import {DIFF} from "../constants"
import * as util from "./diffComponents"

/**
 * 
 * @param {*} diff - diff per field change {@after: ... , @before ..., @op: "SwapValue"}
 * @returns classnames for original & changed fields 
 */
function getClassNamesForDiffs(diff) { 
    let originalUIFrame={}, changedUIFrame={}

    /** 
     * value has been changed 
     */
    if(diff.hasOwnProperty(DIFFCONST.OPERATION)
        && diff[DIFFCONST.OPERATION] === DIFFCONST.SWAP_VALUE) {

        if(diff.hasOwnProperty(DIFFCONST.AFTER) && 
            diff[DIFFCONST.AFTER] === null)  {
                // property has been removed 
                originalUIFrame["classNames"] = "tdb__diff__original"
                changedUIFrame[DIFF] = util.showRemovedElementChanged
            }
        else if(diff.hasOwnProperty(DIFFCONST.BEFORE) && 
            diff[DIFFCONST.BEFORE] === null) {
                // property has been added 
                originalUIFrame[DIFF] = util.showRemovedElementOriginal
                changedUIFrame["classNames"] = "tdb__diff__changed"
            }
        else {
            // when changed
            originalUIFrame["classNames"] = "tdb__diff__original"
            changedUIFrame["classNames"] = "tdb__diff__changed"
        }
    }
    return {originalUIFrame, changedUIFrame}
}


// ALL SWAP VALUE OPERATIONS
export function getDataFieldDiffs(diff) {

    if(!diff.hasOwnProperty(DIFFCONST.OPERATION)) {
        let originalUIFrame=[], changedUIFrame=[]
        //diff of sub documents 
        for(let properties in diff){ 
            let classNames=getClassNamesForDiffs(diff[properties])
            originalUIFrame.push({ [properties]: classNames.originalUIFrame })
            changedUIFrame.push({ [properties]: classNames.changedUIFrame })
        }
        // sets border color of subdocument detecting change
        if(originalUIFrame.length) originalUIFrame.push({ "classNames": "tdb__diff__original__subDocuments" })
        if(changedUIFrame.length) changedUIFrame.push({ "classNames": "tdb__diff__changed__subDocuments" }) 
        
        return { originalUIFrame, changedUIFrame }
    }

    let {originalUIFrame, changedUIFrame}=getClassNamesForDiffs(diff)
    
    return {originalUIFrame, changedUIFrame}
}