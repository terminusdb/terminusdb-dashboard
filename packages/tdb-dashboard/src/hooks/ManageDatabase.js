import { useState } from "react"
import {WOQLClientObj} from '../init-woql-client'

export const ManageDatabase=()=> {

    const {woqlClient} = WOQLClientObj()

    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)

    // destOrg is one of the user's organization 
    // dbName any dbName
    // destination important!!!
    //https://cloud-dev.terminusdb.com/current_team/api/clone/newteam/test01_new_009

    async function cloneDatabase (cloneSource,destOrg,destDB, isPublicDB=false){
        try{
            setLoading(true)
            setError(false)
            const clientCopy = woqlClient.copy()
           /* if(isPublicDB){
                clientCopy.remoteAuth({type:"basic","user":"anonymous",key:""})
            }else{
                // the user clones his database into one of his teams
                clientCopy.remoteAuth(clientCopy.localAuth())
            }*/
        
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

    return {cloneDatabase,loading,error,setError}

}
