import React, { useState } from "react"
import {GraphContextObj} from '../hook/graphObjectContext'; 

/**
 * 
 * @param {*} currentNodeJsonSchema contains selected nodeSchema information
 * @param {*} currentpropertyID property id
 * @returns true if property has been set down to markdown
 */
function checkIfRenderedAsMarkdown(currentNodeJsonSchema, currentpropertyID) {
  if(!currentNodeJsonSchema.metadata) return false
  if(currentNodeJsonSchema.metadata.hasOwnProperty("render_as") && 
    currentNodeJsonSchema.metadata["render_as"].hasOwnProperty(currentpropertyID) ) {
      return true
    }
}


/**
 * 
 * @param {*} nodeSchemaData contains selected nodeSchema information
 * @returns true if node is of string type 
 */
 function checkIfPropertyIsString(nodeSchemaData) {
	if(nodeSchemaData && 
    nodeSchemaData.hasOwnProperty("range") && 
    nodeSchemaData["range"] === "xsd:string") {
		  return Date.now()
	}
	return false
}

export const BaseRenderAsComponent = ({ currentNodeJson, nodeSchemaData }) => {

  /** if nodeSchemaData available && property type is string
   * by default when we attempt to add a property by default it is a string propetry & at this point 
   * nodeSchemaData will be an empty JSON object
   */
  if(Object.keys(nodeSchemaData).length && !checkIfPropertyIsString(nodeSchemaData)) return <div/>
  
  const { mainGraphObj } =GraphContextObj()
  let currentpropertyID=currentNodeJson.id
  let isRenderedAsMetadata = checkIfRenderedAsMarkdown(mainGraphObj.getNodeData(), currentpropertyID)
  const [checked, setChecked] = useState(isRenderedAsMetadata);


  function handleChange (checked) {
    if(checked) {
      mainGraphObj.setPropertyMarkDownInfo(currentpropertyID)
    }
    else {
      mainGraphObj.removePropertyMarkDownInfo(currentpropertyID)
    }
    setChecked(checked);
  }

  return <div className="d-flex">
    <input type="checkbox" 
      id="tdb__render__as__checkbox" 
      className="mr-2"
      checked={checked}
      onChange={(e) => handleChange(!checked)}/>
    <label className="mt-2">Render As Markdown</label>
  </div>
}