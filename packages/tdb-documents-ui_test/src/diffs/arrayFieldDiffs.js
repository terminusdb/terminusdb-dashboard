import React from "react"
import * as DIFFCONST from "./diff.constants"
import * as CONST from "../constants"
import * as util from "./diffComponents"
import {getDataFieldDiffs} from "./dataFieldDiffs"
import {displayElements} from "./displayArrayFieldDiffs"

/** swap operation */
function swapOperation(diffItem) {
    let originalUI={}, changedUI={}

    if(diffItem.hasOwnProperty(DIFFCONST.OPERATION) && 
        diffItem[DIFFCONST.OPERATION] === DIFFCONST.SWAP_VALUE) {

        let extracted=getDataFieldDiffs(diffItem)
        originalUI=extracted[DIFFCONST.ORIGINAL_UI_FRAME]["classNames"]
        changedUI=extracted[DIFFCONST.CHANGED_UI_FRAME]["classNames"]
    }

    return {originalUI, changedUI}
}

/** displays element without any changed */
function displayNoChangeElements (noChangeElementsCount, item, tagOriginalUI, tagChangedUI) {
    for(let count=0; count<noChangeElementsCount; count++ ) {
        tagOriginalUI[item].push("tdb__input")
        tagChangedUI[item].push("tdb__input")
    }
}

/** Swap Value operation */
function swapValueOperation(diffItem, item, tagOriginalUI, tagChangedUI) {
    let { originalUI, changedUI } = swapOperation(diffItem)
    tagOriginalUI[item].push(originalUI)
    tagChangedUI[item].push(changedUI)
}

/**Swap Value operation for sub document */
function swapValueSubDocumentOperation(diffItem, property, subDocumentOriginalUI, subDocumentChangedUI) {
    let { originalUI, changedUI } = swapOperation(diffItem)
    subDocumentOriginalUI.push({ [property]: originalUI })
    subDocumentChangedUI.push({ [property]: changedUI })
}
 
/** Patch List Opertation */
function patchListOperation (diff, item, tagOriginalUI, tagChangedUI) {
    // @patch param - which is always an array 
    if(diff.hasOwnProperty(DIFFCONST.PATCH)){
        if(!Array.isArray(diff[DIFFCONST.PATCH])) {
            throw new Error(`Expected diffs of Set to be an Array ... instead got ${diffItem[DIFFCONST.PATCH]}`)
        }
        diff[DIFFCONST.PATCH].map(patch => {
            if(!patch.hasOwnProperty(DIFFCONST.OPERATION)) {
                let subDocumentOriginalUI = [], subDocumentChangedUI = []
                // this is a sub document 
                for(let properties in patch) {
                    if(patch[properties].hasOwnProperty(DIFFCONST.OPERATION)) {
                        // pass on property diffs
                        swapValueSubDocumentOperation(patch[properties], properties, subDocumentOriginalUI, subDocumentChangedUI)
                    }
                }
                // get css per subdocument in array
                tagOriginalUI[item].push(subDocumentOriginalUI)
                tagChangedUI[item].push(subDocumentChangedUI)
            }
            else {
                // normal data types
                let {originalUI, changedUI} = swapOperation(patch)
                tagOriginalUI[item].push(originalUI)
                tagChangedUI[item].push(changedUI)
            }
        })
    }

    // @rest param 
    if(diff.hasOwnProperty(DIFFCONST.REST)){
         // @to is number of elements which did not change 
        let noChangeElements=diff[DIFFCONST.REST]["@to"]
        displayNoChangeElements (noChangeElements, item, tagOriginalUI, tagChangedUI)
        // op is CopyList here ...
        if(diff[DIFFCONST.REST].hasOwnProperty(DIFFCONST.REST)) {

            // op is CopyList here ... 
            if(diff[DIFFCONST.REST].hasOwnProperty(DIFFCONST.OPERATION) && 
                diff[DIFFCONST.REST][DIFFCONST.OPERATION] === DIFFCONST.COPY_LIST) {
                
                // op is Swap List here  
                if(diff[DIFFCONST.REST][DIFFCONST.REST].hasOwnProperty(DIFFCONST.OPERATION) && 
                    diff[DIFFCONST.REST][DIFFCONST.REST][DIFFCONST.OPERATION] === DIFFCONST.SWAP_LIST) {
                    swapListOperation(diff[DIFFCONST.REST][DIFFCONST.REST], item, tagOriginalUI, tagChangedUI)
                }
                else {  
                    // copy list swap operation 
                    diff[DIFFCONST.REST][DIFFCONST.REST].map(rest => { 
                        let {originalUI, changedUI} = swapOperation(rest)
                        tagOriginalUI[item].push(originalUI)
                        tagChangedUI[item].push(changedUI)
                    })

                }
            }

        }

        // op is Swap List here  
        if(diff[DIFFCONST.REST].hasOwnProperty(DIFFCONST.OPERATION) && 
            diff[DIFFCONST.REST][DIFFCONST.OPERATION] === DIFFCONST.SWAP_LIST) {
                swapListOperation(diff[DIFFCONST.REST], item, tagOriginalUI, tagChangedUI)
        }
    }      
}

