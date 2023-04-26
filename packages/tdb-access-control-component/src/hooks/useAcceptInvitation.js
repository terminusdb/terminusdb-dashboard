import { useState } from "react"

export const useAcceptInvitation=(clientAccessControl)=> {
    const [loading,setLoading]=useState(null)
    const [errorMessage,setError] =useState('')
   

    async function acceptInvitation(orgName, refid,accepted=true){ 
		setLoading(true)
        setError(false)
		try{
			//const token = await getTokenSilently()
			//const options = getOptions(token);
           // const payload = {accepted:accepted}
			await clientAccessControl.updateOrgInviteStatus(refid, accepted, orgName)
            //const response = await axiosHub.put(`${baseUrl}/organizations/${orgid}/invites/${refid}`,payload, options)
			
            //if everything is ok I'll redirect to the home page
             window.location.replace(`/`)
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
