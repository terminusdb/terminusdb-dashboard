import React, {useState} from "react"
const parse = require('html-react-parser')
import CodeMirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { html, htmlLanguage } from '@codemirror/lang-html'
import { languages } from '@codemirror/language-data'
import ReactMarkdown from 'react-markdown'
import {Form} from "react-bootstrap"
import Stack from 'react-bootstrap/Stack'
import * as DATATYPE from "../constants"
import {getRowHeight} from "../utils"

// function to provide a ui widget to date
export function getDateUIWidget(title) {
    let uiLayout = {}
    uiLayout["ui:widget"] = "date",
    uiLayout["ui:title"] = title,
    uiLayout["ui:options"] = {
        "yearsRange": [
            1980,
            2030
        ]
    }
    uiLayout["classNames"] = "tdb__input mb-3 mt-3 date-list-style"
    return uiLayout
}

// function to provide a ui widget to dateTime
export function getDateTimeUIWidget (title) {
    let uiLayout = {} 
    uiLayout["ui:widget"] = "alt-datetime",
    uiLayout["ui:title"] = title,
    uiLayout["ui:options"] = {
        "yearsRange": [
            1980,
            2030
        ]
    } 
    uiLayout["classNames"] = "tdb__input mb-3 mt-3 date-list-style"
    return uiLayout
}

function displayDate(props) { 
    if(props.formData) {
        let date = new Date(props.formData); console.log()
        return <div className="tdb__input">
            <label className="control-label" htmlFor={`root_${props.name}`}>
                <span>{props.name}</span>
                {props.required && <span className="required">*</span>}
            </label>
            <input value={date.toUTCString()}  
                className="form-control" 
                readOnly={true} 
                id={`root_${props.name}`} 
                label={props.name} 
                required="" 
                placeholder="xsd:string" 
                type="text"/>
        </div>
    }
    return <div/>
}


// function to provide a ui widget to dateTime
export function getDateTimeViewUIWidget (title) {
    let uiLayout = {} 
    uiLayout["ui:field"]=displayDate
    return uiLayout
}

export function getDateViewUIWidget(title) {
    let uiLayout = {}
    uiLayout["ui:field"]=displayDate
    return uiLayout
}



// function to provide a ui widget to textarea for xsd:string types
export function getTextareaUIWidget(title, placeholder, data) {
    let uiLayout = {} 
    uiLayout["ui:widget"] = "textarea",
    uiLayout["ui:title"] = title,
    uiLayout["ui:placeholder"] = placeholder,
    uiLayout["classNames"] = "tdb__input mb-3 mt-3"
    uiLayout["ui:options"] = {
        "rows": data ? getRowHeight(data) : 1
    }
    return uiLayout
}

// function for URI in View mode
export function getURIUIWidget(title) {
    let uiLayout = {} 
    function displayURI(props) {
        return <Stack direction="horizontal" gap={3}>
            <Form.Label>{title}</Form.Label>
            <a href={props.formData} target="_blank">{props.formData}</a>
        </Stack>
    }
    uiLayout["ui:field"] = displayURI
    return uiLayout
}


const matchType ={
    [DATATYPE.XSD_STRING] : DATATYPE.STRING_TYPE,
    [DATATYPE.XSD_ANY_URI] : DATATYPE.STRING_TYPE,
    [DATATYPE.XSD_LANGUAGE] : DATATYPE.STRING_TYPE,
    [DATATYPE.RDF_LANGSTRING] :DATATYPE.STRING_TYPE,
    [DATATYPE.XDD_URL] : DATATYPE.STRING_TYPE, 
    [DATATYPE.XDD_HTML]: DATATYPE.STRING_TYPE,

    [DATATYPE.SYS_JSON_TYPE] : DATATYPE.JSON_TYPE,
    [DATATYPE.XSD_DOUBLE] : DATATYPE.NUMBER_TYPE,
    [DATATYPE.XSD_NONNEGATIVEINTEGER] : DATATYPE.NUMBER_TYPE,
    [DATATYPE.XSD_FLOAT] : DATATYPE.NUMBER_TYPE,
    [DATATYPE.XSD_POSITIVE_INTEGER] : DATATYPE.NUMBER_TYPE,
    [DATATYPE.XSD_DECIMAL] : DATATYPE.NUMBER_TYPE,
    [DATATYPE.XSD_INTEGER] : DATATYPE.NUMBER_TYPE,
    [DATATYPE.XSD_BOOLEAN] : DATATYPE.BOOLEAN_TYPE,

    [DATATYPE.XSD_DATE_TIME] : DATATYPE.DATE_TYPE,
    [DATATYPE.XSD_G_YEAR] : DATATYPE.DATE_TYPE,
    [DATATYPE.XSD_DATE] : DATATYPE.STRING_TYPE
} 