/** copy list operation  */
function copyListOperation (diff, item, tagOriginalUI, tagChangedUI) {
    // copy to "@to" position
    let noChangeElements=diff["@to"]
    displayNoChangeElements (noChangeElements, item, tagOriginalUI, tagChangedUI)
    if(diff.hasOwnProperty(DIFFCONST.REST)) {
        patchListOperation (diff[DIFFCONST.REST], item, tagOriginalUI, tagChangedUI) 
    } 
}

/** swap list for sub documents  */
function swapListSubDocumentOperation (diff, css, tag) {
    let uiArray=[]
    diff.map(arr => {
        uiArray=[]
        for(let property in arr) {
            if(property === "@id") continue
            if(property === "@type") continue
            uiArray.push({ [property]: css})
        }
        tag.push(uiArray)
    })
    return
}

/** swap list for normal documents */
function swapListDocumentOperation (diff, css, tag) {
    let uiArray=[]
    diff.map(arr => {
        uiArray=[]
        tag.push(css)
    })
    return
}

/** swap list operation */
function swapListOperation (diff, item, tagOriginalUI, tagChangedUI) {
    // @before 
    if(diff.hasOwnProperty(DIFFCONST.BEFORE) && 
        diff[DIFFCONST.BEFORE].length){
        if(typeof diff[DIFFCONST.BEFORE][0] === CONST.OBJECT_TYPE){
            swapListSubDocumentOperation (diff[DIFFCONST.BEFORE], "tdb__diff__original", tagOriginalUI[item]) 
        }
        else swapListDocumentOperation(diff[DIFFCONST.BEFORE], "tdb__diff__original", tagOriginalUI[item])
    }  
    // @after 
    if(diff.hasOwnProperty(DIFFCONST.AFTER) && 
        diff[DIFFCONST.AFTER].length){
        if(typeof diff[DIFFCONST.AFTER][0] === CONST.OBJECT_TYPE) {
            swapListSubDocumentOperation (diff[DIFFCONST.AFTER], "tdb__diff__changed", tagChangedUI[item]) 
        }
        else swapListDocumentOperation(diff[DIFFCONST.AFTER], "tdb__diff__changed", tagOriginalUI[item])
    }
    // @before is empty
    if(diff.hasOwnProperty(DIFFCONST.BEFORE) && 
        diff[DIFFCONST.BEFORE].length === 0){
        // pass in @after info so as to hide fields to get sub document removed card length
        if(typeof diff[DIFFCONST.AFTER][0] === CONST.OBJECT_TYPE){
            swapListSubDocumentOperation (diff[DIFFCONST.AFTER], "tdb__diff__original__removed", tagOriginalUI[item])
        }
        else swapListDocumentOperation(diff[DIFFCONST.AFTER], "tdb__diff__original__removed", tagOriginalUI[item])
    }
    // @after is empty
    if(diff.hasOwnProperty(DIFFCONST.AFTER) && 
        diff[DIFFCONST.AFTER].length === 0){
        // pass in @before info so as to hide fields to get sub document removed card length
        if(typeof diff[DIFFCONST.BEFORE][0] === CONST.OBJECT_TYPE){
            swapListSubDocumentOperation (diff[DIFFCONST.BEFORE], "tdb__diff__changed__removed", tagChangedUI[item])
        }
        else swapListDocumentOperation(diff[DIFFCONST.BEFORE], "tdb__diff__changed__removed", tagChangedUI[item])
    }
}

