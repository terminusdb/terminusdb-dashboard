import React from "react"
import TestApp from "./TestApp"
import { createRoot } from 'react-dom/client';
import {BrowserRouter,Routes,Route} from "react-router-dom"
const basename = process.env.BASE_URL ? {basename:process.env.BASE_URL} : {}
const container = document.getElementById('root');
const root = createRoot(container); 
require('./App.css')
require('./Colors.css')

root.render(<BrowserRouter {...basename}><Routes>
  <Route path="/verify" element={<TestApp/>}/>
</Routes></BrowserRouter>)
/*root.render( <BrowserRouter {...basename}>
            <NavigationComponent/>
          </BrowserRouter>);*/




