import { useState, useEffect } from "react"
import   axios  from "axios"
import {WOQLClientObj} from '../init-woql-client'
import {getOptions,getBaseUrl} from "./hookUtils"
 
export const AccessTokenHook=(organization)=> {
	const axiosHub=axios.create();
	// we do not import directly auth0 hook because in the local dashboard it is not present
	const {clientUser } = WOQLClientObj()
	const {getTokenSilently } = clientUser

	const [token,setToken]=useState(null)
	const [tokenList,setTokenList]=useState([])

	const [loading,setLoading]=useState(null)

	const [newTokenLoading,setNewTokenLoading]=useState(null)
	const [error,setError]=useState(null)

	const [tokenLabel,setTokenLabel]=useState('')
	const [tokenLabelError,setTokenLabelError]=useState(null)

	const baseUrl=`${getBaseUrl()}/private`;

	useEffect(() => {		
	    getTokenList()
	},[organization])

	async function getTokenList(){ 
		setLoading(true)
		try{
			const token = await getTokenSilently()
			const options = getOptions(token);
			const response = await axiosHub.get(`${baseUrl}/organizations/${organization}/tokens`, options)
			console.log(response)
			if(response.data){
				setTokenList(response.data)
			}
		}catch(err){
			setError('I can not get the token list')
		}finally{
        	setLoading(false)
        }
	}

	async function deleteToken(tokenId){
		setLoading(true)
		try{
			/*
			* encoding the tokenID
			*/
			const Auth0token = await getTokenSilently()			
			const options = getOptions(Auth0token);
			const result = await axiosHub.delete(`${baseUrl}/organizations/${organization}/tokens/${tokenId}`, options)	
			setToken(null)
			getTokenList()
			
		}catch(err){
        	setError('I can not delete the token')
        }finally{
        	setLoading(false)
        } 
	}

	async function getToken(tokenLabel){
		setNewTokenLoading(true)
		try{
			const body={description:tokenLabel}
			const token = await getTokenSilently()
			
			const options = getOptions(token);

			const result = await axiosHub.post(`${baseUrl}/organizations/${organization}/tokens`, body, options)
			setToken(result.data.access_token)
			setTokenLabel("");
			getTokenList();
        }catch(err){
        	setError('I can not get the token')
        }finally{
        	setNewTokenLoading(false)
        }     
	}

	return {getToken,
			token,
			loading,
			newTokenLoading,
			tokenList,
			tokenLabel,
			setTokenLabel,
			tokenLabelError,
			setTokenLabelError,
			deleteToken}
}