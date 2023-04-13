import React, { useState, useEffect } from "react"
import { ArrayFieldProvider } from './documentFieldArrayContext'
import { DisplayField } from "./displayFiledArray"


export function displayDocumentFieldArrayHelpers (fieldID, field, expanded, args, docConfig) {

  return <ArrayFieldProvider args={args} 
    fieldID={fieldID}
    docConfig={docConfig}
    expanded={expanded}
    field={field}> 
    <DisplayField/>
  </ArrayFieldProvider>
}

