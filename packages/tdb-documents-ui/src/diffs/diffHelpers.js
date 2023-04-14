import * as CONST from "../constants"
import * as DIFFCONST from "./diff.constants"

// function to generate border class
function getBorder(diffState)  {
  if(diffState === DIFFCONST.BEFORE) {
    return "tdb__diff__original-border"
  }
  return "tdb__diff__changed-border"
} 

// SETS/ LIST/ ARRAY
function processOperation(diff, diffState) {
  if(diff[DIFFCONST.OPERATION] === DIFFCONST.SWAP_VALUE) {
    return swapOperation (diffState, diff[diffState]) 
  }
}

// get diff & css for each entry of array
function getEachArrayDiff(diffPatch, diffState) {
  let uiArray= []
  // SETS/ LIST/ ARRAY
  diffPatch.map( diff => {
    if(diff.hasOwnProperty(DIFFCONST.OPERATION)) {
      uiArray.push(processOperation(diff, diffState) )
    }
    else {
      // SUBDOCUMENTS SET/ LIST/ ARRAY
      let ui = generateDiffUIFrames(diff, diffState)
      if(Object.keys(ui).length){
        // add border only if changes are there in document properties 
        // if no changes then ui = {}
        ui[CONST.BORDER] = getBorder(diffState) 
      }
      uiArray.push(ui)
    }
  })
  return uiArray
}

// @op = SwapValue
function swapOperation (diffState, value) {
  if(diffState === DIFFCONST.BEFORE) {
    if(!value) return { [CONST.CLASSNAME]: "tdb__doc__input tdb__diff__original__deleted" }
    return { [CONST.CLASSNAME]: "tdb__doc__input tdb__diff__original" }
  }
  if(!value) return { [CONST.CLASSNAME]: "tdb__doc__input tdb__diff__changed__deleted" }
  return { [CONST.CLASSNAME]: "tdb__doc__input tdb__diff__changed" }
}

function getDiffUi (diffPatch, diffState) {
  let uiFrame = {} 

  if(diffPatch.hasOwnProperty(DIFFCONST.OPERATION)) {
    if(diffPatch[DIFFCONST.OPERATION] === DIFFCONST.SWAP_VALUE) {
      // SWAP VALUE OPERATION
      uiFrame = swapOperation (diffState, diffPatch[diffState]) 
    }
    else if (diffPatch[DIFFCONST.OPERATION] === DIFFCONST.PATCH_LIST) { 
      // PATCH LIST OPERATION
      let uiArray= []
      // pass @patch array
      let patchList = getEachArrayDiff(diffPatch[DIFFCONST.PATCH], diffState)
      // add pacth list to ui array
      uiArray = patchList
      // pass @rest 
      if(diffPatch.hasOwnProperty(DIFFCONST.REST)) {
        // now add @to 
        for(let count = 0; count < diffPatch[DIFFCONST.REST][DIFFCONST.TO]; count ++) {
          // set default class name
          uiArray.push({ [CONST.CLASSNAME]: "tdb__doc__input" })
        }
        let restUi = getDiffUi(diffPatch[DIFFCONST.REST], diffState) 
        // merge patchlist & rest list
        let merged = [...uiArray, ...restUi];
        uiArray=merged
      }
      uiFrame = uiArray
    }
    else if (diffPatch[DIFFCONST.OPERATION] === DIFFCONST.COPY_LIST) {
      // COPY LIST
      // pass @rest array
      if(Array.isArray(diffPatch[DIFFCONST.REST])) {
        uiFrame = getEachArrayDiff(diffPatch[DIFFCONST.REST], diffState)
      }
      // pass @rest object
      else {
        let patchTESTList = getDiffUi (diffPatch[DIFFCONST.REST], diffState)
        uiFrame=patchTESTList
      }
    }
    else if(diffPatch[DIFFCONST.OPERATION] === DIFFCONST.KEEP_LIST) {
      // send remaining default classname
      return [{ [CONST.CLASSNAME]: "tdb__doc__input" }]
    }
  }
  else { 
    if(Array.isArray(diffPatch)) {
      uiFrame = getEachArrayDiff(diffPatch, diffState)
    }
    else {
      // SUBDOCUMENTS 
      uiFrame = generateDiffUIFrames(diffPatch, diffState) 
      if(Object.keys(uiFrame).length)
        uiFrame[CONST.BORDER] = getBorder(diffState) 
    }
  }

  return uiFrame
}

// @op = @insert
function getInsertUi (diffPatch, diffState) {
  let documentType = diffPatch[DIFFCONST.INSERT_OPERATION][CONST.TYPE]
  if(diffState === DIFFCONST.AFTER) {
    return { [documentType] : { [CONST.CLASSNAME]: "tdb__diff__inserted rounded p-3"} }
  }
  return { [documentType] : { [CONST.CLASSNAME]: "display-none"} }
}


// @op = @delete
function getDeleteUi (diffPatch, diffState) {
  let documentType = diffPatch[DIFFCONST.DELETE_OPERATION][CONST.TYPE]
  if(diffState === DIFFCONST.BEFORE) {
    return { [documentType] : { [CONST.CLASSNAME]: "tdb__diff__deleted rounded p-3"} }
  }
  return { [documentType] : { [CONST.CLASSNAME]: "display-none"} }
}


/**
 * 
 * @param {*} args 
 * @param {*} diffState diff state is @before or @after - the state in which we view diffs
 * @returns 
 */ 
export function generateDiffUIFrames(diffPatch, diffState) {
  
  let uiFrame = {} 

  for (let property in diffPatch) {
    if(property === "@id") continue
    else if(property === "@op") continue
    else if(property === DIFFCONST.INSERT_OPERATION) {
      // @insert operation
      uiFrame = getInsertUi(diffPatch, diffState)
    }
    else if(property === DIFFCONST.DELETE_OPERATION) {
      // @delete operation
      uiFrame = getDeleteUi(diffPatch, diffState)
    }
    else {
      let diffUi =getDiffUi (diffPatch[property], diffState)
      if(Object.keys(diffUi).length)
        uiFrame[property] = diffUi  
    }
  }

  console.log("!!! uiFrame !!!", diffState, uiFrame)
  return  uiFrame
}