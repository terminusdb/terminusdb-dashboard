import React from "react"
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai"
import Stack from 'react-bootstrap/Stack'
import {ORIGINAL_UI_FRAME, CHANGED_UI_FRAME} from "../constants"
import {generateDiffUIFrames} from "./diffViewer.utils"
import {AFTER, BEFORE, REST, PATCH} from "./diff.constants" 

// get no change element ui
function getNoChangeElement(value, item) {
    return <div className="form-group field field-number  tdb__input mb-3">
        <label class="control-label" for={`root_${value}`}>
            <span>
                {item}
            </span>
        </label>
        <input class="form-control" 
            id={`root_${value}`} 
            label={value}  
            step="any" 
            value={value}/>
    </div>
}

// get changed element ui
function getSetElement (value, item, css) {
    return <div className={`form-group field field-number ${css} mb-3`}>
            <label class="control-label" for={`root_${value}`}>
                <span>
                    {item}
                </span>
            </label>
            <input class="form-control" 
                id={`root_${value}`} 
                label={value}  
                step="any" 
                value={value}/>
        </div>
}

// get added original element ui 
function getOriginalAddedElement (value, item) {
    return <div className={`form-group field field-number text-danger tdb__diff__originial mb-3`}>
        <Stack direction="horizontal" gap={3}>
            <div>{item}</div>
            <div className={` ms-auto`}>
                <AiFillPlusCircle style={{fontSize: "16px"}}/>
                <AiFillPlusCircle style={{fontSize: "16px"}}/>
                <AiFillPlusCircle style={{fontSize: "16px"}}/>
            </div>
        </Stack>
        <input className={`form-control `}
            id={`root_${value}`} 
            label={value}  
            step="any" 
            value={value}/>
    </div>
}


// get added changed element ui 
function getChangedAddedElement (value, item) {
    return <div className={`form-group field field-number text-success tdb__diff__originial mb-3`}>
        <Stack direction="horizontal" gap={3}>
            <div >{item}</div>
            <div className={` ms-auto`}>
                <AiFillPlusCircle style={{fontSize: "16px"}}/>
                <AiFillPlusCircle style={{fontSize: "16px"}}/>
                <AiFillPlusCircle style={{fontSize: "16px"}}/>
            </div>
        </Stack>
        <input className={`form-control `}
            id={`root_${value}`} 
            label={value}  
            step="any" 
            value={value}/>
    </div>
}

// get removed original element ui 
function getRemovedElement (item, css) {
    return <div className={`form-group field field-number ${css} mb-3`}>
        <Stack direction="horizontal" gap={3}>
            <div className={css}>{item}</div>
            <div className={`${css} ms-auto`}>
                <AiFillMinusCircle style={{fontSize: "16px"}}/>
                <AiFillMinusCircle style={{fontSize: "16px"}}/>
                <AiFillMinusCircle style={{fontSize: "16px"}}/>
            </div>
        </Stack>
        <input className="form-control opacity-0" 
            id={`root_${item}`} 
            step="any" 
            value={item}/>
    </div>
}


