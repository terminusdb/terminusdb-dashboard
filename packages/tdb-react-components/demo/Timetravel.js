import React from 'react';
import ReactDOM from 'react-dom';
import {TimelineCommits} from '@terminusdb/terminusdb-react-components';
//import DataProvider from './resources/content';
//import DataProvider from './resources/CommitBinding'
import TerminusClient from '@terminusdb/terminusdb-client'

export const App = (props) =>{

   
    console.log("___URL__",process.env.API_URL,process.env.API_KEY);
    /*
    * if I set user and not organization I get false in the url
    */
    const woqlClient=new TerminusClient.WOQLClient(process.env.API_URL,{user:'admin',
                                     organization:'admin',
                                     key:process.env.API_KEY,db:process.env.DB_NAME})
    return (
            <div classNameName="history__nav">
              <TimelineCommits  woqlClient={woqlClient}/>
            </div>     
    )
}

export default App;
                   