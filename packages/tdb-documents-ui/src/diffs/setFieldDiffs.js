
import React, {useState} from "react"
import {AiFillMinusCircle} from "react-icons/ai" 
import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import {
    ORIGINAL_UI_FRAME, 
    CHANGED_UI_FRAME, 
    DATA_TYPE,
    DOCUMENT,
    INFO,
    CHOICESUBCLASSES,
    SUBDOCUMENT_TYPE,
    ENUM,
    SYS_JSON_TYPE
} from "../constants"
import {
    AFTER, 
    BEFORE, 
    REST,  
    PATCH, 
    OPERATION,
    PATCH_LIST,
    COPY_LIST,
    KEEP_LIST,
    SWAP_LIST,
    SWAP_VALUE
} from "./diff.constants" 
import {removedSubDocumentElement} from "./subDocumentFieldDiffs"
import {displaySysJSONElements} from "./sysFieldDiffs"

/**
 * 
 * @param {*} schema schema to control data types
 * @param {*} label name of property
 * @param {*} required is required property 
 * @param {*} css css to control look and feel
 * @returns a react element with deleted display
 */
 function getRemovedElements(schema, label, required, css, interest) {
    let elements=[]
    if(schema.hasOwnProperty(INFO)
        && schema[INFO] === DATA_TYPE) {
            elements.push(
                <div className={`form-group field field-string  ${css}`}>
                <Stack direction="horizontal" gap={3}>
                    <label className="control-label" htmlFor={`root_${label}`}>
                        <span>{label}</span>
                        {required && <span className="required">*</span>}
                        
                    </label>
                    <div className={`ms-auto ${css}`}>
                        <AiFillMinusCircle/>
                        <AiFillMinusCircle/>
                        <AiFillMinusCircle/>
                    </div>
                </Stack>
                <input className="form-control opacity-0" readOnly={true} id={`root_${label}`} label={label} required="" placeholder="xsd:string" type="text"/>
            </div>

            )
        }
    if(schema.hasOwnProperty(INFO) && 
        schema[INFO] === DOCUMENT) {
            elements.push(
                <div className={`form-group field field-string  ${css}`}>
                <Stack direction="horizontal" gap={3}>
                    <label className="control-label" htmlFor={`root_${label}`}>
                        <span>{label}</span>
                        {required && <span className="required">*</span>}
                        
                    </label>
                    <div className={`ms-auto ${css}`}>
                        <AiFillMinusCircle/>
                        <AiFillMinusCircle/>
                        <AiFillMinusCircle/>
                    </div>
                </Stack>
                <input className="form-control opacity-0" readOnly={true} id={`root_${label}`} label={label} required="" placeholder="xsd:string" type="text"/>
            </div>

            )
    }
    if(schema.hasOwnProperty(INFO) && 
        schema[INFO] === ENUM) {
            elements.push(
                <div className={`form-group field field-string  ${css}`}>
                <Stack direction="horizontal" gap={3}>
                    <label className="control-label" htmlFor={`root_${label}`}>
                        <span>{label}</span>
                        {required && <span className="required">*</span>}
                        
                    </label>
                    <div className={`ms-auto ${css}`}>
                        <AiFillMinusCircle/>
                        <AiFillMinusCircle/>
                        <AiFillMinusCircle/>
                    </div>
                </Stack>
                <input className="form-control opacity-0" readOnly={true} id={`root_${label}`} label={label} required="" placeholder="xsd:string" type="text"/>
            </div>

            )
    }
    if(schema.hasOwnProperty(INFO) && 
        schema[INFO] === SUBDOCUMENT_TYPE) {
            let subDocCss = interest === BEFORE ? {color: "text-danger", borderStyle: "border-danger"} : {color: "text-success", borderStyle: "border-success"}
            elements.push(
                removedSubDocumentElement(subDocCss, label)
            )
    }
    return elements
}