/**
 * 
 * @param {*} diff - diff of each sub document 
 * @param {*} item - subdocument name
 * @param {*} tagOriginalUI - array to store original css per sub documents 
 * @param {*} tagChangedUI - array to stor changed css per sub documents 
 */
function processEachDiff(diff, item, tagOriginalUI, tagChangedUI) {
    // SWAP_VALUE operation
    diff.map(diffItem => {
        if(!diffItem.hasOwnProperty(DIFFCONST.OPERATION)) {
            let subDocumentOriginalUI = [], subDocumentChangedUI = []
            // this is a sub document 
            for(let properties in diffItem) {
                if(diffItem[properties].hasOwnProperty(DIFFCONST.OPERATION)) {
                    // pass on property diffs
                    swapValueSubDocumentOperation(diffItem[properties], properties, subDocumentOriginalUI, subDocumentChangedUI)
                }
            }
            // get css per subdocument in array
            tagOriginalUI[item].push(subDocumentOriginalUI)
            tagChangedUI[item].push(subDocumentChangedUI)
        }
        else {
            // normal data types
            swapValueOperation(diffItem, item, tagOriginalUI, tagChangedUI)
        }
    })
}


// ALL ARRAY FIELDS
export function getArrayFieldDiffs(diff, item, oldValue, newValue) {

    let originalUIFrame={}, changedUIFrame={}

    let tagOriginalUI={
        [item]: []
    }

    let tagChangedUI={
        [item]: []
    }

    // SWAP_VALUE operation
    if(Array.isArray(diff)) {
        processEachDiff(diff, item, tagOriginalUI, tagChangedUI)
    }
    
    // PATCH_LIST operation
    else if(diff.hasOwnProperty(DIFFCONST.OPERATION) && 
            diff[DIFFCONST.OPERATION] === DIFFCONST.PATCH_LIST) {
            patchListOperation (diff, item, tagOriginalUI, tagChangedUI)     
      }
    // COPY_LIST operation
    else if(diff.hasOwnProperty(DIFFCONST.OPERATION) && 
        diff[DIFFCONST.OPERATION] === DIFFCONST.COPY_LIST) {
            // @rest param with patch list operation
            if(diff.hasOwnProperty(DIFFCONST.REST) && 
                diff[DIFFCONST.REST][DIFFCONST.OPERATION] === DIFFCONST.PATCH_LIST ){
                    copyListOperation (diff, item, tagOriginalUI, tagChangedUI)
            }
            // @rest param with swapValue operation
            if(diff.hasOwnProperty(DIFFCONST.REST) && 
                Array.isArray(diff[DIFFCONST.REST]) && 
                diff[DIFFCONST.REST][0][DIFFCONST.OPERATION] === DIFFCONST.SWAP_VALUE ){
                    //copyListOperation (diff, item, tagOriginalUI, tagChangedUI)
                    processEachDiff(diff[DIFFCONST.REST], item, tagOriginalUI, tagChangedUI)
            }
            // @ rest param with swap list operation
            if(diff.hasOwnProperty(DIFFCONST.REST) && 
                diff[DIFFCONST.REST].hasOwnProperty(DIFFCONST.REST) && 
                diff[DIFFCONST.REST][DIFFCONST.REST][DIFFCONST.OPERATION] === DIFFCONST.SWAP_LIST ){
                    swapListOperation(diff[DIFFCONST.REST][DIFFCONST.REST], item, tagOriginalUI, tagChangedUI)
            }
    }
    console.log("tagOriginalUI", tagOriginalUI)
    console.log("tagChangedUI", tagChangedUI)

    /**
     * 
     * @param {*} props 
     * @returns original ui elements 
     */
    function displayOriginal(props) {
        //console.log("props original", props.formData)
        return displayElements(props.formData, item, props.schema, tagOriginalUI)
    }

    /**
     * 
     * @param {*} props 
     * @returns changed ui elements 
     */
    function displayChanged(props) {
        //console.log("props changed", props.formData)
        return displayElements(props.formData, item, props.schema, tagChangedUI)
    }

    originalUIFrame[CONST.DIFF] = displayOriginal
    changedUIFrame[CONST.DIFF] = displayChanged 
    return {originalUIFrame, changedUIFrame}
}