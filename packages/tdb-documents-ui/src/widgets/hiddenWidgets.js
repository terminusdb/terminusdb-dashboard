import React from "react"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import Stack from "react-bootstrap/Stack"
import Card from "react-bootstrap/Card"
import { TDBLabel } from "../components/LabelComponent"
import * as util from "../utils"

const DeleteIcons = ({ className }) => {
  if(className !== "tdb__diff__original__deleted") return <React.Fragment/>
  return <Stack direction="horizontal" gap={2}>
    <AiOutlineMinusCircle className={className}/>
    <AiOutlineMinusCircle className={className}/>
    <AiOutlineMinusCircle className={className}/>
  </Stack>
}

const AddedIcons = ({ className }) => {
  if(className !== "tdb__diff__changed__deleted") return <React.Fragment/>
  return <Stack direction="horizontal" gap={2}>
    <AiOutlinePlusCircle className={className}/>
    <AiOutlinePlusCircle className={className}/>
    <AiOutlinePlusCircle className={className}/>
  </Stack> 
}

export const HiddenWidgets = (config) => {
  let field = config.args.documentFrame[config.name]
  if(util.isDataType(field)) {   
    return <HiddenInputWidgets name={config.name} 
      className={config.className}
      id={config.id} 
      hideFieldLabel={config.hideFieldLabel}/>
  }
  else if (util.isDocumentType(field, config.args.fullFrame)) {
    return <HiddenInputWidgets name={config.name} 
    className={config.className}
    id={config.id} 
    hideFieldLabel={config.hideFieldLabel}/>
  }
  else if(util.isSubDocumentType(field)) {   
    return <HiddenSubDocumentWidgets name={config.name} 
      className={config.className}
      id={config.id} 
      hideFieldLabel={config.hideFieldLabel}/>
  }
}


// NORMAL DATA TYPES
export const HiddenInputWidgets = (config) => {
  let className =  config.className === "tdb__doc__input tdb__diff__original__deleted" ? 
    "tdb__diff__original__deleted":
    "tdb__diff__changed__deleted"

  return <Stack direction="horizontal">
    <TDBLabel name={config.name} 
      comment={config.comment} 
      isKey={config.isKey}
      id={config.id} 
      required={config.required}
      hideFieldLabel={config.hideFieldLabel}/>
    <DeleteIcons className={className}/>
    <AddedIcons className={className}/>
    <input type="text"
      id={config.id}   
      name={config.id}
      className={`tdb__doc__input w-100 opacity-0`}/>
  </Stack>
}
 
// SUBDOCUMENTS 
export const HiddenSubDocumentWidgets = (config) => {
  let className =  config.className === "tdb__doc__input tdb__diff__original__deleted" ? 
    "tdb__diff__original__deleted":
    "tdb__diff__changed__deleted"

  return <Stack direction="horizontal"> 
    <TDBLabel name={config.name} 
      comment={config.comment} 
      isKey={config.isKey}
      id={config.id} 
      required={config.required}
      hideFieldLabel={config.hideFieldLabel}/>
    <Card bg="secondary" className={`tdb__subdocument__input w-100 p-4`} key={config.id}>
      <DeleteIcons className={className}/>
      <AddedIcons className={className}/>
    </Card>
  </Stack>
}