/**
 * 
 * @param {*} value value to display 
 * @param {*} schema schema to control data types
 * @param {*} label name of property
 * @param {*} required is required property 
 * @param {*} css css to control look and feel
 * @returns a react element with values controlled by css to display diffs
 */
 function displayElements(value, schema, label, required, css, interest) {
    let elements=[]
    if(schema.hasOwnProperty(INFO) && 
        schema[INFO] === DATA_TYPE) {
        elements.push(
            <div className={`form-group field field-string ${css} mb-3`}>
                <label className="control-label" htmlFor={`root_${label}`}>
                    <span>{label}</span>
                    {required && <span className="required">*</span>}
                    
                </label>
                <input value={value} className="form-control" readOnly={true} id={`root_${label}`} label={label} required="" placeholder="xsd:string" type="text"/>
            </div>
        )
    }
    if(schema.hasOwnProperty(INFO) && 
        schema[INFO] === DOCUMENT) {
            let inputSelectCss="text_diff_select"
            if(interest) {
                if(interest === BEFORE) {
                    css="text-danger"
                    inputSelectCss="text-danger text_diff_select text_diff_underline"
                }
                else {
                    css="text-success"
                    inputSelectCss="text-success text_diff_select text_diff_underline"
                }
            }
            elements.push(
                <div className={`form-group field field-string ${css}  mb-3`}>
                    <label className="control-label" htmlFor={`root_${label}`}>
                        <span>{label}</span>
                        {required && <span className="required">*</span>}
                    </label>
                    <input value={value} className={`form-control ${inputSelectCss}`} readOnly={true} id={`root_${label}`} label={label} required="" placeholder="xsd:string" type="text"/>
                </div>
            )
    }
    if(schema.hasOwnProperty(INFO) && 
        schema[INFO] === ENUM) {
            let inputSelectCss="text_diff_select"
            if(interest) {
                if(interest === BEFORE) {
                    css="text-danger"
                    inputSelectCss="text-danger text_diff_select"
                }
                else {
                    css="text-success"
                    inputSelectCss="text-success text_diff_select"
                }
            }
            elements.push(
                <div className={`form-group field field-string ${css}  mb-3`}>
                    <label className="control-label" htmlFor={`root_${label}`}>
                        <span>{label}</span>
                        {required && <span className="required">*</span>}
                    </label>
                    <input value={value} className={`form-control ${inputSelectCss}`} readOnly={true} id={`root_${label}`} label={label} required="" placeholder="xsd:string" type="text"/>
                </div>
            )
    }
    return elements
}

/**
 * 
* @param {*} diffPatch diff object
 * @param {*} item current property
 * @param {*} formData formData - can be old or new value
 * @param {*} startFormDataIndex start index to loop through formdata to understand changes 
 * @param {*} schema schema to control data types
 * @param {*} label  name of property
 * @param {*} required is required property 
 * @param {*} interest BEFORE or AFTER
 * @param {*} css css to control look and feel
 * @param {*} fullFrame full frame
 * @param {*} frame frame of interest
 * @param {*} type document type
 * @returns 
 */
