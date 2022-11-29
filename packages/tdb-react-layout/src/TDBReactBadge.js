import React from "react"
import { Badge } from 'react-bootstrap'

export const TDBReactBadge = (props) =>{
    let variant = props.variant || "dark"
    return <Badge className="ml-3" bg={variant}>{props.title}</Badge>
}