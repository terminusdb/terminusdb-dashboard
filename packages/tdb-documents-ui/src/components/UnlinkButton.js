import React from "react"
import Button from "react-bootstrap/Button"

export const UnlinkButton = ({ onDelete, id, title, label }) => {
  return <Button className="btn-sm btn ms-auto text-light fw-bold border border-danger rounded" 
    variant="dark" 
    title={title}
    onClick={onDelete}
    id={id}>
      {label}
  </Button>
}