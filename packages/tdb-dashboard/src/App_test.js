import React from "react" 
import {Routes,Route,useNavigate, BrowserRouter} from "react-router-dom"
import {VerifyEmail} from "./pages/VerifyEmail"
import PrivateRoute from "./routing/PrivateRoute"

export function App_test (props){
    let navigate = useNavigate();

    if (window.location.search.includes("error=unauthorized")) {      
        navigate(`/verify`)
    }

    return  <Routes>
        <Route path="/verify" element={<VerifyEmail/>}/>
        <Route index element={<PrivateRoute component={<div>HELLO</div>}/>} />
    </Routes>

}

//<DocumentList/>