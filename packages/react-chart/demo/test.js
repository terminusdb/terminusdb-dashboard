import React, { Component, useState,useRef } from 'react';
//import {ChartComponent} from '@terminusdb/terminus-react-chart';
import TerminusClient from '@terminusdb/terminus-client';
import moment from 'moment';
import { CSVLink,CSVDownload } from "react-csv";
import { buildURI, toCSV } from './core';


import  {ResponsiveContainer, Rectangle,Surface,BarChart,
        Symbols,ComposedChart, Line, Area, XAxis, YAxis,
        CartesianGrid, Tooltip, Legend, Bar} from  "recharts";

const App= (props) =>{

  const [csvData,setcsvData] =useState([])
  const [update,setUp]=useState(0)
  const [sendToServer,setCallServer]=useState(false)

  const [href,setHref]=useState("#")

  const download = useRef(null);

  
  const dbClient=new TerminusClient.WOQLClient()
  dbClient.connect("http://195.201.12.87:6365/","cargo derek considerable recycling").then(function(response){
    dbClient.connectionConfig.setDB("rational_warehouse");
      })

  const WOQL=TerminusClient.WOQL;
  const query=WOQL.and(
                  WOQL.triple("v:Subject","type","scm:Promotion"),
                  WOQL.triple("v:Subject","scm:promotion_product","v:Product"),
                  WOQL.opt().triple("v:Subject","scm:promotion_type","v:Type"),
                  WOQL.opt().triple("v:Subject","scm:promotion_start","v:Start"),
                  WOQL.opt().triple("v:Subject","scm:promotion_end","v:End"),
                  WOQL.opt().triple("v:Subject","scm:promotion_ct_mtier","v:ct_mtier"),
                  WOQL.opt().triple("v:Subject","scm:promotion_sv_mtier","v:sv_mtier")
              )

	const woqlChart= TerminusClient.View.chart()

  /* woqlChart.layout("vertical");

	woqlChart.title("MY NEW CHART").margin({top: 10, right: 20, left: 40, bottom:200})

   woqlChart.bar('v:End').label("Start Promotion").stroke("#FF9866").fill("#FF9866")
	

	woqlChart.xAxis().type("number").labelRotate(-50).label("Centra Promotion").padding({ left: 20, right: 0 })
  woqlChart.yAxis('v:ct_mtier')
  woqlChart.bar('v:CICCIO').label(" Promotion").fill("#FF9866")//.barSize(10)
   

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
    "v:CICCIO" :[moment("2020-02-01T00:00:00").unix(),moment("2020-02-08T00:00:00").unix()],
    "v:End": moment("2020-02-08T00:00:00").unix(),
    "v:Start": moment("2020-01-19T00:00:00").unix(),
    "v:Subject": "doc:Promotion_0be4141e0f40174fd30dc24fe06b3580",
    "v:Type": "Price Reduction",
    "v:ct_mtier": "Bronze",
    "v:sv_mtier": "Silver"
  },
  {
    "v:CICCIO" :[moment("2020-03-01T00:00:00").unix(),moment("2020-03-08T00:00:00").unix()],

    "v:End": moment("2020-03-21T00:00:00").unix(),
    "v:Start": moment("2020-03-01T00:00:00").unix(),
    "v:Subject": "doc:Promotion_555d9ab3de9832c9f79174259e883e74",
    "v:Type": "Price Reduction", 
    "v:ct_mtier": "Golden", 
    "v:sv_mtier": "Bronze"
  }
]

	


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

let data=  [
  { details: { firstName: 'Ahmed', lastName: 'Tomi' }, job: 'manager'},
  { details: { firstName: 'John', lastName: 'Jones' }, job: 'developer'},
];

//header('Content-Type: application/pdf');
//header('Content-disposition: filename="July Report.pdf"')
  const headers=['Content-disposition: filename="test.csv"', 'Content-Type: application/csv']
//headers={headers}

    //const {data, headers, separator, uFEFF, enclosingCharacter} = this.props;
    //this.setState({ href: this.buildURI(data, uFEFF, headers, separator, enclosingCharacter) });

  const buildURIMy=(data)=> {
    return buildURI(data);
  }

  const callServer =(event)=>{
        if(sendToServer===false){
          event.preventDefault();


          query.execute(dbClient).then((results)=>{
                  let qcres = new TerminusClient.WOQLResult(results, query);
                  let resultData = []
                  //if(qcres.hasBindings()){
                                         //const columnData = //getBindingData(data);
                    const cc= [
                                  { details: { firstName: 'Ahmed', lastName: 'Tomi' }, job: 'KITYYYYYY'},
                                  { details: { firstName: 'John', lastName: 'Jones' }, job: 'developer'},
                                ]//columnData;

                  setUp(Date.now())

                  setHref(buildURIMy(cc));

                  setCallServer(true)
                  download.current.click();

                                         console.log('csvData inside ftn', csvData)
                                         //done(false);
                                     
                                     console.log('csvData', csvData)
                                 }).catch((err)=>{
                                        //setLoading(false);
                                        console.log(err)
                                        setCallServer(false)
                                 })

           /*function test(){
                                        alert('helpppppp!!!!!!!!!!!!!!!')
                                  setcsvData( [
                                                  { details: { firstName: 'WWWWWW', lastName: 'Tomi' }, job: 'WWWWW'},
                                                  { details: { firstName: 'John', lastName: 'Jones' }, job: 'developer'},
                                                ])//columnData;
                    setUp(Date.now())


                    // const {data, headers, separator, uFEFF, enclosingCharacter} = this.props;
                    const tt=[
                                                  { details: { firstName: 'Ahmed', lastName: 'Tomi' }, job: 'WWWW'},
                                                  { details: { firstName: 'John', lastName: 'Jones' }, job: 'developer'},
                                                ]

                     setHref(buildURIMy(tt));

                      setCallServer(true)
                      download.current.click();


        }*/


       // setTimeout(function(){alert("llll"); test()},5000)
          

        }

        setCallServer(false)
  }
