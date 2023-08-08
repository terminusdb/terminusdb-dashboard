import React from "react"
import Button from "react-bootstrap/Button"

export const UnlinkButton = ({ onDelete, id, title, label, documentLinkPropertyName }) => {
  return <Button className="btn-sm btn ms-auto text-muted fw-bold border border-danger rounded" 
    variant="dark" 
    title={title}
    onClick={onDelete}
    data-cy={`delete__${documentLinkPropertyName}`}
    id={id}>
      {label}
  </Button>
}