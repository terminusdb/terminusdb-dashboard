import TerminusClient from '@terminusdb/terminusdb-client'
import React from 'react';
export const getInvitationListConfig = (limit,getDeleteButton) => {
    const tabConfig= TerminusClient.View.table();
    tabConfig.column_order("email_to", "status", "delete invitation")
    tabConfig.column("email_to").header("email")
    tabConfig.column("status").header("status")
    tabConfig.column("delete invitation").header(" ")
    tabConfig.column("delete invitation").render(getDeleteButton)
    tabConfig.pager("local")
    tabConfig.pagesize(limit)
    return tabConfig
}

export const getAskAccessListConfig = (limit,getDeleteButton) => {
    const tabConfig= TerminusClient.View.table();
    tabConfig.column_order("email", "affiliation","note" ,"status", "delete invitation")
    tabConfig.column("email").header("email")
    tabConfig.column("note").header("note")
    tabConfig.column("affiliation").header("affiliation")
    tabConfig.column("status").header("status")
    tabConfig.column("delete invitation").header(" ")
    tabConfig.column("delete invitation").render(getDeleteButton)
    tabConfig.pager("local")
    tabConfig.pagesize(limit)
    return tabConfig
}

export const getListConfigBase = (limit,getActionButtons) => {
    const tabConfig= TerminusClient.View.table();
    tabConfig.column_order("name","actions")
    tabConfig.column("name").header("Name")
    tabConfig.column("actions").header(" ")
    tabConfig.column("actions").render(getActionButtons)
    tabConfig.pager("local")
    tabConfig.pagesize(limit)
    return tabConfig
}

export const getRoleListConfig = (limit,getActionButtons) => {
    const tabConfig= TerminusClient.View.table();
    tabConfig.column_order("name","actions")
    tabConfig.column("name").header("Role Name")
    tabConfig.column("actions").header(" ")
    tabConfig.column("actions").render(getActionButtons)
    tabConfig.pager("local")
    tabConfig.pagesize(limit)
    return tabConfig
}

function formatRoles (cell) {
    const columnId= cell.column.id
    const rolesList = cell.row.original[columnId]
    if(!Array.isArray(rolesList))return ""
    return rolesList.map((item,index)=><p key={`${index}__key`}>{item["@id"]}</p>
    )
}

export const getUsersListConfigLocal = (limit,getActionButtons) => {
    const tabConfig= TerminusClient.View.table();
    tabConfig.column_order( "username", "role","actions")
    tabConfig.column("user")
    tabConfig.column("username")
    tabConfig.column("role").render(formatRoles).header("Roles")
    tabConfig.column("actions").render(getActionButtons)
    tabConfig.pager("local")
    tabConfig.pagesize(limit)
    return tabConfig
}

export const getUsersListConfig = (limit,getActionButtons,getPicture) => {
    const tabConfig= TerminusClient.View.table();
    tabConfig.column_order("picture", "email", "role","actions")
    tabConfig.column("user")
    tabConfig.column("picture").header(" ")
    tabConfig.column("email")
    tabConfig.column("role")
    tabConfig.column("picture").render(getPicture)
    tabConfig.column("actions").render(getActionButtons)
    tabConfig.pager("local")
    tabConfig.pagesize(limit)
    return tabConfig
}

export const getUsersDatabaseListConfig = (limit,getActionButtons) => {
    const tabConfig= TerminusClient.View.table();
    tabConfig.column_order("name", "role","Action")
    tabConfig.column("capability")
    tabConfig.column("name")
    tabConfig.column("role").header("role")
    tabConfig.column("Action").header("")

    tabConfig.column("Action").render(getActionButtons)
    tabConfig.pager("local")
    tabConfig.pagesize(limit)
    return tabConfig
}

export const getUsersDatabaseLocalListConfig = (limit,getActionButtons) => {
    const tabConfig= TerminusClient.View.table();
    tabConfig.column_order("name",  "team_role", "role", "Action")
    tabConfig.column("name")
    tabConfig.column("team_role").render(formatRoles).header("Team Roles")
    tabConfig.column("role").render(formatRoles).header("Database Roles")
    tabConfig.column("Action").header("")

    tabConfig.column("Action").render(getActionButtons)
    tabConfig.pager("local")
    tabConfig.pagesize(limit)
    return tabConfig
}