//get data type xsd: or xdd:
// you can rewrite with an object
export function getDataType(type) { 
    return matchType[type]
}


export function getCreateHTMLUI(props) {
    const [code, setCode]=useState(``)
    function onChange(data) {
        props.onChange(data)
        setCode(data)
    }

    if(props.schema && props.schema.hasOwnProperty(DATATYPE.METADATA)) {
        if(props.schema[DATATYPE.METADATA].hasOwnProperty(DATATYPE.CODE_MIRROR_MIN_HEIGHT)) {
            DATATYPE.BASIC_CODE_MIRROR_CONFIG.minHeight = props.schema[DATATYPE.METADATA][DATATYPE.CODE_MIRROR_MIN_HEIGHT]
        }
        if(props.schema[DATATYPE.METADATA].hasOwnProperty(DATATYPE.CODE_MIRROR_LINE_NUMBERS)) {
            DATATYPE.BASIC_CODE_MIRROR_CONFIG.displayLines = props.schema[DATATYPE.METADATA][DATATYPE.CODE_MIRROR_LINE_NUMBERS]
        }
        if(props.schema[DATATYPE.METADATA].hasOwnProperty(DATATYPE.CODE_MIRROR_THEME)) {
            DATATYPE.BASIC_CODE_MIRROR_CONFIG.theme = props.schema[DATATYPE.METADATA][DATATYPE.CODE_MIRROR_THEME]
        }
    }
   
    return <React.Fragment>
        <Stack direction="horizontal" gap={3}>
            <div>
                {props.name} 
                {/*props.required && <span className="required">*</span>*/}
            </div>
        </Stack>
        <CodeMirror onChange={onChange} 
            value={code} 
            theme={DATATYPE.BASIC_CODE_MIRROR_CONFIG.theme}
            lineNumbers={false}
            height={DATATYPE.BASIC_CODE_MIRROR_CONFIG.minHeight}
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

    if(props.schema && props.schema.hasOwnProperty(DATATYPE.METADATA)) {
        if(props.schema[DATATYPE.METADATA].hasOwnProperty(DATATYPE.CODE_MIRROR_MIN_HEIGHT)) {
            DATATYPE.BASIC_CODE_MIRROR_CONFIG.minHeight = props.formData ? "auto" : props.schema[DATATYPE.METADATA][DATATYPE.CODE_MIRROR_MIN_HEIGHT]
        }
        if(props.schema[DATATYPE.METADATA].hasOwnProperty(DATATYPE.CODE_MIRROR_LINE_NUMBERS)) {
            DATATYPE.BASIC_CODE_MIRROR_CONFIG.displayLines = props.schema[DATATYPE.METADATA][DATATYPE.CODE_MIRROR_LINE_NUMBERS]
        }
        if(props.schema[DATATYPE.METADATA].hasOwnProperty(DATATYPE.CODE_MIRROR_THEME)) {
            DATATYPE.BASIC_CODE_MIRROR_CONFIG.theme = props.schema[DATATYPE.METADATA][DATATYPE.CODE_MIRROR_THEME]
        }
    }

    return <React.Fragment>
        <Stack direction="horizontal" gap={3}>
            <div>
                {props.name} 
                {/*props.required && <span className="required">*</span>*/}
            </div>
        </Stack>
        <CodeMirror onChange={onChange} 
            value={code} 
            theme={DATATYPE.BASIC_CODE_MIRROR_CONFIG.theme}
            lineNumbers={false}
            height={DATATYPE.BASIC_CODE_MIRROR_CONFIG.minHeight}
            extensions={[html({ base: htmlLanguage, codeLanguages: languages })]} />
    </React.Fragment>

}

