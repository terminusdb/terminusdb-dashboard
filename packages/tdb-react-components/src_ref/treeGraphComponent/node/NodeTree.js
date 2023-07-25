import React from 'react';
import PropTypes from "prop-types";
import {NodeMenu} from './NodeMenu'
import {groupMenuList , nodeMenuList, elementsStyle} from './NodeConstants'
import {CLASS_TYPE_NAME} from '../utils/elementsName'

export const NodeTree=(props)=> {
	const onClick=(evt)=>{
		if(props.nodeClick){
			props.nodeClick(evt.currentTarget.id);
		}
	}

	const width=100;

	const getLabelWrap=(label)=>{
		if(label.length>10){
		    return label.substr(0, 9)+'....';
		}
		return label
	}

	const formatLabel=(label)=>{
		  const minLabel=label.trim().replace(/A | a | an /g,' '); 
		  let labelArr=minLabel.trim().split(" ");
		  if(labelArr.length===1)return getLabelWrap(label)
		  var distance=8;
		  var startDistance=-(distance*(labelArr.length-1));

		  let labelObj = labelArr.map((labelWord,index)=>{
		      return (
		           <tspan key={`tspan ${index}`} x={0} dy={index===0 ? startDistance : distance*2}>
		            {getLabelWrap(labelWord)}
		           </tspan>
		        )
  		})
 
 		return labelObj;
	}

	const node=props.node;
	const label = node.data.schema ? node.data.id : node.data.label;
	const comment = node.data.comment || label;

	const getNode=()=>{				
		const elemStyleType=node.data.type==='Group' ? node.data.name : node.data.type
		const elemStyle= elementsStyle[elemStyleType] || {};
		let fillColor=elemStyle.fillColor || '#1eadfb';
		let lineSize=elemStyle.lineSize || 2;
		let lineColor=elemStyle.lineColor || '#1eadfb';	

		if(node.data && node.data.schema && node.data.schema["@abstract"]){
			fillColor=elemStyle.fillColor_ab
		}

		if(props.isSelected){
  			lineSize=4;
  			lineColor='#696969';
  		}

		switch(node.data.type){
			case CLASS_TYPE_NAME.DOCUMENT_CLASS:
			    return <rect x={-width/2} y={-width/2} 
			      		 width={width} 
			      		 height={width} 
			      		 fill={fillColor} 
			      		 stroke={lineColor}
				         strokeWidth={lineSize}
				         cursor={'pointer'}
				      	 onClick={props.onClick}
				      	 rx="15">
				      	  <title>
			        	{comment}
				        </title>
				        </rect>
			case CLASS_TYPE_NAME.OBJECT_CLASS:
				return (<circle 
				          markerEnd={props.isSelected ? 'url(#nodeTreeList)' : '' }
				          r={(width/2)+3}		         
				          fill={fillColor}
				          stroke={lineColor}
				          strokeWidth={lineSize}
				          cursor={'pointer'}
				      	  onClick={props.onClick}	>	          
			             <title>
			        	{comment}
				        </title>				         
				        </circle>)
			case CLASS_TYPE_NAME.CHOICE_CLASS:
				return (<polygon 
							transform="rotate(90)"
							points="0,-60  52,-30  52,30 0,60 -52, 30 -52,-30" 
							fill={fillColor}
					        stroke={lineColor}
					        strokeWidth={lineSize}
					        cursor={'pointer'}
					        onClick={props.onClick}>
				         <title>
			        	{comment}
				        </title>				         
				        </polygon>

					  )
			default:
			   return <ellipse rx="100" ry="50" fill={fillColor}
						          stroke={lineColor}
						          strokeWidth={lineSize}
				  				  onClick={props.onClick}/>
		}
	}

	/*
	  <circle 
				          markerEnd={props.isSelected ? 'url(#nodeTreeList)' : '' }
				          r={width/2}		         
				          fill={fillColor}
				          stroke={lineColor}
				          strokeWidth={lineSize}
				          cursor={'pointer'}
				      	  onClick={props.onClick}	>	          
			             <title>
			        	{comment}
				        </title>				         
				        </circle>*/		
	const nodex=props.nodex
	const nodey=props.nodey

  	const menuData = groupMenuList[node.data.name] ? groupMenuList[node.data.name] : nodeMenuList;
			
	const isEditMode= props.isEditMode===true ? true : false;	

	return (
		    <g indexpos={props.indexPos} onClick={onClick} className={'node'} transform={`translate(${nodex},${nodey})`} name={node.data.name} id={node.data.name} >
		      {getNode()}
		      
		      <text  
		        fontSize={14}
		        fontFamily="Arial"
		        textAnchor={"middle"}
		        style={{ pointerEvents: "none" }}
		        fill={"#000000"}
		        dominantBaseline="central"
		        alignmentBaseline="central"
		      >
		       {formatLabel(label)}
		      </text>

		      {props.isEditMode!==false && props.isSelected && node.data.type!== 'ChoiceClass' && 
		      	<NodeMenu setNodeAction={props.setNodeAction} width={width} nodeId={node.data.name} menuList={menuData}/>
		      }
		    </g>
		  )
	//}
}


NodeTree.propTypes = {
    isEditMode:PropTypes.bool,
}

NodeTree.defaultProps = {
    isEditMode: true
};

