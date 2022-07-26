import React,{useState} from 'react';
import  {Surface, Symbols} from  "recharts";

const CustomLegendElement = (props) => {
	const chartRules = props.chartRules || []
	const legendDataProvider =  chartRules.find(element => element.pattern && element.pattern.scope === 'Legend')		
	const rule = legendDataProvider.rule
	if(rule.type==="default") return ''
	const payload= rule.payload ? rule.payload : []
	const layout = rule.layout || "horizontal"
	const align = rule.align || "center" 
	const visibilityObj = props.visibilityObj || {}
	
	const onClick = (evt)=>{
		//console.log("commit name",evt.target.name)
		props.onClick(evt.currentTarget.id)	
	}

	return (<div className="recharts-default-legend">
        	{payload.map((entry,index) => {
				const color =  entry.color ;
				const opacity = visibilityObj[entry.id] === false ? 0.4 : 1
          		return <span key={`index_${index}`} onClick={onClick} className="recharts-legend-item legend-item-0 mr-4 cursor-pointer" id={entry.id} >
			            <Surface width={20} height={20} >
			               <Symbols cx={10} cy={10} type="circle" size={120} fill={color} opacity={opacity} />
			            </Surface>
			            <span>{entry.value}</span>
				</span>
				})}
			</div>
	)
}

export default CustomLegendElement;
