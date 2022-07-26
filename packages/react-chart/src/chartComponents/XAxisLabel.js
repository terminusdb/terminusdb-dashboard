import React from 'react';
import moment from 'moment';

export default class XAxisLabel extends React.Component  {
  
  render () {
    const {x, y, stroke, payload, rotate, labelDateOutput, yOffset} = this.props;

    let label=payload.value;
    let dy= yOffset!==undefined ? yOffset : 16

    if(labelDateOutput && label){
      const mom=moment(label)
      if(mom.format(labelDateOutput)!==undefined){
         label=mom.format(labelDateOutput)
      }
    }
    
    const transform = rotate ? {transform:`rotate(${rotate})`} : {};
		
   	return (
    	<g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={dy} textAnchor="end" fill="#666" {...transform} >{label}</text>
      </g>
    );
  }
}