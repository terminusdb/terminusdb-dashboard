import React , {useState} from 'react';
import ChartElements from "./chartComponents/ChartElements";
import {CustomTooltip} from "./chartComponents/CustomTooltip"
import  {ResponsiveContainer, Rectangle,Surface,BarChart,
	     Symbols,ComposedChart, Line, Area, XAxis, YAxis,AxisLabel,
	     CartesianGrid, Tooltip, Legend, Bar} from  "recharts";


import { SizeMe } from 'react-sizeme';

import CustomLegendElement from './chartComponents/CustomLegendElement'
import moment from 'moment'

export const ChartComponent = (props)=>{
	const [visibilityObj,changeVisibility] = useState({})
	const chartConf=props.config || {};

	const chartRules=chartConf.rules || [];

	const chartEleConf=chartConf.chart || {};

	function setVisibility(chartID){
		const tmpStatus = {...visibilityObj}
		if(tmpStatus [chartID]===undefined)tmpStatus[chartID]= false
		else tmpStatus[chartID]= !visibilityObj[chartID]
		changeVisibility(tmpStatus)
	}
	let dataProvider = props.dataProvider || [];

	const zoomStyle = {};

	let zoomCurrentStyle = {fontSize:"18px"};

    const margin = chartEleConf.margin || {top: 10, right: 20, left: 40, bottom:100};

	const title = chartEleConf.title || ""
	const description = chartEleConf.description || ""
    const layout= chartEleConf.layout || "horizontal"

	const payload=[{color:"#ff0000",value:"MY TEST",type: "rect"}]

	return (<div style={{height:"500px"}} className="shadow-sm card border-light">
		<div className="w-100 card-header border-0 bg-white justify-content-between d-flex mt-2">
			<div>
			<h4 className="card-title">{title}</h4>
			<p className="card-category text-secondary">{description}</p>
			</div>
			<div className="d-xl-flex flex-wrap justify-content-end bg-red">
			   <CustomLegendElement chartRules={chartRules} visibilityObj={visibilityObj} onClick={setVisibility}/>
			</div>
		</div>
	  	<div className="card-body">
		   <SizeMe monitorHeight={true}>{({ size }) =>
			<div className="zoomDivContainer" >
			  <ComposedChart layout={layout} height={size.height} width={size.width}
				  data={dataProvider}
				  margin={margin}>
				 {ChartElements(chartRules,dataProvider,visibilityObj,setVisibility)}
				 <CartesianGrid strokeDasharray="1 3" vertical={false}/>
			   <Tooltip content={<CustomTooltip/>} contentStyle={{background:"#E3EBF6",borderRadius:"0.5em"}}/>
			</ComposedChart>
		  <div className="zoomDiv" style={zoomStyle} height="500px"/>
		  </div>}
	  </SizeMe>
	  </div>
	  </div>)
}
export default ChartComponent;
