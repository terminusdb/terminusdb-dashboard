import { useState } from "react"
import {WOQLClientObj} from '../init-woql-client'
import {UTILS} from "@terminusdb/terminusdb-client"

export const ManageDatabase=()=> {
    const {woqlClient} = WOQLClientObj()
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)

    // destOrg is one of the user's organization 
    // dbName any dbName
    // destination important!!!
    //https://cloud-dev.terminusdb.com/current_team/api/clone/newteam/test01_new_009

    async function updateDatabase(label,comment){
        try{
            setLoading(true)
            setError(false)
            const payload = {label, comment}
            await woqlClient.updateDatabase(payload)
            return true 
        }catch ( err) {
            setError(message)
        }finally{
            setLoading(false)
        }
    }

    async function createDatabase (id,label,description) {
        try{
            if(!UTILS.checkValidName(id)) {
                throw Error("Id is mandatory and can only contain underscores and alphanumeric characters.")
            }else if(!label) {
                throw Error('label cannot be empty')
            }
            let dbInfo = {id: id, label: label, comment: description, organization:woqlClient.organization()}
   
            setLoading(true)
            const res = await woqlClient.createDatabase(dbInfo.id, dbInfo)
            return res                                    
        }catch(err){
            let errMsg = err
            if(err.data && err.data["api:message"]){
                errMsg = err.data["api:message"]
            }
            let message=`Error in creating database ${label}. ${errMsg}`
            setError(message)
        }finally{
            setLoading(false)
        }
    }

    async function cloneDatabase (cloneSource,destOrg,destDB, isPublicDB=false){
        try{
            setLoading(true)
            setError(false)
            const clientCopy = woqlClient.copy() 
            const result = await clientCopy.clonedb(cloneSource, destDB, destOrg)
            return true
        }catch ( err) {
            console.log("CLONE ERRROR", err)
            let message =  err.message 
            if(err.data && err.data["api:message"] === "Database already exists." ){ 
                message = `Database ${destDB} already exists in team ${destOrg}.`
            }
            setError(message)
        }finally{
            setLoading(false)
        }
    }

    return {cloneDatabase,loading,error,setError,updateDatabase,createDatabase}

}
