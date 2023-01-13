import React, {useEffect, useState} from "react"
import Form from "@terminusdb/rjsf-core"
import {getProperties} from "./FrameHelpers"
import CollapsibleField from "react-jsonschema-form-extras/lib/CollapsibleField"
import * as CONST from "./constants"
import {Alert} from "react-bootstrap"
import * as util from "./utils"
import {transformData} from "./extract" 
import {processFormData} from "./processFormData"
/*
**  frame     - full json schema of a document
**  uiFrame   - ui json of a document
**  type      - document type of interest
**  mode      - create/ edit/ view
**  submitButton - submit button configuration json object
**  formData  - filled value of the document
**  onSubmit  - a function with have custom logic to process data submitted
**  hideSubmit - hides Submit button - this is helpfull when you want to display nested FrameViewers
**  onChange   - a function with custom logic to process data when form data is changed
**  onSelect   - a js function which gets back the selected value from selects
**  onTraverse - a js function which gets back the ID of a document on click
**  FieldTemplate - a js function which you can pass at root level of FrameViewer to alter look and feel of fields
**  language - language code parameters to support a wide variety of languages in Ui as defined in schema
*/
export function FrameViewer({frame, uiFrame, type, mode, formData, onSubmit, onTraverse, onSelect, hideSubmit, onChange, FieldTemplate, language}){
    const [schema, setSchema]=useState(false)
    const [uiSchema, setUISchema]=useState(false)
    const [readOnly, setReadOnly]=useState(false)
    const [lang, setLanguage]=useState(false)
    const [error, setError]=useState(false)
    const [input, setInput]=useState({})
    const [documentation, setDocumentation]=useState(false)

    const [message, setMessage]=useState(false)

    let current = `${type}`
    let formDataTemp=formData

    function clear() {
        setSchema(false)
        setUISchema(false)
        setReadOnly(false)
        setLanguage(false)

    }

    useEffect(() => {
        //try{ 
            if(frame, uiFrame, type, mode) { //formData 
                clear()
                let extractedDocumentation= util.extractDocumentation(frame, current, language)
                //if(extractedDocumentation) setDocumentation (extractedDocumentation)
                let properties=getProperties(frame, type, frame[current], uiFrame, mode, formData, onTraverse, onSelect, extractedDocumentation)
                
                let schema = {
                    type: CONST.OBJECT_TYPE,
                    properties: properties.properties,
                    required: properties.required,
                    dependencies: properties.dependencies,
                }
                //console.log("schema", JSON.stringify(schema, null, 2))
                //console.log("uiSchema", JSON.stringify(properties.uiSchema, null, 2))

                console.log("schema", schema)
                console.log("properties.uiSchema", properties.uiSchema)
                //console.log("uiSchema", uiSchema)

                if(mode === CONST.VIEW) {
                    setReadOnly(true)
                    setInput(formData)
                }
                else if(mode === CONST.CREATE) setInput(formData)
                else if(mode === CONST.EDIT && util.isValueHashDocument(frame[current])) {
                    setInput(formData)
                    setMessage(util.getValueHashMessage())
                    setReadOnly(true)
                }
                else if(onChange) { // form nested frame viewers
                    setInput(formData)
                }
                else {
                    setReadOnly(false)
                    setInput({})
                }
                setSchema(schema)
                const uiSchema = properties.uiSchema

                // get form level ui schema 
                if(uiFrame && uiFrame.hasOwnProperty("classNames")) uiSchema["classNames"]= uiFrame.classNames
                if(uiFrame && uiFrame.hasOwnProperty("ui:order")) uiSchema["ui:order"]=uiFrame["ui:order"]
                if(uiFrame && uiFrame.hasOwnProperty("ui:title")) uiSchema["ui:title"]= uiFrame["ui:title"]
                if(uiFrame && uiFrame.hasOwnProperty("ui:description")) uiSchema["ui:description"]= uiFrame["ui:description"]
                
                // order is set to place @documentation field at the start of the document
                if(frame) {
                  uiSchema["ui:order"] = util.getOrderFromMetaData(frame[type])
                }
                
                setUISchema(uiSchema)
            }
        //}
        //catch(e) {
            //setError(`An error has occured in generating frames. Err - ${e}`)
        //}

    }, [frame, uiFrame, type, mode, formData, language]) 

    if(!frame) return <div>No schema provided!</div>
    if(!mode) return  <div>Please include a mode - Create/ Edit/ View</div>
    if(mode === CONST.VIEW && !formData) return <div>Mode is set to View, please provide filled form data</div>
    if(!type) return  <div>Please include the type of document</div>

    
 
    const handleSubmit = ({formData}) => {
        if(onSubmit) { 
            console.log("Before submit: ", formData)
            var extracted = transformData(mode, schema.properties, formData, frame, type)
            if(!extracted.hasOwnProperty("@type")) extracted["@type"] = type
            if(mode === CONST.EDIT &&  // append id in edit mode
                !extracted.hasOwnProperty("@id") && 
                formDataTemp.hasOwnProperty("@id")
            ) extracted["@id"] = formDataTemp["@id"]
            onSubmit(extracted)
            console.log("Data submitted: ",  extracted)
            return extracted
            //console.log("Data submitted: ",  JSON.stringify(extracted, null, 2))
        }
    }

    const handleChange = (data) => {
        //console.log("Data changed: ",  data)
        setInput(data)
        if(onChange) {
            onChange(data)
        }
    }


    if(error) {
        return <Alert variant="danger">{error}</Alert>
    }

    /** 
     * 
     * @param {*} documentation - extracted documentation from frames
     * @returns displays document's comment
     */
    const DisplayDocumentation = ({documentation}) => {
      if(documentation && documentation.hasOwnProperty(CONST.COMMENT)) {
        return <p className="text-muted fw-bold ml-3 text-left">{documentation[CONST.COMMENT]}</p>
      }
      return <div/>
    }


    // process form data to check if one ofs are available
    let processedFormData=(mode !== CONST.CREATE) ? processFormData(frame, type, formData) : formData 

    console.log("processedFormData", processedFormData)

    let dummy={
        "@type": "Polity",
        "general_variables": {
          "@type": "GeneralVariables",
          "alternative_names": [
            {
              "@type": "AlternativeNames",
              "@oneOf": {
                "known": {
                  "@type": "StringValue",
                  "date_range": {
                    "@type": "DateRange",
                    "from": 2,
                    "to": 22
                  },
                  "value": "second"
                },
                "@choice": "known"
              }
            },
            {
              "@type": "AlternativeNames",
              "@oneOf": {
                "inferred": {
                  "@type": "StringValue",
                  "date_range": {
                    "@type": "DateRange",
                    "from": 1,
                    "to": 11
                  },
                  "value": "first"
                },
                "@choice": "inferred"
              }
            }
          ]
        }
      }

      let dummySchema = {
        "type": "object",
        "properties": {
          "general_variables": {
            "type": "object",
            "info": "SUBDOCUMENT_TYPE",
            "title": "general_variables",
            "@metadata": {},
            "properties": {
              "alternative_names": {
                "type": "array",
                "title": "alternative_names",
                "minItems": 0,
                "items": {
                  "type": "object",
                  "info": "SUBDOCUMENT_TYPE",
                  "title": "alternative_names",
                  "@metadata": {},
                  "properties": {
                    "@oneOf": {
                      "type": "object",
                      "info": "@oneOf",
                      "title": "@oneOf",
                      "@metadata": {},
                      "anyOf": [
                        {
                          "title": "inferred",
                          "type": "object",
                          "properties": {
                            "inferred": {
                              "type": "object",
                              "info": "SUBDOCUMENT_TYPE",
                              "title": "inferred",
                              "@metadata": {},
                              "properties": {
                                "date_range": {
                                  "type": "object",
                                  "info": "SUBDOCUMENT_TYPE",
                                  "title": "date_range",
                                  "@metadata": {},
                                  "properties": {
                                    "from": {
                                      "type": "number",
                                      "info": "DATA_TYPE",
                                      "title": "from",
                                      "@metadata": {},
                                      "default": false
                                    },
                                    "to": {
                                      "type": "number",
                                      "info": "DATA_TYPE",
                                      "title": "to",
                                      "@metadata": {},
                                      "default": false
                                    },
                                    "@type": {
                                      "type": "string",
                                      "title": "DateRange",
                                      "default": "DateRange"
                                    }
                                  }
                                },
                                "value": {
                                  "type": "string",
                                  "info": "DATA_TYPE",
                                  "title": "value",
                                  "@metadata": {},
                                  "default": false
                                },
                                "@type": {
                                  "type": "string",
                                  "title": "StringValue",
                                  "default": "StringValue"
                                }
                              }
                            },
                            "@choice": {
                              "type": "string",
                              "default": "inferred"
                            }
                          }
                        },
                        {
                          "title": "known",
                          "type": "object",
                          "properties": {
                            "known": {
                              "type": "object",
                              "info": "SUBDOCUMENT_TYPE",
                              "title": "known",
                              "@metadata": {},
                              "properties": {
                                "date_range": {
                                  "type": "object",
                                  "info": "SUBDOCUMENT_TYPE",
                                  "title": "date_range",
                                  "@metadata": {},
                                  "properties": {
                                    "from": {
                                      "type": "number",
                                      "info": "DATA_TYPE",
                                      "title": "from",
                                      "@metadata": {},
                                      "default": false
                                    },
                                    "to": {
                                      "type": "number",
                                      "info": "DATA_TYPE",
                                      "title": "to",
                                      "@metadata": {},
                                      "default": false
                                    },
                                    "@type": {
                                      "type": "string",
                                      "title": "DateRange",
                                      "default": "DateRange"
                                    }
                                  }
                                },
                                "value": {
                                  "type": "string",
                                  "info": "DATA_TYPE",
                                  "title": "value",
                                  "@metadata": {},
                                  "default": false
                                },
                                "@type": {
                                  "type": "string",
                                  "title": "StringValue",
                                  "default": "StringValue"
                                }
                              }
                            },
                            "@choice": {
                              "type": "string",
                              "default": "known"
                            }
                          }
                        },
                        {
                          "title": "suspected_unknown",
                          "type": "object",
                          "properties": {
                            "suspected_unknown": {
                              "type": "array",
                              "info": "sys:Unit",
                              "title": "suspected_unknown",
                              "@metadata": {}
                            },
                            "@choice": {
                              "type": "string",
                              "default": "suspected_unknown"
                            }
                          }
                        },
                        {
                          "title": "unknown",
                          "type": "object",
                          "properties": {
                            "unknown": {
                              "type": "array",
                              "info": "sys:Unit",
                              "title": "unknown",
                              "@metadata": {}
                            },
                            "@choice": {
                              "type": "string",
                              "default": "unknown"
                            }
                          }
                        }
                      ]
                    },
                    "@type": {
                      "type": "string",
                      "title": "AlternativeNames",
                      "default": "AlternativeNames"
                    }
                  }
                },
                "additionalItems": {
                  "type": "object",
                  "info": "SUBDOCUMENT_TYPE",
                  "title": "alternative_names",
                  "@metadata": {},
                  "properties": {
                    "@oneOf": {
                      "type": "object",
                      "info": "@oneOf",
                      "title": "@oneOf",
                      "@metadata": {},
                      "anyOf": [
                        {
                          "title": "inferred",
                          "type": "object",
                          "properties": {
                            "inferred": {
                              "type": "object",
                              "info": "SUBDOCUMENT_TYPE",
                              "title": "inferred",
                              "@metadata": {},
                              "properties": {
                                "date_range": {
                                  "type": "object",
                                  "info": "SUBDOCUMENT_TYPE",
                                  "title": "date_range",
                                  "@metadata": {},
                                  "properties": {
                                    "from": {
                                      "type": "number",
                                      "info": "DATA_TYPE",
                                      "title": "from",
                                      "@metadata": {},
                                      "default": false
                                    },
                                    "to": {
                                      "type": "number",
                                      "info": "DATA_TYPE",
                                      "title": "to",
                                      "@metadata": {},
                                      "default": false
                                    },
                                    "@type": {
                                      "type": "string",
                                      "title": "DateRange",
                                      "default": "DateRange"
                                    }
                                  }
                                },
                                "value": {
                                  "type": "string",
                                  "info": "DATA_TYPE",
                                  "title": "value",
                                  "@metadata": {},
                                  "default": false
                                },
                                "@type": {
                                  "type": "string",
                                  "title": "StringValue",
                                  "default": "StringValue"
                                }
                              }
                            },
                            "@choice": {
                              "type": "string",
                              "default": "inferred"
                            }
                          }
                        },
                        {
                          "title": "known",
                          "type": "object",
                          "properties": {
                            "known": {
                              "type": "object",
                              "info": "SUBDOCUMENT_TYPE",
                              "title": "known",
                              "@metadata": {},
                              "properties": {
                                "date_range": {
                                  "type": "object",
                                  "info": "SUBDOCUMENT_TYPE",
                                  "title": "date_range",
                                  "@metadata": {},
                                  "properties": {
                                    "from": {
                                      "type": "number",
                                      "info": "DATA_TYPE",
                                      "title": "from",
                                      "@metadata": {},
                                      "default": false
                                    },
                                    "to": {
                                      "type": "number",
                                      "info": "DATA_TYPE",
                                      "title": "to",
                                      "@metadata": {},
                                      "default": false
                                    },
                                    "@type": {
                                      "type": "string",
                                      "title": "DateRange",
                                      "default": "DateRange"
                                    }
                                  }
                                },
                                "value": {
                                  "type": "string",
                                  "info": "DATA_TYPE",
                                  "title": "value",
                                  "@metadata": {},
                                  "default": false
                                },
                                "@type": {
                                  "type": "string",
                                  "title": "StringValue",
                                  "default": "StringValue"
                                }
                              }
                            },
                            "@choice": {
                              "type": "string",
                              "default": "known"
                            }
                          }
                        },
                        {
                          "title": "suspected_unknown",
                          "type": "object",
                          "properties": {
                            "suspected_unknown": {
                              "type": "array",
                              "info": "sys:Unit",
                              "title": "suspected_unknown",
                              "@metadata": {}
                            },
                            "@choice": {
                              "type": "string",
                              "default": "suspected_unknown"
                            }
                          }
                        },
                        {
                          "title": "unknown",
                          "type": "object",
                          "properties": {
                            "unknown": {
                              "type": "array",
                              "info": "sys:Unit",
                              "title": "unknown",
                              "@metadata": {}
                            },
                            "@choice": {
                              "type": "string",
                              "default": "unknown"
                            }
                          }
                        }
                      ]
                    },
                    "@type": {
                      "type": "string",
                      "title": "AlternativeNames",
                      "default": "AlternativeNames"
                    }
                  }
                },
                "@name": "alternative_names"
              },
              "@type": {
                "type": "string",
                "title": "GeneralVariables",
                "default": "GeneralVariables"
              }
            }
          }
        },
        "required": []
      }

      let dummyUI = {}
    
      console.log("schema b4 FV", schema)
      console.log("dummySchema b4 FV", dummySchema)

      console.log("see if equals ", JSON.stringify(dummySchema, null, 2 ) === JSON.stringify(schema, null, 2))


      console.log("schema", schema)
      console.log("uischema", uiSchema)
      console.log("mode", mode)
      console.log("handleSubmit", handleSubmit)
      console.log("readOnly", readOnly)
      console.log("processedFormData", processedFormData)
      
      

    return <div data-cy="frame_viewer" className="tdb__frame__viewer">
        {schema && message && message}
        <DisplayDocumentation documentation={documentation}/>
        {schema && <Form schema={dummySchema}
            uiSchema={dummyUI}
            mode={mode} 
            onSubmit={handleSubmit}
            readonly={readOnly}
            //formData={input}
            //formData={formData}
            formData={processedFormData}
            //onChange={({formData}) => handleChange(formData)}
            fields={{
                collapsible: CollapsibleField
            }}
            children={hideSubmit} // hide submit button on view mode
            FieldTemplate={FieldTemplate}
        />
    }

    </div>
}


  //return <>{"HELLO WORLD"}</>

    /*function CustomFieldTemplate(props) {
        const {id, classNames, label, help, required, description, errors, children} = props;
        var css
        console.log("props", props)
        if(label === "address") css = "d-none"
        return (
          <div className={css}>
            <label htmlFor={id}>{label}{required ? "*" : null}</label>
            {description}
            {children}
            {errors}
            {help}
          </div>
        );
      }*/

    /*let submitButtonCss="btn-info"
    if(uiFrame && Object.keys(uiFrame).length && uiFrame.hasOwnProperty(SUBMIT_BUTTON_STYLE_KEY)) {
        submitButtonCss=uiFrame[SUBMIT_BUTTON_STYLE_KEY]
    }*/

    //console.log("input", input)

