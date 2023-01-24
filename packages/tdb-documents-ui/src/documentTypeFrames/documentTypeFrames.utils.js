import React, {useEffect, useState} from "react"
import * as CONST from "../constants"
import {
    DocumentView,
    displaySearchComponent
} from "./helpers"

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
        return displaySearchComponent(props, onSelect, frame.linked_to)
    }

    if(frame.hasOwnProperty("anyOf") && frame.anyOf.length) {
        let createNew=frame.anyOf.filter(arr => arr.title === CONST.LINK_NEW_DOCUMENT)
        if(createNew.length) {
            for(let key in createNew[0]["properties"]) {
                // populate ui schema from extracted properties
                if(key === "@type") uiLayout["@type"] = { "ui:widget": "hidden" } 
                else uiLayout[key] = createNew[0]["uiSchema"][key]
            } 
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
function getEditUILayout (frame, onSelect, css) {
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
                {displaySearchComponent(props, onSelect, frame.linked_to)}
            </>
        }
        uiLayout["ui:field"] = getEditLinkExistingUI
    }
    else if(frame.hasOwnProperty("anyOf") && frame.anyOf.length) {
         // @unfoldable is true
        let createNew=frame.anyOf.filter(arr => arr.title === CONST.LINK_NEW_DOCUMENT)
        for(let key in createNew[0]["properties"]) {
            // populate ui schema from extracted properties
            if(key === "@type") uiLayout["@type"] = { "ui:widget": "hidden" } 
            else uiLayout[key] = createNew[0]["uiSchema"][key]
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
        // @unfoldable is true
        uiLayout=getEditUILayout(frame, null, "tdb__view__document__link")
    }
    uiLayout["ui:readonly"]=true
    return uiLayout
}
 
//export function getUILayout (fullFrame, frame, item, uiFrame, mode, formData, onTraverse, onSelect, documentation, extractedFrames) {
export function getUILayout (fullFrame, frame, onSelect, onTraverse, item, uiFrame, mode, formData, documentation, setChainedData) {
  
    let uiLayout={}
    //console.log("frame", frame)

    // CREATE MODE
    if(mode === CONST.CREATE) {
        uiLayout=getCreateUILayout (frame, onSelect)
    }
    else if (mode === CONST.EDIT) {
        // EDIT MODE
        uiLayout=getEditUILayout (frame, onSelect, "tdb__edit__document__link")
    }
    else {
        // VIEW Mode
        uiLayout=getViewUILayout (frame, onTraverse)
    }
    
    
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
