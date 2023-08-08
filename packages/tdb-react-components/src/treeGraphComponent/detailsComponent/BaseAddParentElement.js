import React, { useEffect, useState } from "react"
import { HelpComponent } from './HelpComponent';
import { FormGroupComponent } from "./FormGroupComponent" 
import { GraphContextObj } from '../hook/graphObjectContext';
import { BaseMultiSelectReactElement } from "./BaseMultiSelectReactElement"
import { CLASS_TYPE_NAME } from '../utils/elementsName'
import {ADD_PARENT, REMOVE_PARENT} from '../utils/actionType' 

//classTypeName is the current selected element in the combo
export const getClassDataProvider = (classTypeName, docList) => {
  let dataProvider=[];

  switch(classTypeName){
    case CLASS_TYPE_NAME.OBJECT_CLASS:
      /*classTypeName=CLASS_TYPE_NAME.OBJECT_CLASSES;
      if(availableParentsList.documentClassArr.length===0){
      setShowComboObjectType(false);
      }else{
      setShowComboObjectType(true);
      }*/
    case CLASS_TYPE_NAME.OBJECT_CLASSES:
        dataProvider=docList.objectClassArr
        break;
      case CLASS_TYPE_NAME.CHOICE_CLASS:
      case CLASS_TYPE_NAME.DOCUMENT_CLASS:
        /*
        * if the object type === "Object"
        */
        //setShowComboObjectType(false);
      default:
        dataProvider=docList.documentClassArr;//.concat(props.ordinaryClassDataP)
      break;
            
  }
  
  return dataProvider
}

export const BaseAddParentElement = (props) => {
  const {
    selectedNodeObject, 
    updateParentsList,  
    availableParentsList
  } = GraphContextObj();
	 
  if(!props.nodeJsonData) return <div/>
  
  if(props.nodeJsonData.type === 'Document' || props.nodeJsonData.type === 'Object') { 
    
    
    // on change of select component
    const handleParents = (currentParentName, actionType) => {  
      // actionType === "remove-value" on clicking delete of multi react select
      let action = actionType === "remove-value" ? REMOVE_PARENT : ADD_PARENT
      updateParentsList(currentParentName, action)
    } 
    
    // display parents of selected document
    const getSelectedParents = (nodeData) => { 
      if(nodeData.parents && nodeData.parents.length) {
        let selectedParentsList = []
        nodeData.parents.map(par => {
          selectedParentsList.push({ name: par, label: par, value: par })
        })
        return selectedParentsList
      }
      return []
    }

    // get dataprovider to display documents to appear as parent list
    let parentList = getClassDataProvider(selectedNodeObject.type, availableParentsList)

    if(props.view === `UI_VIEW`) {
      return <div className="mb-3">
        <FormGroupComponent 
          labelComponent = {<label className={`mr-3`}>{`Parents`}</label>}
          helpComponent = {<HelpComponent text={`Here you can add Parents to ${props.nodeJsonData.id}`}/>}
          fieldComponent = {
            <div className="w-100">
              <BaseMultiSelectReactElement onChange={handleParents}
                selectedValues={getSelectedParents(props.nodeJsonData)}
                dataProvider={parentList}/>
            </div>
          }/>
      </div>
    }

    return <div className="mb-3">
      <div className="d-flex">
        <label className={`mr-3`}>{`Parents`}</label>
        <HelpComponent text={`Here you can add Parents to ${props.nodeJsonData.id}`}/>
      </div>
      <div className="w-100">
        <BaseMultiSelectReactElement onChange={handleParents}
          selectedValues={getSelectedParents(props.nodeJsonData)}
          dataProvider={parentList}/>
      </div>
    </div>
  
  }

  return <div/>

}