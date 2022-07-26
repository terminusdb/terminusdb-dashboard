import React from "react"
import ReactDOM from "react-dom"
import {App} from "./App"
import {WOQLClientProvider} from './init-woql-client'
import {localSettings} from "../localSettings"
import {auth0_conf} from '../auth_config'
import {Auth0Provider} from "./react-auth0-spa"
import {BrowserRouter,} from "react-router-dom"
require('./App.css')

function NavigationComponent(){
      let redirect_uri=`${window.location.origin}/`

      //const { dataProduct, organization} = useParams();

      const onRedirectCallback = appState => {
       /* history.replace(
            appState && appState.targetUrl
              ? appState.targetUrl
              : '/'
          );*/
        };

    if(localSettings & localSettings.connection_type!== "LOCAL"){
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

    return  <WOQLClientProvider params={localSettings}>
              <App />
            </WOQLClientProvider>
}
 
const basename = process.env.BASE_URL ? {basename:process.env.BASE_URL} : {}

ReactDOM.render( <BrowserRouter {...basename}>
                     <NavigationComponent/>
                  </BrowserRouter>
    , document.getElementById('root'));
