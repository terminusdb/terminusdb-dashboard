import React,{useState} from 'react';
import {NodeMenuList} from './NodeMenuList'

export const NodeMenu=(props)=> {

    const [showMenu,setShowMenu]=useState(false)

	const showHideNodeMenu = ()=>{
		setShowMenu(!showMenu)	
	}
	
	let width=props.width;
	return(

		<g transform={`translate(${width/4},${-width/3})`}  id="node_add_children_icon" cursor={'pointer'}   onClick={showHideNodeMenu}>
	      	<rect width="20" 
	      		height="20" 
	      		fill="#ffffff" 
	      		stroke="#cccccc"		      		
	      	/>
	      	<text    
	        	fontSize={24}
	        	fontFamily="Arial"
	        	style={{ pointerEvents: "none" }}
	        	y={18}
	        	x={2}
	        	fill={"#000000"}
	      	> {showMenu ? 'x' : '+'} </text>
	      	{showMenu && <NodeMenuList {...props} />}	      	
	      </g>
	)

}