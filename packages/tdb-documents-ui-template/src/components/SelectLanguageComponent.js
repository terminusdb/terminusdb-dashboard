import React from "react"
import * as CONST from "./constants"
import Form from 'react-bootstrap/Form'

/**
 * 
 * @param {*} documentation described at context level
 * @returns an array including described languages
 */
function extractLanguages(documentation) {
  let langArray=[]
  documentation.map(doc => {
    if(doc.hasOwnProperty(CONST.LANGUAGE)) {
      langArray.push(doc[CONST.LANGUAGE])
    }
  })
  return langArray
}

/**
 * 
 * @param {*} langaugeArray array including described languages at context level 
 * @returns an array of options to be provided to select components
 */
function constructOptions(langaugeArray) {
  let options = []
  langaugeArray.map ( lang => {
    options.push( <option value={lang}>{lang}</option> )
  })
  return options
}

export const LanguageSelectComponent = ({ frame, setSelectedLanguage }) => {
  if(!frame) return <React.Fragment/>

  if(!frame.hasOwnProperty(CONST.CONTEXT)) {
    throw new Error (`No Context found in frames ...`)
  }

  // No documentation provided 
  if(!frame[CONST.CONTEXT].hasOwnProperty(CONST.DOCUMENTATION)) return <React.Fragment/>

  // extract described languages from documentation
  let langaugeArray = extractLanguages(frame[CONST.CONTEXT][CONST.DOCUMENTATION])

  // if defined language is same as default language "en", docnt display select component
  if(langaugeArray.length === 1 && langaugeArray.includes(CONST.DEFAULT_LANGUAGE)) return <React.Fragment/>

  return <Form.Select size="sm" 
    onChange={(e) => setSelectedLanguage(e.target.value)}
    style={ { width: "70px"} } >
    {constructOptions(langaugeArray)}
  </Form.Select>

}