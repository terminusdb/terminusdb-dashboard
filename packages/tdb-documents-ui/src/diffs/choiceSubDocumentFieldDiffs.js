import React from "react"
import {generateDiffUIFrames} from "./diffViewer.utils"
import {ORIGINAL_UI_FRAME, CHANGED_UI_FRAME} from "../constants"
import {AFTER, BEFORE} from "./diff.constants"
import {FrameViewer} from "../FrameViewer"
import {AiFillMinusCircle} from "react-icons/ai"

/**
 * 
 * @param {*} item field of frame
 * @param {*} oldValue old form data
 * @param {*} newValue new form data 
 * @returns if choices are same returns a string else returns false
 */
function checkIfChoicesAreSame(item, oldValue, newValue) {
    let oldValueType=false, newValueType=false
    if(oldValue.hasOwnProperty(item) && oldValue[item].hasOwnProperty("@type")) {
        oldValueType=oldValue[item]["@type"]
    }
    if(newValue.hasOwnProperty(item) && newValue[item].hasOwnProperty("@type")) {
        newValueType=newValue[item]["@type"]
    }
    if(oldValueType === newValueType) return oldValueType
    return false
}

function GetRemovedLabel({property, css}) {
    return <div className="removed__label m-5">
        <span style={{display: "flex"}}>
            <h5 className={`ms-auto ${css} diff__help__text m-1 fw-bold`}>
                {`${property} have been removed`}
            </h5>
            <div className="vr" />
            <div className={`${css}  m-1`}>
                <AiFillMinusCircle style={{fontSize: "16px"}}/>
                <AiFillMinusCircle style={{fontSize: "16px"}}/>
                <AiFillMinusCircle style={{fontSize: "16px"}}/>
            </div>
        </span>
    </div>
}

export function getChoiceSubDocumentFieldDiffs(fullFrame, frame, diffPatch, item, type, oldValue, newValue) {
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


    // removed from new value 
    if(diffPatch[item].hasOwnProperty(AFTER) && diffPatch[item][AFTER] === null) {
        if(oldValue.hasOwnProperty(item) && oldValue[item].hasOwnProperty("@type")) {
            diffUIFrames[ORIGINAL_UI_FRAME][item]["ui:diff"]={
                classNames: "tdb__diff__original__bg"
            }

            function getInvisibleFrameViewer(props){
                let frUIFrame = { 
                    classNames: "opacity-0",
                    [item]: {
                        classNames: "tdb__diff__changed__bg"
                    }
                }
                return <React.Fragment>
                    <GetRemovedLabel property={item} css={'text-success'}/>
                    <div className="tdb__diff__changed__bg lift__padding">
                        <FrameViewer frame={fullFrame}
                            type={type}
                            uiFrame={frUIFrame}
                            formData={oldValue}
                            hideSubmit={true}
                            mode="View"/>
                    </div>
                </React.Fragment>
            }
            diffUIFrames[CHANGED_UI_FRAME][item]["ui:diff"]={
                "ui:field": getInvisibleFrameViewer
            }
            return diffUIFrames
        }
    }

    // removed from old value 
    if(diffPatch[item].hasOwnProperty(BEFORE) && diffPatch[item][BEFORE] === null) {
        if(newValue.hasOwnProperty(item) && newValue[item].hasOwnProperty("@type")) {
            diffUIFrames[CHANGED_UI_FRAME][item]["ui:diff"]={
                classNames: "tdb__diff__changed__bg"
            }

            function getInvisibleFrameViewer(props){
                let frUIFrame = {
                    classNames: "opacity-0",
                    [item]: {
                        classNames: "tdb__diff__original__bg"
                    }
                }
                return <React.Fragment>
                    <GetRemovedLabel property={item} css={'text-danger'}/>
                    <div className="tdb__diff__original__bg lift__padding">
                        <FrameViewer frame={fullFrame}
                            type={type}
                            uiFrame={frUIFrame}
                            formData={newValue}
                            hideSubmit={true}
                            mode="View"/>
                    </div>
                </React.Fragment>
            }
            diffUIFrames[ORIGINAL_UI_FRAME][item]["ui:diff"]={
                "ui:field": getInvisibleFrameViewer
            }
            return diffUIFrames
        }
    }

    let choicesAreSame=checkIfChoicesAreSame(item, oldValue, newValue)

    let classDocument=choicesAreSame ? choicesAreSame : false

    if(classDocument) { // same choice
        let constructedFrame=fullFrame.hasOwnProperty(classDocument) ? fullFrame[classDocument] : {}
   
        let choiceSubDocumentDiff = generateDiffUIFrames(fullFrame, constructedFrame, type, oldValue, newValue, diffPatch[item])
                    
        diffUIFrames[ORIGINAL_UI_FRAME][item]["ui:diff"]=choiceSubDocumentDiff[ORIGINAL_UI_FRAME]
        diffUIFrames[CHANGED_UI_FRAME][item]["ui:diff"]=choiceSubDocumentDiff[CHANGED_UI_FRAME]
    }
    else { // choices have been swapped
        diffUIFrames[ORIGINAL_UI_FRAME][item]["ui:diff"]={
            classNames: "tdb__diff__original__bg"
        }
        diffUIFrames[CHANGED_UI_FRAME][item]["ui:diff"]={
            classNames: "tdb__diff__changed__bg"
        }
    }
    

    console.log("diffUIFrames", diffUIFrames)
    
    return diffUIFrames
}