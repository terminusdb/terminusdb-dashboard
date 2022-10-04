
import React from "react"
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai"
import Stack from 'react-bootstrap/Stack'
import {Row, Col} from "react-bootstrap"
import {ORIGINAL_UI_FRAME, CHANGED_UI_FRAME, SELECT_STYLES} from "../constants"
import {
    AFTER, 
    BEFORE, 
    REST, 
    PATCH, 
    DIFF_ORIGINAL_SELECT_STYLES,
    DIFF_CHANGED_SELECT_STYLES
} from "./diff.constants" 
import { map } from "leaflet"
import {isDocumentType, isEnumType} from "../utils"
import {FilledDocumentSelect} from "../documentTypeFrames/DocumentSelects"


// get no change element ui
function getNoChangeElement(value, item, fullFrame, frame) {

    if(isDocumentType(frame[item], fullFrame)) {
        return  <div className="mt-3 mb-3">
            <FilledDocumentSelect
                labelCss={{classNames: "text-light"}}
                label={item}
                styles={SELECT_STYLES}
                defaultValue={value}
            />
        </div>
    }


    if(isEnumType(frame[item])) {
        return <Row className={`form-group field field-number mb-3 w-100`}>
                <Col className="text-light mr-5 col-md-6">
                    {item}
                </Col>
                <Col className="text-light col-md-6">
                    {value}
                </Col>
        </Row>
    }

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
function getOriginalSetElement (value, item, css, fullFrame, frame) {

    if(isDocumentType(frame[item], fullFrame)) {
        return  <div className="mt-3 mb-3">
            <FilledDocumentSelect
                labelCss={{classNames: "text-danger"}}
                label={item}
                styles={DIFF_ORIGINAL_SELECT_STYLES}
                defaultValue={value}
            />
        </div>
    }

    if(isEnumType(frame[item])) {
        return <Row className={`form-group field field-number mb-3 w-100`}>
                <Col className="text-danger mr-5 col-md-6">
                    {item}
                </Col>
                <Col className="text-danger col-md-6">
                    {value}
                </Col>
        </Row>
    }

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

// get changed element ui
function getChangedSetElement (value, item, css, fullFrame, frame) {

    if(isDocumentType(frame[item], fullFrame)) {
        return <div className="mt-3 mb-3">
            <FilledDocumentSelect
                label={item}
                labelCss={{classNames: "text-success"}}
                styles={DIFF_CHANGED_SELECT_STYLES}
                defaultValue={value}
            />
        </div>
    }

    if(isEnumType(frame[item])) {
        return <Row className={`form-group field field-number mb-3 w-100`}>
                <Col className="text-success mr-5 col-md-6">
                    {item}
                </Col>
                <Col className="text-success col-md-6">
                    {value}
                </Col>
        </Row>
    }

    return <div className={`form-group field field-number ${css} mb-3`}>
            <label className="control-label" for={`root_${value}`}>
                <span>
                    {item}
                </span>
            </label>
            <input className="form-control" 
                id={`root_${value}`} 
                label={value}  
                step="any" 
                value={value}/>
        </div>
}

// get added original element ui 
function getOriginalAddedElement (value, item, fullFrame, frame) {

    if(isDocumentType(frame[item], fullFrame)) {
        return  <div className={`form-group field field-number text-danger tdb__diff__original mt-3 mb-3`}>
            <Stack direction="horizontal" gap={3}>
                <div>{item}</div>
                <div className={` ms-auto`}>
                    <AiFillPlusCircle style={{fontSize: "16px"}}/>
                    <AiFillPlusCircle style={{fontSize: "16px"}}/>
                    <AiFillPlusCircle style={{fontSize: "16px"}}/>
                </div>
            </Stack>
            <FilledDocumentSelect
                hideLabel={true}
                labelCss={{classNames: "text-danger"}}
                label={item}
                styles={DIFF_ORIGINAL_SELECT_STYLES}
                defaultValue={value}
            />
        </div>
    }

    if(isEnumType(frame[item])) {
        return <Row className={`form-group field field-number mb-3 w-100`}>
                <Col className={`text-danger col-md-6`}>
                    <div className="text-danger">{item}</div>
                </Col>
                <Col className={`text-danger col-md-6 d-flex`}>
                    <div>{value}</div>
                    <div className={`text-danger ms-auto`}>
                        <AiFillPlusCircle style={{fontSize: "16px"}}/>
                        <AiFillPlusCircle style={{fontSize: "16px"}}/>
                        <AiFillPlusCircle style={{fontSize: "16px"}}/>
                    </div>
                </Col>
        </Row>
    }

    return <div className={`form-group field field-number text-danger tdb__diff__original mb-3`}>
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
function getChangedAddedElement (value, item, fullFrame, frame) {

    if(isDocumentType(frame[item], fullFrame)) {
        return  <div className={`form-group field field-number text-success tdb__diff__changed mt-3 mb-3`}>
            <Stack direction="horizontal" gap={3}>
                <div>{item}</div>
                <div className={` ms-auto`}>
                    <AiFillPlusCircle style={{fontSize: "16px"}}/>
                    <AiFillPlusCircle style={{fontSize: "16px"}}/>
                    <AiFillPlusCircle style={{fontSize: "16px"}}/>
                </div>
            </Stack>
            <FilledDocumentSelect
                hideLabel={true}
                labelCss={{classNames: "text-success"}}
                label={item}
                styles={DIFF_CHANGED_SELECT_STYLES}
                defaultValue={value}
            />
        </div>
    }

    if(isEnumType(frame[item])) {

        return <Row className={`form-group field field-number mb-3 w-100`}>
                <Col className={`text-success col-md-6`}>
                    <div className="text-success">{item}</div>
                </Col>
                <Col className={`text-success col-md-6 d-flex`}>
                    <div>{value}</div>
                    <div className={`text-success ms-auto`}>
                        <AiFillPlusCircle style={{fontSize: "16px"}}/>
                        <AiFillPlusCircle style={{fontSize: "16px"}}/>
                        <AiFillPlusCircle style={{fontSize: "16px"}}/>
                    </div>
                </Col>
        </Row>
    }

    return <div className={`form-group field field-number text-success tdb__diff__changed mb-3`}>
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
function getRemovedElement (item, css, fullFrame, frame) {

    if(isEnumType(frame[item])) {
        return <Row className={`form-group field field-number mb-3 w-100`}>
                <Col className={`${css}  mr-5 col-md-6`}>
                    {item}
                </Col>
                <Col className={`${css} col-md-6`}>
                    <AiFillMinusCircle style={{fontSize: "16px"}}/>
                    <AiFillMinusCircle style={{fontSize: "16px"}}/>
                    <AiFillMinusCircle style={{fontSize: "16px"}}/>
                </Col>
        </Row>
    }


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

export function getListFieldDiffs (fullFrame, frame, diffPatch, item, type, oldValue, newValue) {
    let diffUIFrames={
        originalUIFrame: {
            [item]:{}
        }, 
        changedUIFrame: {
            [item]:{}
        }
    }

    let originalElements=[], changedElements=[]

    // old value
    function getOriginalUIFrame () {
        let elements = []

        oldValue[item].map(oldVal => {

            let match=false 

            //original - rest - normal swap value 
            if(diffPatch[item].hasOwnProperty(REST)) {
                if(Array.isArray(diffPatch[item][REST])){
                    diffPatch[item][REST].map(re => {
                        if(re[BEFORE] && re[BEFORE] === oldVal) {
                            match=true
                            originalElements.push(re[BEFORE])
                            elements.push(
                                getOriginalSetElement(re[BEFORE], item, "text-danger tdb__diff__original", fullFrame, frame)
                            )
                        }
                    })
                }
                else {
                    //changed - patch - for enum diffs
                    if(diffPatch[item][REST].hasOwnProperty(PATCH)) {
                        diffPatch[item][REST][PATCH].map(patch => {
                            if(patch[BEFORE] && patch[BEFORE] === oldVal) {
                                match=true
                                changedElements.push(patch[BEFORE])
                                elements.push(
                                    getOriginalSetElement(patch[BEFORE], item, "text-danger tdb__diff__original", fullFrame, frame)
                                )
                            }
                        })
                    } // enum diffs
                    if(diffPatch[item][REST].hasOwnProperty(REST)) {
                        if(diffPatch[item][REST][REST].hasOwnProperty(BEFORE)) {
                            // if elements added
                            if(diffPatch[item][REST][REST][BEFORE].length > 0) {
                                diffPatch[item][REST][REST][BEFORE].map(bef => {
                                    if(bef === oldVal) {
                                        match=true
                                        changedElements.push(bef)
                                        elements.push(
                                            getOriginalAddedElement(bef, item, fullFrame, frame)
                                        )
                                    }
                                })
                            }
                        }
                    }
                }
            }

            //original - patch 
            if(diffPatch[item].hasOwnProperty(PATCH)) {
                diffPatch[item][PATCH].map(patch => {
                    if(patch[BEFORE] && patch[BEFORE] === oldVal) {
                        match=true
                        originalElements.push(patch[BEFORE])
                        elements.push(
                            getOriginalSetElement(patch[BEFORE], item, "text-danger tdb__diff__original", fullFrame, frame)
                        )
                    }
                })
            }

            //original - patch List 
            if(diffPatch[item][REST].hasOwnProperty(REST)) {
                // patch list 
                if(diffPatch[item][REST][REST].hasOwnProperty(PATCH)) {
                    diffPatch[item][REST][REST][PATCH].map(patch => {
                        if(patch[BEFORE] && patch[BEFORE] === oldVal) {
                            match=true
                            originalElements.push(patch[BEFORE])
                            elements.push(
                                getOriginalSetElement(patch[BEFORE], item, "text-danger tdb__diff__original", fullFrame, frame)
                            )
                        }
                    })
                }

                //added - swap list 
                if(diffPatch[item][REST][REST].hasOwnProperty(REST)) {
                    if(diffPatch[item][REST][REST][REST].hasOwnProperty(REST)) {
                        if(diffPatch[item][REST][REST][REST][REST].hasOwnProperty(BEFORE)) {
                            if(diffPatch[item][REST][REST][REST][REST][BEFORE].length > 0) { // if elements added
                                diffPatch[item][REST][REST][REST][REST][BEFORE].map(bef => {    
                                    if(bef === oldVal) {
                                        match=true
                                        originalElements.push(bef)
                                        elements.push(
                                            getOriginalAddedElement(bef, item, fullFrame, frame)
                                        )
                                    }
                                })
                            }
                        }
                    }
                    if(diffPatch[item][REST][REST][REST].hasOwnProperty(BEFORE)) { // for enums
                        if(diffPatch[item][REST][REST][REST][BEFORE].length > 0) { // if elements added
                            diffPatch[item][REST][REST][REST][BEFORE].map(bef => {    
                                if(bef === oldVal) {
                                    match=true
                                    originalElements.push(bef)
                                    elements.push(
                                        getOriginalAddedElement(bef, item, fullFrame, frame)
                                    )
                                }
                            })
                        }
                    }
                }
            }

            
            // no change 
            if(!match) {
                originalElements.push(oldVal)
                elements.push(
                    getNoChangeElement(oldVal, item, fullFrame, frame)
                )
            }
        })

        // add removed items if any 
        if(newValue[item].length > oldValue[item].length) {
            let diff=newValue[item].length-oldValue[item].length
            for(var times=0; times<diff; times++) {
                elements.push(
                    getRemovedElement(item, "text-danger", fullFrame, frame)
                )
            }
        }

        console.log("originalElements", originalElements)

        return <div className="field field-array field-array-fixed-items">
            <span className="control-label">{item}</span>
            {elements}
        </div>

    }

    // changed value
    function getChangedUIFrame () {
        let elements = []

        newValue[item].map(newVal => {

            let match=false 

            //original - rest - normal swap value 
            if(diffPatch[item].hasOwnProperty(REST)) {
                if(Array.isArray(diffPatch[item][REST])) {
                    diffPatch[item][REST].map(re => {
                        if(re[AFTER] && re[AFTER] === newVal) {
                            match=true
                            originalElements.push(re[AFTER])
                            elements.push(
                                getChangedSetElement(re[AFTER], item, "text-success tdb__diff__changed", fullFrame, frame)
                            )
                        }
                    })
                }
                else {
                    //changed - patch - for enum diffs
                    if(diffPatch[item][REST].hasOwnProperty(PATCH)) {
                        diffPatch[item][REST][PATCH].map(patch => {
                            if(patch[AFTER] && patch[AFTER] === newVal) {
                                match=true
                                changedElements.push(patch[AFTER])
                                elements.push(
                                    getChangedSetElement(patch[AFTER], item, "text-success tdb__diff__changed", fullFrame, frame)
                                )
                            }
                        })
                    } // enum diffs
                    if(diffPatch[item][REST].hasOwnProperty(REST)) {
                        if(diffPatch[item][REST][REST].hasOwnProperty(AFTER)) {
                            // if elements added
                            if(diffPatch[item][REST][REST][AFTER].length > 0) {
                                diffPatch[item][REST][REST][AFTER].map(aft => {
                                    if(aft === newVal) {
                                        match=true
                                        changedElements.push(aft)
                                        elements.push(
                                            getChangedAddedElement(aft, item, fullFrame, frame)
                                        )
                                    }
                                })
                            }
                        }
                    }
                }
            }


            //changed - patch 
            if(diffPatch[item].hasOwnProperty(PATCH)) {
                diffPatch[item][PATCH].map(patch => {
                    if(patch[AFTER] && patch[AFTER] === newVal) {
                        match=true
                        changedElements.push(patch[AFTER])
                        elements.push(
                            getChangedSetElement(patch[AFTER], item, "text-success tdb__diff__changed", fullFrame, frame)
                        )
                    }
                })
            }

            //changed - patch List 
            if(diffPatch[item][REST].hasOwnProperty(REST)) {
                // patch list 
                if(diffPatch[item][REST][REST].hasOwnProperty(PATCH)) {
                    diffPatch[item][REST][REST][PATCH].map(patch => {
                        if(patch[AFTER] && patch[AFTER] === newVal) {
                            match=true
                            changedElements.push(patch[AFTER])
                            elements.push(
                                getChangedSetElement(patch[AFTER], item, "text-success tdb__diff__changed", fullFrame, frame)
                            )
                        }
                    })
                }

                //added - swap list 
                if(diffPatch[item][REST][REST].hasOwnProperty(REST)) {
                    if(diffPatch[item][REST][REST][REST].hasOwnProperty(REST)) {
                        if(diffPatch[item][REST][REST][REST][REST].hasOwnProperty(AFTER)) {
                            // if elements added
                            if(diffPatch[item][REST][REST][REST][REST][AFTER].length > 0) {
                                diffPatch[item][REST][REST][REST][REST][AFTER].map(aft => {
                                    if(aft === newVal) {
                                        match=true
                                        changedElements.push(aft)
                                        elements.push(
                                            getChangedAddedElement(aft, item, fullFrame, frame)
                                        )
                                    }
                                })
                            }
                        }
                    }
                    if(diffPatch[item][REST][REST][REST].hasOwnProperty(AFTER)) { // for enums
                        if(diffPatch[item][REST][REST][REST][AFTER].length > 0) { // if elements added
                            diffPatch[item][REST][REST][REST][AFTER].map(aft => {    
                                if(aft === newVal) {
                                    match=true
                                    originalElements.push(aft)
                                    elements.push(
                                        getChangedAddedElement(aft, item, fullFrame, frame)
                                    )
                                }
                            })
                        }
                    }
                }
            }

            // no change 
            if(!match) {
                changedElements.push(newVal)
                elements.push(
                    getNoChangeElement(newVal, item, fullFrame, frame)
                )
            }
        })

        // add removed items if any 
        if(oldValue[item].length > newValue[item].length) {
            let diff=oldValue[item].length-newValue[item].length
            for(var times=0; times<diff; times++) {
                elements.push(
                    getRemovedElement(item, "text-success", fullFrame, frame)
                )
            }
        }

        console.log("changedElements", changedElements)

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