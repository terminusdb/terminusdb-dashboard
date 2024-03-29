import React, { useState, useEffect } from "react"
import   axios  from "axios"
import { useAuth0 } from "../react-auth0-spa"
import {getOptions,getBaseUrl} from "./hookUtils"

export const CreateNewOrg=()=> {
	const axiosHub=axios.create(); 
    const {getTokenSilently } = useAuth0()
   // const {clientUser } = WOQLClientObj()

    const [loading,setLoading]=useState(null)
    const [teamCreated,setTeamCreated]=useState(null)
    const [errorMessage,setError] =useState(null)
     
    const baseUrl=getBaseUrl();

    async function createNewOrg(orgid){
        setLoading(true)
        setError(false)
        try{
            const token = await getTokenSilently()
            const options = getOptions(token); 
            const payload = {organization:orgid}
            const response = await axiosHub.post(`${baseUrl}/private/organizations`, payload,options)
            localStorage.setItem("Org",orgid)
            setTeamCreated(response.data)
            //reload the home page with the new team
            window.location.replace(`${window.location.origin}/${orgid}`)
        }catch(err){
            const data = err.response.data &&  err.response.data.err ?  err.response.data.err : ''
            let errorMessage = `I can not create the team ${orgid} `
            if(data.indexOf("but an object with that id already exists api")){
                errorMessage = <span className="ml-2">The team <strong>{orgid}</strong> is not available in TerminusX</span>
            }
            setError(errorMessage)
        }finally{
            setLoading(false)
        }
    }

    return {loading,
        setError,
        createNewOrg,
        teamCreated,
        errorMessage}
    
}



/*
import { useState } from "react"
import {WOQLClientObj} from '../init-woql-client'

export const CreateNewOrg=()=> {
    const {accessControlDashboard} = WOQLClientObj() 
    const [loading,setLoading]=useState(null)
    const [teamCreated,setTeamCreated]=useState(null)
    const [errorMessage,setError] =useState(null)

    async function createNewOrg(orgid){
        setLoading(true)
        setError(false)
        try{
            const response = await accessControlDashboard.createNewOrganization(orgid)
            localStorage.setItem("Org",orgid)
            setTeamCreated(response.data)           
            window.location.replace(`/`)
        }catch(err){
            const data = err &&  err.message ?  err.message : ''
            let errorMessage = `I can not create the team ${orgid} `
            if(data.indexOf("but an object with that id already exists api")){
                errorMessage = `The Team Name ${orgid} already exists`
            }
            setError(errorMessage)
        }finally{
            setLoading(false)
        }
    }

    return {loading,
        createNewOrg,
        teamCreated,
        errorMessage}
    
}*/