//var str = "Name, Price\nApple, 2\nOrange, 3";
//var uri = 'data:text/csv;charset=utf-8,' + str;
//<a  href={uri} download={"test.csv"} onClick={callServer} >PLEASE WORK</a>
// <CSVDownload data={data} target="_blank"  >test</CSVDownload>
//asyncOnClick={true}
  return (
    
    <div>

   <a  href={href} download={"test.csv"} id="myTEST" ref={download} onClick={callServer} >PLEASE WORK</a>
     
 </div>


  )


}
/*

                               //const woqlQuery=WOQL;//queryList.getQuery(props.queryName, params); // get Query and execute
                                               /* setcsvData( [
                { details: { firstName: 'Ahmed', lastName: 'Tomi' }, job: 'manager'},
                { details: { firstName: 'John', lastName: 'Jones' }, job: 'developer'},
              ])//columnData;
                    setUp(Date.now())*/
                            // done();
                                /*function test(){
alert('helpppppp!!!!!!!!!!!!!!!')
                                  setcsvData( [
                { details: { firstName: 'Ahmed', lastName: 'Tomi' }, job: 'manager'},
                { details: { firstName: 'John', lastName: 'Jones' }, job: 'developer'},
              ])//columnData;
                    setUp(Date.now())
                    done()

                                }

                    setTimeout(function(){alert("llll"); test()},5000)*/

                                         //console.log('csvData inside ftn', csvData)
                                
                                /* query.execute(dbClient).then((results)=>{
                                     let qcres = new TerminusClient.WOQLResult(results, query);
                                     let resultData = []
                                     if(qcres.hasBindings()){
                                         //const columnData = //getBindingData(data);
                                         setcsvData ( [
                                }
  { details: { firstName: 'Ahmed', lastName: 'Tomi' }, job: 'manager'},
  { details: { firstName: 'John', lastName: 'Jones' }, job: 'developer'},
])//columnData;
 setUp(Date.now())

                                         console.log('csvData inside ftn', csvData)
                                         done(false);
                                     }
                                     console.log('csvData', csvData)
                                 }).catch((err)=>{
                                        //setLoading(false);
                                        console.log(err)
                                 })
 <ComposedChart layout="vertical" width={600} height={400} data={rangeData}
            margin={{top: 20, right: 20, bottom: 20, left: 20}}>
          <CartesianGrid stroke='#f5f5f5'/>
          <XAxis type="number"/>
          <YAxis dataKey="v:day" type="category"/>
          <Tooltip/>
          <Legend/>
          <Bar dataKey='v:temperature' barSize={20} fill='#413ea0'/>
          
       </ComposedChart>
<div>
            MY TEST
            <ChartComponent config={config} dataProvider={dataP}/>
            <BarChart
    width={730}
    height={250}
    data={rangeData}
    margin={{
      top: 20, right: 20, bottom: 20, left: 20,
    }}
  >
    <XAxis dataKey="day" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="temperature" fill="#8884d8" />
  </BarChart>
         </div>*/


/*
const [csvData,setcsvData] =useState([])
const [update,setUp]=useState(00)

  return (
<CSVLink data={csvData}  update={update}
                     asyncOnClick={true}
                     filename={ "csvFileName" + ".csv"}
                     onClick= {(event, done) => {
                                 const woqlQuery=WOQL;//queryList.getQuery(props.queryName, params); // get Query and execute
                                  setcsvData( [
  { details: { firstName: 'Ahmed', lastName: 'Tomi' }, job: 'manager'},
  { details: { firstName: 'John', lastName: 'Jones' }, job: 'developer'},
])//columnData;
setUp(Date.now())

                                         //console.log('csvData inside ftn', csvData)
                                         done();

                                 /*woqlQuery.execute(dbClient).then((results)=>{
                                     let qcres = new TerminusClient.WOQLResult(results, woqlQuery);
                                     let resultData = []
                                     if(qcres.hasBindings()){
                                         //const columnData = //getBindingData(data);
                                         csvData =  [
  { details: { firstName: 'Ahmed', lastName: 'Tomi' }, job: 'manager'},
  { details: { firstName: 'John', lastName: 'Jones' }, job: 'developer'},
];//columnData;
                                         console.log('csvData inside ftn', csvData)
                                         done(false);
                                     }
                                     console.log('csvData', csvData)
                                 }).catch((err)=>{
                                        setLoading(false);
                                        console.log(err)
                                 })*/
    //                          }} >Export CSV</CSVLink>
     
    //)

export default App;