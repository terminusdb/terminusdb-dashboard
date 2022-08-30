import React , { useState } from "react"
import {UTILS} from "@terminusdb/terminusdb-client"
import {filterCapability} from "../utils/searchResult"

export const AccessControlHook=(accessControlDashboard,options)=> {
    //to load the items list
    const [loading,setLoading]=useState(null)
    const [errorMessage,setError] =useState(false)
    const [successMessage,setSuccessMessage] =useState(null)
 
    const [orgUsers,setOrgUsers]=useState([])
    const [orgInvitations,setOrgInvitations]=useState([])
    
    //const [invitationSent,setInvitationSent] =useState(null)
    const [userDatabaseList,setUserDatabaseList]=useState(null)
    const [teamRequestAccessList,setTeamRequestAccessList] =useState([])
    
    //review
    const [rolesList,setRolesList]=useState([])
    const [resultTable,setResultTable]=useState([])

    const formatMessage = (err)=>{
        let message = err.message
        if(err.data && err.data["api:message"]){
            message = err.data["api:message"]
        }
        return message
    }

    function resetStatus(){
        setLoading(true)
        setError(false)
        setSuccessMessage(false)
    }

    const clientAccessControl = accessControlDashboard.accessControl()
   

    async function sendInvitation(orgName,emailTo,role){
        const errorMessage = options.hookMessage.sendInvitation.error
        resetStatus()
        try{
            await clientAccessControl.sendOrgInvite(emailTo, role, "",orgName)
            return true
        }catch(err){
            const message = formatMessage(err)
            setError(`${errorMessage},  ${message}`)
            return false
        }finally{          
            setLoading(false)
        }
    }

    /*
    * I can not use the general one because I need in accessControl
    */
    async function getRolesList(roleRemoveFilter){
        resetStatus()
        const errorMessage = "I can not get the roles list"
        try{
            const result = await accessControlDashboard.callGetRolesList(roleRemoveFilter)
            setRolesList (result.reverse())
            if(successMessage)setSuccessMessage(successMessage)
        }catch(err){
            setError(errorMessage)
        }finally{          
            setLoading(false)
        }
    }


    async function createUserRole(orgName,userid,role,scope){
        resetStatus()
        const errorMessage = "I can not create the role"
        try{
            await clientAccessControl.createUserRole(userid, scope, role, orgName)
            return true
        }catch(err){
            setError(formatMessage(err))
            return false
        }finally{          
            setLoading(false)
        }
    }
    
    async function updateUserRole(orgName,userid,capid,role,scope){
        resetStatus()
        try{
            await clientAccessControl.updateUserRole(userid, capid, scope, role, orgName)
            return true
        }catch(err){
            setError("I can not update the role")
            return false
        }finally{                       
            setLoading(false)
        }
    }

    //I can move this in the main context I don't need to call it every time
    //it get the list of roles document

    async function getUserDatabasesRoles(orgName,userid,resultFormatter){
        setLoading(true)
		try{
		    let response = await clientAccessControl.getDatabaseRolesOfUser(userid,orgName)
            if(resultFormatter){
                response = resultFormatter(response)
            }
			setUserDatabaseList(response)
            return response
		}catch(err){
			setError('I can not add the user to the team')
		}finally{
        	setLoading(false)
        }

    } 
    // remote getUser we can remove this call and use getTableResult
    async function getOrgUsers(orgName){
        setLoading(true)
		try{
			const response = await clientAccessControl.getOrgUsers(orgName)
            const resp = Array.isArray(response) ? response.reverse() : []
			setOrgUsers(resp)         
            return resp
		}catch(err){
            console.log(err.message)
			setError('I can not get the user list')
		}finally{
        	setLoading(false)
        }
    }
    
    async function getOrgUsersLocal(orgName){
        setLoading(true)
		try{
            const orgId= `Organization/${UTILS.encodeURISegment(orgName)}`
			const response = await clientAccessControl.getOrgUsers(orgName)
            const responseFormatted = []
            response.forEach(element => {
                const {role , databases} = filterCapability(element["capability"],orgId)
                const item = {"@id":element["@id"],
                              "username":element["name"],
                              role,databases,scope:orgId}
                responseFormatted.push(item)
            });
            console.log("getOrgUsersLocal",responseFormatted)
			setOrgUsers(responseFormatted)
            return responseFormatted         
		}catch(err){
            console.log(err.message)
			setError('I can not get the user list')
		}finally{
        	setLoading(false)
        }
    }


    async function sendTeamAccessRequest(orgName,email,affiliation,note){
        const errorMessage = "I can not send the invitation"
        const successMessage = "The invitation has been sent"
     
        setLoading(true)
        setError(false) 
        setSuccessMessage(false)
        try{
            await clientAccessControl.sendAccessRequest(email,affiliation,note,orgName)
            if(successMessage)setSuccessMessage(successMessage)
        }catch(err){
            setError(errorMessage)
        }finally{           
            setLoading(false)
        }
        
    }

    async function getTeamRequestAccessList(orgName){
        setLoading(true)
		try{
			const response = await clientAccessControl.accessRequestsList(orgName)
            setTeamRequestAccessList(response)         
            return response
		}catch(err){
            console.log(err.message)
			setError('I can not get the invitation request list')
		}finally{
        	setLoading(false)
        }

    }
    
    async function deleteTeamRequestAccess(accId,orgName){
        setLoading(true)
		try{
            await clientAccessControl.deleteAccessRequest(accId,orgName)
			const response = await getTeamRequestAccessList(orgName)         
            return response
		}catch(err){
			setError('I can not delete the access list')
		}finally{
        	setLoading(false)
        }

    }

    async function getOrgInvitations(orgName){
        setLoading(true)
		try{
			const response = await clientAccessControl.getPendingOrgInvites(orgName) //await axiosHub.get(`${baseUrl}/organizations/${orgid}/invites`, options)
			setOrgInvitations(response)
		}catch(err){
			setError('I can not add the user to the team')
		}finally{
        	setLoading(false)
        }

    }

    function deleteInvitation(orgName,invid){
        setLoading(true)
		try{
            return clientAccessControl.deleteOrgInvite(invid,orgName)
		}catch(err){
           setError(formatMessage(err))
		}finally{
        	setLoading(false)
        }
    }

    async function deleteUserFromOrganization(orgName,userid){
        resetStatus()
		try{
			await clientAccessControl.removeUserFromOrg(userid,orgName)
            return true
		}catch(err){
            setError(formatMessage(err))
            return false
		}finally{
        	setLoading(false)
        }
    }

  

    async function createRole(name,actions){
        resetStatus()
		try{
			await clientAccessControl.createRole(name,actions)
            return true
		}catch(err){    
			setError(formatMessage(err))
            return false           
		}finally{
        	setLoading(false)
        }
    }

    async function createOrganizationRemote(teamName){
        resetStatus()
        const currentBaseUrl =clientAccessControl.baseURL
        try{
            /*
            * I need to override the baseUrl for the remoteCall
            */         
           clientAccessControl.baseURL = currentBaseUrl+"/private"
           await clientAccessControl.createOrganization(teamName)
          
           return true
        }catch(err){
           setError(formatMessage(err))
           return false
        }finally{
            clientAccessControl.baseURL = currentBaseUrl
            setLoading(false)
        }
   }


    async function createOrganizationAndCapability(teamName,userId,roles){
         resetStatus()
         try{
            const teamId = await clientAccessControl.createOrganization(teamName)
            await clientAccessControl.manageCapability(userId,teamId,roles,"grant")
            return true
         }catch(err){
            setError(formatMessage(err))
            return false
         }finally{
        	setLoading(false)
        }
    }
    /*
    * local database
    */
    async function manageCapability(teamId,operation,roles, userId,password){
        setLoading(true)
		try{
			//const user = await clientAccessControl.addUser(name,password)
            const rolesIds = roles.map(item =>{
                if(typeof item === "object"){
                    return item["@id"]
                }
                else return item
            })
            await clientAccessControl.manageCapability(userId, teamId, rolesIds, operation)
            return true
		}catch(err){
        	setError(formatMessage(err))
            return false
		}finally{
        	setLoading(false)
        }
    }

    /*
    * return all table reuslt list by type
    * I use the filter function to format or remove item from the result
    */
     async function getResultTable(methodName,filterFunction){
        resetStatus()
		try{
			let result = await clientAccessControl[methodName]()
            if(filterFunction && Array.isArray(result)){
                result = filterFunction(result)
            }
            setResultTable(result.reverse())
        }catch(err){
			setError(formatMessage(err))
		}finally{
        	setLoading(false)
        }
    }


    /*
    * delete an document by name
    * the methodName point at the differnt function in accessControl class
    */
    async function deleteElementByName(methodName,name){
        resetStatus()
		try{
			await clientAccessControl[methodName](name)
            return true
		}catch(err){
			setError(formatMessage(err))
            return false
		}finally{
        	setLoading(false)
        }
    }

    /*
    * create a new document
    */
    async function createElementByName(methodName,name,extraParam){
        resetStatus()
		try{
			await clientAccessControl[methodName](name,extraParam)
            return true
		}catch(err){
            setError(formatMessage(err))
            return false
		}finally{
        	setLoading(false)
        }
    }
    
    return {createOrganizationAndCapability,
            createOrganizationRemote,
            getOrgUsersLocal,
            createElementByName,
            deleteElementByName,
            getResultTable,
            resultTable,
            setError,
            getRolesList,
            rolesList,
            createRole,
            manageCapability,
            teamRequestAccessList,
            sendTeamAccessRequest,
            deleteTeamRequestAccess,
            getTeamRequestAccessList,
            successMessage,
            loading,
            createUserRole,
            updateUserRole,
            getUserDatabasesRoles,
            userDatabaseList,
            deleteUserFromOrganization,
            deleteInvitation,
            orgInvitations,
            orgUsers,
            //invitationSent,
            getOrgUsers,
            getOrgInvitations,
            sendInvitation,
            errorMessage}

}

