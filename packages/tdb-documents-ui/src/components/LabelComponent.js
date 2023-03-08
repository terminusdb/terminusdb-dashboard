import React from "react"
import Stack from "react-bootstrap/Stack"
import { DisplayPropertyNameAndComment } from "../documentationTemplates"

// displays all labels of properies
export const TDBLabel = ({ name, required, comment, className, id }) =>{

  if(required) {
    // required then add required identifier 
    return <Stack direction="veritcal" className={className}>
      <label className="control-label" for={id}>{name}
        <DisplayPropertyNameAndComment comment={comment}/>
      </label> 
      {required && <span className="required"></span>}
    </Stack>
  }
  
  // !required
  return <div className="d-flex">
    <label className="control-label" for={id}>{name}
      <DisplayPropertyNameAndComment comment={comment}/>
    </label> 
  </div>
} 