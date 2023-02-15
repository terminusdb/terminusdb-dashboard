import React from "react"
import ReactDiffViewer from 'react-diff-viewer' 
import * as DIFFCONST from "./diff.constants"
import {DIFF} from "../constants"
import * as util from "./diffComponents"
import Card from "react-bootstrap/Card"

const MarkDownDiffViewer = ({oldValue, newValue}) => {
    return <ReactDiffViewer 
        oldValue={oldValue} 
        newValue={newValue} 
        useDarkTheme={true} 
        linesOffset={0}
        showDiffOnly={true}
        styles={DIFFCONST.JSON_DIFF_STYLES}
        disableWordDiff={true}/>
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

// ALL SWAP VALUE OPERATIONS
export function getMarkdownFieldDiffs(item, oldValue, newValue) {
    let originalUIFrame={}, changedUIFrame={}

    function getOriginalMD(props) {
        let isFilled=checkIfDataIsFilled(props)
        if(isFilled) {
            return getMDContent(props.name, oldValue[item], newValue[item], "diff_react_viewer_original")
        }
        else {
            // in this case data dosent exist so we call a separate widget to display 
            // textarea with same heigh as that of changed data 
            return getMDContentPlaceholder(oldValue[item], newValue[item])
        }
    }

    function getChangedMD(props) {
        let isFilled=checkIfDataIsFilled(props)
        return getMDContent(props.name, oldValue[item], newValue[item], "diff_react_viewer_changed")

    }

    originalUIFrame[DIFF]=getOriginalMD
    changedUIFrame[DIFF]=getChangedMD

    return {originalUIFrame, changedUIFrame}
}