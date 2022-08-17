export const defaultSetting ={
    labels:{
        userListTitle:"Team Members",
        inviteAddText: "Here you can invite people to your team",
        inviteMember:"Invite a Member",
        addUser:"Add a user to the team",
        addRole:"Add Role",
        createRole: "Create a new Role"
    },
    tabs:{
        MEMBERS_TAB:false,
        INVITATION_TAB:false,
        REQUEST_ACCESS:false,        
        ALL_USER:false,
        ROLES_LIST:false,
        ORGANIZATION_LIST:false
    },
    buttons:{
        ADD_USER:false,
        ADD_INVITATION:false,
        ADD_ROLE:false,  
        ADD_USER_TO_THE_TEAM:false
    },
    hookMessage:{
        sendInvitation:{
            error: "I can not send the invitation",
            success:"The invitation has been sent"
        }
    },
    interface:{
        memberList:{
            delete:true,
            changeRole:true,
            showDatabase:true,
        }
    }
}


//method name
export const GET_ALL_ORGANIZATIONS= "getAllOrganizations"
export const DELETE_ORGANIZATION = "deleteOrganization"
export const CREATE_ORGANIZATION = "createOrganization"

export const DELETE_ROLE = "deleteRole"

export const GET_ALL_USERS= "getAllUsers"
export const DELETE_USER = "deleteUser"
export const CREATE_USER = "createUser"

//Role/infoReader