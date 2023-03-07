import React from "react"
import JSONInput from 'react-json-editor-ajrm'
import locale    from 'react-json-editor-ajrm/locale/en'
import * as CONST from "../constants"
import {getPropertyLabelFromDocumentation} from "../documentationTemplates"

export const makeSysUnitTypeFrames =() =>{
    return {"default": []}
}


/**  function to display sys:Unit types in create mode*/
export function getSysUnitUILayout (fullFrame, frame, item, uiFrame, mode, formData, documentation) {
    let uiLayout = {}

    function displayCreateSysUnit(props) {
        
        return <div className="d-flex">
            {getPropertyLabelFromDocumentation (item, documentation)}
        </div>
    }
    uiLayout["ui:field"] = displayCreateSysUnit
    return uiLayout
}

export function getSysJSONUILayout(fullFrame, frame, item, uiFrame, mode, formData, documentation) {
    let uiLayout = {}


    function displayJSONEditor(props) {
        
        function handleInput (data) {
            if(data.hasOwnProperty("jsObject") && Object.keys(data.jsObject).length > 0) {
                props.onChange(data.jsObject)
            }
        }

        // extract data to display in editor
        let displayJSON=props.formData ? props.formData : {}
        let readOnly= (mode === CONST.VIEW) ? true : false
        //<span className="control-label">{props.name}</span>
        
        return <React.Fragment>
            <div className="control-label"> 
                {getPropertyLabelFromDocumentation (item, documentation)}
                {props.required && <span class="required">*</span>}
            </div>
            
            <JSONInput
                id          = 'json_type_field'
                locale      = { locale }
                height      = {CONST.JSON_EDITOR_HEIGHT}
                width       = {CONST.JSON_EDITOR_WIDTH}
                viewOnly    = {readOnly}
                placeholder = {displayJSON}
                onBlur      = {handleInput}
            />
        </React.Fragment>
    } 

    //uiLayout["ui:description"] = "Enter a valid JSON object below"
    uiLayout["ui:field"] = displayJSONEditor
    return uiLayout
}

