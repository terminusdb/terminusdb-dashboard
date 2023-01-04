
import React from "react"
import {generateDiffUIFrames} from "./diffViewer.utils"
import {ORIGINAL_UI_FRAME, CHANGED_UI_FRAME} from "../constants"
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai"
import Stack from 'react-bootstrap/Stack'
import {
    AFTER, 
    BEFORE, 
    REST,  
    PATCH
} from "./diff.constants" 

export function getChoiceDocumentFieldDiffs (fullFrame, frame, diffPatch, item, type, oldValue, newValue) {
    let diffUIFrames={
        originalUIFrame: {
            [item]:{}
        },
        changedUIFrame: { 
            [item]:{}
        }
    }
    if(!Array.isArray(frame[item])) return <div/>
 
    let classDocument=frame[item][0] // take first choice inheritted from an abstract class
    let constructedFrame=frame
    constructedFrame[item]=classDocument

    // swap value 
    let choiceDocumentDiff = generateDiffUIFrames(fullFrame, constructedFrame, type, oldValue, newValue, diffPatch)

    diffUIFrames[ORIGINAL_UI_FRAME][item]=choiceDocumentDiff[ORIGINAL_UI_FRAME][item]
    diffUIFrames[CHANGED_UI_FRAME][item]=choiceDocumentDiff[CHANGED_UI_FRAME][item]

    return diffUIFrames
}


/*
   // constructed frames in getChoiceDocumentFieldDiffs looks like testFrame
   let testFrame = {
            "@key":  {"@type": "Random"},
            "@type": "Class",
            "favorite_group": "Art"
    }

*/



export function getOriginalChoiceElements (diffPatch, item, oldValue) {
    let elements=[], trackList=[]
    if(Array.isArray(diffPatch[item])) {
        diffPatch[item].map(diff => {
            if(diff.hasOwnProperty(BEFORE)) {
                trackList.push(diff[BEFORE])
                elements.push(
                    <div className="text-danger text_diff_original_underline text_choice_documents">{diff[BEFORE]}</div>
                )
            }
        })
    }
    else {
        if(diffPatch[item].hasOwnProperty(PATCH)) {
            diffPatch[item][PATCH].map(diff => {
                if(diff.hasOwnProperty(BEFORE)) {
                    trackList.push(diff[BEFORE])
                    elements.push(
                        <div className="text-danger text_diff_original_underline text_choice_documents">{diff[BEFORE]}</div>
                    )
                }
            })
        }
        if(diffPatch[item].hasOwnProperty(REST)) {
            if(diffPatch[item][REST].hasOwnProperty(BEFORE) && 
                Array.isArray(diffPatch[item][REST][BEFORE])) { // added
                    diffPatch[item][REST][BEFORE].map(diff => {
                        trackList.push(diff[BEFORE])
                        elements.push(
                            <Stack direction="horizontal" gap={3} className="text-danger text_diff_original_underline text_choice_documents">
                                <div>{diff}</div>
                                <div className={` ms-auto`}>
                                    <AiFillPlusCircle style={{fontSize: "16px"}}/>
                                    <AiFillPlusCircle style={{fontSize: "16px"}}/>
                                    <AiFillPlusCircle style={{fontSize: "16px"}}/>
                                </div>
                            </Stack>
                        )
                    })
            }
        }
        if(diffPatch[item].hasOwnProperty(REST)) {
            if(diffPatch[item][REST].hasOwnProperty(BEFORE) && 
                diffPatch[item][REST].hasOwnProperty(AFTER) && 
                Array.isArray(diffPatch[item][REST][BEFORE]) && 
                diffPatch[item][REST][BEFORE].length === 0) { // removed
                    for(var count = 0 ; count < diffPatch[item][REST][AFTER].length ; count ++) {
                        elements.push(
                            <Stack direction="horizontal" gap={3} className="text-danger text_diff_original_underline text_choice_documents">
                                <div className={`ms-auto`}>
                                    <AiFillMinusCircle style={{fontSize: "16px"}}/>
                                    <AiFillMinusCircle style={{fontSize: "16px"}}/>
                                    <AiFillMinusCircle style={{fontSize: "16px"}}/>
                                </div>
                            </Stack>
                        )
                    }
                }
        }
        if(diffPatch[item].hasOwnProperty(REST)) {
            if(diffPatch[item][REST].hasOwnProperty(REST) && 
                Array.isArray(diffPatch[item][REST][REST])){
                    diffPatch[item][REST][REST].map(diff => {
                        if(diff.hasOwnProperty(BEFORE)) {
                            trackList.push(diff[BEFORE])
                            elements.push(
                                <div className="text-danger text_diff_original_underline text_choice_documents">{diff[BEFORE]}</div>
                            )
                        }
                    })
            }
        }
    }

    // no change 
    if(oldValue.hasOwnProperty(item) && Array.isArray(oldValue[item])){
        oldValue[item].map(val => {
            if(!trackList.includes(val)) {
                elements.push(
                    <div className="tdb__span__select text-light">{val}</div>
                )
            }
        })
    }
    
    return elements
}

