//every component 
import {UTILS} from '@terminusdb/terminusdb-client'
import {filterCapability} from "./utils/searchResult"
export const AccessControlDashboard = (clientAccessControl)=>{

    let __rolesList = []
    let __teamUserRoles = null // an array of roles
    let __teamUserActions = null

    let __databasesUserRoles = null // all the dbs capabilities of present
    let __dbUserRoles = null // the current database user roles
    let __dbUserActions = null // the current database actions

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
    // if we have a database role we can see the database id no the database name but we use the database name to identify a
    // database inside the dashboard and in the client
    async function callGetUserTeamRole(userName,orgName){
		try{
			const result = await __clientAccessControl.getTeamUserRoles(userName,orgName)
            let teamRoles = []
            let dbUserRole = {}
            if(result && result.capability && result.capability.length>0){
                if(result.capability.length ===1){
                    teamRoles = result.capability[0].role
                }else{
                    const orgId = `Organization/${UTILS.encodeURISegment(orgName)}`
                    const {role,databases} = filterCapability(result.capability,orgId)
                    teamRoles = role || []
                    dbUserRole = databases
                }
            }        
            setTeamActions(teamRoles,dbUserRole)
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

    const setTeamActions = (teamRoles,databasesUserRoles) =>{
       // const database = databaseRoles.find(element => element["name"]["@value"] === dataproduct);
        //const role = database ? database['role'] : teamRole
        __teamUserRoles = teamRoles
        __teamUserActions =  formatActionsRoles(teamRoles) 
       // all the database capabilities 
        __databasesUserRoles = databasesUserRoles
        // I have to find a way to set the db_user actions
        __dbUserRoles = null
        __dbUserActions = null
    }

    // ??
    const setDBUserActions = (id) =>{
        __dbUserActions = null
        __dbUserRoles = null
        if(!__databasesUserRoles) return 
        const databaseRoles = __databasesUserRoles[id]
        if(databaseRoles){
            __dbUserRoles = databaseRoles
            __dbUserActions = formatActionsRoles(databaseRoles)
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

    
    const checkDBManagmentAccess = (actionName) =>{
        // no team roles the access is always false
        if(!__teamUserActions)return false 
        if( __teamUserActions[actionName]) return true 
        if(__dbUserActions && __dbUserActions[actionName]) return true
        return false
    }
     //!!!TO BE REVIEW
     // I have to move this check at database-level
    const schemaWrite = () =>{
       return checkDBManagmentAccess(SCHEMA_WRITE_ACCESS)
    }

    const classFrame = () =>{
        return checkDBManagmentAccess(CLASS_FRAME)
    }

    const instanceRead = () =>{
        return checkDBManagmentAccess(INSTANCE_READ_ACCESS)
    }

    const instanceWrite = () =>{
        console.log("INSTANCE_WRITE_ACCESS", checkDBManagmentAccess(INSTANCE_WRITE_ACCESS))
        return checkDBManagmentAccess(INSTANCE_WRITE_ACCESS)
    }

    const branch = () =>{
        return checkDBManagmentAccess(BRANCH)
    }

    const commitRead = () =>{
        return checkDBManagmentAccess(COMMIT_READ_ACCESS)
    }

    const commitWrite = () =>{
        return checkDBManagmentAccess(COMMIT_WRITE_ACCESS)
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

    const getDatabaseUserRoles = () =>{
        return __dbUserRoles
    }

    return {getDatabaseUserRoles,
            commitRead,
            commitWrite,
            createDB,
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