import React, {useState, useEffect, useRef} from "react"
const parse = require('html-react-parser')
import CodeMirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { html, htmlLanguage } from '@codemirror/lang-html'
import { languages } from '@codemirror/language-data'
import {Form} from "react-bootstrap"
import Stack from 'react-bootstrap/Stack'
import * as CONST from "../constants"
import * as helper from "./helpers" 
import * as util from "../utils"
import MDEditor, { commands }  from '@uiw/react-md-editor';
import mermaid from "mermaid";
import InputGroup from 'react-bootstrap/InputGroup';

function booleanField(mode, props) {
    const [checked, setChecked] = useState(mode !== CONST.CREATE ? props.formData : false)

    function handleClick() {
        setChecked(!checked)
        props.onChange(!checked)
    }
    return <InputGroup className="mb-3 w-100">
        {mode !== CONST.VIEW && <div className={`control-label`}>
            {props.name}
            {props.required && <span className="required">{"*"}</span>}
        </div>}
        <Stack direction={"horizontal"} gap={2}>
            {checked && <input type="checkbox" id={props.name} name={props.name} checked onChange={handleClick}/>}
            {!checked && <input type="checkbox" id={props.name} name={props.name} onChange={handleClick}/>}
            <span>{props.name}</span>
        </Stack>
    </InputGroup>
}

export function getBooleanUI (mode, data) {
    let uiLayout = {}
    function displayBooleanField(props) {
        return booleanField(mode, props)
    }
    uiLayout["ui:field"] = displayBooleanField
    return uiLayout
}

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
export function getURIUIWidget(title, uiFrame) {
    let uiLayout = {} 
    let css = uiFrame && uiFrame.hasOwnProperty(title) ? uiFrame[title][CONST.CLASSNAME] : ``
    function displayURI(props) {
        return <div className={`${css} d-flex`}>
            <Form.Label className="control-label">{title}</Form.Label> 
            <a href={props.formData} className="text-light text-break" target="_blank">{props.formData}</a>
        </div>
    }
    uiLayout["ui:field"] = displayURI
    return uiLayout
}

/** get Markdown UI layout for create & edit mode */
export function getMarkdownUI_CodeMirror(props) {
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

/** get Markdown UI layout for create & edit mode */
export function getMarkdownUI(props) {
    let value = props.formData ? props.formData : ``
    const [code, setCode]=useState(value)

    function onChange(data) {
        props.onChange(data)
        setCode(data)
    }

    const getCode = (arr = []) => arr.map((dt) => {
        if (typeof dt === CONST.STRING_TYPE) {
          return dt;
        }
        if (dt.props && dt.props.children) {
          return getCode(dt.props.children);
        }
        return false;
    }).filter(Boolean).join("")

    const Code = ({ inline, children = [], className, ...props }) => {
        const demoid = useRef(`dome${crypto.randomUUID()}`);
        const code = getCode(children);
        const demo = useRef(null);
        useEffect(() => {
          if (demo.current) {
            try {
              const str = mermaid.render(demoid.current, code, () => null, demo.current);
              // @ts-ignore
              demo.current.innerHTML = str;
            } catch (error) {
              // @ts-ignore
              demo.current.innerHTML = error;
            }
          }
        }, [code, demo]);
      
        if (
          typeof code === "string" && typeof className === "string" &&
          /^language-mermaid/.test(className.toLocaleLowerCase())
        ) {
          return (
            <code ref={demo}> 
              <code id={demoid.current} style={{ display: "none" }} />
            </code>
          );
        }
        return <code className={String(className)}>{children}</code>;
    };

    /** set data color mode to dark data-color-mode="dark" */
    return <div className="d-block w-100">
        <div className="mb-3">{props.name} </div>
        <div className="w-100" data-color-mode="dark">
            <MDEditor
                value={code}
                onChange={onChange}
                /*style={{ whiteSpace: 'pre-wrap', padding: 15}}*/
                textareaProps={{
                    placeholder: "Please enter Markdown text ... "
                  }}
                previewOptions={{
                    components: {
                      code: Code
                    }
                }}
            />
        </div>
    </div>
} 

/** get Markdown UI layout for View mode */
export function getViewMarkdownUI(formData, name, uiFrame) { 
    let value = formData ? formData : ``
    const [code, setCode]=useState(value)

    if(formData) {
        var css=""
        if(uiFrame && uiFrame.hasOwnProperty(name)) {
            css = uiFrame[name].hasOwnProperty("classNames") ? uiFrame[name]["classNames"] : ""
        }

        const getCode = (arr = []) => arr.map((dt) => {
            if (typeof dt === "string") {
              return dt;
            }
            if (dt.props && dt.props.children) {
              return getCode(dt.props.children);
            }
            return false;
        }).filter(Boolean).join("")
    
        const Code = ({ inline, children = [], className, ...props }) => {
            const demoid = useRef(`dome${crypto.randomUUID()}`);
            const code = getCode(children);
            const demo = useRef(null);
            useEffect(() => {
              if (demo.current) {
                try {
                  const str = mermaid.render(demoid.current, code, () => null, demo.current);
                  // @ts-ignore
                  demo.current.innerHTML = str;
                } catch (error) {
                  // @ts-ignore
                  demo.current.innerHTML = error;
                }
              }
            }, [code, demo]);
          
            if (
              typeof code === "string" && typeof className === "string" &&
              /^language-mermaid/.test(className.toLocaleLowerCase())
            ) {
              return (
                <code ref={demo}>
                  <code id={demoid.current} style={{ display: "none" }} />
                </code>
              );
            }
            return <code className={String(className)}>{children}</code>;
        };

        return <div className={`d-block ${css} w-100`}>
            {/*<div className="mb-3">{name} </div>*/}
            <div className="w-100">
                <MDEditor
                    value={code}
                    style={{ whiteSpace: 'pre-wrap', padding: 15}}
                    commands={[
                        commands.codePreview
                    ]}
                    height={500} 
                    preview="preview"
                    previewOptions={{
                        components: {
                        code: Code
                        }
                    }}
                />
                {/*<MDEditor.Markdown source={Code} style={{ whiteSpace: 'pre-wrap' }}/>*/}
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

