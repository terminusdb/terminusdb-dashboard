import React from "react"
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai"
import Stack from 'react-bootstrap/Stack'
import {ORIGINAL_UI_FRAME, CHANGED_UI_FRAME} from "../constants"
import {generateDiffUIFrames} from "./diffViewer.utils"
import {AFTER, BEFORE, SUBDOCUMENT_DOSENT_EXIST} from "./diff.constants" 

// function to show removed element for changed
export function showRemovedSubDocumentChanged(props) {
    return <div className="form-group field field-object  card bg-secondary p-4 mt-4 mb-4 border-success">
        <div id="root_lives_at">
            <div className="lead">
                <div className="tdb__subdocument__collapse_headers" 
                    style={{padding: "14px", marginLeft:"-5px", marginBottom: "5px", zIndex: "-1", cursor: "pointer", background: 'linear-gradient(to right, rgb(4, 114, 182), white)'}}>
                        <span style={{display: "flex"}}>
                            <h6 className="text-success" style={{display: "contents"}}>
                                {props.name}
                            </h6>
                            <div className="ms-auto text-muted diff__help__text m-1">
                                {SUBDOCUMENT_DOSENT_EXIST}
                            </div>
                            <div className="vr" />
                            <div className="text-success  m-1">
                                <AiFillMinusCircle style={{fontSize: "16px"}}/>
                                <AiFillMinusCircle style={{fontSize: "16px"}}/>
                                <AiFillMinusCircle style={{fontSize: "16px"}}/>
                            </div>
                        </span>
                    </div>
                <hr/>
            </div>
            <div class="form-group"></div>
        </div>
    </div>
}

// function to show removed element for original 
export function showRemovedSubDocumentOriginal(props) {

    return <div className="form-group field field-object  card bg-secondary p-4 mt-4 mb-4 border-danger">
        <div id="root_lives_at">
            <div className="lead">
                <div className="tdb__subdocument__collapse_headers" 
                    style={{padding: "14px", marginLeft:"-5px", marginBottom: "5px", zIndex: "-1", cursor: "pointer", background: 'linear-gradient(to right, rgb(4, 114, 182), white)'}}>
                        <span style={{display: "flex"}}>
                            <h6 className="text-danger" style={{display: "contents"}}>
                                {props.name}
                            </h6>
                            <div className="ms-auto text-muted diff__help__text m-1">
                                {SUBDOCUMENT_DOSENT_EXIST}
                            </div>
                            <div className="vr" />
                            <div className="text-danger  m-1">
                                <AiFillMinusCircle style={{fontSize: "16px"}}/>
                                <AiFillMinusCircle style={{fontSize: "16px"}}/>
                                <AiFillMinusCircle style={{fontSize: "16px"}}/>
                            </div>
                        </span>
                    </div>
                <hr/>
            </div>
            <div class="form-group"></div>
        </div>
    </div>
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
   
    let subDocumentDiff = generateDiffUIFrames(fullFrame, constructedFrame, type, oldValue, newValue, diffPatch[item])
                
    diffUIFrames[ORIGINAL_UI_FRAME][item]=subDocumentDiff[ORIGINAL_UI_FRAME]
    diffUIFrames[CHANGED_UI_FRAME][item]=subDocumentDiff[CHANGED_UI_FRAME]

    // change in after
    //if(diffPatch[item].hasOwnProperty(AFTER)) {
        //if(diffPatch[item][AFTER]) {
            diffUIFrames[CHANGED_UI_FRAME][item]["styleObject"]={
                headingClassNames: "text-success",
                borderClassNames: "border-success"
            }
        /*}
        else {
            diffUIFrames[CHANGED_UI_FRAME][item]["ui:field"]=showRemovedSubDocumentChanged
        }
    }*/
    // change in before
    //if(diffPatch[item].hasOwnProperty(BEFORE)) {
        //if(diffPatch[item][BEFORE]) {
            diffUIFrames[ORIGINAL_UI_FRAME][item]["styleObject"]={
                headingClassNames: "text-danger",
                borderClassNames: "border-danger"
            }
        /*}
        else { 
            diffUIFrames[ORIGINAL_UI_FRAME][item]["ui:field"]=showRemovedSubDocumentOriginal
        }*/
    //}

    if(diffPatch[item].hasOwnProperty(BEFORE) && diffPatch[item][BEFORE] === null){
        diffUIFrames[ORIGINAL_UI_FRAME][item]["ui:field"]=showRemovedSubDocumentOriginal
    }

    if(diffPatch[item].hasOwnProperty(AFTER) && diffPatch[item][AFTER] === null){
        diffUIFrames[CHANGED_UI_FRAME][item]["ui:field"]=showRemovedSubDocumentChanged
    }

    return diffUIFrames
}



