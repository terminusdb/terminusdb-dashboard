import { useState } from "react"
import   axios  from "axios"
import {WOQLClientObj} from '../init-woql-client'
import {getOptions,getBaseUrl} from "./hookUtils"
//use access control 
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
