import React from "react"
import ReactDOM from "react-dom"
import App from "./src/Layout"
import {InitProvider} from './src/init'

function InitComponent () {

    let config = {
        server:  process.env.SERVER,
        user: process.env.USER,
        team: process.env.TEAM,
        token: process.env.TOKEN,
        dataProduct: process.env.DATA_PRODUCT
    }

    return <InitProvider config={config}>
        <App />
    </InitProvider>
}

ReactDOM.render(
	<InitComponent/>,
	document.getElementById("root")
)
