import React from "react"
import { TeamMembers } from '@terminusdb/terminusdb-access-control-component';
import {Layout} from "./Layout"
import {WOQLClientObj} from '../init-woql-client'

export const UserManagement = (props) =>{
    const {accessControlDashboard, clientUser, woqlClient} = WOQLClientObj()
    if(!woqlClient) return ""
    const organization =woqlClient.organization()
    //this can change if local
    const setting =getSettings(clientUser)

    return  <Layout>
                <TeamMembers organization={organization} currentUser={clientUser} options={setting} accessControlDashboard={accessControlDashboard} />
            </Layout>
}

function getSettings (clientUser){
   if(clientUser.connection_type==="LOCAL") {
    return {
            tabs:{
                ALL_USER:true,
                ROLES_LIST:true,
                ORGANIZATION_LIST:true
            },
            interface:{
                memberList:{
                    delete:true,
                    changeRole:true,
                    showDatabase:true
                }
            }
        }
    }else{
        return {tabs:{
            MEMBERS_TAB:true,
            INVITATION_TAB:true,
            REQUEST_ACCESS:false,
            ALL_USER:false
        },
        buttons:{
            ADD_USER:false,
            ADD_INVITATION:true,
            ADD_ROLE:false
        },
        interface:{
            memberList:{
                delete:true,
                changeRole:true,
                showDatabase:true
            }
        }
    }
    }
}
