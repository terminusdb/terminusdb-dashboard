
import React from "react"
import ReactDiffViewer from 'react-diff-viewer' 
import {BEFORE, AFTER} from "./diff.constants"
import {ORIGINAL_UI_FRAME, CHANGED_UI_FRAME} from "../constants"
import {AiFillMinusCircle} from "react-icons/ai"
import Stack from 'react-bootstrap/Stack'

export function displaySysJSONElements (diffPatch, item, oldValue, newValue, schema, label, required, interest, css, fullFrame, frame, type, choicesEqualSet) {
    let renderElements=[]
    console.log("oldValue", oldValue)

    if(interest === BEFORE) {
        if(!oldValue.hasOwnProperty(item)) {
            renderElements.push(<div/>)
            return renderElements
        }
    
        for(var index=0; index < oldValue[item].length; index ++) {
            let data=newValue.hasOwnProperty(item) ? newValue[item][index] : {}
            renderElements.push(
                <React.Fragment>
                    <label className="control-label" htmlFor={`root_${label}`}>
                        <span>{label}</span>
                        {required && <span className="required">*</span>}
                    </label>
                    <div className="diff_react_viewer_original">
                        <ReactDiffViewer 
                            oldValue={JSON.stringify(oldValue[item][index], null, 2)} 
                            newValue={JSON.stringify(data, null, 2)} 
                            useDarkTheme={true}
                            linesOffset={0}
                            showDiffOnly={true}
                            disableWordDiff={true}/>
                    </div>
                </React.Fragment>
            )
        }
    }
    
    if(interest === AFTER) {
        if(!newValue.hasOwnProperty(item)) {
            renderElements.push(<div/>)
            return renderElements
        }
    
        for(var index=0; index < newValue[item].length; index ++) {
            let data=oldValue.hasOwnProperty(item) ? oldValue[item][index] : {}
            renderElements.push(
                <React.Fragment>
                    <label className="control-label" htmlFor={`root_${label}`}>
                        <span>{label}</span>
                        {required && <span className="required">*</span>}
                    </label>
                    <div className="diff_react_viewer_changed">
                        <ReactDiffViewer 
                            newValue={JSON.stringify(newValue[item][index], null, 2)} 
                            oldValue={JSON.stringify(data, null, 2)} 
                            useDarkTheme={true}
                            linesOffset={0}
                            showDiffOnly={true}
                            disableWordDiff={true}/>
                    </div>
                </React.Fragment>
            )
        }
    }

    return renderElements
}

export const getSysJSONFieldDiffs = (diffPatch, item,  oldValue, newValue) =>{
    let diffUIFrames={
        [ORIGINAL_UI_FRAME]: {
            [item]:{}
        },
        [CHANGED_UI_FRAME]: {
            [item]:{}
        }
    }

    // function to show original view
    function showOriginal(props) {
        let data=newValue.hasOwnProperty(item) ? newValue : {}
        return   <React.Fragment>
            <label className="control-label" htmlFor={`root_${props.name}`}>
                <span>{props.name}</span>
                {props.required && <span className="required">*</span>}
            </label>
            <div className="diff_react_viewer_original">
                <ReactDiffViewer 
                    oldValue={JSON.stringify(props.formData, null, 2)} 
                    newValue={JSON.stringify(data, null, 2)} 
                    useDarkTheme={true}
                    linesOffset={0}
                    showDiffOnly={true}
                    disableWordDiff={true}/>
            </div>
        </React.Fragment>
    }


    // function to show changed view
    function showChanged(props) {
        let data=oldValue.hasOwnProperty(item) ? oldValue : {}
        return  <React.Fragment>
            <label className="control-label" htmlFor={`root_${props.name}`}>
                <span>{props.name}</span>
                {props.required && <span className="required">*</span>}
            </label>
            <div className="diff_react_viewer_changed">
                <ReactDiffViewer 
                    oldValue={JSON.stringify(data, null, 2)} 
                    newValue={JSON.stringify(props.formData, null, 2)} 
                    useDarkTheme={true}
                    linesOffset={0}
                    showDiffOnly={true}
                    disableWordDiff={true}/>
            </div>
        </React.Fragment>
    }

    // function to show empty removed 
    function showRemovedElementChanged (props) {
        let elements=[]
        elements.push(<div className="opacity-0">{"{"}</div>)
        for(var items in oldValue[item]) { // hide the same number of elements 
            elements.push(
                <div className="opacity-0 mb-1">{oldValue[item][items]}</div>
            )
        }
        elements.push(<div className="opacity-0">{"}"}</div>)
        return <React.Fragment>
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
            <div className="bg-secondary border-radius-4 ">{elements}</div>
        </React.Fragment>
    }

    // function to show empty removed 
    function showRemovedElementOriginal (props) {
        let elements=[]
        elements.push(<div className="opacity-0">{"{"}</div>)
        for(var items in newValue[item]) { // hide the same number of elements 
            elements.push(
                <div className="opacity-0 mb-1">{newValue[item][items]}</div>
            )
        }
        elements.push(<div className="opacity-0">{"}"}</div>)
        return <React.Fragment>
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
            <div className="bg-secondary border-radius-4 ">{elements}</div>
        </React.Fragment>
    }

    // property has been removed 
    if(diffPatch[item].hasOwnProperty(AFTER) && 
        diffPatch[item][AFTER] === null) {
        diffUIFrames[ORIGINAL_UI_FRAME][item]["ui:field"]=showOriginal
        diffUIFrames[CHANGED_UI_FRAME][item]["ui:field"]=showRemovedElementChanged
    }
    // property has been removed 
    if(diffPatch[item].hasOwnProperty(BEFORE) && 
        diffPatch[item][BEFORE] === null) {
        diffUIFrames[ORIGINAL_UI_FRAME][item]["ui:field"]=showRemovedElementOriginal
        diffUIFrames[CHANGED_UI_FRAME][item]["ui:field"]=showChanged
    }
    else {
        diffUIFrames[ORIGINAL_UI_FRAME][item]["ui:field"]=showOriginal
        diffUIFrames[CHANGED_UI_FRAME][item]["ui:field"]=showChanged
    }

    return diffUIFrames
}