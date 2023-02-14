import React, {useState, useEffect, useContext} from 'react'
import TerminusClient ,{UTILS} from '@terminusdb/terminusdb-client'
import {PLANS,PAYMENT} from './routing/constants'
import { useAuth0 } from "./react-auth0-spa"
import {AccessControlDashboard} from "@terminusdb/terminusdb-access-control-component"
import {useLocation} from "react-router-dom"
import {createClientUser} from "./clientUtils"
import { formatErrorMessage } from './hooks/hookUtils'
import { createApolloClient } from './routing/ApolloClientConfig'
import {getChangesUrl} from "./hooks/hookUtils"

export const WOQLContext = React.createContext()
export const WOQLClientObj = () => useContext(WOQLContext) 

export const WOQLClientProvider = ({children, params}) => {
    //the client user can be the local user or the auth0 user in terminusX
    //maybe a some point we'll need a local and remote connection (terminusX connection to clone/push and pull etc...) 
    let clientUser = createClientUser(useAuth0, params)

    //let apolloClient
    const [woqlClient, setWoqlClient] = useState(null)
    const location = useLocation()
    const [apolloClient , setApolloClient] = useState(null)

    //maybe I can move this in client
    const [accessControlDashboard, setAccessControl] = useState(null)
    const [loadingServer, setLoadingServer] = useState(false)
    const [connectionError, setError] = useState(false)
    
    const [branch, setBranch] = useState("main")
    const [ref, setRef] = useState(false)

    const [chosenCommit,setChosenCommit]=useState({})
    const [currentCRObject, setCurrentCRObject]=useState(false)
    const [userHasMergeRole,setTeamUserRoleMerge] = useState(false)
    const [currentChangeRequest,setCurrentChangeRequest] = useState(false)
    const [documentClasses, setDocumentClasses] = useState(false)

    // set left side bar open close state
    const sidebarStateObj = {sidebarDataProductListState:true,
                             sidebarDataProductConnectedState:true,
                             sidebarDocumentListState:true,
                             sidebarSampleQueriesState:true}

    //we can use setOpts for change user and key in local connection
    const [opts, setOpts] = useState(params)


    // in this point params is not setted
    // to be review I need params get better
    // in pathname teamName and username are still encoded
    const noTeam = {"":true,"invite":true,"administrator" :true,"verify":true,[PAYMENT]:true,[PLANS]:true}
    const noDatabase = {"":true,"profile":true,"administrator" :true}
    const getLocation = ()=>{
        const locArr = location.pathname.split("/")
       // const startWith = process.env.BASE_URL ? 2 : 1 
        const teamPath = locArr.length>1 && !noTeam[locArr[1]] ? UTILS.decodeURISegment(locArr[1]) : false
        const dataPath = locArr.length>2 && !noDatabase[locArr[2]] ? UTILS.decodeURISegment(locArr[2]) : false
        const page = locArr.length>3 ? locArr[3] : false
       // console.log(teamPath,dataPath,page)
        
        return {organization:teamPath,dataProduct:dataPath,page}
    }

     useEffect(() => {
        const initWoqlClient = async(credentials,accessCredential )=>{
            try{
                 //the last organization viewed organization
                 //this is for woql client 
                const dbClient = new TerminusClient.WOQLClient(opts.server,credentials)
                const {organization,dataProduct} = getLocation()
                let defOrg = organization //|| localStorage.getItem("Org")

                //this is for jump in different organization proxy
                //to be removed soon
                if(opts.connection_type!== "LOCAL"){
                     dbClient.connectionConfig.api_extension = 'system/api/'
                }
                      
                await dbClient.getUserOrganizations()
                 // to be review the access control is only for the admin user
                 // to see what we have to disabled in the interface
                 const testS = opts.server+'system/'
                 const access =  new TerminusClient.AccessControl(opts.server,accessCredential)
                 const clientAccessControl = new AccessControlDashboard(access)

                 //I have to create a new call in accessControl 
                 const url = `${dbClient.server()}api/users/info`
                 const userInfo = await  dbClient.sendCustomRequest("GET", url)
                 // add extra info to auth0User
                 clientUser.userInfo = userInfo

                 if(opts.connection_type !== "LOCAL"){
                   const rolesList = await clientAccessControl.callGetRolesList()
                 }
                
                 if(defOrg){
                    await changeOrganization(defOrg,dataProduct,dbClient,clientAccessControl)
                 }

                 setApolloClient(new createApolloClient(dbClient))
                 setAccessControl(clientAccessControl)
                 setWoqlClient(dbClient)
            } catch (err) {
                const message = formatErrorMessage(err)
                setError(message)
            }finally {
                setLoadingServer(false)
            }
        }
        if(opts && opts.server && window.location.pathname.indexOf("verify") === -1){           
            //to be review the local connection maybe don't need a user in the cloud
            //and don't need auth0 too
            if(opts.connection_type === 'LOCAL'){
                setLoadingServer(true)
                const user = localStorage.getItem("Terminusdb-USER") 
                const key = localStorage.getItem("Terminusdb-KEY")
                const credentials  = {user ,key}                        
                initWoqlClient(credentials,credentials)

            }else if(clientUser && clientUser.isAuthenticated){
                setLoadingServer(true)
                clientUser.getTokenSilently().then(jwtoken=>{
                    let hubcreds = {jwt: jwtoken, user: clientUser.email}
                    // user is the Auth0 id
                    let accesscred ={jwt : jwtoken, user:clientUser.user}              
                    initWoqlClient(hubcreds,accesscred)
                })
                
            }
        }
    }, [opts.user, clientUser.email])


    //dataproduct change
    const setDataProduct = async (dbName,hubClient,accessDash) =>{
        const client = woqlClient || hubClient
        const accDash = accessControlDashboard || accessDash
       
        if(client){
            client.db(dbName)
            //set the allowed actios for the selected dataproduct
            const dbDetails = client.databaseInfo(dbName)
            accDash.setDBUserActions(dbDetails['@id'])
            //reset the head after change the db
            setHead('main',{commit:false,time:false})

            if(dbName){
                // check if there is a change request related
                const {TERMINUSCMS_CR , TERMINUSCMS_CR_ID} = changeRequestName(client)

                const lastBranch = localStorage.getItem(TERMINUSCMS_CR)  
                const lastChangeRequest = localStorage.getItem(TERMINUSCMS_CR_ID)          
                if(lastBranch && lastChangeRequest){
                    //check the changeRequest Status
                    const changeObj = await client.sendCustomRequest("GET", `${getChangesUrl(client)}/${lastChangeRequest}`)
                    if(changeObj.status=== "Open"){
                        client.checkout(lastBranch)
                        setBranch(lastBranch)
                        setCurrentChangeRequest(lastChangeRequest)
                    }else{
                        localStorage.removeItem(TERMINUSCMS_CR)  
                        localStorage.removeItem(TERMINUSCMS_CR_ID)  
                        setBranch("main")
                        setCurrentChangeRequest(false)
                    }
                }else{
                    //if we are not change request
                    setBranch("main")
                    setCurrentChangeRequest(false)
                }
                //get all the configuration that you need for the documents  
                //refreshDataProductConfig(client)
            }
           // clearDocumentCounts()
        }
    }

    function changeRequestName(currentClient){
        const client = currentClient || woqlClient
        return {TERMINUSCMS_CR:`TERMINUSCMS_CR.${client.organization()}_____${client.db()}`,
        TERMINUSCMS_CR_ID: `TERMINUSCMS_CR_ID.${client.organization()}_____${client.db()}`}
    }

    function setChangeRequestBranch(branchName,changeRequestId){
        woqlClient.checkout(branchName)
        const {TERMINUSCMS_CR , TERMINUSCMS_CR_ID} = changeRequestName()
        localStorage.setItem([TERMINUSCMS_CR],branchName)
        localStorage.setItem([TERMINUSCMS_CR_ID],changeRequestId)
        // set the change_request brach and reset the commit 
        setBranch(branchName)
        setRef(null)
        setChosenCommit({})
        setCurrentChangeRequest(changeRequestId) 
    }

    function exitChangeRequestBranch(){
        woqlClient.checkout("main")
        const {TERMINUSCMS_CR , TERMINUSCMS_CR_ID} = changeRequestName()
        localStorage.removeItem([TERMINUSCMS_CR])
        localStorage.removeItem([TERMINUSCMS_CR_ID])
        // set the change_request brach and reset the commit 
        setBranch("main")
        setRef(null)
        setChosenCommit({})
        setCurrentChangeRequest(false) 
    }
 
   // const currentPage = history.location.pathname

    //to be review
    //to much set state we can optimize this !!!
    function setHead(branchID, refObject={}){// ridConsoleTime=false)
        if(!woqlClient)return
        if(branchID)woqlClient.checkout(branchID)
        let sref=refObject.commit
        let refTime=refObject.time

        /*if(branches && branches[branchID] && branches[branchID].head == sref){
            sref = false
            refTime=false
        }*/
        sref = sref || false
        woqlClient.ref(sref)

        setBranch(branchID)
        setRef(sref)
        setChosenCommit(refObject)
        //we have to move this
        //we need this info in 2 different point (left sidebar and the page)
        //this is to fix the refresh of document interface
        //I added it but we have to remove it and create an hook
        const {page} = getLocation()
        //review this
        /*if(woqlClient.db() && page===DOCUMENT_EXPLORER ){
            getUpdatedDocumentClasses(woqlClient)
            getUpdatedFrames(woqlClient)
        }*/
    }

   // review
    async function changeOrganization (orgName,setDataP, hubClient,accessControlDash){      
        try{
            hubClient = hubClient || woqlClient 
            accessControlDash = accessControlDash || accessControlDashboard
            //this set the organization name and reset the databases list to empty
            hubClient.organization(orgName)
            // this failed if the organization does not exists
            await accessControlDash.callGetUserTeamRole(clientUser.user,orgName)

            //I use this for now to not call getDatabases
            if(hubClient.userOrganizations().length>0){  
                const hh= hubClient.userOrganizations();                 
                const dbs =  hubClient.userOrganizations().find(element => element['name'] === orgName ) 
                //console.log("DATABASES", dbs)
                const dbList = dbs && dbs.databases ? dbs.databases : []
                hubClient.databases(dbList)
            }
            //this is for change the base url api for the proxy
            if(opts.connection_type!== "LOCAL"){
                // add  a new terminusdb method 
                hubClient.connectionConfig.api_extension = `${UTILS.encodeURISegment(orgName)}/api/`
                //load the list of system roles
            }
            
            localStorage.setItem("Org", orgName)
            const dataP = setDataP || false
            //reset database and commit head
            await setDataProduct(dataP,hubClient,accessControlDash)
        }catch(err){
            const message = formatErrorMessage(err)
            setError(message)
        }
   } 

    //get the list of databases
    //we are using this??
    async function reconnectToServer (currentDB = false) { // temporary fix for loading new woqlClient when create/ delete of a data product, have to review
        if(opts.connection_type !== 'LOCAL'){
            const jwtoken = await clientUser.getTokenSilently()
            let hubcreds = {type: "jwt", key: jwtoken, user: clientUser.email}
            woqlClient.localAuth(hubcreds)    
        }
        try{
            //if I create or remove a database
            await woqlClient.getDatabases()
            woqlClient.db(currentDB)
            setDataProduct(currentDB) 
        } catch (err) {
            console.log("__CONNECT_ERROR__",err)
            setError("Connection Error")
        }finally {
            setLoadingServer(false)
        }
    }

    // save the left sidebar's state open/close
    const saveSidebarState = (name,value) =>{
        sidebarStateObj[name]=value
    }


    return (
        <WOQLContext.Provider
            value={{
                exitChangeRequestBranch,
                apolloClient,
                setChangeRequestBranch,
                currentChangeRequest,
                //setCurrentChangeRequest,
                userHasMergeRole,
                currentCRObject, 
                setCurrentCRObject,
                saveSidebarState,
                sidebarStateObj,
                clientUser,
                accessControlDashboard,
                changeOrganization,
                chosenCommit,
                getLocation,
                setHead,
                ref,
                branch,
                connectionError,
                woqlClient,
                loadingServer,
                setDataProduct,
                reconnectToServer,
                documentClasses
            }}
        >
            {children}
        </WOQLContext.Provider>
    )
}
