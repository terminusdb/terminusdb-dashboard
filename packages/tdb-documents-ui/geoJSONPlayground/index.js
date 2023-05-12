import React from "react"
import ReactDOM from "react-dom"
import App from "./src/Layout"
import { FrameProvider } from './src/frameInit'
//import "@terminusdb/terminusdb-documents-ui/dist/css/terminusdb__styles.css"

function InitComponent () {

	let config = {
		server:  process.env.SERVER,
		user: process.env.USER,
		team: process.env.TEAM,
		token: process.env.TOKEN,
		dataProduct: process.env.DATA_PRODUCT
	}

	//console.log(" --- config --- ", config) 

	return <FrameProvider config={config}>
		<App />
	</FrameProvider>
}

ReactDOM.render(
	<InitComponent/>,
	document.getElementById("root")
)
