import { localSettings } from "../../localSettings";
import { getCRConflictError } from "../components/utils"
import React from "react" 
export function getOptions(token){

	const options = {
		mode: 'cors', // no-cors, cors, *same-origin
		redirect: 'follow', // manual, *follow, error
		referrer: 'client',
	};
	
	
	options.headers = { Authorization: `Bearer ${token}` };

	return options;
}

export function getBaseUrl(){
	/*
    * link to the node server
    */
	let remote_url = ''
    if(localSettings.server){
        remote_url += localSettings.server.endsWith('/') ? localSettings.server : localSettings.server+'/'
    }
    return `${remote_url}api`
}

export function getBaseUrlFeedback(){
	/*
    * link to the node server
    */
	let remote_url = ''
    if(process.env.FEEDBACK_URL){
        remote_url += process.env.FEEDBACK_URL.endsWith('/') ? process.env.FEEDBACK_URL : process.env.FEEDBACK_URL+'/'
    }
    return `${remote_url}api`
}

export function formatErrorMessage (err){ 
	let message = err.message
	if (message.indexOf("Network Error")>-1){
		message = "Network Error"
		if(localSettings.connection_type === "LOCAL"){
			message =`Network Error the ${localSettings.server} is not running.
				You need to use docker compose to use the dashboard`
		}
	}else if(err.data){ 
		if( err.data["api:message"] === "Incorrect authentication information"){
			message =  "Incorrect authentication information, wrong username or password"
		}/*else if (err.data["api:status"]==="api:conflict") { 
			message = getCRConflictError(err.data["api:witnesses"])
		}*/else if (err.data["api:message"]=== "Schema check failure") {
			message = `${err.data["api:message"]} ${JSON.stringify(err.data["system:witnesses"], null, 2)}`
		}else if(err.data["api:message"]){
			message = err.data["api:message"]
		}
	}
	return message
}

export  function getChangesUrl(woqlClient){
	const clientCopy = woqlClient.copy()
	clientCopy.connectionConfig.api_extension = 'api/'
	if(clientCopy.connectionConfig.baseServer){
		clientCopy.connectionConfig.server = clientCopy.connectionConfig.baseServer
	}
	return clientCopy.connectionConfig.dbBase("changes")
}