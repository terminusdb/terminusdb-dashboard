import React from 'react';
import XAxisLabel from './XAxisLabel'
import moment from 'moment'

import ChartPointLabel from './ChartPointLabel'
import  {ResponsiveContainer, Rectangle,Surface,
	     Symbols,ComposedChart, Line, Area, XAxis, YAxis, AxisLabel,
	     CartesianGrid, Tooltip, Legend, Bar,Cell} from  "recharts";

 const ChartElements= (graphConf,dataProvider,visibilityObj) =>{
 		
		const getVariable=(variables)=>{
			let value=null;
			if(variables && variables.length>0){
				value=variables[0];
			}
			return value
		}

		const getStyle=(item)=>{
			const style={"strokeWidth":2, "stroke":"#ff8000"}
			if(item.strokeWidth) style['strokeWidth']=item.strokeWidth;
			if(item.stroke) style['stroke']=item.stroke;
			if(item.fill) style['fill']=item.fill;
			if(item.fillOpacity) style['fillOpacity']=item.fillOpacity;
				//if(item.opacity) style['opacity']=item.opacity;

			return style;
		}

		const filterTicks=(dataProvider,xAxisName)=>{
	  	 	let ticks=[]; //{};
	  	 	dataProvider.forEach((data,index)=>{
	  	 		ticks.push(data[xAxisName]);

	  	 		//ticks[data[xAxisName]]=data[xAxisName];
	  	 	})

	  	 	return ticks //Object.keys(ticks)
  		}

  		const payloadFormatter = (value,name,props)=>{
  	 		return value
   		};

  		const getAxisProps=(rule,dataKey)=>{
  			const AxisProps={}
  			if(rule.type)AxisProps['type']=rule.type
			if(rule.padding)AxisProps['padding']=rule.padding;
			if(rule.type==="number" && rule.domain===undefined)AxisProps['domain']=['dataMin - 1', 'dataMax  + 1']
			if(rule.domain) AxisProps['domain']=rule.domain;
			if(dataKey) AxisProps['dataKey']=dataKey;

			if(rule.type==="category")AxisProps['ticks']=filterTicks(dataProvider,dataKey);
			return AxisProps;
		}
 

  		return graphConf.map((item,index)=>{
  			    const pattern =item.pattern || {}
  			    const rule=item.rule || {}
  				const dataKey = getVariable(pattern['variables']);

  				const chartType = pattern.scope || 'line';
				const name=  rule.label || dataKey;
				const type= rule.type || "monotone"
				const style = getStyle(rule);
				const dot  = rule.dot || false;
				const dotR = rule.dotR || 15
				const customColors=rule.customColors;
				const colorEntry=rule.colorEntry;

				const activeDot ={r : dotR}
				/*
				* Check if the chart element is visible
				*/
				if(visibilityObj[dataKey] === false){
					return '' 
				}

				switch(chartType){
					case 'Tooltip':
						// return <Tooltip key={`t__${index}`} formatter={payloadFormatter} />
					case 'YAxis':
						const labelEl = rule.label ? {label:<text id="mylabel" x="0" y="0" dx="-150" dy="20" offset="5" transform="rotate(-90)">{rule.label}</text>} : {}
						const yAxisProps=getAxisProps(rule,dataKey);
						
						return <YAxis scale="linear" key={`yA__${index}`} {...labelEl} allowDuplicatedCategory={true} {...yAxisProps}  tick={<XAxisLabel yOffset={0} rotate={rule.labelRotate} labelDateOutput={rule.labelDateOutput}/>} />
					case 'XAxis':
						const xAxisProps=getAxisProps(rule,dataKey);		
						return <XAxis key={`xA__${index}`} {...xAxisProps}  tick={<XAxisLabel rotate={rule.labelRotate} labelDateOutput={rule.labelDateOutput}/>}
						
						/>
					
					/*
					* multi color for the some property given an entryValue
					*/
					case 'Bar':
						const stackId= rule.stackId ? {stackId:rule.stackId} : {}
 						const barSize = rule.barSize || 2;//barSize={barSize}
						return dataKey &&  <Bar {...stackId} key={`bar__${index}`} name={name} dataKey={dataKey}  {...style}  barSize={barSize} >					
												{customColors && colorEntry && dataProvider.map((entry, index) => {
												  const entryValue=entry[colorEntry];
												  const currentColor=customColors[entryValue] ? customColors[entryValue] : '#ffff00' 
										           return<Cell stroke={currentColor} fill={currentColor}/>
										        })}
										   </Bar>
					case 'Legend':
						//this has an absolute position
						if(rule.type !=='default')return
						const payload= rule.payload ? {payload:rule.payload} : {}
						const layout = rule.layout || "horizontal"
						const align = rule.align || "center" 
						return <Legend align={align} layout={layout} key={`leg__${index}`} verticalAlign="top" {...payload} height={50} />
					case 'Area':
						return dataKey && <Area key={`area__${index}`} name={name} type={type} dataKey={dataKey} {...style} />
					case 'Point':
						return dataKey && <Line key={`line__${index}`} name={name} type={type} dataKey={dataKey}  stroke="none" dot={{...style}} activeDot={activeDot}/>
					case 'Line':
						const labelObj = rule.showLabel === false ? {} : {label:<ChartPointLabel/>}
					default:
						return dataKey && <Line  key={`line__${index}`} {...labelObj} type="basisClosed" name={name} type={type} dataKey={dataKey} {...style} dot={dot}/>
				}
	    })
 }
 export default ChartElements;