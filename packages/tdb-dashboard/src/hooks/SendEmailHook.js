import { useState, useEffect } from "react"
import axios from "axios" 
import {getBaseUrlFeedback,getOptions} from "./hookUtils"
import {WOQLClientObj} from '../init-woql-client'

export function SendEmailHook(props) {
	const {clientUser } = WOQLClientObj()
	const axiosHub=axios.create();
	const [emailResult, sendEmailResult] = useState(false)
	const [emailData, sendEmailData] = useState(null)
    const [emailError,setEmailError]=useState(false)
    const [loadingEmail, setEmailLoading] = useState(false)
	
	const baseUrl = getBaseUrlFeedback()

	useEffect(() => {
		 async function callEmailServer() {
		 	try{
		 		setEmailLoading(true)
		 		setEmailError(false)
		 		sendEmailResult(false)

				const token = await clientUser.getTokenSilently()
				const options = getOptions(token);

                const result = await axiosHub.post(`${baseUrl}/private/email`, emailData , options)
               
                sendEmailResult(result.data.message)
			}
            catch(err){
				console.error(err)
				setEmailError(true)
			}
            finally{
				setEmailLoading(false)
			}
		 }

		if(emailData!==null){
	     	callEmailServer()
		}
    }, [emailData])




    return {emailResult, sendEmailResult, emailError,sendEmailData, setEmailError}
}

