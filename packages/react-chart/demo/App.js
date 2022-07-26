import React, { Component, useState,useRef } from 'react';
import {ChartComponent} from '@terminusdb/terminusdb-react-chart';
import TerminusClient from '@terminusdb/terminusdb-client';
import moment from 'moment';
import {resultData} from './resultTest'
import  {ResponsiveContainer, Rectangle,Surface,BarChart,
        Symbols,ComposedChart, Line, Area, XAxis, YAxis,
        CartesianGrid, Tooltip, Legend, Bar} from  "recharts";

const App= (props) =>{
	const woqlChart= TerminusClient.View.chart();
  woqlChart.title("My chart test").margin({top: 10, right: 20, left: 40, bottom:80}) 
  const LABEL_DATE_OUTPUT="YYYY-MM-DD ddd"

  //STOCK_REAL
  //woqlChart.bar('Sum').label("Product for Demand").stroke("#15CA58").fill('#15CA58').barSize(20)
  
 /*

#011f4b;
#03396c;
#00705C;
#59822C;
#7EBC39
#30B152
#7D5398
#C4438C
1days #F63D5E
0days#FF6600; //#F3A7A9
*/
  const stackValues={'0Days':'#FF6600',
                   '1Days':'#F63D5E',
                   '2Days':'#C4438C',
                   '3Days':'#7D5398',
                   '4Days':'#30B152',
                   '5Days':'#7EBC39',
                   '6Days':'#59822C',
                   '7Days':'#00705C',
                   'greater7Days':"#0076BE",
                   'greater30Days':"#011f4b",
                   'afterOrder':"red"}


  Object.keys(stackValues).forEach((item)=>{
    woqlChart.bar(item).label(`${item}Tool`).stackId("productDemand").stroke(stackValues[item]).fill(stackValues[item]).barSize(20)
    
  })
  

  //STOCK_QUANTITY
  woqlChart.line('Quantity').label("Stock Quantity").stroke("#FF9800").dot(true)
  
  woqlChart.xAxis('Date').labelRotate(-40).label("Date").labelDateOutput(LABEL_DATE_OUTPUT).padding({ left: 20, right: 20 })
  woqlChart.yAxis().label("CASES").type("number").axisDomain(['dataMin', 'dataMax  + 10'])
  
	const config=woqlChart.json()


  return (<>
    <div style={{height:"20px",width:"50px",backgroud:"red"}}>snn</div>
    <div style={{height:"20px",width:"50px",backgroud:"red"}}>ss</div>
    <div style={{height:"20px",width:"50px",backgroud:"red"}}>ss</div>
    <div style={{height:"20px",width:"50px",backgroud:"red"}}>s</div>
    <div style={{height:"20px",width:"50px",backgroud:"red"}}>s</div>
    <div style={{height:"20px",width:"50px",backgroud:"red"}}>s</div>
    <div style={{height:"20px",width:"50px",backgroud:"red"}}>s</div>
    <div style={{height:"20px",width:"50px",backgroud:"red"}}>s</div>
    <div style={{height:"20px",width:"50px",backgroud:"red"}}>s</div>
    <div style={{height:"20px",width:"50px",backgroud:"red"}}>s</div>


    <ChartComponent config={config} dataProvider={resultData.dataProvider} /></>
  )


}

export default App;