import React from "react"
import * as util from "../utils"
import * as CONST from "../constants"
import {getDataType} from "../dataTypeFrames/helpers"
import {getLabelFromEnumDocumentation} from "../documentationTemplates"
import {getPropertyLabelFromDocumentation} from "../documentationTemplates"
import Row from "react-bootstrap/Row"

const LabelComponent =({label, documentation, isKey}) => { 
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

export function generateLabel (frame, item, documentation) {
    /** return null if frame doesnt have property in it */
    if(!frame.hasOwnProperty(item)) return null

    let isKey=util.checkIfKey(item, frame["@key"]) 

    if(util.isSubDocumentType(frame[item])) {
        return <SubDocumentLabelComponent label={item} documentation={documentation} isKey={isKey}/>
    }

    return <LabelComponent label={item} documentation={documentation} isKey={isKey}/>
    /*if(util.isEnumType(frame[item])) {
        return <EnumLabelComponent frame={frame} label={item} documentation={documentation} isKey={isKey}/>
    }*/
}