//every component 
import {UTILS} from '@terminusdb/terminusdb-client'

export const AccessControlDashboard = (clientAccessControl)=>{

    let __rolesList = []
    let __teamUserRoles = null // an array of roles
    let __teamUserActions = null
    let __userDBRoles = null
    let __dbUserActions = null
    let __clientAccessControl = clientAccessControl
    //let __currentUser = 

    async function callGetRolesList(roleRemoveFilter){
            try{
               const list = await __clientAccessControl.getAccessRoles()
               __rolesList= list
               if(roleRemoveFilter){
                     __rolesList = list.filter(item => !roleRemoveFilter[item["@id"]])
               }
              
               return __rolesList
            }catch(err){
                console.log('I can not get the role list',err)
            }
    }

          // review with database capability 
            // before we have to fix team
    async function callGetUserTeamRole(userName,orgName){
		try{
			const result = await __clientAccessControl.getTeamUserRoles(userName,orgName)
            let teamRoles = []
            if(result && result.capability && result.capability.length>0){
                if(result.capability.length ===1){
                    teamRoles = result.capability[0].role
                }else{
                    const orgId = `Organization/${UTILS.encodeURISegment(orgName)}`
                    const cap = result.capability.find(item=>item.scope === orgId)
                    teamRoles = cap && cap.role ? cap.role : []
                }
            }        
            setTeamActions(teamRoles)
		}catch(err){
            if(err.data && err.status === 404 && err.data["api:message"]){
                throw new Error(err.data["api:message"])
            }
            throw err
		}
    }

    function accessControl(){
        return __clientAccessControl
    }
    
    // if I got the role expanded is better
    const formatActionsRoles = (userRoles)=> {
        if(!Array.isArray(userRoles))return {}
        const actionsObj = {}
        userRoles.forEach(role => {          
            if(role.action && Array.isArray(role.action)){
                role.action.forEach(roleId =>{
                    actionsObj[roleId] = roleId;
                }, {});
            }          
        });
        return actionsObj
    }

    const setTeamActions = (teamRoles,dbUserRole) =>{
       // const database = databaseRoles.find(element => element["name"]["@value"] === dataproduct);
        //const role = database ? database['role'] : teamRole
        __teamUserRoles = teamRoles
        __teamUserActions =  formatActionsRoles(teamRoles) 
        __userDBRoles = dbUserRole
        //if change the team I reset the __dbUserActions === at the teamActions
        __dbUserActions = null
    }

    const setDBUserActions = (id) =>{
        if(!id) {
            __dbUserActions = null
            return
        }
        if(!Array.isArray(__userDBRoles)) return 
        const database = __userDBRoles.find(element => element["name"]["@value"] === id);
        const role = database ? database['role'] : null
        //no role could be a new database
        if(!role || role === __teamUserRole){
            __dbUserActions = __teamUserActions         
        }else{
            __dbUserActions = formatActionsRoles(role)
        }     
    }

    const isAdmin = () =>{
        return Array.isArray(__teamUserRoles)  && __teamUserRoles.findIndex(item=>item["@id"]==="Role/admin")> -1 ? true : false
    }

    const createDB = () =>{
       if(!__teamUserActions)return false 
       return __teamUserActions[CREATE_DATABASE] ? true : false
    }

    const deleteDB = () =>{
        if(!__teamUserActions)return false 
        return __teamUserActions[DELETE_DATABASE] ? true : false
     }

     //!!!TO BE REVIEW
     // I have to move this check at database-level
    const schemaWrite = () =>{
     if(!__teamUserActions)return false 
       return __teamUserActions[SCHEMA_WRITE_ACCESS] ? true : false
    }

    const classFrame = () =>{
        if(!__teamUserActions)return false 
          return __teamUserActions[CLASS_FRAME] ? true : false
    }

    const instanceRead = () =>{
        if(!__teamUserActions)return false 
          return __teamUserActions[INSTANCE_READ_ACCESS] ? true : false
    }

    const instanceWrite = () =>{
        if(!__teamUserActions)return false 
          return __teamUserActions[INSTANCE_WRITE_ACCESS] ? true : false
    }

    const branch = () =>{
        if(!__teamUserActions)return false 
          return __teamUserActions[BRANCH] ? true : false
    }

    const getRolesList = () =>{
        return __rolesList
    }

    /**
     * return an array with the team roles 
     * Examples
     * ["Role/reader","Role/writer"]
     */
    const getTeamUserRoles = () =>{
        return __teamUserRoles
    }


    return {createDB,
            classFrame,
            instanceRead,
            instanceWrite,
            branch,
            schemaWrite,
            isAdmin,
            setTeamActions,
            callGetUserTeamRole,
            setDBUserActions,
            getTeamUserRoles,
            getRolesList,
            deleteDB,
            accessControl,
            callGetRolesList}

}

export const BRANCH="branch"
export const CLASS_FRAME = "class_frame" 
export const CLONE= "clone"
export const COMMIT_READ_ACCESS = "commit_read_access"
export const COMMIT_WRITE_ACCESS = "commit_write_access"
export const CREATE_DATABASE= "create_database"
export const DELETE_DATABASE= "delete_database"
export const FETCH = "fetch"
export const INSTANCE_READ_ACCESS = "instance_read_access"
export const INSTANCE_WRITE_ACCESS =  "instance_write_access"
export const MANAGE_CAPABILITIES = "manage_capabilities"
export const META_READ_ACCESS =  "meta_read_access"
export const META_WRITE_ACCESS =  "meta_write_access"
export const PUSH = "push"
export const REBASE =  "rebase"
export const SCHEMA_READ_ACCESS = "schema_read_access"
export const SCHEMA_WRITE_ACCESS = "schema_write_access" 