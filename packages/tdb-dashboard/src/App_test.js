import React from "react" 
import {Routes,Route,useNavigate, BrowserRouter} from "react-router-dom"
//import {VerifyEmail} from "./pages/VerifyEmail"
//import PrivateRoute from "./routing/PrivateRoute"
import  TestApp from "./TestApp"
export function App_test (props){
   // let navigate = useNavigate();


    return  <Routes>
        <Route path="/verify" element={<TestApp/>}/>
    </Routes>

}

//<DocumentList/>