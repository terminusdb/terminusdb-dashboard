import React,{useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import {SchemaBuilder,modelCallServerHook,GraphObjectProvider} from '@terminusdb/terminusdb-react-components';
import bike from './bike.json';
import bikeprops from './bike-property.json';
import seshat from './testData.json';
import seshat_sub from './seshat_sub.json';
import seshat_props from './seshat_props.json';
import { SizeMe } from 'react-sizeme' 

//import {TimelineCommits} from '@terminusdb/terminusdb-react-components';
//import DataProvider from './resources/content';
//import DataProvider from './resources/CommitBinding'
import TerminusClient from '@terminusdb/terminusdb-client'



export const App = (props) =>{
    const dbName='bikes'
   
   /*if(window.location.search.endsWith('bike')){

        testData=bike;
        testDataProp=bikeprops;
    }else if(window.location.search.endsWith('seshat_sub')){
        testData=seshat_sub;
    }*/

   const woqlClient=new TerminusClient.WOQLClient(process.env.API_URL,{user:'admin',
                                     organization:'admin',
                                     key:process.env.API_KEY,db:dbName})
  

    const {mainGraphDataProvider,
          saveGraphChanges,
          callServerError,
          callServerLoading} = modelCallServerHook(woqlClient)

    const [treeMainGraphObj,setGraphObj] =useState(null)

    console.log("___URL__",process.env.API_URL,process.env.API_KEY);
    /*
    * if I set user and not organization I get false in the url
    */
    let testData=seshat
    let testDataProp=seshat_props
  

    const saveData=(query)=>{
      saveGraphChanges(query)
    }


    return (
        <div className="console__page tdb__loading__parent" style={{overflow:'hidden'}}>
            {callServerLoading && <div className="tdb__loading">loading !!!!</div>}
            {callServerError && <div > ERROR {callServerError}</div>}
            <GraphObjectProvider mainGraphDataProvider={mainGraphDataProvider}>
              <SchemaBuilder saveGraph={saveData} mainGraphDataProvider={mainGraphDataProvider}/>
            </GraphObjectProvider>
        </div>    
      )
}

/*

 <SizeMe monitorHeight={true}>{({ size }) =>
            <div style={{ minHeight:"400px", height: "calc(100vh - 10px)"}}>
              {treeMainGraphObj && <SchemaBuilder width={size.width} height={size.height} treeMainGraphObj={treeMainGraphObj}/>}
              </div>
              }
           </SizeMe>
 <div classNameName="history__nav">
              <TimelineCommits  woqlClient={woqlClient}/>
            </div>*/

export default App;
                   