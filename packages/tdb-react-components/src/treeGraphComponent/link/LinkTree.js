import React from 'react';
import { linkVertical as d3LinkVertical } from 'd3';

export const LinkTree = (props)=>  {

   const getPath=()=>{
		return d3LinkVertical()
	    .x(function(d) { return d.x; })
	    .y(function(d) { return d.y; });
	}	

	//render(){

	const strokeWidth=props.isSelected===true ?  4 : 3;
	const stroke=props.isSelected===true ? '#696969' : "#dddddd";
	const link = props.link;

	const pathData={source:[link.source.x,link.source.y],
		            target:[link.target.x,link.target.y]};

	const path = getPath();
		
	return (
		    <path
	       		d={path(link)}
			    stroke={stroke}
			    strokeWidth={strokeWidth}
			    strokeOpacity={1}
			    //markerEnd= 'url(#markerSquare)'
			    fill="none"
		    >
		    </path>
	)
}


