import React from "react"
import Stack from "react-bootstrap/Stack"
import { DisplayPropertyNameAndComment } from "../documentationTemplates"
import { displayIfKeyField } from "../utils"

// displays all labels of properies
export const TDBLabel = ({ name, required, comment, className, id, isKey, hideFieldLabel }) =>{

  // hideFieldLabel is true for sets/lists
  if(hideFieldLabel) return <label className="tdb__label__width invisible" htmlFor={id}>{name}</label>

  if(required) {
    // required then add required identifier 
    return <Stack direction="veritcal" className={className}>
      <label className="control-label" htmlFor={id}>{name}
        {isKey && displayIfKeyField(isKey, name)}
        <DisplayPropertyNameAndComment comment={comment}/>
      </label> 
      {required && <span className="required"></span>}
    </Stack>
  }
  
  // !required
  return <div className="d-flex">
    <label className={`control-label ${className} rounded`} htmlFor={id}>{name}
      {isKey && displayIfKeyField(isKey, name)}
      <DisplayPropertyNameAndComment comment={comment}/>
    </label> 
  </div>
} 