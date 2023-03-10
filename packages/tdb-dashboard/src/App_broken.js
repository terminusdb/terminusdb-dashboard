import React from "react" 
import {Routes,Route,useNavigate, BrowserRouter} from "react-router-dom"
import {Loading} from "./components/Loading"
import {SERVER_LOADING_MESSAGE} from "./components/constants"
import {PlansPage} from "./pages/PlansPage"
import PrivateRoute from "./routing/PrivateRoute"
import {WOQLClientObj} from './init-woql-client'
import {ServerError} from './components/ServerError'
import {InvitePage} from './pages/InvitePage'
import {localSettings} from "../localSettings"
import * as PATH from "./routing/constants"

import {Home} from "./pages/Home"
import {PageNotFound} from "./pages/PageNotFound"
import {PLANS} from "./routing/constants";
import  TestApp  from "./TestApp"

import {OrganizationHome } from "./pages/OrganizationHome"
import {Profile} from "./pages/Profile"
import { DocumentControlMain } from "./pages/DocumentControlMain"
import {DataProductsHome} from "./pages/DataProductsHome"
import { ProductsExplorer } from "./pages/ProductsExplorer"
import { ModelProductPage } from "./pages/ModelProductPage"

export function App (props){
    let navigate = useNavigate();
    const {connectionError,loadingServer,clientUser,accessControlDashboard,woqlClient} = WOQLClientObj()
    if(!clientUser) return ""
    // we have this loading only in terminusX, it is auth0 information/login loading
    const {loading} = clientUser

    if (clientUser.firstLogin === true && window.location.pathname.indexOf("/invite/") === -1) {
        clientUser.firstLogin = false
        //only if the user is not invited in a team
        window.location.replace(`/${PLANS}`) 

    }

    // this happen after confirm you password linking in the email url
    if (window.location.search.includes("supportSignUp=true")) {
        window.location.replace('/') 
    }
      
    if(connectionError) {
        return <ServerError message={connectionError}/>
    }

    if(loading || loadingServer) {
        return <main role="main" className="loading-parent content mr-3 ml-5">
            <Loading message={SERVER_LOADING_MESSAGE}/>
        </main>
    }
    //the accessControlDashboard in terminusX is created only after the login 
    // so he can be undefined at the start
    const isAdmin = accessControlDashboard ? accessControlDashboard.isAdmin() : false

    const basename = process.env.BASE_URL ? {basename:process.env.BASE_URL} : {}

    return <div className="container-fluid container-background h-100">      
                <Routes>
                {getRoutes(clientUser,isAdmin, woqlClient)}          
                </Routes>    
            </div>
}

function getRoutes(clientUser, isAdmin, woqlClient){
    //const client = createApolloClient()

    if(localSettings.connection_type==="LOCAL"){ 
    return <React.Fragment>
        <Route index element={<Home/>} />
        </React.Fragment>
    }
    return <React.Fragment>
        {/*<Route path="/verify" element={<VerifyEmail/>}/>*/}
        <Route path="/verify" element={<TestApp/>} />
        <Route path = {PATH.INVITE_PAGE} element = {<PrivateRoute component={InvitePage}/>} />                     
        <Route path={PATH.PLANS} element={<PrivateRoute component={PlansPage}/>}/>
        <Route path="*" element={<PageNotFound/>} />
        <Route index element={<PrivateRoute component={Home}/>} />
        <Route path=":organization" >
            <Route index element={<PrivateRoute component={OrganizationHome}></PrivateRoute>}/>
            <Route path = {PATH.PROFILE} element = {<PrivateRoute component={Profile}/>} />  

            <Route path=":dataProduct" element={<DocumentControlMain/>} >
                <Route index element={<PrivateRoute component={DataProductsHome}/>} />
                <Route path={PATH.PRODUCT_MODELS} element={<PrivateRoute component={ModelProductPage}/>} />     
                
            </Route>
      </Route>
    </React.Fragment>
}
