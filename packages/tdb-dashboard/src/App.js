import React from "react"
import {Routes,Route,useNavigate} from "react-router-dom"
import {Loading} from "./components/Loading"
import {SERVER_LOADING_MESSAGE} from "./components/constants"
import {ProductsExplorer} from "./pages/ProductsExplorer"
import {INVITE_PAGE,PRODUCT_EXPLORER,PRODUCT_MODELS, DOCUMENT_EXPLORER, FEEDBACK, EXAMPLES_PRODUCTS,PROFILE, TEAM_MEMBERS} from "./routing/constants"
import {ModelProductPage} from "./pages/ModelProductPage"
import {DataProductsHome} from "./pages/DataProductsHome"
import {VerifyEmail} from "./pages/VerifyEmail"
import PrivateRoute from "./routing/PrivateRoute"
import {DocumentExplorer} from "./pages/DocumentExplorer"
import {Profile} from "./pages/Profile"
import {WOQLClientObj} from './init-woql-client'
import {ServerError} from './components/ServerError'
import {InvitePage} from './pages/InvitePage'
import {UserManagement} from "./pages/UserManagement"
import {localSettings} from "../localSettings"
import {OrganizationHome } from "./pages/OrganizationHome"
import {Home} from "./pages/Home"


export function App (props){
    let navigate = useNavigate();
    const {connectionError,loadingServer,clientUser,accessControlDashboard} = WOQLClientObj()
    if(!clientUser) return ""
    // we have this loading only in terminusX, it is auth0 information/login loading
    const {loading} = clientUser
    
    if (window.location.search.includes("error=unauthorized")) {      
        navigate(`/verify`)
    }

    if (window.location.search.includes("supportSignUp=true")) {
        navigate(`/`)
    }

    if(connectionError) {
        return <ServerError>{connectionError}</ServerError>
    }

    if(loading || loadingServer) {
        return <main role="main" className="loading-parent content mr-3 ml-5">
            <Loading message={SERVER_LOADING_MESSAGE}/>
        </main>
    }
    //the accessControlDashboard in terminusX is created only after the login 
    // so he can be undefined at the start
    const isAdmin = accessControlDashboard ? accessControlDashboard.isAdmin() : false
    return <div className="container-fluid container-background h-100">
            <Routes>
                {getRoutes(clientUser,isAdmin)}
            </Routes>         
            </div>
}

function getRoutes(clientUser,isAdmin){
    if(localSettings.connection_type==="LOCAL"){
    return <React.Fragment>
        <Route index element={<Home/>} />
            <Route path=":organization" >
                <Route index element={<OrganizationHome/>}/>
                { clientUser.user === "admin" && <Route path="administrator" element={<UserManagement/>}/>}
                { clientUser.user !== "admin" && <Route path="administrator" element={<div>Not Found 404 !!!!</div >}/>}
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
        <Route path="/verify" element={<VerifyEmail/>}/>
        <Route path = {INVITE_PAGE} element = {<PrivateRoute component={InvitePage}/>} />                     
        <Route index element={<PrivateRoute component={Home}/>} />
        <Route path=":organization" >
            <Route index element={<PrivateRoute component={OrganizationHome}></PrivateRoute>}/>
            <Route path = {PROFILE} element = {<PrivateRoute component={Profile}/>} />  
           {isAdmin &&  <Route path="administrator" element={<PrivateRoute component={UserManagement}/>}/>}
           {!isAdmin &&  <Route path="administrator" element={<div>Not Found 404 !!!!</div >}/>}
            <Route path="members" element={<PrivateRoute component={UserManagement}/>}/>
            <Route path=":dataProduct" >
                <Route index element={<PrivateRoute component={DataProductsHome}/>} />                     
                <Route path={DOCUMENT_EXPLORER} element={<PrivateRoute component={DocumentExplorer}/>} />
                <Route path={PRODUCT_EXPLORER} element={<PrivateRoute component={ProductsExplorer}/>} />
                <Route path={PRODUCT_MODELS} element={<PrivateRoute component={ModelProductPage}/>} />                    
            </Route>
        </Route>
                 
        <Route path="*" element={<div>Not Found 404 !!!!</div >} />
    </React.Fragment>
}