function displaySubDocumentElements(diffPatch, item, formData, startFormDataIndex, schema, label, required, interest, css, fullFrame, frame, type, choicesEqualSet) {
    let renderElements=[], elementSchema=schema, currentChoice=false, choiceCss="tdb__input"
 
    for(var fds=0; fds<formData[item].length; fds++) {
        let fields=[], hasChanged=false
        if(schema.hasOwnProperty(INFO) && schema[INFO] === CHOICESUBCLASSES) {
            // get choice schema
            for(var its=0; its<schema.items.length; its++) {
                if(schema.items[its].hasOwnProperty("title") && schema.items[its]["title"] === formData[item][fds]["@type"]) {
                    currentChoice=formData[item][fds]["@type"]
                    elementSchema=schema.items[its]
                    break
                }
            }
        }
        if(Array.isArray(choicesEqualSet)) choiceCss=choicesEqualSet[fds] 
        for(var subDocKey in formData[item][fds]) {
            if(subDocKey==="@id") continue 
            else if(subDocKey==="@type") continue
            else if(diffPatch[fds] && diffPatch[fds].hasOwnProperty(subDocKey)) {
                let rest=doOperation(diffPatch[fds][subDocKey], item, formData, startFormDataIndex, elementSchema.properties[subDocKey], elementSchema.properties[subDocKey].title, required, interest, css, fullFrame, frame, type, choicesEqualSet)
                fields.push(rest)
                hasChanged=true
            }
            else {
                let elements=displayElements(formData[item][fds][subDocKey], elementSchema.properties[subDocKey], elementSchema.properties[subDocKey].title, required, "tdb__input mb-3", null)
                fields.push(elements)
            }
        }

        if(currentChoice) { // choice subdocuments
            renderElements.push(
                <Card bg="secondary" className={`p-4 mb-3 mt-3 ${choiceCss}`}>
                    <div class="lead">
                        <div class="tdb__subdocument__collapse_headers" style={{padding: "14px", marginLeft: "-5px", marginBottom: "5px", zIndex: "-1", cursor: "pointer", background: "linear-gradient(to right, rgb(4, 114, 182), white)"}}>
                            <span style={{color: "white"}}>
                                <h6 style={{display: "contents"}}>{item}</h6>
                            </span>
                        </div>
                        <hr/>
                    </div>
                    <input value={currentChoice} className="form-control" readOnly={true} id={`root_${label}`} label={label} required="" placeholder="xsd:string" type="text"/>
                    <Card bg="secondary" className="p-4 mb-3 mt-3 border-dark">
                        {fields}
                    </Card>
                </Card>
            )
        }
        else {
           
            let accordianCss="border-0"
            if(hasChanged) {
                if(interest === BEFORE) accordianCss="original_subDoc_diff_border"
                else accordianCss="changed_subDoc_diff_border"
            }
            renderElements.push(
                <Accordion className=" mb-3 mt-3 " bsPrefix={`diff__subDocument__accordian ${accordianCss}`}>
                    <Accordion.Item eventKey="0" flush >
                        <Accordion.Header>
                            <div class="lead w-100">
                                <div class="tdb__subdocument__collapse_headers" style={{padding: "14px", marginLeft: "-5px", marginBottom: "5px", zIndex: "-1", cursor: "pointer", background: "linear-gradient(to right, rgb(4, 114, 182), white)"}}>
                                    <span style={{color: "white"}}>
                                        <h6 style={{display: "contents"}}>{item}</h6>
                                    </span>
                                </div>
                                <hr/>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            {fields}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )
        }
    }
    return renderElements
}

/**
 * 
 * @param {*} diffPatch diff object
 * @param {*} item current property
 * @param {*} formData formData - can be old or new value
 * @param {*} startFormDataIndex start index to loop through formdata to understand changes 
 * @param {*} schema schema to control data types
 * @param {*} label  name of property
 * @param {*} required is required property 
 * @param {*} interest BEFORE or AFTER
 * @param {*} css css to control look and feel
 * @returns 
 */
