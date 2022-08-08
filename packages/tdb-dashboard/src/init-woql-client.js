import React, {useState, useEffect, useContext} from 'react'
import TerminusClient ,{UTILS} from '@terminusdb/terminusdb-client'
import { DOCUMENT_EXPLORER, PRODUCT_EXPLORER} from './routing/constants'
import { useAuth0 } from "./react-auth0-spa"
import {getCountOfDocumentClass, getTotalNumberOfDocuments, getDocsQuery} from "./queries/GeneralQueries"
import {executeQueryHook} from "./hooks/executeQueryHook"
import {AccessControlDashboard} from "@terminusdb/terminusdb-access-control-component"
import {useLocation} from "react-router-dom"
import {createClientUser,formatSchema} from "./clientUtils"

export const WOQLContext = React.createContext()
export const WOQLClientObj = () => useContext(WOQLContext)

export const WOQLClientProvider = ({children, params}) => {
    //the client user can be the local user or the auth0 user in terminusX
    //maybe a some point we'll need a local and remote connection (terminusX connection to clone/push and pull etc...) 
    let clientUser = createClientUser(useAuth0, params)
    const [woqlClient, setWoqlClient] = useState(null)
    const location = useLocation()

    //maybe I can move this in client
    const [accessControlDashboard, setAccessControl] = useState(null)

    const [loadingServer, setLoadingServer] = useState(false)
    const [connectionError, setError] = useState(false)

   // const [currentDocument, setCurrentDocument] = useState(false) // to control document interface chosen document
    const [branchesReload,setBranchReload] =useState(0)
    const [branch, setBranch] = useState("main")
    const [ref, setRef] = useState(false)

    // branchesstates
    const [branches, setBranches] = useState(false)
    const [chosenCommit,setChosenCommit]=useState({})


    // set left side bar open close state
    const sidebarStateObj = {sidebarDataProductListState:true,
                             sidebarDataProductConnectedState:true,
                             sidebarDocumentListState:true,
                             sidebarSampleQueriesState:true}

    //we can use setOpts for change user and key in local connection
    const [opts, setOpts] = useState(params)

    //document classes
    const [documentClasses, setDocumentClasses] = useState(false)

    // get document count
    // set constants for query to get count of document class instances
    const [query, setQuery] = useState(false)
    const [selectedDocument, setSelectedDocument]=useState(false) // when a document is selected from a query panel
    var [perDocumentCountProvider]=executeQueryHook(woqlClient, query)

    const [perDocumentCount, setPerDocument]=useState(false)
    const [totalDocumentCount, setTotalDocumentCount]=useState(false)

    // get total count of all documents
    const [totalDocumentsQuery, setTotalDocumentsQuery]=useState(false)
    var [totalDocumentCountProvider]=executeQueryHook(woqlClient, totalDocumentsQuery)

    const [docsQuery, setDocsQuery]=useState(false)
    const [docs, setDocs]=useState(false)
    var [docQueryResults]=executeQueryHook(woqlClient, docsQuery)

    const [frames, setFrames]=useState(false)

    // in this point params is not setted
    // to be review I need params get better
    // in pathname teamName and username are still encoded
    const noTeam = {"profile":true,"":true,"invite":true}
    const getLocation = ()=>{
        const locArr = location.pathname.split("/")
       // const startWith = process.env.BASE_URL ? 2 : 1 
        const teamPath = locArr.length>1 && !noTeam[locArr[1]] ? UTILS.decodeURISegment(locArr[1]) : false
        const dataPath = locArr.length>2 && locArr[2] !== "administrator" ? UTILS.decodeURISegment(locArr[2]) : false
        const page = locArr.length>3 ? locArr[3] : false
       // console.log(teamPath,dataPath,page)
        
        return {organization:teamPath,dataProduct:dataPath,page}
    }

    useEffect(() => {
        const docJson = formatSchema(docQueryResults)
        setDocs(docJson)
    }, [docQueryResults])


    useEffect(() => {
        if(perDocumentCountProvider && documentClasses.length>0){
            setPerDocument(perDocumentCountProvider)
        }
    },[perDocumentCountProvider])

    useEffect(() => {
        if(totalDocumentCountProvider) {
            setTotalDocumentCount(totalDocumentCountProvider)
        }
    },[totalDocumentCountProvider])
   

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
                
                 if(defOrg){
                    await changeOrganization(defOrg,dataProduct,dbClient,clientAccessControl)
                 }
                 setAccessControl(clientAccessControl)
                 setWoqlClient(dbClient)
            } catch (err) {
                let message = err.message
                if(err.data && err.data["api:message"]){                  
                    message = err.data["api:message"]
                    console.log("ERROR_DATA",message)
                }else if (message.indexOf("Network Error")>-1){
                    message = "Network Error"
                }
                setError(message)
            }finally {
                setLoadingServer(false)
            }
        }
        if(opts && opts.server){           
            //to be review the local connection maybe don't need a user in the cloud
            //and don't need auth0 too
            if(opts.connection_type === 'LOCAL'){
                setLoadingServer(true)
                const user = localStorage.getItem("User") || opts.user
                const key = localStorage.getItem("Key") || opts.key
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

    //get all the Document Classes (no abstract or subdocument)
    function getUpdatedDocumentClasses(woqlClient) {
        const dataProduct = woqlClient.db()
        return woqlClient.getClassDocuments(dataProduct).then((classRes) => {
            setDocumentClasses(classRes)
            // get number document classes
            let q=getCountOfDocumentClass(classRes)
            setQuery(q)
            let totalQ=getTotalNumberOfDocuments(classRes)
            setTotalDocumentsQuery(totalQ)
        })
        .catch((err) =>  {
            console.log("Error in init woql while getting classes of data product", err.message)
        })
    }

    //when I change a dataProduct I change the user actions
    function getUpdatedFrames(woqlClient) {
        const dataProduct = woqlClient.db()
        return woqlClient.getSchemaFrame(null, dataProduct).then((res) => {
            setFrames(res)
            let docsQ=getDocsQuery()
            setDocsQuery(docsQ)
            //console.log("frames", JSON.stringify(res, null, 2))
        })
        .catch((err) =>  {
            console.log("Error in init woql while getting data frames of data product", err.message)
        })
    }

    const setDataProduct = (id,hubClient,accessDash) =>{
        const client = woqlClient || hubClient
        const accDash = accessControlDashboard || accessDash
        if(client){
            client.db(id)
            //set the allowed actios for the selected dataproduct
            accDash.setDBUserActions(id)
            //reset the head
            setHead('main',{commit:false,time:false})
        }
    }
//designing data intensive applications
    //dataproduct change
    useEffect(() => {
        if(woqlClient && woqlClient.db()){
            setBranches(false)
            setDocumentClasses(false)
            setPerDocument(false)
            perDocumentCountProvider=false
            setTotalDocumentCount(false)
            //I have to add this again
            //if we run a query against an empty branch we get an error
            //we'll remove this when the error will be fixed in core db
            const tmpClient = woqlClient.copy()
            tmpClient.checkout("_commits")

            const branchQuery = TerminusClient.WOQL.lib().branches()
            tmpClient.query(branchQuery).then(result=>{
                 const branchesObj={}
                 if(result.bindings.length>0){
                    result.bindings.forEach(item=>{
                        const head_id = item.Head !== 'system:unknown' ?  item.Head : ''
                        const head = item.commit_identifier !== 'system:unknown' ?  item.commit_identifier['@value'] : ''
                        const timestamp = item.Timestamp !== 'system:unknown' ?  item.Timestamp['@value'] : ''
                        const branchItem={
                            id:item.Branch,
                            head_id:head_id,
                            head:head,
                            name:item.Name['@value'],
                            timestamp:timestamp
                        }
                        branchesObj[branchItem.name] = branchItem
                    })
                 }
                 setBranches(branchesObj)
            }).catch(err=>{
                  console.log("GET BRANCH ERROR",err.message)
            })

            // on change on data product get classes
            getUpdatedDocumentClasses(woqlClient)
            getUpdatedFrames(woqlClient)
        }
    }, [branchesReload, woqlClient])


    //we not need this for all the page
    useEffect(() => {
        const {page} = getLocation()
        if(woqlClient && woqlClient.db() && ( page===DOCUMENT_EXPLORER || page===PRODUCT_EXPLORER)){
            // on change on data product get classes
            getUpdatedDocumentClasses(woqlClient)
            getUpdatedFrames(woqlClient)
        }
    }, [window.location.pathname])


    const branchNeedReload = ()=>{
        setBranchReload(Date.now())
    }

 
   // const currentPage = history.location.pathname

    //to be review
    //to much set state we can optimize this !!!
    function setHead(branchID, refObject={}){// ridConsoleTime=false)
        if(!woqlClient)return
        if(branchID)woqlClient.checkout(branchID)
        let sref=refObject.commit
        let refTime=refObject.time

        if(branches && branches[branchID] && branches[branchID].head == sref){
            sref = false
            refTime=false
        }
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
        if(woqlClient.db() && page===DOCUMENT_EXPLORER ){
            getUpdatedDocumentClasses(woqlClient)
            getUpdatedFrames(woqlClient)
        }
    }

   // review
    async function changeOrganization (orgName,setDataP, hubClient,accessControlDash){      
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
            hubClient.connectionConfig.api_extension = `${orgName}/api/`
            //load the list of system roles
            accessControlDash.callGetRolesList()
        }
        
        localStorage.setItem("Org", orgName)
        const dataP = setDataP || false
        //reset database and commit head
        setDataProduct(dataP,hubClient,accessControlDash)
   } 

    //get the list of databases
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
                saveSidebarState,
                sidebarStateObj,
                clientUser,
                accessControlDashboard,
                changeOrganization,
                chosenCommit,
                getLocation,
                setHead,
                branchNeedReload,
                branches,
                ref,
                branch,
                connectionError,
                woqlClient,
                loadingServer,
                setDataProduct,
                reconnectToServer,
                documentClasses,
                setDocumentClasses,
                perDocumentCount,
                totalDocumentCount,
                setSelectedDocument,
                selectedDocument,
                frames,
                docs
            }}
        >
            {children}
        </WOQLContext.Provider>
    )
}
