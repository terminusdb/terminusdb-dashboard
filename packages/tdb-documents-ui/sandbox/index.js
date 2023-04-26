import React from "react"
import ReactDOM from "react-dom"
import App from "./src/Layout"
import { FrameProvider } from './src/frameInit'

function InitComponent () {

	return <FrameProvider>
		<App />
	</FrameProvider>
}

ReactDOM.render(
	<InitComponent/>,
	document.getElementById("root")
)
