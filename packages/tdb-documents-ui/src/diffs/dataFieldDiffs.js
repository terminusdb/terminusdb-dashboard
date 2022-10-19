import React from "react"
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai"
import Stack from 'react-bootstrap/Stack'
import {ORIGINAL_UI_FRAME, CHANGED_UI_FRAME} from "../constants"
import {BEFORE, AFTER} from "./diff.constants"

// function to show added element if no change
function showNoChange(props) {
    return <div className="form-group field field-string tdb__input">
        <label className="control-label" htmlFor={`root_${props.name}`}>
            <span>{props.name}</span>
            {props.required && <span className="required">*</span>}
            
        </label>
        <input value={props.formData} className="form-control" readOnly={true} id={`root_${props.name}`} label={props.name} required="" placeholder="xsd:string" type="text"/>
    </div>
}

// function to show added element for original
function showOriginal(props) {
    return <div className="form-group field field-string text-danger tdb__diff__original mb-3">
        <label className="control-label" htmlFor={`root_${props.name}`}>
            <span>{props.name}</span>
            {props.required && <span className="required">*</span>}
            
        </label>
        <input value={props.formData} className="form-control" readOnly={true} id={`root_${props.name}`} label={props.name} required="" placeholder="xsd:string" type="text"/>
    </div>
}

// function to show added element for changed
function showChanged(props) {
    return <div className="form-group field field-string text-success tdb__diff__changed mb-3">
        <label className="control-label" htmlFor={`root_${props.name}`}>
            <span>{props.name}</span>
            {props.required && <span className="required">*</span>}
            
        </label>
        <input value={props.formData} className="form-control" readOnly={true} id={`root_${props.name}`} label={props.name} required="" placeholder="xsd:string" type="text"/>
    </div>
}

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

// ALL SWAP VALUE OPERATIONS
export function getDataFieldDiffs(diffPatch, item) {

    let diffUIFrames={
        [ORIGINAL_UI_FRAME]: {
            [item]:{}
        },
        [CHANGED_UI_FRAME]: {
            [item]:{}
        }
    }

    if(!diffPatch.hasOwnProperty(item)) { // when no change
        diffUIFrames[ORIGINAL_UI_FRAME][item]["ui:field"]=showNoChange
        diffUIFrames[CHANGED_UI_FRAME][item]["ui:field"]=showNoChange
        return diffUIFrames
    }

    // property has been removed 
    else if(diffPatch[item].hasOwnProperty(AFTER) && 
        diffPatch[item][AFTER] === null) {
        diffUIFrames[ORIGINAL_UI_FRAME][item]["ui:field"]=showAddedElementOriginal
        diffUIFrames[CHANGED_UI_FRAME][item]["ui:field"]=showRemovedElementChanged
    }

    // property has been added 
    else if(diffPatch[item].hasOwnProperty(BEFORE) && 
        diffPatch[item][BEFORE] === null) {
            diffUIFrames[ORIGINAL_UI_FRAME][item]["ui:field"]=showRemovedElementOriginal
            diffUIFrames[CHANGED_UI_FRAME][item]["ui:field"]=showAddedElementChanged
        }
    
    else {
        // when changed
        diffUIFrames[ORIGINAL_UI_FRAME][item]["ui:field"]=showOriginal
        diffUIFrames[CHANGED_UI_FRAME][item]["ui:field"]=showChanged
    }
    
    console.log("**** diffUIFrames", diffUIFrames)
    return diffUIFrames
}