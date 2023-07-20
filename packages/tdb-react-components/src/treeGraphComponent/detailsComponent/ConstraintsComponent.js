import React, { useState } from 'react'
import {PROPERTY_TYPE_NAME,PROPERTY_TYPE_LABEL} from '../utils/elementsName'
import {GraphContextObj} from '../hook/graphObjectContext'
import {RelationshipView} from '../relationshipView/RelationshipView'
//import { RelationshipLinkView } from "../relationshipView/RelationshipLinkView"
import Button from 'react-bootstrap/Button'
import {Accordion} from  '../../form/Accordion';
import {GetTitle} from "./ParentsFilter"
import { ADD_CHILD } from '../utils/actionType'
 
const constraintMessage={
	childrenNum:'This node has',
	inRelationship:'This node is in this Relationship',
	relComplexProperty:'This node is a range of the ComplexProperty'
}
 
export const ConstraintsComponent =(props)=>{

	const [checked,setChecked] = useState({checked:false})
	const [showNewChild, setNewChild] = useState(false)

	const { 
    setNodeAction,
    selectedNodeObject,
	} = GraphContextObj();

	const nodeData = selectedNodeObject ? selectedNodeObject : {}
	
	const getConstraintsMessage=()=>{
		let message=[]

		if(nodeData.allChildren && nodeData.allChildren.length>0){
			const childrenNum=nodeData.allChildren.length;
			
			const cName=childrenNum===1 ? 'child' : 'children';
			const childrenMessage=`${childrenNum} direct ${cName}`
			message.push(<div className="tdb__list" key='children'>
				<div className="tdb__list__title">Children</div>
				<div className="tdb__list__items">{childrenMessage}</div>*
				<></>
			</div>)
		}
		return message;
	}
	
	const message=getConstraintsMessage();

	let childrenList = []
	nodeData.allChildren.map((child) => {
		childrenList.push(<div className='ml-3'>{child.id}</div>)
	})

	const AddNew = () => {

		function handleNewChild() {
			//setNewChild(Date.now())
			//setNodeAction(ADD_CHILD)
		} 

		return <Button className="btn-sm float-right" 
			onClick={handleNewChild} 
			variant="light">
				Add New Child
		</Button>
	}
	
	if(!childrenList.length) return <Accordion titleClassName="tdb__accordion__head"
		//title="Add/Remove Parents"  
		//showBody={true}
		title={<GetTitle listDataProvider={nodeData.allChildren} title = {"Children List"}/>}
		tooltip="View and Add/Remove Children">
			<AddNew/>
			<label className='text-muted fst-italic small'>No Children ...</label>
	</Accordion>
		
	return <> 
		<Accordion titleClassName="tdb__accordion__head"
			title={<GetTitle listDataProvider={nodeData.allChildren} title = {"Children List"}/>}
			tooltip="View and Add/Remove Children">
				<AddNew/>
				<div className='small'>{childrenList}</div>
		</Accordion>
	</>
	
}