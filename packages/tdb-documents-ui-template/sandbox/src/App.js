 // The following code example uses the AccessControl class in TerminusClient library
 // First thing to do is create a Browser Router and configure your route. 
 // This will enable client side routing for our web app.
 // We have the following page
 // Documents - list of all documents
 // DocumentsGraphqlList - table with the list of all the document of a specific type
 // DocumentNew - page to add a new document type
 // DocumentView - page to view a specific document
 // DocumentEdit - page to edit a specific document

import React, {useEffect} from "react"
import './App.css';
import {Routes,Route,BrowserRouter} from "react-router-dom"
import {DocumentTemplate} from "./pages/DocumentTemplate"
import {Documents} from "./pages/Documents"
import {DocumentView} from "./pages/DocumentView"
import {DocumentEdit} from "./pages/DocumentEdit"
import {DocumentNew} from "./pages/DocumentNew"

import {DocumentsGraphqlList} from "./pages/DocumentsGraphqlList"
import {NEW_DOC, EDIT_DOC} from "./pages/constants" 

function App() {
  return (
    <div className="App">
      <header className="App-header bg-secondary p-3 d-flex">
        <a class="nav-icon bg-transparent nav-link" href="/">
          <img width ="50px" src="https://assets.terminusdb.com/images/terminusx-color.png" class="logo-img"/>
        </a>
        <h4 class="ms-3 mt-2">DASHBOARD DEMO</h4>
      </header>
      <BrowserRouter>
          <Routes>
          <Route path={"/"} element={<DocumentTemplate/>}>
              <Route index element={<Documents/>} />
                <Route path=":type">                       
                    <Route index element={<DocumentsGraphqlList/>} /> 
                    <Route path={NEW_DOC} element={<DocumentNew/>}/> 
                    <Route path=":docid" >
                        <Route index element={<DocumentView/>}/>  
                        <Route path={EDIT_DOC} element={<DocumentEdit/>} /> 
                    </Route>
                </Route>  
            </Route>
          </Routes>
      </BrowserRouter>      
    </div>
  );
}
export default App;

