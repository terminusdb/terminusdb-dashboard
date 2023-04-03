import React, { useState, useEffect } from "react"
import { ArrayFieldProvider } from './documentFieldArrayContext'
import { DisplayField } from "./displayFiledArray"

// on delete 
function deleteField(deleteIndex, items) {
  console.log("items", items)
}

// on reorder 
function onReorderClick  (index, newIndex, fieldDataArray, setFieldDataArray) {
  console.log()
  // Copy item
  let _fieldDataArray = fieldDataArray.slice();

  // Moves item from index to newIndex
  _fieldDataArray.splice(index, 1);
  _fieldDataArray.splice(newIndex, 0, fieldDataArray[index]);
  setFieldDataArray(_fieldDataArray)

  return _fieldDataArray;
};




export function displayDocumentFieldArrayHelpers (fieldID, field, expanded, args, docConfig) {

  return <ArrayFieldProvider args={args} 
    fieldID={fieldID}
    docConfig={docConfig}
    expanded={expanded}
    field={field}>
    <DisplayField/>
  </ArrayFieldProvider>
}

