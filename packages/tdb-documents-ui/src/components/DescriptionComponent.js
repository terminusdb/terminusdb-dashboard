import React from "react"
import Stack from "react-bootstrap/Stack"
import { AiOutlineLink } from "react-icons/ai"

// description field for document links 
// shows to which document a property is linked
export function getLinkedDescription (linked) {
  return  <Stack direction="horizontal" gap={2} className="fw-bold">
    <AiOutlineLink className="text-warning h6 mt-1"/>
    <small className="fst-italic text-muted">
      {`Linked to document: `}
      <span className="text-warning fw-bold">{linked}</span>
    </small>
  </Stack>
}

// provides a small description text for document link choices
export function getDocumentLinkChoiceDescription (name, linked_to) {
  return <small className="fst-italic text-muted">
    {`Use below options to link property `}
    <span className="fw-bold">{name}</span>
    {`. You can either Create New`} 
    <span className="fw-bold">{linked_to}</span>
    {` or link to an existing `}
    <span className="fw-bold">{linked_to}</span>
  </small>
}