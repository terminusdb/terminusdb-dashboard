import React from "react"
import ReactDiffViewer from 'react-diff-viewer' 
import * as DIFFCONST from "./diff.constants"
import {DIFF} from "../constants"
import * as util from "./diffComponents"
import Card from "react-bootstrap/Card"
import { getViewMarkdownUI } from "../dataTypeFrames/widget"

const MarkDownDiffViewer = ({oldValue, newValue}) => {
    return <div style={{height : "500px", background: "#0d1117"}}>
        <ReactDiffViewer 
            oldValue={oldValue} 
            newValue={newValue} 
            useDarkTheme={true} 
            linesOffset={0}
            showDiffOnly={true}
            styles={DIFFCONST.JSON_DIFF_STYLES}
            disableWordDiff={true}/>
    </div>
}

 
/**
 * function returns back diff viewer based on oldValue and newValue 
 */
function getMDContent(name, oldValue, newValue, css) {
    return <div className={`${css} w-100 markdown_diff`}>
        <MarkDownDiffViewer oldValue={oldValue} newValue={newValue}/>
    </div>
}

// checks if field is populated or empty
function checkIfDataIsFilled (props) {
    if(props.hasOwnProperty("formData") && props.formData) return true
    return false
}

function getMDContentPlaceholder(oldValue, newValue) {
    return <div className="opacity-0">
        <MarkDownDiffViewer oldValue={oldValue} newValue={newValue}/>
    </div>
}

// display markdown editor based on if formdata available or not
export const DisplayMarkDown = ({ isFilled, name, oldValue, newValue, css }) => {
    
    if(isFilled) {
        return getMDContent(name, oldValue, newValue, css)
    }
    else {
        // in this case data dosent exist so we call a separate widget to display 
        // textarea with same height as that of changed data 
        return getMDContentPlaceholder(oldValue, newValue)
    } 
}

// display Array markdown editor based on if formdata available or not
export const DisplayArrayMarkdown = ({ data, item, oldValue, newValue, css }) => {
    let elements = []
    if(css === "tdb__input") {
        // no change here 
        elements.push(getViewMarkdownUI (data, item, {} ))
    }
    else elements.push(<DisplayMarkDown isFilled={data} 
        item={item}
        oldValue={oldValue}
        newValue={newValue}
        css={css}
        name={item}/>
    )
    return <>
        <div className="d-block w-100">{elements}</div>
    </>
}

// ALL SWAP VALUE OPERATIONS
export function getMarkdownFieldDiffs({ item, oldValue, newValue }) {
    let originalUIFrame={}, changedUIFrame={}

    function getOriginalMD(props) {
        let isFilled=checkIfDataIsFilled(props)

        return <DisplayMarkDown isFilled={isFilled} 
            item={item}
            oldValue={oldValue[item]}
            newValue={newValue[item]}
            css={"diff_react_viewer_original"}
            name={props.name}/>
    }

    function getChangedMD(props) {
        let isFilled=checkIfDataIsFilled(props)

        return <DisplayMarkDown isFilled={isFilled} 
            item={item}
            oldValue={oldValue[item]}
            newValue={newValue[item]}
            css={"diff_react_viewer_changed"}
            name={props.name}/>

    }

    originalUIFrame[DIFF]=getOriginalMD
    changedUIFrame[DIFF]=getChangedMD

    return {originalUIFrame, changedUIFrame}
}