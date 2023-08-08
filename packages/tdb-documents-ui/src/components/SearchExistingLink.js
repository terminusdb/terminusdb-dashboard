import React, { useState, useEffect } from "react"
import * as CONST from "../constants"
import { AiOutlineCheck } from "react-icons/ai"
import { UnlinkButton } from "./UnlinkButton"
import Card from "react-bootstrap/Card"

// checks if @unfoldable is false if there is filled data in EDIT Mode only
function fetchSelected (formData) {
  if(typeof formData=== CONST.STRING_TYPE && 
      formData) return { id: formData, label: formData }
  return false
}

const LinkedDocument = ({ selected, onTraverse, className }) => {
  const [clicked, setClicked]=useState(false) 

  useEffect(() => {
    if(!clicked.id) return
    if(onTraverse) onTraverse(clicked.id)
  }, [clicked.update])

  const handleClick = (e, val) => { // view if on traverse function defined
    setClicked({ id: val, update: Date.now() })
  }

  return <div className="d-flex">
    <AiOutlineCheck className="text-success mr-1 mt-1"/>
    <div className={`text-break text-decoration-underline ${className} bg-transparent`}
      onClick={(e) => handleClick(e, selected.id)} 
      style={ {cursor: "pointer"} }
      data-cy={selected.id}
      id={selected.id}> 
      {selected.label ? selected.label : selected.id} 
    </div>
  </div>
}

// Selected link component 
const Selected = ({ selected, onTraverse, setShowSearch, setSelected, id, onChange, documentLinkPropertyName }) => {

  if(!selected) return <div/> 

  function handleDelete() {
    setSelected(false)
    setShowSearch(true) // show search component 
    onChange(null)
  }

  return <div className="w-100 d-flex justify-content-end">
    <small className="fst-italic fw-bold text-warning mt-1">
      {`Selected:  `}
    </small>
    <LinkedDocument selected={selected} onTraverse={onTraverse}/>
    <UnlinkButton onDelete={handleDelete}
      title={"Delete link"} 
      label={"Change Link"}
      documentLinkPropertyName={documentLinkPropertyName}
      id={id} />
  </div>
}


export const SearchExistingLink = ({ onSelect, onTraverse, linked_to, mode, onChange, formData, id, className, documentLinkPropertyName }) => {
  const [selected, setSelected] = useState(fetchSelected(formData))
  const [showSearch, setShowSearch]=useState(true)

  useEffect (() => {
    if(selected && onChange) {
      onChange(selected.id)
      setSelected(selected)
      setShowSearch(false)
    }
  }, [selected])

  if(mode === CONST.VIEW) {
    return <LinkedDocument selected={selected} 
      className={className}
      onTraverse={onTraverse}/>
  }

  // onSelect is not provided for VIEW MODE
  if(!onSelect) return <div/>

  const displayComponent = React.cloneElement(onSelect, { setSelected: setSelected, doctype: linked_to })

  return <>
    {showSearch && <Card bg={"transparent"} className="p-4 mt-3" key ={id}>
      {displayComponent}
    </Card>}
    {selected && <Selected selected={selected} 
      setSelected={setSelected} 
      onTraverse={onTraverse}
      documentLinkPropertyName={documentLinkPropertyName}
      setShowSearch={setShowSearch} 
      id={id}
      onChange={onChange}/>}
  </>
}