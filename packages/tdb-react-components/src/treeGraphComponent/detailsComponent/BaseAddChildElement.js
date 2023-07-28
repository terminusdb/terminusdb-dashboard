import React from "react"
import { ConstraintsComponent } from "./ConstraintsComponent"
import {HelpComponent} from './HelpComponent';
import { GraphContextObj } from '../hook/graphObjectContext';
import { FormGroupComponent } from "./FormGroupComponent" 
import { BaseMultiSelectReactElement } from "./BaseMultiSelectReactElement"
import { ADD_CHILD, REMOVE_CHILD } from '../utils/actionType'
import { getClassDataProvider } from "./BaseAddParentElement"

export const BaseAddChildElement = (props) => {
  const {
    selectedNodeObject, 
    availableChildrenList,
    updateChildrenList
  } = GraphContextObj();

  if(!props.nodeJsonData) return <div/>

  
  if(props.nodeJsonData.type === 'Document' || props.nodeJsonData.type === 'Object') {

    // display parents of selected document
    const getSelectedChildren = (nodeData) => {
      if(nodeData.children && nodeData.children.length) {
        let selectedChildrenList = []
        nodeData.children.map(child => {
          selectedChildrenList.push({ name: child.id, label: child.name, value: child.id })
        })
        return selectedChildrenList
      }
      return []
      
    }
 
    const handleChildren = (currentChildName, actionType) => {
      // actionType === "remove-value" on clicking delete of multi react select
      let action = actionType === "remove-value" ? REMOVE_CHILD : ADD_CHILD 
      updateChildrenList(selectedNodeObject, currentChildName, action)
    } 
  
    // get dataprovider to display documents to appear as parent list
    let childrenList = getClassDataProvider(selectedNodeObject.type, availableChildrenList)

    if(props.view === `UI_VIEW`) {
      return <FormGroupComponent 
        labelComponent = {<label className={`mr-3`}>{`Children`}</label>}
        helpComponent = {<HelpComponent text={`Here you can add Children to ${props.nodeJsonData.id}`}/>}
        fieldComponent = {
        <div className="w-100">
            <BaseMultiSelectReactElement onChange={handleChildren}
              selectedValues={getSelectedChildren(props.nodeJsonData)}
              dataProvider={childrenList}/>
          </div>
        }/>
    }

    return  <div className="mb-3">
      <div className="d-flex">
        <label className={`mr-3`}>{`Children`}</label>
        <HelpComponent text={`Here you can add Children to ${props.nodeJsonData.id}`}/>
      </div>
      <div className="w-100">
        <BaseMultiSelectReactElement onChange={handleChildren}
              selectedValues={getSelectedChildren(props.nodeJsonData)}
              dataProvider={childrenList}/>
      </div>
    </div>
  }

  return <div/>

}