import React from "react" 
import { CLASS_TYPE_NAME, PROPERTY_TYPE_NAME } from '../utils/elementsName'
import { Position } from 'reactflow';
import * as style from "./styles"
import { getInheritedProperties } from "../detailsComponent/PropertiesComponent"


 
export function createNodesAndEdges(selectedNodeObject, objPropsRelatedToClass, propertyList, mainGraphObj) {

  const initialNodes = [], sourceList = [], targetList = [];
  const initialEdges = [];
  const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const inheritedProperties= getInheritedProperties();

  initialNodes.push({ 
    id: selectedNodeObject.id, 
    data: { 
      label: selectedNodeObject.id,
      style:  getNodeStyle(null, style.selected_style.background)
    }, 
    type: 'bidirectional',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: center 
  });
   
  /*
	* get all the relationship where the select node is a target
	*/
  objPropsRelatedToClass.map( (complexPropertyObj) =>{
    const property = mainGraphObj.getObjectProperty(complexPropertyObj.nodeName, complexPropertyObj.propName)
    if(property){
      sourceList.push({
        id: complexPropertyObj.nodeName,
        label: complexPropertyObj.nodeName,
        propertyName: complexPropertyObj.propName,
        linkedToType: complexPropertyObj.linked_to_type
      })
    }
	}) 

  inheritedProperties.map((inheritedProperty) => {
    const property = mainGraphObj.getObjectProperty(inheritedProperty.isInherited.inheritedFrom, inheritedProperty.name)
    if(property){
      sourceList.push({
        id: inheritedProperty.isInherited.inheritedFrom,
        label: inheritedProperty.isInherited.inheritedFrom,
        propertyName: inheritedProperty.name,
        linkedToType: selectedNodeObject.type
      })
    }
  })

  /*
	* get all the relationship where the select node is a source
	* current node properties 
	*/
	propertyList.map((propertyItem)=>{
		if(propertyItem.type===PROPERTY_TYPE_NAME.CHOICE_PROPERTY || 
		  propertyItem.type===PROPERTY_TYPE_NAME.OBJECT_PROPERTY){
		  const info = mainGraphObj.getPropertyInfo(propertyItem.id)
      //console.log("info", info)
		  if(info.range){
        const label =  propertyItem.range
        const rangeElement=mainGraphObj.getElement(info.range, false) 
        //console.log("rangeElement", rangeElement)
        let tList = {
          id: rangeElement.id,
          label: rangeElement.id,
          propertyName: info.id
        }
        if(propertyItem.linked_to_type) tList["linkedToType"]= propertyItem.linked_to_type
        targetList.push(tList)
      }
           
		}
	})

 
  // source list 
  for (let i = 0; i < sourceList.length; i++) {
    const degrees = i * (360 / 8);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;


    initialNodes.push({ 
      id: `${sourceList[i].id}`, 
      data: { 
        label: sourceList[i].label, 
        style: getNodeStyle(sourceList[i].linkedToType),
      }, 
      type: 'bidirectional',
      position: { x, y },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    })

   
    initialEdges.push({
      id: `edge-${sourceList[i].id}->${selectedNodeObject.id}`,
      target: selectedNodeObject.id,
      source: sourceList[i].id,
      label: sourceList[i].propertyName,
      //sourceHandle: sourceList[i].propertyName,
      sourceHandle: 'left',
      targetHandle: 'right',
      className: 'normal-edge',
    });
  }

  // target list 
  for (let i = 0; i < targetList.length; i++) {
    const degrees = i * (360 / 8);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;

    //style: { background : getNodeBg(sourceList[i].linkedToType)
    let tNodeTemp = { 
      id: `${targetList[i].id}`, 
      data: { label: targetList[i].label }, 
      //type: 'output',
      type: 'bidirectional',
      position: { x, y },
      style: {
        color: "#333",
        padding: "5"
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    }
    if(targetList[i].linkedToType) {
      tNodeTemp.data["style"] = getNodeStyle(targetList[i].linkedToType)
    }
    initialNodes.push(tNodeTemp)
    initialEdges.push({
      id: `edge-${selectedNodeObject.id}->${targetList[i].id}->${targetList[i].propertyName}`,
      //target: targetList[i].id,
      label: targetList[i].propertyName,
      source: selectedNodeObject.id,
      target: targetList[i].id,
      className: 'normal-edge',
      sourceHandle: 'right',
      targetHandle: 'left',
    })
  }

  //console.log("nodes", initialNodes)
  //console.log("edges", initialEdges)

  return { initialNodes, initialEdges };
}

const getNodeStyle = (nodeType, color) => {
  return { 
    background : color ? color : getNodeBg(nodeType),
    padding: "10px",
    color: "#000",
    borderRadius : "4px"
  } 
}

// get Node Bg 
export const getNodeBg = (nodeType) => {
  switch(nodeType) {
    case CLASS_TYPE_NAME.DOCUMENT_CLASS:
      return "rgb(255, 178, 102)" 
      //if(data.schema && data.hasOwnProperty("@abstract")) {
        //return "rgb(252, 219, 186)" 
      //}
      //else return "rgb(255, 178, 102)" 
    case CLASS_TYPE_NAME.OBJECT_CLASS:
      return "rgb(150, 233, 151)"
    case CLASS_TYPE_NAME.CHOICE_CLASS:
      return "rgb(23, 190, 207)"
    default: return "black"
  }
}


// get node color 
export const getNodeColor = (data) => { 
  if(data && data.type) {
    switch(data.type) {
      case CLASS_TYPE_NAME.DOCUMENT_CLASS:
        if(data.schema && data.hasOwnProperty("@abstract")) {
          return {
            color: "#333",
            background: "rgb(252, 219, 186)" 
          }
        }
        else return {
          color: "#333",
          background: "rgb(255, 178, 102)" 
        }
      case CLASS_TYPE_NAME.OBJECT_CLASS:
        return {
          color: "#333",
          background: "rgb(150, 233, 151)"
        }
      case CLASS_TYPE_NAME.CHOICE_CLASS:
        return {
          color: "#333",
          background: "rgb(23, 190, 207)"
        }
      default: return {
        color: "#fff",
        background: "black"
      }
    }
  }
}