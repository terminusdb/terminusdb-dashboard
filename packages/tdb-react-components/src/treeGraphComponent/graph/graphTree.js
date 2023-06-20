import React, {useState} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { tree } from 'd3-hierarchy';
import  {LinkTree} from '../link/LinkTree';
import  {LinkProperty} from '../link/LinkProperty';
import  {NodeTree} from '../node/NodeTree';
import {CLASS_TYPE_NAME} from '../utils/elementsName'
//import {ENTITIES_BUTTON, RELATIONSHIP_BUTTON,CLASSES_BUTTON} from '../../../constants/ObjectsName'

export const Tree = (props) =>{
    const links=props.links || [];
    const nodes=props.nodes || [];
    const objectPropertyToRange=props.objectPropertyToRange || {}

    const nodeIndex={};
 
    let nodesChildren=nodes.map((node,i)=>{

        let isSelected=false

        if(props.selectedNode===node.data.name)isSelected=true;

          if(node.data.type===CLASS_TYPE_NAME.SCHEMA_GROUP && node.data.children.length===0){
            return '';
          }

          if(!nodeIndex[node.data.name]){
             nodeIndex[node.data.name]=node;
             return <NodeTree setNodeAction={props.setNodeAction} nodeClick={props.nodeClick} isSelected={isSelected} id={node.data.name} node={node} nodex={node.x}  nodey={node.y} key={'node_'+i} isEditMode={props.isEditMode}/>
          }
          return '';

      })

      /*
      * CHECK MULTI PARENT
      */
      let linksChildren=[];

      for (let souceName in nodeIndex){
         const source=nodeIndex[souceName];
         const children=source.data.allChildren || source.data.children || []

         children.map((targetClass,i)=>{
             let isSelected=false;
             if(nodeIndex[targetClass.name]){
                if(targetClass.name===props.selectedNode || source.data.name===props.selectedNode){
                    isSelected=true;
                }
                let linkData={};
                linkData['target']=nodeIndex[targetClass.name];
                linkData['source']=source;
                const linkId=`${souceName}_${targetClass.name}`

                linksChildren.push(
                      <g className="vx-group" transform="translate(0, 0)" key={linkId}>
                          <LinkTree link={linkData} isSelected={isSelected}/>
                      </g>)
             }
         })
      }

    /* let linksProperty=[];
        for (let rangeName in objectPropertyToRange){
            const target=nodeIndex[rangeName];
            let linkData={};
            //linkData['source']=source;

            const linkPropArr=objectPropertyToRange[rangeName];

            linkPropArr.forEach((property)=>{
                const source=nodeIndex[property.domain];
                linksProperty.push(
                      <g className="vx-group" transform="translate(0, 0)" >
                          <LinkProperty label={property.label}  id={property.id} lineColor="#ff0000" source={source} target={target}/>
                      </g>)
            })
      }  */

    return(
      <>
        <g className="vx-group vx-tree" transform="translate(0, 60)" id="treeGraph">
          {linksChildren}
          {nodesChildren}
          {/*linksProperty*/}
        </g>
        </>
      )
}
