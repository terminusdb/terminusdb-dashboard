import React from "react"
import ReactDiffViewer from 'react-diff-viewer' 
import * as DIFFCONST from "./diff.constants"
import {DIFF} from "../constants"
import * as util from "./diffComponents"

function getMDContent(name, oldValue, newValue, css) {
    return <>
        {name}
        <div className={`${css} w-100`}>
            <ReactDiffViewer 
                oldValue={oldValue} 
                newValue={newValue} 
                useDarkTheme={true}
                linesOffset={0}
                showDiffOnly={true}
                styles={DIFFCONST.JSON_DIFF_STYLES}
                disableWordDiff={true}/>
        </div>
    </>
}

// ALL SWAP VALUE OPERATIONS
export function getMarkdownFieldDiffs(item, oldValue, newValue) {
    let originalUIFrame={}, changedUIFrame={}

    function getOriginalMD(props) {
        return getMDContent(props.name, oldValue[item], newValue[item], "diff_react_viewer_original")
    }

    function getChangedMD(props) {
        return getMDContent(props.name, oldValue[item], newValue[item], "diff_react_viewer_changed")

    }

    originalUIFrame["ui:diff"]=getOriginalMD
    changedUIFrame["ui:diff"]=getChangedMD

    return {originalUIFrame, changedUIFrame}
}