import React, { Component, useState,useRef } from 'react';
import {TDBReactLayout} from '@terminusdb-live/tdb-react-layout';
import {TDBReactNav} from '@terminusdb-live/tdb-react-layout';
import "./App.css"

const App= (props) =>{

    // display - Card/ List
    let configCard = {
        display: "Card",
        size: 2,
        cards: [{id: "Stars", title:"Stars" , icon: "fa-star"},
            {id: "Commits",  title:"Commits" , icon: "fa-wave-square"},
            {id: "Forks",  title:"Forks" , icon: "fa-share-alt"},
            {id: "PullRequests",  title:"Pull Requests" , icon: "fa-code-branch"},
            {id: "Issues",  title:"Issues" , icon: "fa-exclamation-triangle"}]
    }
 
    let configCardList = {
        display: "List",
        size: 2,
        cards: [{id: "Stars", title:"Stars" , icon:"fa-star"},
            {id: "Commits",  title:"Commits" , icon: "fa-wave-square"},
            {id: "Forks",  title:"Forks" , icon: "fa-share-alt"},
            {id: "PullRequests",  title:"Pull Requests" , icon: "fa-code-branch"},
            {id: "Issues",  title:"Issues" , icon: "fa-exclamation-triangle"}]
    }

    let repoConfig = {
        display: "Vertical",
        navLinks:[{id: "terminusdb:///data/Repository_327894826", icon: 'fa-window-maximize', size: "sm"},
            {id: "terminusdb:///data/Repository_262082824", icon: 'fa-window-maximize', size: "sm"},
            {id: "terminusdb:///data/Repository_329969626", icon: 'fa-window-maximize', size: "sm"},
            {id: "terminusdb:///data/Repository_204949228", icon: 'fa-window-maximize', size: "sm"},
            {id: "terminusdb:///data/Repository_208302966", icon: 'fa-window-maximize', size: "sm"},
            {id: "terminusdb:///data/Repository_198466472", icon: 'fa-window-maximize', size: "sm"}
        ]
    }

    return <React.Fragment>
        <TDBReactLayout onLoad="https://hub-dev.dcm.ist/api/workers/admin/tkrvdo1617178357567" 
            config={configCard}/>
        <TDBReactLayout onLoad="https://hub-dev.dcm.ist/api/workers/admin/tkrvdo1617178357567" 
            config={configCardList}/>
        
        <div class="container-fluid ">
            <div class="row">
                <nav class="col-md-2 d-none d-md-block bg-custom-blue sidebar">
                    <div class="sidebar-sticky p-4">
                        <div class="nav-item mb-3">
                        <a href="/" class="nav-link">
                            <span>
                                <img src="https://terminusdb.com/img/logos/logo.svg" class="logo_img"/>
                            </span>
                        </a>
                        </div>
                        <div class="flex-column mt-3" id="component___0">
                                    <TDBReactNav onLoad="https://hub-dev.dcm.ist/api/workers/admin/6dd5z1617187654409" 
                        config={repoConfig}/> 
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        {/*<TDBReactNav onLoad="https://hub-dev.dcm.ist/api/workers/admin/6dd5z1617187654409" 
            config={repoConfig}/>*/}
    </React.Fragment>
    
}


//startData={props.start}  

export default App; 
