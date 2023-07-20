import React, { useState } from "react"
import { InfoBoxComponent } from "./InfoBoxComponent"
import {DetailsModelComponent} from './DetailsModelComponent'
import { GraphContextObj } from '../hook/graphObjectContext'
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { SizeMe } from 'react-sizeme'
import SplitPane from "react-split-pane";
import Accordion from 'react-bootstrap/Accordion';
import { AiOutlinePlus } from "react-icons/ai"
import {CLASS_TYPE_NAME} from "../utils/elementsName"
import {BiPlus} from "react-icons/bi"
import {modelCallServerHook, GraphObjectProvider, ViewBuilder, SchemaDocumentView} from "@terminusdb-live/tdb-react-components"
import { ADD_NEW_ENTITY } from '../utils/actionType';

const AddNewModel = ({ onClick }) => { 

  const { setNodeAction, changeCurrentNode } = GraphContextObj();

  function handleAddNew () {
    //if(changeCurrentNode) changeCurrentNode("DocumentClasses")
    if(setNodeAction) setNodeAction(ADD_NEW_ENTITY, "DocumentClasses")
  }

  
  return <ButtonGroup className="mb-2">
    <Button className="btn-sm" 
      variant="dark" 
      onClick={handleAddNew}>
        <BiPlus style={{fontSize: "14px"}} color="#fff" /> 
        <span className="text-gray">{`Add New`}</span>
    </Button>
  </ButtonGroup>
}

const DisplayMenu = ({  objectPropertyList, changeCurrentNode, objectChoicesList }) => {

  //console.log("objectPropertyList", objectPropertyList)
  let displayDocumentList = [], displayEnumList = [], displaySubDocumentList

  function handleCurrentNode(selectedDocument) {
    if(changeCurrentNode) changeCurrentNode(selectedDocument)
  }
  
  //if(objectPropertyList.length && changeCurrentNode) changeCurrentNode(objectPropertyList[1].value)


  objectPropertyList.map((obj, index) => {
    if(obj.type === 'Document') {
      displayDocumentList.push(
        <ButtonGroup className="mb-2">
          <Button className="btn-sm" 
              variant="dark" 
              title={`Click here to view properties of ${obj.label}`}
              onClick={(e) => handleCurrentNode(obj.value)}>
                <span className="text-gray">{obj.label}</span>
          </Button>
          {<Button 
              className="btn-sm bg-secondary" 
              variant="dark" 
              title={`Add properties to ${obj.label}`}
              //onClick={(e) => newDocHandler(item["@id"])}
          > 
              <BiPlus style={{fontSize: "14px"}} color="#fff" />
          </Button>}
        </ButtonGroup>
      )
    }
    else if(obj.type === 'Object') {
      displaySubDocumentList.push(
        <ButtonGroup className="mb-2">
          <Button className="btn-sm" 
              variant="dark" 
              title={`Click here to view properties of ${obj.label}`}
              onClick={(e) => handleCurrentNode(obj.value)}>
                <span className="text-gray">{obj.label}</span>
          </Button>
          {<Button 
              className="btn-sm bg-secondary" 
              variant="dark" 
              title={`Add properties to ${obj.label}`}
              //onClick={(e) => newDocHandler(item["@id"])}
          > 
              <BiPlus style={{fontSize: "14px"}} color="#fff" />
          </Button>}
        </ButtonGroup>
      )
    }
    
  })  

  objectChoicesList.map((obj, index) => {
    displayEnumList.push(
      <ButtonGroup className="mb-2">
        <Button className="btn-sm" 
            variant="dark" 
            title={`Click here to view values of ${obj.label}`}
            onClick={(e) => handleCurrentNode(obj.value)}>
              <span className="text-gray">{obj.label}</span>
        </Button>
        {<Button 
            className="btn-sm bg-secondary" 
            variant="dark" 
            title={`Add values to ${obj.label}`}
            //onClick={(e) => newDocHandler(item["@id"])}
        > 
            <BiPlus style={{fontSize: "14px"}} color="#fff" />
        </Button>}
      </ButtonGroup>
    )
  })

  //onClick={(e) => handleClassClick(item["@id"])}>            

  return <div className="mt-4">
    <AddNewModel onClick={handleCurrentNode}/>
    <h6>Documents</h6>
    <div style={{ display: "inline-grid" }}>  
      {displayDocumentList}
    </div>
    <div style={{ display: "inline-grid" }}>  
      {displaySubDocumentList}
    </div>
    <h6>Enums</h6>
    <div style={{ display: "inline-grid" }}>  
      {displayEnumList}
    </div>
  </div>

  //return <ButtonGroup vertical>{displayList}</ButtonGroup>
}

export const SchemaBuilderList = () => {
  const {  objectPropertyList, changeCurrentNode, objectChoicesList,  } = GraphContextObj();
 
  //console.log("objectChoicesList", objectChoicesList)
  return <DisplayMenu changeCurrentNode={changeCurrentNode}
    objectPropertyList={objectPropertyList}
    objectChoicesList={objectChoicesList}/>
}