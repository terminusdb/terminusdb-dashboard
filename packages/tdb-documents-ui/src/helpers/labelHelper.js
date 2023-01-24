import React from "react"
import * as util from "../utils"
import * as CONST from "../constants"
import {getDataType} from "../dataTypeFrames/helpers"
import {getLabelFromEnumDocumentation} from "../documentationTemplates"
import {getPropertyLabelFromDocumentation} from "../documentationTemplates"
import Row from "react-bootstrap/Row"

const LabelComponent =(props) => { 
    const {label, documentation, isKey, frame, fullFrame} = props
    
    //console.log("props", props)
    //if(util.isDocumentType(frame[label], fullFrame)) {

    /*if (frame && frame.hasOwnProperty(label) && 
        frame[label].hasOwnProperty(CONST.INFO) && 
        frame[label][CONST.INFO] === CONST.DOCUMENT) {
        return null
    }*/
    
    return <div className="d-flex h6">
        {getPropertyLabelFromDocumentation (label, documentation)}
        {util.displayIfKeyField(isKey, label)} 
    </div>
}

const SubDocumentLabelComponent =({label, documentation, isKey}) => { 
    return <div className="d-flex h6 subdoc__label"> 
        {getPropertyLabelFromDocumentation (label, documentation)}
        {util.displayIfKeyField(isKey, label)}
    </div>
}

const EnumLabelComponent =({frame, label, documentation, isKey}) => { 

    let values=frame[label]["@values"]
    return <div className="d-flex hd enum__label">
        {getLabelFromEnumDocumentation (label, documentation, values)}
        {util.displayIfKeyField(isKey, label)}
    </div>
} 

/**
 * 
 * @param {*} frame - frame of document
 * @param {*} item - property of frame
 * @returns label of property 
 */

export function generateLabel (frame, item, documentation, fullFrame) {


    /** return null if frame doesnt have property in it */
    if(!frame.hasOwnProperty(item)) return null

    let isKey=util.checkIfKey(item, frame["@key"]) 

    if(util.isSubDocumentType(frame[item])) {
        return <SubDocumentLabelComponent label={item} documentation={documentation} isKey={isKey}/>
    }


    return <LabelComponent label={item} 
        fullFrame={fullFrame}
        frame={frame}
        documentation={documentation} 
        isKey={isKey}/>
    /*if(util.isEnumType(frame[item])) {
        return <EnumLabelComponent frame={frame} label={item} documentation={documentation} isKey={isKey}/>
    }*/
}