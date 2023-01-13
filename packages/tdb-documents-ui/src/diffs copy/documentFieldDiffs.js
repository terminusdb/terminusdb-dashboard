import React from "react"
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai"
import Stack from 'react-bootstrap/Stack'
import {ORIGINAL_UI_FRAME, CHANGED_UI_FRAME} from "../constants"

// function to show added element for original
function showAddedElementOriginal(props) {
    return <div className="form-group field field-string  text-danger tdb__diff__original">
        <Stack direction="horizontal" gap={3}>
            <label className="control-label" htmlFor={`root_${props.name}`}>
                <span>{props.name}</span>
                {props.required && <span className="required">*</span>}
                
            </label>
            <div className="ms-auto text-danger">
                <AiFillPlusCircle/>
                <AiFillPlusCircle/>
                <AiFillPlusCircle/>
            </div>
        </Stack>
        <input value={props.formData}  className="form-control" readOnly={true} id={`root_${props.name}`} label={props.name} required="" placeholder="xsd:string" type="text"/>
    </div>
}

// function to show removed element for changed
function showRemovedElementChanged(props) {
    return <div className="form-group field field-string  text-success tdb__diff__changed">
        <Stack direction="horizontal" gap={3}>
            <label className="control-label" htmlFor={`root_${props.name}`}>
                <span>{props.name}</span>
                {props.required && <span className="required">*</span>}
                
            </label>
            <div className="ms-auto text-success">
                <AiFillMinusCircle/>
                <AiFillMinusCircle/>
                <AiFillMinusCircle/>
            </div>
        </Stack>
        <input className="form-control opacity-0" readOnly={true} id={`root_${props.name}`} label={props.name} required="" placeholder="xsd:string" type="text"/>
    </div>
}

// function to show removed element for original 
function showRemovedElementOriginal(props) {
    return <div className="form-group field field-string  text-danger tdb__diff__original">
        <Stack direction="horizontal" gap={3}>
            <label className="control-label" htmlFor={`root_${props.name}`}>
                <span>{props.name}</span>
                {props.required && <span className="required">*</span>}
                
            </label>
            <div className="ms-auto text-danger">
                <AiFillMinusCircle/>
                <AiFillMinusCircle/>
                <AiFillMinusCircle/>
            </div>
        </Stack>
        <input className="form-control opacity-0" readOnly={true} id={`root_${props.name}`} label={props.name} required="" placeholder="xsd:string" type="text"/>
    </div>
}

// function to show added element for changed
function showAddedElementChanged(props) {
    return <div className="form-group field field-string  text-success tdb__diff__changed">
        <Stack direction="horizontal" gap={3}>
            <label className="control-label" htmlFor={`root_${props.name}`}>
                <span>{props.name}</span>
                {props.required && <span className="required">*</span>}
                
            </label>
            <div className="ms-auto text-success">
                <AiFillPlusCircle/>
                <AiFillPlusCircle/>
                <AiFillPlusCircle/>
            </div>
        </Stack>
        <input value={props.formData} className="form-control" readOnly={true} id={`root_${props.name}`} label={props.name} required="" placeholder="xsd:string" type="text"/>
    </div>
}

export function getDocumentFieldDiffs(diffPatch, key) {

    let diffUIFrames={
        originalUIFrame: {
            [key]:{}
        },
        changedUIFrame: {
            [key]:{}
        }
    }

    // property has been removed 
    if(diffPatch[key].hasOwnProperty("@after") && 
        diffPatch[key]["@after"] === null) {
        diffUIFrames[ORIGINAL_UI_FRAME][key]["ui:field"]=showAddedElementOriginal
        diffUIFrames[CHANGED_UI_FRAME][key]["ui:field"]=showRemovedElementChanged
    }

    // property has been added 
    if(diffPatch[key].hasOwnProperty("@before") && 
        diffPatch[key]["@before"] === null) {
        diffUIFrames[ORIGINAL_UI_FRAME][key]["ui:field"]=showRemovedElementOriginal
        diffUIFrames[CHANGED_UI_FRAME][key]["ui:field"]=showAddedElementChanged
    }
    // adding css classNames
    diffUIFrames[ORIGINAL_UI_FRAME][key]["classNames"]="text-danger tdb__diff__original mb-3"
    diffUIFrames[CHANGED_UI_FRAME][key]["classNames"]="text-success tdb__diff__changed mb-3"
    
    return diffUIFrames
}