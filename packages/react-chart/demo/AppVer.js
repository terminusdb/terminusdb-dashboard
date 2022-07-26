import React, { Component, useState,useRef } from 'react';
import {ChartComponent} from '@terminusdb/terminusdb-react-chart';
import TerminusClient from '@terminusdb/terminusdb-client';
import moment from 'moment';
import {resultData} from './resultTest'
import  {ResponsiveContainer, Rectangle,Surface,BarChart,
        Symbols,ComposedChart, Line, Area, XAxis, YAxis,
        CartesianGrid, Tooltip, Legend, Bar} from  "recharts";

const App= (props) =>{
	const woqlChart= TerminusClient.View.chart()

  woqlChart.layout("vertical");

	woqlChart.title("MY NEW CHART").margin({top: 10, right: 20, left: 40, bottom:200})

  
	woqlChart.xAxis().type("number").labelRotate(-50).label("Centra Promotion").labelDateOutput("YYYY-MM-DD")

 // woqlChart.tooltip();

  //.padding({ left: 20, right: 0 })



  woqlChart.yAxis('v:promotion').type('category')//.padding({ top: 20, bottom: 20 })

  dataNew=[
  {
    "v:Bronze 01": [1579392000000,1581120000000], 
    "v:Silver 02": [1581206400000,1582934400000],
    "v:Bronze 03": [1583020800000,1584748800000],
    
    "v:promotion": "Centra",
  },
  /*{
    "v:Gold Ladder 01": [1579392000000, 1581120000000],
    "v:Gold End 02": [1581206400000, 1582934400000],
    "v:Gold Ladder 03": [1583020800000,1584748800000],
    "v:promotion": "Super Value"
  }*/
]

const colArr=["#8884d8","#FF9866","#ffc658",'#0088FE',"#82ca9d", "#00C49F", "#FFBB28", "#FF8042"];

const colorObj={Bronze:"#8884d8","Gold Ladder":"#FF9866","Silver":"#ffc658","Gold End":"#82ca9d"}


  woqlChart.bar('v:promotion_time').label("Promotion").customColors(colorObj).stroke("#8884d8").barSize(10).colorEntry("v:type")
  //woqlChart.line('v:promotion_time_line').label("Start Promotion").stroke("#FF9866").fill("#FF9866")
  

//  woqlChart.bar('v:Bronze 03').label("Bronze Promotion").fill("#8884d8").stroke("#8884d8").barSize(10).stackId("01")
 // woqlChart.bar('v:Silver').label("Silver Period").fill("#ffc658").stroke("#ffc658").barSize(10).stackId("01")
 // woqlChart.bar('v:Gold End').label("Golden End Period").fill("#ffc600").stroke("#ffc658").barSize(10)//"v:Gold Ladder"

 // woqlChart.bar('v:Gold Ladder').label("Golden End Period").fill("#ff0000").stroke("#ffc658").barSize(10)
  //woqlChart.bar('v:Silver 02').label("Silver Period").fill("#82ca9d").stroke("#82ca9d").barSize(5)
   


  //const arrayColor=[]

	console.log(JSON.stringify(woqlChart.json()));



	/*
	{
   "chart":{
      "title":"MY NEW CHART"
   },
   "rules":[
      {
         "pattern":{
            "scope":"Line",
            "variables":[
               "v:Quantity"
            ]
         },
         "rule":{
            "label":"Quantity",
            "stroke":"#FF9800",
            "dot":true
         }
      },
      {
         "pattern":{
            "scope":"XAxis",
            "variables":[
               "v:Date"
            ]
         },
         "rule":{
            "labelRotate":-50
         }
      }
   ]
}*/
//Unix timestamp in seconds


const dataP=[
  {
    //"v:CICCIO" :[moment("2020-02-01T00:00:00").unix(),moment("2020-02-08T00:00:00").unix()],
    "v:End": "2020-02-08T00:00:00",
    "v:Start": "2020-01-19T00:00:00",
    "v:Subject": "doc:Promotion_0be4141e0f40174fd30dc24fe06b3580",
    "v:Type": "Price Reduction",
    "v:ct_mtier": "Bronze",
    "v:sv_mtier": "Silver"
  },
  {
    //"v:CICCIO" :[moment("2020-03-01T00:00:00").unix(),moment("2020-03-08T00:00:00").unix()],

    "v:End": "2020-03-21T00:00:00",
    "v:Start": "2020-03-01T00:00:00",
    "v:Subject": "doc:Promotion_555d9ab3de9832c9f79174259e883e74",
    "v:Type": "Price Reduction", 
    "v:ct_mtier": "Golden", 
    "v:sv_mtier": "Bronze"
  }
]
  
  //const promotionType={"Golden":"Golden","Bronze","Bronze"}


  let dataNew=[]

  const promotionType={};

  const getPromotionPeriodType=(promLabel,item)=>{

        const proml=promLabel || 'General';

        const promTypeLabel=`v:${proml.trim()}`

        promotionType[promTypeLabel]=promTypeLabel

        const startData=moment(item["v:Start"])
        const endDate=moment(item["v:End"])

        return {[promTypeLabel]:[startData.valueOf(),endDate.valueOf()]}

  }


   dataP.forEach((item,index)=>{
    
    const centraPeriod=(getPromotionPeriodType(item['v:ct_mtier'],item))
    const superPeriod=(getPromotionPeriodType(item['v:sv_mtier'],item))

    dataNew.push({
     // "v:period":[moment(item["v:Start"]).valueOf(),moment(item["v:End"]).valueOf()()],
      ...centraPeriod,
      "v:promotion":`CT ${item['v:ct_mtier']} ${index}`,
      ...item,


    })

   dataNew.push({
      //"v:period":[moment(item["v:Start"]).valueOf(),moment(item["v:End"]).valueOf()()],
      ...superPeriod,
      "v:promotion":`SV ${item['v:sv_mtier']} ${index}`,
      ...item

    })




   })

console.log(dataNew)
	


	const config=woqlChart.json()

   /* const dataP=[
				      {"v:Date": 'Page A', "v:Quantity": 4000, pv: 2400, amt: 2400},
				      {"v:Date": 'Page B', "v:Quantity": 3000, pv: 1398, amt: 2210},
				      {"v:Date": 'Page C', "v:Quantity": 2000, pv: 9800, amt: 2290},
				      {"v:Date": 'Page D', "v:Quantity": 2780, pv: 3908, amt: 2000},
				      {"v:Date": 'Page E', "v:Quantity": 1890, pv: 4800, amt: 2181},
				      {"v:Date": 'Page F', "v:Quantity": 2390, pv: 3800, amt: 2500},
				      {"v:Date": 'Page G', "v:Quantity": 3490, pv: 4300, amt: 2100}
				]*/

const rangeData = [
  { "v:day": '05-01', "v:temperature": [-1, 10] },
  { "v:day": '05-02', "v:temperature": [2, 15] },
  { "v:day": '05-03', "v:temperature": [3, 12] },
  { "v:day": '05-04', "v:temperature": [4, 12] },
  { "v:day": '05-05', "v:temperature": [12, 16] },
  { "v:day": '05-06', "v:temperature": [5, 16] },
  { "v:day": '05-07', "v:temperature": [3, 12] },
  { "v:day": '05-08', "v:temperature": [0, 8] },
  { "v:day": '05-09', "v:temperature": [-3, 5] },
];

//const colorObj={Bronze:"#ff0000","Gold Ladder":"#ffff00","Silver":"#ff00ff","Gold End":"#00ffff"}

dataNew=[
  {
    "v:promotion_time": [1579392000000,1581120000000],  
    "v:promotion": "CT Bronze 01",
    "v:type": "Bronze"
  },
  {
    "v:promotion_time": [1579392000000, 1581120000000],
    "v:promotion_time_line": [1579392000000, 1581120000000],
    "v:promotion": "SV Gold Ladder 01",
    "v:type": "Gold Ladder"
  },
  {
    "v:promotion_time": [1581206400000,1582934400000],
    "v:promotion_time_line": [1581206400000,1582934400000],
    "v:promotion": "CT Silver 02",
     "v:type": "Silver"
  },
  {
    "v:promotion_time": [1581206400000, 1582934400000],
    "v:promotion": "SV Gold End 03",
     "v:type": "Gold End"
  },
  {
    "v:promotion_time": [1583020800000,1584748800000],
    "v:promotion": "CT Bronze 03",
     "v:type": "Bronze"
  },
  {
    "v:promotion_time": [1583020800000,1584748800000],
    "v:promotion": "SV Gold Ladder 03",
     "v:type": "Gold Ladder"
  }
]

 /*dataNew=[
  {
    "v:Bronze 01": [10,20], 
    "v:Silver 02": [30,40],
    "v:Bronze 03": [40,50],
    
    "v:promotion": "Centra",
  },
 {
    "v:Gold Ladder 01": [1579392000000, 1581120000000],
    "v:Gold End 02": [1581206400000, 1582934400000],
    "v:Gold Ladder 03": [1583020800000,1584748800000],
    "v:promotion": "Super Value"
  }
]*/


  return (
    <div className="Container mt-4 ">
       <ChartComponent config={config} dataProvider={dataNew} />
    </div>
  )


}

export default App;