
import * as util from "../utils"
import * as CONST from "../constants"
import * as template from "./templates"
import {getChoiceSubDocumentsArrayItems} from "../choiceSubDocumentTypeFrames/helpers"
import {getOneOfTypeArrayItems} from "../oneOfTypeFrames/helpers"

/**
 * 
 * @param {*} frame - frame of data type 
 * @param {*} item - property of interest 
 * @param {*} mode - mode in which frame viewer is called
 * @param {*} formData - data to be displayed in fields
 * @returns returns item layout
 */
export function gatherItemsLayout (frame, item, mode, formData) {
    // gathering items for choice sub documents in a different way ...
    if( mode !== CONST.CREATE && 
        frame.properties.hasOwnProperty(item) && 
        frame.properties[item].hasOwnProperty(CONST.INFO)) {

            if (frame.properties[item].info === CONST.CHOICESUBCLASSES) {
                // choice sub documents
                return getChoiceSubDocumentsArrayItems(frame, item, formData)
            }
            else if (frame.properties[item].info === CONST.ONEOFVALUES) {
                return getOneOfTypeArrayItems(frame, item, formData)
            }
        }
    return frame.properties[item]
}

/**
 * 
 * @param {*} frame - frame of document
 * @param {*} item - current property
 * @returns default layout without default populated in it
 */
export function extractAdditionalLayout (frame, item) {
    return frame.properties[item]
}

/**
 * 
 * @param {*} frame - frame of document
 * @param {*} item - current property
 * @returns UI Layout for Set Array 
 */
 export function getListArrayUILayout (frame, item, documentation) {
    let ui = util.removeRequired(item, documentation, frame.uiSchema[item])
    let uiLayout={
        "classNames": "tdb__array__items__css tdb__array__frames",
        "items": ui, 
        "additionalItems": ui,
        "ui:options": CONST.LIST_UI_ARRAY_OPTIONS,
        "ui:ArrayFieldTemplate" : template.ArrayFieldTemplate
    }
    return uiLayout 
} 


/**
 * 
 * @param {*} frame - frame of document
 * @param {*} item - current property
 * @returns UI Layout for Set Array  
 */ 
 export function getArrayUILayout (frame, item, documentation) {
    let ui = util.removeRequired(item, documentation, frame.uiSchema[item])

    let uiLayout={}
    // default ui
    uiLayout={
        "classNames": "tdb__array__items__css tdb__array__frames",
        "items": ui,  
        "additionalItems": ui, 
        "ui:options": CONST.SET_UI_ARRAY_OPTIONS,
        "ui:ArrayFieldTemplate" : template.ArrayFieldTemplate
    }
    return uiLayout
} 


/**
 * 
 * @param {*} frame - frame of document
 * @param {*} item - current property
 * @returns UI Layout for Set Array when in View Mode by hiding the add array button from view
 */ 
export function getViewArrayUILayout (frame, item, formData, documentation) {

    let ui = util.removeRequired(item, documentation, frame.uiSchema[item])
    let uiLayout={
        "classNames": "tdb__array__items__css tdb__array__frames",
        "items": ui, 
        "additionalItems": ui, 
        "ui:options": CONST.SET_UI_HIDDEN_ARRAY_OPTIONS 
    }
    // check if filled or empty
    let filledData=util.isFilled(formData, item)
    if(filledData) {
        uiLayout["ui:ArrayFieldTemplate"]=template.ArrayFieldTemplate
    }
    return uiLayout
}

/**
 * 
 * @param {*} formData - data to be filled in form
 * @returns length of array to populate number of already stored fields in edit mode for Set
 */
export function getSetMinItems(mode, formData) {
    return 0
    //if(mode === CONST.EDIT && Array.isArray(formData)) {
        //if(!Array.isArray(formData)){
        //    throw new Error (`Expected data to be an array ... but instead received ${JSON.stringify(formData, null, 2)}`)
        //}
        //return formData.length
        //return 0
    //}
    //return 0
}

/**
 * 
 * @param {*} formData - data to be filled in form
 * @returns length of array to populate number of already stored fields in edit mode for List
 */
 export function getListMinItems(mode, formData) {
    //if(mode === CONST.EDIT && Array.isArray(formData)) {
        //if(!Array.isArray(formData)){
          //  throw new Error (`Expected data to be an array ... but instead received ${JSON.stringify(formData, null, 2)}`)
        //}
        //return formData.length
    //}
    return 1
}

