import React from "react" 
import {Routes,Route,useNavigate, BrowserRouter} from "react-router-dom"
import {Loading} from "./components/Loading"
import {SERVER_LOADING_MESSAGE} from "./components/constants"
import {ProductsExplorer} from "./pages/ProductsExplorer"
import * as PATH from "./routing/constants"
import {ModelProductPage} from "./pages/ModelProductPage"
import {DataProductsHome} from "./pages/DataProductsHome"
import {VerifyEmail} from "./pages/VerifyEmail"
import {PlansPage} from "./pages/PlansPage"
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
import {ChangeRequestsPage} from "./pages/ChangeRequestsPage"
import {ChangeDiff} from "./pages/ChangeDiff"
import {DocumentTemplate} from "./pages/DocumentTemplate"
import {GraphIqlEditor} from "./pages/GraphIqlEditor"
import {PageNotFound} from "./pages/PageNotFound"
import {DocumentsPageList} from "./pages/DocumentsListPage"
import {PLANS} from "./routing/constants";

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
            { clientUser.user === "admin" && <Route path="administrator" element={<UserManagement/>}/>}
            { clientUser.user !== "admin" && <Route path="administrator" element={<div><PageNotFound/></div >}/>}   
            <Route path=":organization" >
                <Route index element={<OrganizationHome/>}/>
                <Route path="members" element={<UserManagement/>}/>
                <Route path=":dataProduct" >
                    <Route index element={<DataProductsHome/>} />                     
                    <Route path={PATH.DOCUMENT_EXPLORER} element={<DocumentExplorer/>} />
                                       
                </Route>
            </Route>             
            <Route path="*" element={<div><PageNotFound/></div >} />
        </React.Fragment>
    }
    return <React.Fragment>
        {/*<Route path="/verify" element={<VerifyEmail/>}/>*/}
        <Route path="/verify" element={<VerifyEmail/>}/>
        <Route path = {PATH.INVITE_PAGE} element = {<PrivateRoute component={InvitePage}/>} />                     
        <Route path={PATH.PLANS} element={<PrivateRoute component={PlansPage}/>}/>
        <Route index element={<PrivateRoute component={Home}/>} />
        <Route path=":organization" >
            <Route index element={<PrivateRoute component={OrganizationHome}></PrivateRoute>}/>
            <Route path = {PATH.PROFILE} element = {<PrivateRoute component={Profile}/>} />  
           {isAdmin &&  <Route path="administrator" element={<PrivateRoute component={UserManagement}/>}/>}
           {!isAdmin &&  <Route path="administrator" element={<div><PageNotFound/></div >}/>}
            <Route path={PATH.MEMBERS} element={<PrivateRoute component={UserManagement}/>}/>
           
            <Route path=":dataProduct"  >
                <Route index element={<PrivateRoute component={DataProductsHome}/>} />
                <Route path={PATH.GRAPHIQL}  element={<PrivateRoute component={GraphIqlEditor}/>} /> 
                
                <Route path={PATH.CHANGE_REQUESTS} >
                    <Route index  element={<PrivateRoute component={ChangeRequestsPage}/>} />    
                    <Route path=":changeid" element={<PrivateRoute component={ChangeDiff}/>} /> 
                </Route>
                <Route path={PATH.DOCUMENT_EXPLORER} element={<DocumentTemplate/>}>
                    <Route index element={<PrivateRoute component={Documents}/>} />
                        <Route path=":type">                       
                            {<Route index element={<DocumentsPageList/>} /> }
                            <Route path={PATH.NEW_DOC} element={<DocumentNew/>}/> 

                            <Route path=":docid" >
                                <Route index element={<PrivateRoute component={DocumentView}/>} /> 
                                <Route path={PATH.EDIT_DOC} element={<DocumentEdit/>} /> 
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

//   <Route path={PATH.PRODUCT_EXPLORER} element={<PrivateRoute component={ProductsExplorer}/>} />
//<Route path={PATH.PRODUCT_MODELS} element={<PrivateRoute component={ModelProductPage}/>} />  
