import React, { useState } from "react"
import { InfoBoxComponent } from "./InfoBoxComponent"
import {DetailsModelComponent} from './DetailsModelComponent'
import { GraphContextObj } from '../hook/graphObjectContext'
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { SizeMe } from 'react-sizeme'
import SplitPane from "react-split-pane";
import Accordion from 'react-bootstrap/Accordion';
import { AiOutlinePlus } from "react-icons/ai"
import {CLASS_TYPE_NAME} from "../utils/elementsName"
import {BiPlus} from "react-icons/bi"
import {modelCallServerHook, GraphObjectProvider, ViewBuilder, SchemaDocumentView} from "@terminusdb-live/tdb-react-components"
import { ADD_NEW_ENTITY, ADD_NEW_CLASS, ADD_NEW_CHOICE_CLASS } from '../utils/actionType';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { sortAlphabetically } from "../../utils"


const AddNewModel = ({ onClick }) => {

  const { setNodeAction, changeCurrentNode } = GraphContextObj();

  function handleAddNew (action, type) {
    if(setNodeAction) setNodeAction(action, type)
  }

  return <DropdownButton
    key={"add_new_to_schema_button"}
    id={`add_new_to_schema_button`}
    data-cy={`add_new_to_schema_button`}
    drop={"down"}
    className="w-100 ml-3 mb-3"
    variant="dark"
    title={`Add New`}>
      <Dropdown.Item eventKey="1"
        data-cy={`add_new_document`} 
        id={`add_new_document`} 
        onClick={(e) => handleAddNew(ADD_NEW_ENTITY, "DocumentClasses")}>
        Add New Document
      </Dropdown.Item>
      <Dropdown.Item eventKey="2" 
        data-cy={`add_new_subdocument`} 
        id={`add_new_subdocument`} 
        onClick={(e) => handleAddNew(ADD_NEW_CLASS, "DocumentClasses")}>
        Add New SubDocument
      </Dropdown.Item>
      <Dropdown.Item eventKey="3" 
        data-cy={`add_new_choice_class`} 
        id={`add_new_choice_class`} 
        onClick={(e) => handleAddNew(ADD_NEW_CHOICE_CLASS, "ChoiceClasses")}>
        Add New Enum
      </Dropdown.Item>
  </DropdownButton>
}


export const DisplayMenu = (props) => {
  const {  objectPropertyList, changeCurrentNode, objectChoicesList, selectedNodeObject } = GraphContextObj();
  const [accordianKey, setAccordianKey] = useState(selectedNodeObject && selectedNodeObject.type ? selectedNodeObject.type : CLASS_TYPE_NAME.DOCUMENT_CLASS)
  
  let sortedObjectPropertyList=sortAlphabetically(objectPropertyList, "label")
  let sortedObjectChoicesList=sortAlphabetically(objectChoicesList, "label")

  //console.log("objectPropertyList", objectPropertyList)
  let displayDocumentList = [], displayEnumList = [], displaySubDocumentList = []

  function handleCurrentNode(selectedDocument) {
    if(changeCurrentNode) changeCurrentNode(selectedDocument)
    if(props.onClicked) props.onClicked(selectedDocument)
  }
  
  //if(objectPropertyList.length && changeCurrentNode) changeCurrentNode(objectPropertyList[1].value)
  function getActive(doc) {
    if(doc === selectedNodeObject.id) return "bg-light text-dark"
    return ""
  }

  function handleAccordianSelect (selected) {
    setAccordianKey(selected)
    if(props.handleAccordianControl) props.handleAccordianControl(selected)
  }

  sortedObjectPropertyList.map((obj, index) => {
    if(obj.type === "Document") {
      displayDocumentList.push(
          <Button className={`btn-sm text-left tdb__ui__controller__buttons ${getActive(obj.value)}`}
          variant="transparent" 
          title={`Click here to view properties of ${obj.label}`}
          onClick={(e) => handleCurrentNode(obj.value)}>
            <span className="text-gray text-break">{obj.label}</span>
          </Button>
      )
    }
    else if(obj.type === "Object") {
      displaySubDocumentList.push(
        <Button className={`btn-sm text-left tdb__ui__controller__buttons ${getActive(obj.value)}`}
        variant="transparent" 
        title={`Click here to view properties of ${obj.label}`}
        onClick={(e) => handleCurrentNode(obj.value)}>
          <span className="text-gray text-break">{obj.label}</span>
        </Button>
      )
    }
    
  })  

  sortedObjectChoicesList.map((obj, index) => {
    displayEnumList.push(
      <Button className={`btn-sm text-left tdb__ui__controller__buttons ${getActive(obj.value)}`}
          variant="transparent" 
          title={`Click here to view values of ${obj.label}`}
          onClick={(e) => handleCurrentNode(obj.value)}>
            <span className="text-gray text-break">{obj.label}</span>
      </Button>
    )
  })

  
  if(!displayDocumentList.length && !displaySubDocumentList.length && !displayEnumList.length) {
    return <div className="mt-4">
    {props.canAdd && <AddNewModel onClick={handleCurrentNode}/>}
    <label className="small text-muted fw-bold fst-italic mt-2 ml-3">
      No Documents available ...
      Click on the above Add New Button.
      </label>
  </div>
  }

  return <div className="mt-4">
    {props.canAdd && <AddNewModel onClick={handleCurrentNode}/>}
    <Accordion defaultActiveKey={accordianKey} onSelect={handleAccordianSelect}>
      <Accordion.Item eventKey={CLASS_TYPE_NAME.DOCUMENT_CLASS} className="border-0">
          <Accordion.Header>{"Documents"}</Accordion.Header>
          <Accordion.Body>
            <Stack>{displayDocumentList.length ? displayDocumentList : <label className="text-muted fst-italic small">No Documents to display ...</label>}</Stack>
            </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey={CLASS_TYPE_NAME.OBJECT_CLASS} className="border-0">
          <Accordion.Header>{"SubDocuments"}</Accordion.Header>
          <Accordion.Body>
            <Stack>{displaySubDocumentList.length ? displaySubDocumentList :  <label className="text-muted fst-italic small">No SubDocuments to display ...</label>}</Stack>
            </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey={CLASS_TYPE_NAME.CHOICE_CLASS} className="border-0">
          <Accordion.Header>{"Enums"}</Accordion.Header>
          <Accordion.Body>
            <Stack>{displayEnumList.length ? displayEnumList : <label className="text-muted fst-italic small">No Enums to display ...</label>}</Stack>
          </Accordion.Body>
        </Accordion.Item>
    </Accordion>
  </div>
 
}

export const SchemaBuilderList = (props) => {
  return <DisplayMenu {...props}/>
}