function doOperation(diffPatch, item, formData, startFormDataIndex, schema, label, required, interest, css, fullFrame, frame, type, choicesEqualSet) {
    let renderElements=[], currentFormDataIndex=startFormDataIndex
   
    if(Array.isArray(diffPatch)) { // simple swapValue Operation 
        let isSubDocumentType=true
        diffPatch.map(diffs => {
            if(diffs.hasOwnProperty(interest)) {
                isSubDocumentType=false
                let elements=displayElements(diffs[interest], schema, label, required, css, interest)
                renderElements.push( <>
                    {elements}
                </>)
            }
        })
        if(isSubDocumentType) { // subdocument 
            let subDocumentElement=displaySubDocumentElements(diffPatch, item, formData, startFormDataIndex, schema, label, required, interest, css, fullFrame, frame, type, choicesEqualSet) 
            renderElements.push(subDocumentElement)
        }
    }
    else if(Object.keys(diffPatch).length>0 && 
        diffPatch.hasOwnProperty(OPERATION)){
            // copy set operation 
            if(diffPatch[OPERATION] === COPY_LIST) {
                if(diffPatch.hasOwnProperty(REST)) {
                    if(Array.isArray(diffPatch[REST])) {
                        let copyTill=diffPatch[REST][0][interest]
                        // break when first match found
                        for(var index=startFormDataIndex; index < formData[item].length ; index++) {
                            if(copyTill === formData[item][index]){
                                currentFormDataIndex=index+diffPatch[REST].length
                                break
                            }  
                            let elements=displayElements(formData[item][index], schema, label, required, "tdb__input mb-3", null)
                            renderElements.push( <>
                                {elements}
                            </>)
                        }
                    }
                    if(Object.keys(diffPatch[REST]).length>0 && 
                        diffPatch[REST].hasOwnProperty(interest)) {
                        let copyTill= diffPatch[REST][BEFORE].length>0 ? diffPatch[REST][BEFORE][0] : diffPatch[REST][AFTER][0]
                        let skipToNext=diffPatch[REST][BEFORE].length>0 ? diffPatch[REST][BEFORE].length : diffPatch[REST][AFTER].length>0 
                        // break when first match found
                        for(var index=startFormDataIndex; index < formData[item].length ; index++) {
                            if(copyTill === formData[item][index]){
                                currentFormDataIndex=index+skipToNext
                                break
                            }  
                            let elements=displayElements(formData[item][index], schema, label, required, "tdb__input mb-3", null)
                            renderElements.push( <>
                                {elements}
                            </>)
                        }
                    }
                    let rest=doOperation(diffPatch[REST], item, formData, startFormDataIndex, schema, label, required, interest, css, fullFrame, frame, type, choicesEqualSet)
                    renderElements.push(rest)
                }
            }
            // patch list operation 
            if(diffPatch[OPERATION] === PATCH_LIST) { 
                if(diffPatch[PATCH][0].hasOwnProperty(interest)) {
                    let copyTill=diffPatch[PATCH][0][interest]
                    // break when first match found
                    for(var index=startFormDataIndex; index < formData[item].length ; index++) {
                        if(copyTill === formData[item][index]){
                            currentFormDataIndex=index+diffPatch[PATCH].length
                            break
                        }  
                        let elements=displayElements(formData[item][index], schema, label, required, "tdb__input mb-3", null)
                        renderElements.push( <>
                            {elements}
                        </>)
                    }
                    // stitch in patch object 
                    diffPatch[PATCH].map(patch => {
                        let elements=displayElements(patch[interest], schema, label, required, css, interest)
                        renderElements.push( <>
                            {elements}
                        </>)
                    })
                }
                else {
                    let subDocumentElement=displaySubDocumentElements(diffPatch[PATCH], item, formData, startFormDataIndex, schema, label, required, interest, css, fullFrame, frame, type, choicesEqualSet) 
                    renderElements.push(subDocumentElement)
                }
                // loop throught the rest list to see what has been changed
                if(diffPatch.hasOwnProperty(REST)) {
                    let rest=doOperation(diffPatch[REST], item, formData, currentFormDataIndex, schema, label, required, interest, css, fullFrame, frame, type, choicesEqualSet)
                    renderElements.push(rest)
                } 
            }
            // swap list operation 
            if(diffPatch[OPERATION] === SWAP_LIST) {
                diffPatch[interest].map(diff => {
                    let elements=displayElements(diff, schema, label, required, css, interest)
                    renderElements.push( <>
                        {elements}
                    </>)
                })
                if(diffPatch[interest].length === 0) {
                    let oppInterest=interest === BEFORE ? AFTER : BEFORE
                    for(var count=0; count < diffPatch[oppInterest].length; count ++) {
                        let elements=getRemovedElements(schema, label, required, css, interest)
                        renderElements.push( <>
                            {elements}
                        </>)
                    }
                }
            }
            // keep list opeartion 
            if(diffPatch[OPERATION] === KEEP_LIST) {
                for(var index=startFormDataIndex; index < formData[item].length ; index++) { 
                    let elements=displayElements(formData[item][index], schema, label, required, "tdb__input mb-3", null)
                    renderElements.push( <>
                        {elements}
                    </>)
                }
            }
            // swap value operation 
            if(diffPatch[OPERATION] === SWAP_VALUE) {
                let elements=displayElements(diffPatch[interest], schema, label, required, css, interest)
                renderElements.push( <>
                    {elements}
                </>)
            }
    }
    return renderElements
}