export function getChangedChoiceElements (diffPatch, item, newValue) {
    let elements=[], trackList=[]
    if(Array.isArray(diffPatch[item])) {
        diffPatch[item].map(diff => {
            if(diff.hasOwnProperty(AFTER)) {
                trackList.push(diff[AFTER])
                elements.push(
                    <div className="text-success text_diff_changed_underline text_choice_documents">{diff[BEFORE]}</div>
                )
            }
        })
    }
    else {
        if(diffPatch[item].hasOwnProperty(PATCH)) {
            diffPatch[item][PATCH].map(diff => {
                if(diff.hasOwnProperty(AFTER)) {
                    trackList.push(diff[AFTER])
                    elements.push(
                        <div className="text-success text_diff_changed_underline text_choice_documents">{diff[BEFORE]}</div>
                    )
                }
            })
        }
        if(diffPatch[item].hasOwnProperty(REST)) {
            if(diffPatch[item][REST].hasOwnProperty(AFTER) && 
            Array.isArray(diffPatch[item][REST][AFTER])) { // added
                diffPatch[item][REST][AFTER].map(diff => {
                    trackList.push(diff[AFTER])
                    elements.push(
                        elements.push(
                            <Stack direction="horizontal" gap={3} className="text-success text_diff_changed_underline text_choice_documents">
                                <div>{diff}</div>
                                <div className={` ms-auto`}>
                                    <AiFillPlusCircle style={{fontSize: "16px"}}/>
                                    <AiFillPlusCircle style={{fontSize: "16px"}}/>
                                    <AiFillPlusCircle style={{fontSize: "16px"}}/>
                                </div>
                            </Stack>
                        )
                    )
                })
            }
        }

        if(diffPatch[item].hasOwnProperty(REST)) {
            if(diffPatch[item][REST].hasOwnProperty(AFTER) && 
                diffPatch[item][REST].hasOwnProperty(BEFORE) && 
                Array.isArray(diffPatch[item][REST][AFTER]) && 
                diffPatch[item][REST][AFTER].length === 0) { // removed
                    for(var count = 0 ; count < diffPatch[item][REST][BEFORE].length ; count ++) {
                        trackList.push(diff[AFTER])
                        elements.push(
                            <Stack direction="horizontal" gap={3} className="text-success text_diff_changed_underline text_choice_documents">
                                <div className={`ms-auto`}>
                                    <AiFillMinusCircle style={{fontSize: "16px"}}/>
                                    <AiFillMinusCircle style={{fontSize: "16px"}}/>
                                    <AiFillMinusCircle style={{fontSize: "16px"}}/>
                                </div>
                            </Stack>
                        )
                    }
                }
        }
        if(diffPatch[item].hasOwnProperty(REST)) {
            if(diffPatch[item][REST].hasOwnProperty(REST) && 
                Array.isArray(diffPatch[item][REST][REST])){
                    diffPatch[item][REST][REST].map(diff => {
                        if(diff.hasOwnProperty(AFTER)) {
                            trackList.push(diff[AFTER])
                            elements.push(
                                <div className="text-success text_diff_changed_underline text_choice_documents">{diff[AFTER]}</div>
                            )
                        }
                    })
            }
        }
    }

    // no change 
    if(newValue.hasOwnProperty(item) && Array.isArray(newValue[item])){
        newValue[item].map(val => {
            if(!trackList.includes(val)) {
                elements.push(
                    <div className="tdb__span__select text-light">{val}</div>
                )
            }
        })
    }

    return elements
}