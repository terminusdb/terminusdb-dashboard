
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
  
export const TDBDocument = ({ args, extracted, reference, uiFrame, clickedUnlinked, order_by, onTraverse, onSelect, hideFieldLabel, unfoldable, props, mode, linked_to, propertyDocumentation, linkId }) => {

  let depth = 0 

  if(mode === CONST.CREATE) return <CreateDocument name={props.name} 
    onChange={props.onChange}
    linked_to={linked_to}
    depth={depth}
    linkId={linkId}
    order_by={order_by}
    args={args}
    onSelect={onSelect}
    mode={mode}
    hideFieldLabel={hideFieldLabel}
    reference={reference} 
    extracted={extracted}
    propertyDocumentation={propertyDocumentation}
    required={props.required} />

  if(mode === CONST.EDIT) return <EditDocument name={props.name} 
    onChange={props.onChange}
    linked_to={linked_to}
    clickedUnlinked={clickedUnlinked}
    depth={depth}
    reference={reference}
    mode={mode}
    order_by={order_by}
    args={args}
    index={props.index}
    hideFieldLabel={hideFieldLabel}
    onSelect={onSelect}
    onTraverse={onTraverse}
    unfoldable={unfoldable}
    propertyDocumentation={propertyDocumentation}
    formData={props.formData}
    extracted={extracted}
    required={props.required} />

  if(mode === CONST.VIEW) return <ViewDocument name={props.name} 
    onChange={props.onChange}
    linked_to={linked_to}
    mode={mode}
    uiFrame={uiFrame}
    args={args}
    depth={depth}
    order_by={order_by}
    reference={reference}
    onTraverse={onTraverse}
    hideFieldLabel={hideFieldLabel}
    unfoldable={unfoldable}
    propertyDocumentation={propertyDocumentation}
    formData={props.formData}
    extracted={extracted}
    required={props.required} />
}