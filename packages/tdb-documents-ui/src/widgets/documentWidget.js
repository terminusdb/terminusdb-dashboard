
import React, { useState } from "react"
import * as CONST from "../constants"
import * as util from "../utils"
import Card from "react-bootstrap/Card"
import Stack from "react-bootstrap/Stack"
import { TDBLabel } from "../components/LabelComponent"
import { getLinkedDescription, getDocumentLinkChoiceDescription } from "../components/DescriptionComponent"
import { CreateDocument } from "../components/CreateDocumentLink"
import { EditDocument } from "../components/EditDocumentLink"
import { ViewDocument } from "../components/ViewDocumentLink"
 
export const TDBDocument = ({ extracted, reference, comment, onTraverse, onSelect, unfoldable, props, mode, linked_to, propertyDocumentation }) => {

  let depth = 0 

  if(mode === CONST.CREATE) return <CreateDocument name={props.name} 
    onChange={props.onChange}
    linked_to={linked_to}
    depth={depth}
    onSelect={onSelect}
    mode={mode}
    reference={reference}
    extracted={extracted}
    //comment={comment}  // review
    required={props.required} />

  if(mode === CONST.EDIT) return <EditDocument name={props.name} 
    onChange={props.onChange}
    linked_to={linked_to}
    depth={depth}
    reference={reference}
    mode={mode}
    onSelect={onSelect}
    onTraverse={onTraverse}
    unfoldable={unfoldable}
    formData={props.formData}
    extracted={extracted}
    //comment={comment}  // review
    required={props.required} />

  if(mode === CONST.VIEW) return <ViewDocument name={props.name} 
    onChange={props.onChange}
    linked_to={linked_to}
    mode={mode}
    depth={depth}
    reference={reference}
    onTraverse={onTraverse}
    unfoldable={unfoldable}
    formData={props.formData}
    extracted={extracted}
    //comment={comment}  // review
    required={props.required} />
}