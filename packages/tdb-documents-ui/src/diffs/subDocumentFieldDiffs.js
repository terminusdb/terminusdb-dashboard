
import React from "react"
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai"
import Stack from 'react-bootstrap/Stack'
import {ORIGINAL_UI_FRAME, CHANGED_UI_FRAME} from "../constants"
import {generateDiffUIFrames} from "./diffViewer.utils"
import {AFTER, BEFORE, SUBDOCUMENT_DOSENT_EXIST} from "./diff.constants" 

export function removedSubDocumentElement (css, label) {
    return <div className={`form-group field field-object card bg-secondary p-4 mt-4 mb-4 ${css.borderStyle}`}>
        <div id="root_lives_at">
            <div className="lead">
                <div className="tdb__subdocument__collapse_headers" 
                    style={{padding: "14px", marginLeft:"-5px", marginBottom: "5px", zIndex: "-1", cursor: "pointer", background: 'linear-gradient(to right, rgb(4, 114, 182), white)'}}>
                        <span style={{display: "flex"}}>
                            <h6 className={css.color} style={{display: "contents"}}>
                                {label}
                            </h6>
                            <div className="ms-auto text-muted diff__help__text m-1">
                                {SUBDOCUMENT_DOSENT_EXIST}
                            </div>
                            <div className="vr" />
                            <div className={`${css.color} m-1"`}>
                                <AiFillMinusCircle style={{fontSize: "16px"}}/>
                                <AiFillMinusCircle style={{fontSize: "16px"}}/>
                                <AiFillMinusCircle style={{fontSize: "16px"}}/>
                            </div>
                        </span>
                    </div>
                <hr/>
            </div>
            <div class="form-group">
            </div>
        </div>
    </div>
}

// function to show removed element for changed
export function showRemovedSubDocumentChanged(props) {
    return removedSubDocumentElement({color: "text-success", borderStyle: "border-success"}, props.name)
}

// function to show removed element for original 
export function showRemovedSubDocumentOriginal(props) {
    return removedSubDocumentElement({color: "text-danger", borderStyle: "border-danger"}, props.name)
}


export function getSubDocumentFieldDiffs (fullFrame, frame, diffPatch, item, type, oldValue, newValue) {
    let diffUIFrames={
        originalUIFrame: {
            [item]:{}
        },
        changedUIFrame: { 
            [item]:{}
        }
    }

    let classDocument=frame[item]["@class"]
    let constructedFrame=fullFrame.hasOwnProperty(classDocument) ? fullFrame[classDocument] : {}

    // if values are same then dont do anything
    if(JSON.stringify(oldValue) === JSON.stringify(newValue)) return diffUIFrames

    let extractedOldValue=oldValue.hasOwnProperty(item) ? oldValue[item] : {}
    let extractedNewValue=newValue.hasOwnProperty(item) ? newValue[item] : {}
    let subDocumentDiff = generateDiffUIFrames(fullFrame, constructedFrame, type, extractedOldValue, extractedNewValue, diffPatch[item])
                
    diffUIFrames[ORIGINAL_UI_FRAME][item]=subDocumentDiff[ORIGINAL_UI_FRAME]
    diffUIFrames[CHANGED_UI_FRAME][item]=subDocumentDiff[CHANGED_UI_FRAME]

    diffUIFrames[CHANGED_UI_FRAME][item]["styleObject"]={
        headingClassNames: "text-success",
        borderClassNames: "border-success",
        bgClassNames: "tdb__diff__changed__textrea"
    }
    diffUIFrames[ORIGINAL_UI_FRAME][item]["styleObject"]={
        headingClassNames: "text-danger",
        borderClassNames: "border-danger",
        bgClassNames: "tdb__diff__original__textrea"
    }

    if(diffPatch[item].hasOwnProperty(BEFORE) && diffPatch[item][BEFORE] === null){
        diffUIFrames[ORIGINAL_UI_FRAME][item]["ui:field"]=showRemovedSubDocumentOriginal
    }

    if(diffPatch[item].hasOwnProperty(AFTER) && diffPatch[item][AFTER] === null){
        diffUIFrames[CHANGED_UI_FRAME][item]["ui:field"]=showRemovedSubDocumentChanged
    }

    return diffUIFrames
}