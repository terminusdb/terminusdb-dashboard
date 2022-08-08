import { useState } from "react"
import   axios  from "axios"
import {WOQLClientObj} from '../init-woql-client'
import {getOptions} from "./hookUtils"
//import history from "../routing/history"
//use access control 
function getBaseUrl(){
	/*
    * link to the node server
    */
	let remote_url = ''
    if(process.env.TERMINUSDB_SERVER){
        remote_url += process.env.TERMINUSDB_SERVER.endsWith('/') ? process.env.TERMINUSDB_SERVER : process.env.TERMINUSDB_SERVER+'/'
    }
    return `${remote_url}api`
}
export const AcceptInvitationHook=()=> {
	const axiosHub=axios.create();
    
    const {clientUser } = WOQLClientObj()

    const [loading,setLoading]=useState(null)
    const [errorMessage,setError] =useState('')
    const baseUrl=getBaseUrl();


    async function acceptInvitation(orgid, refid,accepted=true){ 
		setLoading(true)
        setError(false)
		try{
			const token = await clientUser.getTokenSilently()
			const options = getOptions(token);
            const payload = {accepted:accepted}
			const response = await axiosHub.put(`${baseUrl}/organizations/${orgid}/invites/${refid}`,payload, options)
		    window.location.replace(`${window.location.origin}/${orgid}`)
		}catch(err){
            const data = err.response.data
			setError(data.err)
		}finally{
        	setLoading(false)
        }
	}

    return {acceptInvitation,
            loading,
            errorMessage}

}
