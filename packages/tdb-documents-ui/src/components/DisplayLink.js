import React, { useState, useEffect } from "react"
import { AiOutlineCheck } from "react-icons/ai"
import { TDBLabel } from "./LabelComponent"
import { BORDER } from "../constants";
import { TraverseDocumentLinks } from "./TraverseDocumentLinks";
 
export const DisplayLinkID = ({ linkProps, onClick, selected, className }) => {
  return <>
    {/*!linkProps.hideFieldLabel && <TDBLabel name={linkProps.documentLinkPropertyName} 
      required={linkProps.required} 
      comment={linkProps.comment} 
      className={"tdb__label__width"} />*/}
    <AiOutlineCheck className="text-success mr-1 mt-1"/>
    <div className={`text-break text-decoration-underline ${className}`}
      onClick={onClick}
      style={ {cursor: "pointer"} }
      id={selected}> 
      { selected } 
    </div>
  </>
}

const LinkedUnfoldedDocument = ({ selected, linkProps, className }) => {
  
  const [showUnfoldedDocs, setShowUnfoldedDocs] = useState(false);

  const handleClick = (e, val) => { // on click of link 
    setShowUnfoldedDocs(Date.now())
  }

  const handleClose = () => setShowUnfoldedDocs(false);

  return <div className="d-flex mb-3">
    {showUnfoldedDocs && <TraverseDocumentLinks onHide={handleClose} 
      linkProps={linkProps}
      clicked={linkProps.dataID}/>}
    <DisplayLinkID linkProps={linkProps}
      className={className}
      onClick={handleClick}
      selected={selected}/>
  </div>
}

function getDocumentDiffClassNames(borderClassName) {
  if(borderClassName === "tdb__diff__original-border")
    return "tdb__diff__original-underline"
  return "tdb__diff__changed-underline"
} 

export function getClassNames(uiFrame, documentLinkPropertyName) {
  return  uiFrame && uiFrame.hasOwnProperty(documentLinkPropertyName) 
  && uiFrame[documentLinkPropertyName].hasOwnProperty(BORDER) ? 
  getDocumentDiffClassNames(uiFrame[documentLinkPropertyName][BORDER]) : ""
}

export const DisplayLink = ( linkProps ) => {

  let { documentLinkPropertyName, uiFrame } = linkProps
  let className = getClassNames(uiFrame, documentLinkPropertyName)
  
  return <LinkedUnfoldedDocument selected={linkProps.dataID} 
    className={className}
    linkProps={linkProps} />
  
}