import { localSettings } from "../../localSettings";
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
	if(err.data && err.data["api:message"]){ 
		if( err.data["api:message"] === "Incorrect authentication information"){
			return "Incorrect authentication information, wrong username or password"
		}            
		message = err.data["api:message"]
	}else if (message.indexOf("Network Error")>-1){
		message = "Network Error"
	}
	return message
}

export  function getChangesUrl(woqlClient){
	const client = woqlClient.copy()
	client.connectionConfig.api_extension = 'api/'
	return client.connectionConfig.dbBase("changes")
}