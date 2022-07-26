import React from "react"
import {Routes,Route,Outlet,Link} from "react-router-dom"
import {Loading} from "./components/Loading"
import {SERVER_LOADING_MESSAGE} from "./components/constants"
import {ProductsExplorer} from "./pages/ProductsExplorer"
import {DOCUMENT,INVITE_PAGE,PRODUCT_EXPLORER,PRODUCT_MODELS, DOCUMENT_EXPLORER, FEEDBACK, EXAMPLES_PRODUCTS,PROFILE, TEAM_MEMBERS} from "./routing/constants"
import {ModelProductPage} from "./pages/ModelProductPage"
import {DataProductsHome} from "./pages/DataProductsHome"
import {VerifyEmail} from "./pages/VerifyEmail"
import PrivateRoute from "./routing/PrivateRoute"
import {DocumentPage} from "./pages/DocumentPage"
import {DocumentExplorer} from "./pages/DocumentExplorer"
import {Profile} from "./pages/Profile"
import {ExampleProducts} from "./pages/ExampleProducts"
import {WOQLClientObj} from './init-woql-client'
import {ServerError} from './components/ServerError'
import {InvitePage} from './pages/InvitePage'
import {UserManagement} from "./pages/UserManagement"
import {localSettings} from "../localSettings"
import {OrganizationHome } from "./pages/OrganizationHome"
import {Home} from "./pages/Home"


export function App (props){
    const {connectionError,loadingServer,clientUser} = WOQLClientObj()
    const {loading} = clientUser



    if (window.location.search.includes("error=unauthorized")) {
       
        //history.push(`/verify`)
    }
   
    
    /*if(user && user['http://terminusdb.com/schema/system#afterSignUp'] && window.location.pathname.startsWith("/invite")){
        history.push(`/`)
    }*/

    if (window.location.search.includes("supportSignUp=true")) {
        //history.push(`/`)
    }


   /* useEffect(() => {
        const initPendo = async()=>{
            trackWithPendo(user) 
        }
        if(isAuthenticated && user){
            initPendo()
        }
    }, [user])*/


    if(connectionError) {
        return <ServerError>{connectionError}</ServerError>
    }

    if(loading || loadingServer) {
        return <main role="main" className="loading-parent content mr-3 ml-5">
            <Loading message={SERVER_LOADING_MESSAGE}/>
        </main>
    }

    return <div className="container-fluid container-background h-100">
            <Routes>
                {getRoutes()}
            </Routes>         
            </div>
}

function getRoutes(){
    if(localSettings.connection_type==="LOCAL"){
    return <React.Fragment>
        <Route index element={<Home/>} />
            <Route path=":organization" >
                <Route index element={<OrganizationHome/>}/>
                <Route path="administrator" element={<UserManagement/>}/>
                <Route path="members" element={<UserManagement/>}/>
                <Route path=":dataProduct" >
                    <Route index element={<DataProductsHome/>} />                     
                    <Route path={DOCUMENT_EXPLORER} element={<DocumentExplorer/>} />
                    <Route path={PRODUCT_EXPLORER} element={<ProductsExplorer/>} />
                    <Route path={PRODUCT_MODELS} element={<ModelProductPage/>} />                    
                </Route>
            </Route>             
            <Route path="*" element={<div>Not Found 404 !!!!</div >} />
        </React.Fragment>
    }
    return <React.Fragment>
        <Route index element={<div>HOME</div >} />
        <Route path=":organization" >
            <Route index element={<PrivateRoute component={OrganizationHome}></PrivateRoute>}/>
            <Route path="administrator" element={<UserManagement/>}/>
            <Route path="members" element={<UserManagement/>}/>
            <Route path=":dataProduct" >
                <Route index element={<DataProductsHome/>} />                     
                <Route path={DOCUMENT_EXPLORER} element={<DocumentExplorer/>} />
                <Route path={PRODUCT_EXPLORER} element={<ProductsExplorer/>} />
                <Route path={PRODUCT_MODELS} element={<ModelProductPage/>} />                    
            </Route>
        </Route>             
        <Route path="*" element={<div>Not Found 404 !!!!</div >} />
    </React.Fragment>
}
/*
<Route path="/verify" element={VerifyEmail}/>
                                                 
<PrivateRoute path='/' component = {DataProductsHome} exact/>
<PrivateRoute path={PRODUCT_EXPLORER} component = {ProductsExplorer} exact/>
<PrivateRoute path={PRODUCT_MODELS} component = {ModelProductPage} exact/>
<Route path={DOCUMENT} component = {DocumentPage} exact/>               
<PrivateRoute path={DOCUMENT_EXPLORER} component = {DocumentExplorer} exact/> 
<PrivateRoute path={EXAMPLES_PRODUCTS} component = {ExampleProducts} exact/>    
<PrivateRoute path={PROFILE} component = {Profile} exact/>  
<PrivateRoute path={TEAM_MEMBERS} component = {UserManagement} exact/>           
<Route path = {INVITE_PAGE} >
<PrivateRoute path = {INVITE_PAGE} component = {InvitePage} exact />
</Route>*/