function checkIfChoicesAreSame(item, oldValue, newValue, interest) {
    let choiceEqualSet=[]

    if(oldValue.hasOwnProperty(item)) {
        for(var index =0; index < oldValue[item].length; index ++ ) {
            if(oldValue[item][index]["@type"] === newValue[item][index]["@type"]) {
                // choice equal 
                choiceEqualSet.push("tdb__input")
            }
            else {
                if(interest === BEFORE) choiceEqualSet.push("text-danger tdb__diff__original")
                else choiceEqualSet.push("text-success tdb__diff__changed")
            }
        }
    }
    return choiceEqualSet
}

/**
 * 
 * @param {*} fullFrame fullFrame of data product
 * @param {*} frame frame of document type of interest 
 * @param {*} diffPatch diff object
 * @param {*} item current property
 * @param {*} type current document type of interest
 * @param {*} oldValue old form data 
 * @param {*} newValue new form data
 * @returns 
 */
export function getSetFieldDiffs (fullFrame, frame, diffPatch, item, type, oldValue, newValue) {
    let diffUIFrames={
        originalUIFrame: {
            [item]:{}
        }, 
        changedUIFrame: {
            [item]:{}
        }
    }

    // no change in set - hence not available in diff patch object
    if(!diffPatch.hasOwnProperty(item)) {
        return diffUIFrames
    }

    function getOriginalUIFrame(props) {
        let renderElements=[]
        if(props.schema.hasOwnProperty(INFO) && 
            props.schema[INFO] === CHOICESUBCLASSES) {
                let choiceEqualSet=checkIfChoicesAreSame(item, oldValue, newValue, BEFORE)
                renderElements=doOperation(diffPatch[item], item, oldValue, 0, props.schema, props.name, props.required, BEFORE, "text-danger tdb__diff__original mb-3", fullFrame, frame, type, choiceEqualSet)
        }
        else if (props.schema.hasOwnProperty(INFO) && 
            props.schema.info === SYS_JSON_TYPE) {
                let sysJSONElement=displaySysJSONElements(diffPatch, item, oldValue, newValue, props.schema, props.name, props.required, BEFORE, "css", fullFrame, frame, type) 
                renderElements.push(sysJSONElement)
        }
        else renderElements=doOperation(diffPatch[item], item, oldValue, 0, props.schema.items[0], props.name, props.required, BEFORE, "text-danger tdb__diff__original mb-3", fullFrame, frame, type, null)
        return <>
            {renderElements}
        </>
    }

    function getChangedUIFrame(props) {
        let renderElements=[]
        if(props.schema.hasOwnProperty(INFO) && 
            props.schema[INFO] === CHOICESUBCLASSES) {
                let choiceEqualSet=checkIfChoicesAreSame(item, oldValue, newValue, AFTER)
                renderElements=doOperation(diffPatch[item], item, newValue, 0, props.schema, props.name, props.required, AFTER, "text-success tdb__diff__changed mb-3", fullFrame, frame, type, choiceEqualSet)
        }
        else if (props.schema.hasOwnProperty(INFO) && 
            props.schema.info === SYS_JSON_TYPE) {
                let sysJSONElement=displaySysJSONElements(diffPatch, item, oldValue, newValue, props.schema, props.name, props.required, AFTER, "css", fullFrame, frame, type) 
                renderElements.push(sysJSONElement)
        }
        else renderElements=doOperation(diffPatch[item], item, newValue, 0, props.schema.items[0], props.name, props.required, AFTER, "text-success tdb__diff__changed mb-3", fullFrame, frame, type, null)
        return <>
        {renderElements}
        </>
    }


    diffUIFrames[ORIGINAL_UI_FRAME][item] = {
        "ui:diff": getOriginalUIFrame 
    }
    diffUIFrames[CHANGED_UI_FRAME][item] = {
        "ui:diff": getChangedUIFrame
    }

    return diffUIFrames
}