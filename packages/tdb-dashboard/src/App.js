import React from "react" 
import {Routes,Route,useNavigate} from "react-router-dom"
import {Loading} from "./components/Loading"
import {SERVER_LOADING_MESSAGE} from "./components/constants"
import {ProductsExplorer} from "./pages/ProductsExplorer"
import * as PATH from "./routing/constants"
import {ModelProductPage} from "./pages/ModelProductPage"
import {DataProductsHome} from "./pages/DataProductsHome"
import { DocumentList } from "./pages/DocumentsList"
import {DocumentsList01} from  "./pages/DocumentsList01"
import {VerifyEmail} from "./pages/VerifyEmail"
import PrivateRoute from "./routing/PrivateRoute"
import {DocumentExplorer} from "./pages/DocumentExplorer"
import {Documents} from "./pages/Documents"
import {Profile} from "./pages/Profile"
import {WOQLClientObj} from './init-woql-client'
import {ServerError} from './components/ServerError'
import {InvitePage} from './pages/InvitePage'
import {UserManagement} from "./pages/UserManagement"
import {localSettings} from "../localSettings"
import {OrganizationHome } from "./pages/OrganizationHome"
import {DocumentNew} from "./pages/DocumentNew"
import {DocumentEdit} from "./pages/DocumentEdit"
import {DocumentView} from "./pages/DocumentView"
import {Home} from "./pages/Home"
import {ChangeRequests} from "./pages/ChangeRequests"
import {ChangeDiff} from "./pages/ChangeDiff"
import {DocumentTemplate} from "./pages/DocumentTemplate"
import {GraphIqlEditor} from "./pages/GraphIqlEditor"
import {PageNotFound} from "./pages/PageNotFound"
//import { ApolloProvider} from '@apollo/client';
//import {createApolloClient} from './routing/ApolloClientConfig'

export function App (props){
    let navigate = useNavigate();
    const {connectionError,loadingServer,clientUser,accessControlDashboard,woqlClient} = WOQLClientObj()
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
  
    return <div className="container-fluid container-background h-100">
            <Routes>
            {getRoutes(clientUser,isAdmin, woqlClient)}          
            </Routes>         
            </div>
}

// {getRoutes(clientUser,isAdmin, woqlClient)}

function getRoutes(clientUser, isAdmin, woqlClient){
    //const client = createApolloClient(woqlClient)

    if(localSettings.connection_type==="LOCAL"){ 
    return <React.Fragment>
        <Route index element={<Home/>} />
            { clientUser.user === "admin" && <Route path="administrator" element={<UserManagement/>}/>}
            { clientUser.user !== "admin" && <Route path="administrator" element={<div><PageNotFound/></div >}/>}   
            <Route path=":organization" >
                <Route index element={<OrganizationHome/>}/>
                <Route path="members" element={<UserManagement/>}/>
                <Route path=":dataProduct" >
                    <Route index element={<DataProductsHome/>} />                     
                    <Route path={PATH.DOCUMENT_EXPLORER} element={<DocumentExplorer/>} />
                    <Route path={PATH.PRODUCT_EXPLORER} element={<ProductsExplorer/>} />
                    <Route path={PATH.PRODUCT_MODELS} element={<ModelProductPage/>} />                    
                </Route>
            </Route>             
            <Route path="*" element={<div><PageNotFound/></div >} />
        </React.Fragment>
    }
    return <React.Fragment>
        <Route path="/verify" element={<VerifyEmail/>}/>
        <Route path = {PATH.INVITE_PAGE} element = {<PrivateRoute component={InvitePage}/>} />                     
        <Route index element={<PrivateRoute component={Home}/>} />
        <Route path=":organization" >
            <Route index element={<PrivateRoute component={OrganizationHome}></PrivateRoute>}/>
            <Route path = {PATH.PROFILE} element = {<PrivateRoute component={Profile}/>} />  
           {isAdmin &&  <Route path="administrator" element={<PrivateRoute component={UserManagement}/>}/>}
           {!isAdmin &&  <Route path="administrator" element={<div><PageNotFound/></div >}/>}
            <Route path={PATH.MEMBERS} element={<PrivateRoute component={UserManagement}/>}/>
            <Route path=":dataProduct" >
                <Route index element={<PrivateRoute component={DataProductsHome}/>} />
                <Route path={PATH.GRAPHIQL}  element={<PrivateRoute component={GraphIqlEditor}/>} /> 
                
                <Route path={PATH.CHANGE_REQUESTS} >
                    <Route index  element={<PrivateRoute component={ChangeRequests}/>} />    
                    <Route path=":id" element={<PrivateRoute component={ChangeDiff}/>} /> 
                </Route>

                <Route path={PATH.DOCUMENT_EXPLORER} element={<DocumentTemplate/>}>
                    <Route index element={<PrivateRoute component={Documents}/>} />
                        <Route path=":type">
                           
                            <Route index element={<DocumentsList01/>} /> 
                            <Route path={PATH.NEW_DOC} element={<PrivateRoute component={DocumentNew}/>} /> 

                            <Route path=":id" >
                                <Route index element={<PrivateRoute component={DocumentView}/>} /> 
                                <Route path={PATH.EDIT_DOC} element={<PrivateRoute component={DocumentEdit}/>} /> 
                            </Route> 
                    </Route>
                </Route>

                <Route path={PATH.PRODUCT_EXPLORER} element={<PrivateRoute component={ProductsExplorer}/>} />
                <Route path={PATH.PRODUCT_MODELS} element={<PrivateRoute component={ModelProductPage}/>} />                    
            </Route>
        </Route>
                 
        <Route path="*" element={<PageNotFound/>} />
    </React.Fragment>
}
// <Route path="test"  element={<ApolloProvider client={client}><DocumentList/></ApolloProvider>} /> 
//  <Route index element={<PrivateRoute component={DocumentsList01}/>} /> 
/*
\ <Route path={PATH.CHANGE_REQUESTS} >
                    <Route index  element={<PrivateRoute component={ChangeRequests}/>} />    
                    <Route path=":id" element={<PrivateRoute component={ChangeDiff}/>} /> 
                </Route>
*/

/* <Route path={"test"} element={<PrivateRoute component={DocumentList}/>} />    */
/*
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
                
                <Route path={"test"} element={<PrivateRoute component={DocumentList}/>} />    

                <Route path={DOCUMENT_EXPLORER} element={<PrivateRoute component={DocumentExplorer}/>} />
                <Route path={PRODUCT_EXPLORER} element={<PrivateRoute component={ProductsExplorer}/>} />
                <Route path={PRODUCT_MODELS} element={<PrivateRoute component={ModelProductPage}/>} />                    
            </Route>
        </Route>
                 
        <Route path="*" element={<div>Not Found 404 !!!!</div >} />
    </React.Fragment>*/