import React from "react"
import ReactDOM from "react-dom"
import { App_test } from "./App_test"
import {BrowserRouter,useNavigate} from "react-router-dom"
import {App} from "./App"
import {WOQLClientProvider} from './init-woql-client'
import {localSettings} from "../localSettings"
import {auth0_conf} from '../auth_config'
import {Auth0Provider} from "./react-auth0-spa"

import {LoginModal} from "./components/LoginModal"
import { createRoot } from 'react-dom/client';

require('./App.css')
require('./Colors.css')

function NavigationComponent(){

    let navigate = useNavigate();
    const redirect_uri = window.location.origin
    

    console.log(window.location.search)

    const onRedirectCallback = (appState) => {
       navigate(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
    };

    if(localSettings && localSettings.connection_type!== "LOCAL"){
      return <Auth0Provider
              domain={auth0_conf.domain}
              client_id={auth0_conf.clientId}
              redirect_uri={redirect_uri}
              onRedirectCallback={onRedirectCallback}
              audience={auth0_conf.audience}
          >
          <WOQLClientProvider params={localSettings}>
              <App />
          </WOQLClientProvider>
          </Auth0Provider>
    }

    if(localSettings && localSettings.connection_type=== "LOCAL" && !localStorage.getItem("Terminusdb-USER")){
      return <LoginModal showModal={true} isCloseble={false}/>
    }


   

    return  <WOQLClientProvider params={localSettings}>
              <App />
            </WOQLClientProvider>
}
const basename = process.env.BASE_URL ? {basename:process.env.BASE_URL} : {}
const container = document.getElementById('root');
const root = createRoot(container); 

root.render( <BrowserRouter {...basename}>
            <NavigationComponent/>
          </BrowserRouter>);
