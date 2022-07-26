import React, {useState,useEffect} from 'react';

import {WOQLGraph} from '@terminusdb/terminusdb-react-components';
import TerminusClient from '@terminusdb/terminusdb-client'
import person from './person-graph.json';
import bike from './bike-journey.json';
import seshat from './seshat-data.json';
/*
*
*/
export const GraphApp= (props) =>{

  const [reload,setReload] = useState(false)
  const [myviewer, setConfig] = useState(undefined);
  const WOQL = TerminusClient.WOQL;

  let resultData={};


	const server=process.env.API_URL;
  const key=process.env.API_KEY
  const db=process.env.API_DB

  console.log("server",server,'db',db)

  const woqlGraphConfig= TerminusClient.View.graph();
  woqlGraphConfig.height(700).width(1500)
  woqlGraphConfig.literals(false);

  if(window.location.search.endsWith('bike')){
      resultData=bike;
      /*
      WOQL.select("v:Start", "v:Start_Label", "v:End", "v:End_Label", "v:Duration").limit(1).and(
	WOQL.triple("v:Journey", "type", "scm:Journey"),
	WOQL.triple("v:Journey", "start_station", "v:Start"),
	WOQL.opt().triple("v:Start", "label", "v:Start_Label"),
	WOQL.triple("v:Journey", "end_station", "v:End"),
	WOQL.opt().triple("v:End", "label", "v:End_Label"),
	WOQL.triple("v:Journey", "journey_bicycle", "v:Bike"),
	WOQL.triple("v:Journey", "duration", "v:Duration")
)
      */
      //

      //woqlGraphConfig.edges(["v:Start", "v:Duration"], ["v:Duration", "v:End"]).text("v:Duration")
      woqlGraphConfig.node("Start").text("Start_Label").icon({label: true, color:[0,0,0]}).color([35, 132, 113]).size(30)

      woqlGraphConfig.node("End").text("End_Label").icon({label: true, color:[0,0,0]}).color([243, 183, 115]).size(30)



  }else if(window.location.search.endsWith('seshat')){

      resultData=seshat;

      woqlGraphConfig.edges(["v:Predecessor", "v:Polity"], ["v:Polity", "v:Successor"])
      woqlGraphConfig.node("v:Predecessor").text("v:Plab").icon({label: true, color:[0,0,0]})
      woqlGraphConfig.node("v:Successor").text("v:Slab").icon({label: true, color:[0,0,0]}).color([148, 103, 189])

      woqlGraphConfig.node("v:Polity").text("v:Lab").icon({label: true, color:[0,0,0]}).size(20).color([188, 189, 34])
      woqlGraphConfig.node("v:Polity", "v:Presence").in("terminusdb:///schema#absent").color([23, 190, 207])
      woqlGraphConfig.node("v:Polity", "v:Presence").in("terminusdb:///schema#present").color([31, 119, 180])
      //woqlGraphConfig.node("v:Polity", "v:Presence").in("scm:unknown").color([102, 255, 255])

  }else{
      resultData=person;
      woqlGraphConfig.node("Mother").text("Mother_Name").color([60, 219, 11])//.size(10)

      woqlGraphConfig.node("Mother","Mother_Name").in("motherOfMaria01").color([255, 0, 255])//.size(10)

      woqlGraphConfig.node("Person").text("Name").color([255, 219, 11]).size(30)

  }

   let result;



  // woqlGraphConfig.node("Person").in("terminusdb:///data/Person_Maria01_25/05/2011").color([255, 0, 255])

   //woqlGraphConfig.node("Name").hidden(true)
   //woqlGraphConfig.node("Mother_Name").hidden(true)




   //woqlGraphConfig.edges(["Person","Mother"]).color([255, 44, 11])


  /* view.edges(["v:Predecessor", "v:Polity"], ["v:Polity", "v:Successor"])
  view.node("v:Predecessor").text("v:Plab").icon({label: true})
  view.node("v:Successor").text("v:Slab").icon({label: true})
  view.node("v:Polity").text("v:Lab").icon({label: true})
  view.node("v:Polity", "v:Presence").in("scm:absent").color([255,0,0])
  view.node("v:Polity", "v:Presence").in("scm:present").color([0,255,0])
  view.node("v:Polity", "v:Presence").in("scm:unknown").color([150,150,150])*/

   useEffect(() => {

      result = new TerminusClient.WOQLResult(resultData);

      let viewer = woqlGraphConfig.create(null);

      viewer.setResult(result.bindings);
      setConfig(viewer)
         /*}).catch((err)=>{
            console.log(err)
         //})

      }).catch((err)=>{
         console.log(err)
      })*/
   },[reload])


  if(myviewer)console.log("____CONFIG____", myviewer.config);

	return (<div style={{border:'1px solid'}}>
				GRAPH COMPONENT {reload}
				{myviewer && <WOQLGraph
                    config={myviewer.config}
                    dataProvider={myviewer}/>}

			</div>)

}
