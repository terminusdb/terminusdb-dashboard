import React, { useState } from 'react'
import {PROPERTY_TYPE_NAME,PROPERTY_TYPE_LABEL} from '../utils/elementsName'
import {GraphContextObj} from '../hook/graphObjectContext'
import {RelationshipView} from '../relationshipView/RelationshipView'
//import { RelationshipLinkView } from "../relationshipView/RelationshipLinkView"

 
const constraintMessage={childrenNum:'This node has',
						inRelationship:'This node is in this Relationship',
						relComplexProperty:'This node is a range of the ComplexProperty'}

export const ConstraintsComponent =(props)=>{
    const [checked,setChecked] = useState({checked:false})

    const {selectedNodeObject,graphDataProvider} = GraphContextObj();

    const nodeData = selectedNodeObject ? selectedNodeObject : {}
    
    const change=(evt)=>{
       setChecked({checked:evt.target.checked});
    }
    //const elementLabel={} 
 
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

    if(props.view === `UI_VIEW`) {
        let childrenList = []
        nodeData.allChildren.map((child) => {
            childrenList.push(child.id)
        })
        if(!childrenList.length) return <label className='text-muted fst-italic small'>No Children ...</label>
        return <>{childrenList}</>
    }

    /*return <div className="tdb__panel__box">    
        <RelationshipLinkView
        />  
        {message}
    </div>*/

	return(<>
            <div className="tdb__panel__box">  
         
            {message}  
                <RelationshipView/>  
                
            </div>
        </>
	)
}