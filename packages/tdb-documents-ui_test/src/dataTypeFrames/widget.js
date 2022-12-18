import React, {useState} from "react"
const parse = require('html-react-parser')
import CodeMirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { html, htmlLanguage } from '@codemirror/lang-html'
import { languages } from '@codemirror/language-data'
import ReactMarkdown from 'react-markdown'
import {Form} from "react-bootstrap"
import Stack from 'react-bootstrap/Stack'
import * as CONST from "../constants"
import * as helper from "./helpers" 
import * as util from "../utils"

// function to provide a ui widget to textarea for xsd:string types
export function getTextareaUIWidget(placeholder, mode, data) {
    let uiLayout = {} 
    uiLayout["ui:widget"] = "textarea",
    //uiLayout["ui:title"] = title,
    uiLayout["ui:placeholder"] = placeholder,
    uiLayout["classNames"] = "tdb__input mb-3 mt-3",
    uiLayout["ui:options"] = {
        "rows": data ? util.getRowHeight(data) : 1 
    }
    if(mode === CONST.VIEW) {
        //uiLayout["ui:widget"] = data ? {} : "hidden",
        uiLayout["classNames"] = `${uiLayout["classNames"]} tdb__view`
    }
    return uiLayout 
}

// function for URI in View mode
export function getURIUIWidget(title) {
    let uiLayout = {} 
    function displayURI(props) {
        return <Stack direction="horizontal" gap={3}>
            <Form.Label>{title}</Form.Label>
            <a href={props.formData} className="text-light" target="_blank">{props.formData}</a>
        </Stack>
    }
    uiLayout["ui:field"] = displayURI
    return uiLayout
}

/** get Markdown UI layout for create & edit mode */
export function getMarkdownUI(props) {
    let value = props.formData ? props.formData : ``
    const [code, setCode]=useState(value)

    function onChange(data) {
        props.onChange(data)
        setCode(data)
    }

    let config=helper.getCodeMirrorConfig(props)
    
    return <React.Fragment>
        <Stack direction="horizontal" gap={3} className="col-md-1">
            <div>
                {props.name} 
                {/*props.required && <span className="required">*</span>*/}
            </div>
        </Stack>
        <div className="w-100">
            <CodeMirror onChange={onChange} 
                value={code} 
                theme={config.theme}
                lineNumbers={false}
                height={config.minHeight}
                extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]} />
        </div>
    </React.Fragment>
}

/** get Markdown UI layout for View mode */
export function getViewMarkdownUI(formData, name, uiFrame) { 
    if(formData) {
        var css=""
        if(uiFrame && uiFrame.hasOwnProperty(name)) {
            css = uiFrame[name].hasOwnProperty("classNames") ? uiFrame[name]["classNames"] : ""
        }
        return <div className={`d-block ${css}`}>
            <Stack direction="horizontal" gap={3}>
                <div> 
                    {name} 
                    {/*props.required && <span className="required">*</span>*/}
                </div>
            </Stack>
            <div className="bg-secondary p-2 mt-2 border-rounded tdb__markdown__view">
                <ReactMarkdown>{formData}</ReactMarkdown>
            </div>
        </div>
    }
    return <div/>
}

/** Commenting out HTML support as of now */
/*
export function getCreateHTMLUI(props) {
    const [code, setCode]=useState(``)
    function onChange(data) {
        props.onChange(data)
        setCode(data)
    }

    if(props.schema && props.schema.hasOwnProperty(CONST.METADATA)) {
        if(props.schema[CONST.METADATA].hasOwnProperty(CONST.CODE_MIRROR_MIN_HEIGHT)) {
            CONST.BASIC_CODE_MIRROR_CONFIG.minHeight = props.schema[CONST.METADATA][CONST.CODE_MIRROR_MIN_HEIGHT]
        }
        if(props.schema[CONST.METADATA].hasOwnProperty(CONST.CODE_MIRROR_LINE_NUMBERS)) {
            CONST.BASIC_CODE_MIRROR_CONFIG.displayLines = props.schema[CONST.METADATA][CONST.CODE_MIRROR_LINE_NUMBERS]
        }
        if(props.schema[CONST.METADATA].hasOwnProperty(CONST.CODE_MIRROR_THEME)) {
            CONST.BASIC_CODE_MIRROR_CONFIG.theme = props.schema[CONST.METADATA][CONST.CODE_MIRROR_THEME]
        }
    }
   
    return <React.Fragment>
        <Stack direction="horizontal" gap={3}>
            <div>
                {props.name} 
                {props.required && <span className="required">*</span>}
            </div>
        </Stack>
        <CodeMirror onChange={onChange} 
            value={code} 
            theme={CONST.BASIC_CODE_MIRROR_CONFIG.theme}
            lineNumbers={false}
            height={CONST.BASIC_CODE_MIRROR_CONFIG.minHeight}
            extensions={[html({ base: htmlLanguage, codeLanguages: languages })]} />
    </React.Fragment>

}

export function getEditHTMLUI(props) {
    let value = props.formData ? props.formData : ``
    const [code, setCode]=useState(value)

    function onChange(data) {
        props.onChange(data)
        setCode(data)
    }

    if(props.schema && props.schema.hasOwnProperty(CONST.METADATA)) {
        if(props.schema[CONST.METADATA].hasOwnProperty(CONST.CODE_MIRROR_MIN_HEIGHT)) {
            CONST.BASIC_CODE_MIRROR_CONFIG.minHeight = props.formData ? "auto" : props.schema[CONST.METADATA][CONST.CODE_MIRROR_MIN_HEIGHT]
        }
        if(props.schema[CONST.METADATA].hasOwnProperty(CONST.CODE_MIRROR_LINE_NUMBERS)) {
            CONST.BASIC_CODE_MIRROR_CONFIG.displayLines = props.schema[CONST.METADATA][CONST.CODE_MIRROR_LINE_NUMBERS]
        }
        if(props.schema[CONST.METADATA].hasOwnProperty(CONST.CODE_MIRROR_THEME)) {
            CONST.BASIC_CODE_MIRROR_CONFIG.theme = props.schema[CONST.METADATA][CONST.CODE_MIRROR_THEME]
        }
    }

    return <React.Fragment>
        <Stack direction="horizontal" gap={3}>
            <div>
                {props.name} 
                {props.required && <span className="required">*</span>}
            </div>
        </Stack>
        <CodeMirror onChange={onChange} 
            value={code} 
            theme={CONST.BASIC_CODE_MIRROR_CONFIG.theme}
            lineNumbers={false}
            height={CONST.BASIC_CODE_MIRROR_CONFIG.minHeight}
            extensions={[html({ base: htmlLanguage, codeLanguages: languages })]} />
    </React.Fragment>

}

export function getViewHTMLUI(props) {
    let value = props.formData ? props.formData : ``

    return <React.Fragment>
        <Stack direction="horizontal" gap={3}>
            <div>
                {props.name} 
                {props.required && <span className="required">*</span>}
            </div>
        </Stack>
        {parse(value)}
    </React.Fragment>

}
*/

