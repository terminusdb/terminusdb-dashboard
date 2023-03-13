import React, { useState } from "react"
import { VIEW } from "../constants"
import { TDBLabel } from "../components/LabelComponent"
const parse = require('html-react-parser')
import Stack from 'react-bootstrap/Stack'
import MDEditor, { commands }  from '@uiw/react-md-editor';
import mermaid from "mermaid";
import uuid from 'react-uuid'

/** get Markdown UI layout for create & edit mode */
export function getMarkdownUI( formData, onChange, name ) {
  let value = formData ? formData : ``
  const [code, setCode]=useState(value)

  function onInputChange(data) {
      onChange(data)
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
      const demoid = useRef(`dome${uuid()}`);
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
      <div className="w-100" data-color-mode="dark">
          <MDEditor
              value={code}
              onChange={onInputChange}
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
export function getViewMarkdownUI( formData, name, uiFrame ) { 
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
          const demoid = useRef(`dome${uuid()}`);
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

// widget displays Markdown
export const TDBMarkdown = ({ id, name, value, required, mode, hideFieldLabel, onChange, comment, label }) => {

  if(mode === VIEW && !value) return <div className={`tdb__${name}__hidden`}/>


  return <Stack direction="horizontal">
    <TDBLabel name={label ? label : name} 
      required={required} 
      comment={comment} 
      hideFieldLabel={hideFieldLabel}
      id={id}/>
    {mode !== VIEW && getMarkdownUI(value, onChange, name)}
    {mode === VIEW && getViewMarkdownUI(value, name)}
  </Stack>
}