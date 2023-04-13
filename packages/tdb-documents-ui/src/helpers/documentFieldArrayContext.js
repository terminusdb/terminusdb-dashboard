import React, { useState, useEffect, useContext } from 'react'
import * as CONST from "../constants"
export const ArrayFieldContext = React.createContext()
export const ArrayFieldObj = () => useContext(ArrayFieldContext)


/**
 * 
 * @returns custom array templates - mostly used for displaying ARRAY s inside a Document
 */
export const ArrayFieldProvider = ({ children, args, field, fieldID, docConfig, expanded }) => { 
 
  // keeos a tag on how many items have been added/ deleted in array 
  const [items, setItems]=useState(gatherDisplayItems(docConfig, field))
  const [refresh, setRefresh] = useState(Date.now())
  // keeps a tag on formData 
  const [fieldDataArray, setFieldDataArray] = useState(docConfig.formData.hasOwnProperty(field) ? docConfig.formData[field] : [])

  // on click of Add 
  function handleAdd (fieldID, property, items, setItems, fieldDataArray, setFieldDataArray, docConfig) {
    // add field on button click 
    let newIndex = items.length
    let eachField = constructEachField(fieldID, property, newIndex, items, fieldDataArray, setFieldDataArray, docConfig)
    setItems( arr => [ ...arr, eachField ]);
  }

  // template
  let arrayProps = {
    canAdd: args.mode === CONST.VIEW? false : true,
    className: "field field-array field-array-of-string",
    id: fieldID,
    items: items,
    title: field,
    hideFieldLabel: false
  }

  // construct each field on click of add item
  function constructEachField (property, currentIndex, eachFieldData) {
    let field = { 
      children: {
        props: {
          "idSchema": { "$id": `${fieldID}__${currentIndex}` },
          //formData: fetchFilled (docConfig, property, newIndex),
          onChange: (data, index) => handleFieldOnChange(data, index),
          title: property,
          child: true
        }
      },
      index: currentIndex, 
      hasMoveDown: args.mode === CONST.VIEW ? false : args["extractedType"] === CONST.SET ? false : true,
      hasMoveUp: CONST.VIEW ? false : args["extractedType"] === CONST.SET ? false : true,
      hasRemove: args.mode === CONST.VIEW ? false : true,
    }
    if(eachFieldData) field.children.props.formData=eachFieldData
    return field
  }

  /**
   * 
   * @param {*} data - data enetered by user
   * @param {*} index - index of field in which user enters data
   * field on change also stores data for onChange of document
   */
  function handleFieldOnChange(data, index) {
    // each field's onChange
    let tempFieldDataArray = fieldDataArray
    tempFieldDataArray[index] = data
    setFieldDataArray(tempFieldDataArray)
    // pass property so as to map fields in subDocument Widget's onChange
    docConfig.onChange( tempFieldDataArray, field )
  }

  /**
   * 
   * @param {*} docConfig - configuration
   * @param {*} property - property name
   * @returns filled frames of EDIT or VIEW mode
   */
  function gatherDisplayItems (docConfig, property) {
    let filledItems = []
  
    // display nothing if formdata not avaialble
    if(!docConfig) return filledItems
    if(!docConfig.formData.hasOwnProperty(property)) return filledItems
    if(!Array.isArray(docConfig.formData[property])) return filledItems
  
    docConfig.formData[property].map( (eachFieldData, fieldDataIndex) => {
      let eachField = constructEachField(field, fieldDataIndex, eachFieldData)
      filledItems.push(eachField)
    })
  
    return filledItems
  }

  /**
   * 
   * @param {*} e event on handle click 
   */
  function handleAdd (e) {
    let newIndex = items.length
    let eachField = constructEachField(field, newIndex)
    setItems( arr => [ ...arr, eachField ]);
  }

  /**
   * 
   * @param {*} deleteIndex - index to be deleted
   */
  function handleDelete(deleteIndex) {
    let temp = items
    temp.splice(deleteIndex, 1)
    fieldDataArray.splice(deleteIndex, 1)
    // on delete change SUBDOCUMENT onChange
    docConfig.onChange( fieldDataArray, field )
    setRefresh(Date.now())
    setItems(temp)
  }

  /**
   * 
   * @param {*} index - current index of element
   * @param {*} newIndex - new index to be shifted to 
   * @param {*} keyedFormData - stored formData 
   * @returns reordered array
   */
  function reArrange (index, newIndex, keyedFormData) {
    // Copy item
    let _newKeyedFormData = keyedFormData.slice();

    // Moves item from index to newIndex
    _newKeyedFormData.splice(index, 1);
    _newKeyedFormData.splice(newIndex, 0, keyedFormData[index]);

    return _newKeyedFormData;
  }

  /**
   * 
   * @param {*} index - current index of element
   * @param {*} newIndex - new index to be shifted to 
   * function deals with reordering of arrays 
   */
  function handleReorderClick(index, newIndex) {
    // Copy item
    let temp = reArrange (index, newIndex, items)
    let temp_formData = reArrange (index, newIndex, fieldDataArray)
    
    setItems(temp)
    // on reorder change SUBDOCUMENT onChange
    docConfig.onChange( temp_formData, field )
    setRefresh(Date.now())
  }

	return (
		<ArrayFieldContext.Provider
			value={{
        items,
        arrayProps,
        args,
        field,
        handleAdd,
        handleDelete,
        handleReorderClick,
        refresh
      }}
		>
			{children}
		</ArrayFieldContext.Provider>
	)
}