export function getSetFieldDiffs (fullFrame, frame, diffPatch, item, type, oldValue, newValue) {
    let diffUIFrames={
        originalUIFrame: {
            [item]:{}
        }, 
        changedUIFrame: {
            [item]:{}
        }
    }

    // old value
    function getOriginalUIFrame () {
        let elements = [], originalElements=[]

        //changed
        if(diffPatch[item].hasOwnProperty(REST)) {
            // Simple Swap
            if(Array.isArray(diffPatch[item][REST])) {
                diffPatch[item][REST].map(diffs => {
                    if(diffs[BEFORE]) {
                        originalElements.push(diffs[BEFORE])
                        elements.push(
                            getSetElement(diffs[BEFORE], item, "text-danger tdb__diff__original")
                        )
                    }
                })
            }
            // Patch Op
            else if(Object.keys(diffPatch[item][REST])) {
                // patch operation
                if(diffPatch[item][REST].hasOwnProperty(PATCH)) {
                    // Simple Swap op
                    if(Array.isArray(diffPatch[item][REST][PATCH])) {
                        diffPatch[item][REST][PATCH].map(diffs => {
                            if(diffs[BEFORE]) {
                                originalElements.push(diffs[BEFORE])
                                elements.push(
                                    getSetElement(diffs[BEFORE], item, "text-danger tdb__diff__original")
                                )
                            }
                        })
                    }
                }
                // rest operation or addiion
                if(diffPatch[item][REST].hasOwnProperty(REST)) {
                    if(diffPatch[item][REST][REST].hasOwnProperty(BEFORE)) {
                        if(Array.isArray(diffPatch[item][REST][REST][BEFORE]) && diffPatch[item][REST][REST][BEFORE].length > 0) {
                            diffPatch[item][REST][REST][BEFORE].map(bef => {
                                originalElements.push(bef)
                                elements.push(
                                    getOriginalAddedElement(bef, item)
                                )
                            })
                        }
                        // when list is 0
                        else if (Array.isArray(diffPatch[item][REST][REST][BEFORE]) && diffPatch[item][REST][REST][BEFORE].length === 0) {
                            for(var count=0; count < diffPatch[item][REST][REST][AFTER].length; count++) {
                                elements.push(
                                    getRemovedElement(item, "text-danger")
                                )
                            }
                        }
                    }
                }
            }
        }

        // nochange
        if(oldValue && oldValue.hasOwnProperty(item)) {
            let difference = oldValue[item].filter(x => !originalElements.includes(x))
            if(difference.length > 0) {
                difference.map(ds => {
                    elements.push(
                        getNoChangeElement(ds, item)
                    )
                })
                
            }
        }

        return <div className="field field-array field-array-fixed-items">
            <span className="control-label">{item}</span>
            {elements}
        </div>
    }

    // changed value
    function getChangedUIFrame () {
        let elements = [], changedElements=[]

        // changed 
        if(diffPatch[item].hasOwnProperty(REST)) {
            // Simple Swap op
            if(Array.isArray(diffPatch[item][REST])) {
                diffPatch[item][REST].map(diffs => {
                    if(diffs[AFTER]) {
                        changedElements.push(diffs[AFTER])
                        elements.push(
                            getSetElement(diffs[AFTER], item, "text-success tdb__diff__changed")
                        )
                    }
                })
            }
            // Patch Op
            else if(Object.keys(diffPatch[item][REST])) {
                // patch Op
                if(diffPatch[item][REST].hasOwnProperty(PATCH)) {
                    // Simple Swap op
                    if(Array.isArray(diffPatch[item][REST][PATCH])) {
                        diffPatch[item][REST][PATCH].map(diffs => {
                            if(diffs[AFTER]) {
                                changedElements.push(diffs[AFTER])
                                elements.push(
                                    getSetElement(diffs[AFTER], item, "text-success tdb__diff__changed")
                                )
                            }
                        })
                    }
                }
                // rest operation or addiion
                if(diffPatch[item][REST].hasOwnProperty(REST)) {
                    if(diffPatch[item][REST][REST].hasOwnProperty(AFTER)) {
                        // when added 
                        if(Array.isArray(diffPatch[item][REST][REST][AFTER]) && diffPatch[item][REST][REST][AFTER].length > 0) {
                            diffPatch[item][REST][REST][AFTER].map(bef => {
                                changedElements.push(bef)
                                elements.push(
                                    getChangedAddedElement(bef, item)
                                )
                            })
                        }
                        // when list is 0
                        else if (Array.isArray(diffPatch[item][REST][REST][AFTER]) && diffPatch[item][REST][REST][AFTER].length === 0) {
                            for(var count=0; count < diffPatch[item][REST][REST][BEFORE].length; count++) {
                                elements.push(
                                    getRemovedElement(item, "text-success")
                                )
                            }
                        }
                    }
                }
            }
        }
        // no change
        if(newValue && newValue.hasOwnProperty(item)) {
            let difference = newValue[item].filter(x => !changedElements.includes(x))
            if(difference.length > 0) {
                difference.map(ds => {
                    elements.push(
                        getNoChangeElement(ds, item)
                    )
                })
            }
        }

        return <div className="field field-array field-array-fixed-items">
            <span className="control-label">{item}</span>
            {elements}
        </div>
    }

    diffUIFrames[ORIGINAL_UI_FRAME][item] = {
        "ui:diff": getOriginalUIFrame
    }

    diffUIFrames[CHANGED_UI_FRAME][item] = {
        "ui:diff": getChangedUIFrame
    }

    console.log("**** diffUIFrames", diffUIFrames)
    return diffUIFrames
}



