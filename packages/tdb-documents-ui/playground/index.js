import React from "react"
import ReactDOM from "react-dom"
import App from "./src/Layout"
import {InitProvider} from './src/init'

function InitComponent () {

    let config = {
        server:  process.env.SERVER,
        team: process.env.TEAM,
        token: process.env.TOKEN,
        dataProduct: process.env.DATA_PRODUCT
    }

    //console.log(" --- config --- ", config) 

    return <InitProvider config={config}>
        <App />
    </InitProvider>
}

ReactDOM.render(
	<InitComponent/>,
	document.getElementById("root")
)
