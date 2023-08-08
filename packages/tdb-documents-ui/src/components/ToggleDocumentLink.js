import React, { useState } from "react"
import * as CONST from "../constants"
import { TDBCheckBox } from "../components/CheckBoxComponent"


// radio buttons to choose weather to link or create new document
export const ToggleComponent = ({ action, setAction, toggleKey, propertyName }) => {

  return <div key={toggleKey}> 
    <TDBCheckBox checked={action}  
      name={CONST.LINK_NEW_DOCUMENT} 
      propertyName={propertyName}
      checkBoxKey={`${CONST.LINK_NEW_DOCUMENT}__${toggleKey}`}
      onChange={setAction}/> 
    <TDBCheckBox checked={action} 
      propertyName={propertyName}
      checkBoxKey={`${CONST.LINK_EXISTING_DOCUMENT}__${toggleKey}`}
      name={CONST.LINK_EXISTING_DOCUMENT} 
      onChange={setAction}/>
  </div> 
}