export function getViewHTMLUI(props) {
    let value = props.formData ? props.formData : ``

    return <React.Fragment>
        <Stack direction="horizontal" gap={3}>
            <div>
                {props.name} 
                {/*props.required && <span className="required">*</span>*/}
            </div>
        </Stack>
        {parse(value)}
    </React.Fragment>

}

export function getCreateMarkDownUI(props) {
    const [code, setCode]=useState(``)

    function onChange(data) {
        props.onChange(data)
        setCode(data)
    }

    if(props.schema && props.schema.hasOwnProperty(DATATYPE.METADATA)) {
        if(props.schema[DATATYPE.METADATA].hasOwnProperty(DATATYPE.CODE_MIRROR_MIN_HEIGHT)) {
            DATATYPE.BASIC_CODE_MIRROR_CONFIG.minHeight = props.schema[DATATYPE.METADATA][DATATYPE.CODE_MIRROR_MIN_HEIGHT]
        }
        if(props.schema[DATATYPE.METADATA].hasOwnProperty(DATATYPE.CODE_MIRROR_LINE_NUMBERS)) {
            DATATYPE.BASIC_CODE_MIRROR_CONFIG.displayLines = props.schema[DATATYPE.METADATA][DATATYPE.CODE_MIRROR_LINE_NUMBERS]
        }
        if(props.schema[DATATYPE.METADATA].hasOwnProperty(DATATYPE.CODE_MIRROR_THEME)) {
            DATATYPE.BASIC_CODE_MIRROR_CONFIG.theme = props.schema[DATATYPE.METADATA][DATATYPE.CODE_MIRROR_THEME]
        }
    }

    return <React.Fragment>
        <Stack direction="horizontal" gap={3}>
            <div>
                {props.name} 
                {/*props.required && <span className="required">*</span>*/}
            </div>
        </Stack>
        <CodeMirror onChange={onChange} 
            value={code} 
            theme={DATATYPE.BASIC_CODE_MIRROR_CONFIG.theme}
            lineNumbers={false}
            height={DATATYPE.BASIC_CODE_MIRROR_CONFIG.minHeight}
            extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]} />
    </React.Fragment>

}

export function getEditMarkDownUI(props) {
    let value = props.formData ? props.formData : ``
    const [code, setCode]=useState(value)

    function onChange(data) {
        props.onChange(data)
        setCode(data)
    }

    if(props.schema && props.schema.hasOwnProperty(DATATYPE.METADATA)) {
        if(props.schema[DATATYPE.METADATA].hasOwnProperty(DATATYPE.CODE_MIRROR_MIN_HEIGHT)) {
            DATATYPE.BASIC_CODE_MIRROR_CONFIG.minHeight = props.formData ? "auto" : props.schema[DATATYPE.METADATA][DATATYPE.CODE_MIRROR_MIN_HEIGHT]
        }
        if(props.schema[DATATYPE.METADATA].hasOwnProperty(DATATYPE.CODE_MIRROR_LINE_NUMBERS)) {
            DATATYPE.BASIC_CODE_MIRROR_CONFIG.displayLines = props.schema[DATATYPE.METADATA][DATATYPE.CODE_MIRROR_LINE_NUMBERS]
        }
        if(props.schema[DATATYPE.METADATA].hasOwnProperty(DATATYPE.CODE_MIRROR_THEME)) {
            DATATYPE.BASIC_CODE_MIRROR_CONFIG.theme = props.schema[DATATYPE.METADATA][DATATYPE.CODE_MIRROR_THEME]
        }
    }

    return <React.Fragment>
        <Stack direction="horizontal" gap={3}>
            <div>
                {props.name} 
                {/*props.required && <span className="required">*</span>*/}
            </div>
        </Stack>
        <CodeMirror onChange={onChange} 
            value={code} 
            theme={DATATYPE.BASIC_CODE_MIRROR_CONFIG.theme}
            lineNumbers={false}
            height={DATATYPE.BASIC_CODE_MIRROR_CONFIG.minHeight}
            extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]} />
    </React.Fragment>
}

export function getViewMarkDownUI(props) {
    if(props.formData) {
        return <React.Fragment>
            <Stack direction="horizontal" gap={3}>
                <div>
                    {props.name} 
                    {/*props.required && <span className="required">*</span>*/}
                </div>
            </Stack><ReactMarkdown>{props.formData}</ReactMarkdown>
        </React.Fragment>
    }
    return <div/>
}

