export function createClientUser(useAuth0,params){
    let clientUser = {}
    try{
        const {isAuthenticated,user,getTokenSilently,logout,loginWithRedirect,loading} = useAuth0()
        clientUser = user || {}       
        clientUser.isAuthenticated = isAuthenticated
        clientUser.logout = logout
        clientUser.loading = loading
        clientUser.loginWithRedirect = loginWithRedirect
        clientUser.getTokenSilently = getTokenSilently
        clientUser.agentName= user ? user['http://terminusdb.com/schema/system#agent_name'] : false
        clientUser.firstLogin = user && user['http://terminusdb.com/schema/system#afterSignUp'] ? true : false 
        // the agentName is the userID
        clientUser.user = clientUser.agentName
        clientUser.serverType = "TerminusX"
    }catch(err){
        const lastuser = localStorage.getItem("User") || params.user
        clientUser = {email: lastuser } 
        clientUser.user = lastuser
        clientUser.serverType = "TerminusDB"
        //console.log("local connection")
    }
    //console.log("CLIENT",clientUser)
    clientUser.connection_type = params.connection_type
    return clientUser
}

export function formatSchema (docQueryResults){
    if(docQueryResults.length) {
        let docJson={}
        docQueryResults.map(item => {
                var sch="@schema:"
                var type = item["Type"].substring(sch.length, item["Type"].length)
                if(!docJson[type]){
                    docJson[type] = [item["Documents"]]
                }
                else {
                    var arr = docJson[type]
                    arr.push(item["Documents"])
                    docJson[type] = arr
                }

        })
        return docJson
    }
    return {}
}
