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
    if(process.env.FEEDBACK_URL){
        remote_url += process.env.FEEDBACK_URL.endsWith('/') ? process.env.FEEDBACK_URL : process.env.FEEDBACK_URL+'/'
    }
    return `${remote_url}api`
}