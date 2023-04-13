import React, {useEffect, useState} from "react"
import * as CONST from "../constants"
import {
    DocumentView,
    displaySearchComponent
} from "./helpers"
import * as util from "../utils"

function addUiOrderToCreateNewFrames (createNew, uiLayout) {
    if(createNew[0]["uiSchema"].hasOwnProperty("ui:order")) {
        uiLayout["ui:order"]=createNew[0]["uiSchema"]["ui:order"]
    }
    return
}

/**
 * 
 * @param {*} frame extracted frames
 * @param {*} onSelect will display Search component in UI 
 * @returns create mode ui Layout
 */
function getCreateUILayout (frame, onSelect) {
    let uiLayout = {
        "classNames": "w-100 d-block tdb__input tdb__document__link mb-4 mt-2 p-2"
    }
    function getLinkExistingUI (props) {
        return displaySearchComponent(props, onSelect, frame.linked_to, CONST.CREATE)
    }

    if(frame.hasOwnProperty("anyOf") && frame.anyOf.length) {
        let createNew=frame.anyOf.filter(arr => arr.title === CONST.LINK_NEW_DOCUMENT)
        if(createNew.length) {
            for(let key in createNew[0]["properties"]) {
                // populate ui schema from extracted properties
                if(key === "@type") uiLayout["@type"] = { "ui:widget": "hidden" } 
                else uiLayout[key] = createNew[0]["uiSchema"][key]
            } 
            addUiOrderToCreateNewFrames (createNew, uiLayout) 
        }
        
        // CONST.LINK_EXISTING_DOCUMENT UI  
        uiLayout[CONST.LINK_EXISTING_DOCUMENT] = { 
            "ui:field" : getLinkExistingUI
        }
    }
    return uiLayout
}

/**
 * 
 * @param {*} frame extracted frames
 * @returns create mode ui Layout
 */
function getEditUILayout (frame, onSelect, css, mode) {
    let uiLayout = {
        "classNames": `w-100 d-block tdb__input tdb__document__link ${css} mb-4`
    }

    // @unfoldable is false
    if(frame.hasOwnProperty("anyOf")  && !frame["anyOf"] ) {
        function getEditLinkExistingUI (props) {
            return <>
                <div className="control-label">
                    {props.name}
                </div>
                {displaySearchComponent(props, onSelect, frame.linked_to, mode)}
            </>
        }
        uiLayout["ui:field"] = getEditLinkExistingUI
    }
    else if(frame.hasOwnProperty("anyOf") && frame.anyOf.length) {
         // @unfoldable is true
        let createNew=frame.anyOf.filter(arr => arr.title === CONST.LINK_NEW_DOCUMENT)
        if(createNew.length) {
            for(let key in createNew[0]["properties"]) {
                // populate ui schema from extracted properties
                if(key === "@type") uiLayout["@type"] = { "ui:widget": "hidden" } 
                else uiLayout[key] = createNew[0]["uiSchema"][key]
            }
            addUiOrderToCreateNewFrames (createNew, uiLayout) 
        }
        else {
            // @unfoldable is true & cycle exists
            function getEditLinkExistingUI (props) {
                return <>
                    <div className="control-label">
                        {props.name}
                    </div>
                    {displaySearchComponent(props, onSelect, frame.linked_to, mode)}
                </>
            }
            uiLayout["ui:field"] = getEditLinkExistingUI
        }
    }
    return uiLayout
}

/**
 * 
 * @param {*} frame extracted frames
 * @returns create mode ui Layout
 */
function getViewUILayout (frame, onTraverse) {
    let uiLayout = {}
    // @unfoldable is false
    if(frame.hasOwnProperty("anyOf")  && !frame["anyOf"] ) {
        function getViewLink(props) {
            return <DocumentView props={props} onTraverse={onTraverse}/>
        }
        uiLayout["ui:field"] = getViewLink
    }
    else if(frame.hasOwnProperty("anyOf") && frame.anyOf.length) { 
        let linked=frame.anyOf.filter(arr => arr.title === CONST.LINK_EXISTING_DOCUMENT) 
        if(linked.length) {
            // review this - this is the case where property is linked to its own parent document 
            // where we give option to only display link to an existing document
            function getViewLink(props) {
                return <DocumentView props={props} onTraverse={onTraverse}/>
            }
            uiLayout["ui:field"] = getViewLink
        }
        else {
            // @unfoldable is true
            uiLayout=getEditUILayout(frame, null, "tdb__view__document__link", CONST.VIEW)
        }
    }
    uiLayout["ui:readonly"]=true
    return uiLayout
}

// extractedFrames includes frames extracted from one of s
// frame includes frame to which document link property is pointing to
export function getUILayout (fullFrame, frame, extractedFrames, onSelect, onTraverse, item, uiFrame, mode, formData, documentation, setChainedData) {
  
    let uiLayout={}
    //console.log("frame", frame)

    // CREATE MODE
    if(mode === CONST.CREATE) {
        uiLayout=getCreateUILayout (extractedFrames, onSelect)
    }
    else if (mode === CONST.EDIT) {
        // EDIT MODE
        uiLayout=getEditUILayout (extractedFrames, onSelect, "tdb__edit__document__link", CONST.EDIT)
    }
    else {
        // VIEW Mode
        uiLayout=getViewUILayout (extractedFrames, onTraverse)
    }
    
    /*let order=util.getOrderFromMetaData(frame)
    if(order) {
        uiLayout["ui:order"] = order
    }
    */
    return uiLayout
}

/*
 //uiLayout = {
        //"ui:placeholder": `Start typing ... to search here ...`,
        //"ui:field": displayLinkedDocument
    //}
    //if(mode === CONST.VIEW) {
      //  uiLayout["classNames"]= "tdb__input mb-3 mt-4 tdb__document__link__view"
    //}
    //else uiLayout["classNames"]= "tdb__input mb-3 mt-4 w-100"
    */
