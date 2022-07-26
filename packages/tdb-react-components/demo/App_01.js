import React from 'react';
import ReactDOM from 'react-dom';
import testData from './testData.json';


import {TimelineCommits} from '@terminusdb/terminusdb-react-components';
//import DataProvider from './resources/content';
//import DataProvider from './resources/CommitBinding'
import TerminusClient from '@terminusdb/terminusdb-client'

export const App = (props) =>{

    FormatData(testData);

    console.log("___URL__",process.env.API_URL,process.env.API_KEY);
    /*
    * if I set user and not organization I get false in the url
    */
    const woqlClient=new TerminusClient.WOQLClient(process.env.API_URL,{user:'admin',
                                     organization:'admin',
                                     key:process.env.API_KEY,db:process.env.DB_NAME})
    return (
      <div className="tdb__dblist">
            <div className="tdb__dblist__item">    
               <div className="tdb__dblist__left">
                  <img className="tdb__dblist__image" src="https://assets.terminusdb.com/terminusdb-console/images/create-locally-1.png" title="Database ID: BANK_LAST"/>
               </div>
  
      <div className="tdb__dblist__center">
            <span className="tdb__dblist__title">BANK LAST</span>

            <div className="tdb__dblist__elements">
              <span className="tdb__dblist__credit">
                 <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className="tdb__dblist__info_icon_spacing" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path>
                 </svg>
                 <span className="tdb__dblist__info">ID</span>
                 <span className="tdb__dblist__info tdb__dblist__info--blue"> BANK_LAST</span>
              </span>

              <span className="tdb__dblist__credit" title="2 branches">
                 <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className="tdb__dblist__info_icon_spacing" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M740 161c-61.8 0-112 50.2-112 112 0 50.1 33.1 92.6 78.5 106.9v95.9L320 602.4V318.1c44.2-15 76-56.9 76-106.1 0-61.8-50.2-112-112-112s-112 50.2-112 112c0 49.2 31.8 91 76 106.1V706c-44.2 15-76 56.9-76 106.1 0 61.8 50.2 112 112 112s112-50.2 112-112c0-49.2-31.8-91-76-106.1v-27.8l423.5-138.7a50.52 50.52 0 0 0 34.9-48.2V378.2c42.9-15.8 73.6-57 73.6-105.2 0-61.8-50.2-112-112-112zm-504 51a48.01 48.01 0 0 1 96 0 48.01 48.01 0 0 1-96 0zm96 600a48.01 48.01 0 0 1-96 0 48.01 48.01 0 0 1 96 0zm408-491a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path>
                 </svg>
                 <span className="tdb__dblist__info">2</span>
              </span>

              <span className="tdb__dblist__credit" title="First Commit 10.44, Sep 4 2020 ">
                 <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className="tdb__dblist__info_icon_spacing" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M816 768h-24V428c0-141.1-104.3-257.7-240-277.1V112c0-22.1-17.9-40-40-40s-40 17.9-40 40v38.9c-135.7 19.4-240 136-240 277.1v340h-24c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h216c0 61.8 50.2 112 112 112s112-50.2 112-112h216c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM512 888c-26.5 0-48-21.5-48-48h96c0 26.5-21.5 48-48 48zM304 768V428c0-55.6 21.6-107.8 60.9-147.1S456.4 220 512 220c55.6 0 107.8 21.6 147.1 60.9S720 372.4 720 428v340H304z"></path>
                 </svg>
                 <span className="tdb__dblist__info">3 days ago</span>
              </span>
            </div>

            <div className="tdb__dblist__elements">
              <span className="tdb__dblist__credit" title="Most Recent Commit 10.52, Sep 4 2020  by francesca@datachemist.com">
                 <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className="tdb__dblist__info_icon_spacing" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z"></path>
                 </svg>
                 <span className="tdb__dblist__info">3 days ago by francesca@datachemist.com</span>
              </span>
            </div>

        <div className="tdb__dblist__description">test</div>
     
   </div>

   <div className="tdb__dblist__action">
         <span className="tdb__dblist__action__icon">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className="hub-main-action-icon share-main-action-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
               <title>Save this database to your hub account</title>
               <path d="M518.3 459a8 8 0 0 0-12.6 0l-112 141.7a7.98 7.98 0 0 0 6.3 12.9h73.9V856c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V613.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 459z"></path>
               <path d="M811.4 366.7C765.6 245.9 648.9 160 512.2 160S258.8 245.8 213 366.6C127.3 389.1 64 467.2 64 560c0 110.5 89.5 200 199.9 200H304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8h-40.1c-33.7 0-65.4-13.4-89-37.7-23.5-24.2-36-56.8-34.9-90.6.9-26.4 9.9-51.2 26.2-72.1 16.7-21.3 40.1-36.8 66.1-43.7l37.9-9.9 13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4a245.6 245.6 0 0 1 52.4-49.9c41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9 15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5 37.8 10C846.1 454.5 884 503.8 884 560c0 33.1-12.9 64.3-36.3 87.7a123.07 123.07 0 0 1-87.6 36.3H720c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h40.1C870.5 760 960 670.5 960 560c0-92.7-63.1-170.7-148.6-193.3z"></path>
            </svg>
         </span>
   </div> 
   </div>
   </div>        
    )
}

/*
 <div classNameName="history__nav">
              <TimelineCommits  woqlClient={woqlClient}/>
            </div>*/

export default App;
                   