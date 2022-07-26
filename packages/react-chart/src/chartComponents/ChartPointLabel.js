import React from 'react';

const ChartPointLabel = (props) => {

    const {x, y, stroke, value,type} = props;
    let valueLabel=value;
    if(Number(value)){
    	valueLabel=Number(value).toFixed(2);
    }
    
    return <text x={x} y={y} dy={-5} fill={stroke} fontSize={10} textAnchor="middle">{valueLabel}</text>;

}

export default ChartPointLabel;