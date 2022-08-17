import React , {useEffect,useState} from 'react';
import TerminusClient from '@terminusdb/terminusdb-client'
import { TeamMembers, AccessControlDashboard } from '@terminusdb/terminusdb-access-control-component';
//import {WOQLResult} from "@terminusdb/terminusdb-client";

const App = (props) =>{
    const jwtoken = process.env.JWT
    const key = process.env.API_KEY 
    const user = process.env.API_USER 
    const org= process.env.ORG_NAME
    const server = process.env.SERVER_URL
    
    const clientAccessControl = new TerminusClient.AccessControl(server,{organization:org,key,user:user})
    const accessControlDashboard  =  new AccessControlDashboard(clientAccessControl)
    // I do not need to await 
    accessControlDashboard.callGetRolesList()
    return <TeamMembers organization={org} currentUser={user}
        accessControlDashboard={accessControlDashboard}/>
}
export default App;
