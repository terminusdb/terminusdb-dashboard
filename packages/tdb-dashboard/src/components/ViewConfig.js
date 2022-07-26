import TerminusClient from '@terminusdb/terminusdb-client'
import {arrayEquals, getColumnsFromResults} from "./utils"
import {deleteDocument} from "./DocumentActions"

export const getCommitViewTabConfig = (result) => {
    const tabConfig= TerminusClient.View.table();
    tabConfig.pager("remote").pagesize(10)
    return tabConfig
}

export const getCommitsTabConfig = (result, limit, cellClick, getCopyButton) => {
    const tabConfig= TerminusClient.View.table();
    tabConfig.column_order("Time", "Author", "Commit ID", "Message", "Copy Commit ID")
    tabConfig.column("Commit ID")
    tabConfig.column("Time").width(180).renderer({type: "time"})
    tabConfig.column("Message").width(300)
    tabConfig.column("Author")
    tabConfig.column("Copy Commit ID")

    //tabConfig.column("Time").width(180).renderer({type: "time"}).click(cellClick)
    /*tabConfig.column("Reset").minWidth(80).width(80).unsortable(true).click(resetBranch).render(getResetButton)
    tabConfig.column("Time").width(180).renderer({type: "time"}).click(cellClick)
    tabConfig.column("Message").width(300).click(cellClick)
    tabConfig.column("Commit ID").click(cellClick) */
    tabConfig.column("Copy Commit ID").render(getCopyButton)
    tabConfig.pager("remote")
    tabConfig.pagesize(limit)
    return tabConfig
}

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

export const getTokenListConfig = (limit,getDeleteButton) => {
    const tabConfig= TerminusClient.View.table();
    tabConfig.column_order("description", "creation","delete token")
    tabConfig.column("description").header("description")
    tabConfig.column("creation").header("creation")
    tabConfig.column("delete token").render(getDeleteButton)
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
    tabConfig.column("actions")
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

export const getPropertyMetaTabConfig = (result) => {
    const tabConfig= TerminusClient.View.table()
    tabConfig.pager("remote")
    tabConfig.pagesize(10)
    tabConfig.column("Property Name").header("Name").width(100)
    tabConfig.column("Property Domain").header("Domain").width(100)
    tabConfig.column("Property Range").header("Range").width(100)
    tabConfig.column("Property Type").header("Type").width(60)
    tabConfig.column("Property Description").header("Description").width(300)

    return tabConfig
}

export const getPropertyMetaGraphConfig = (result) => {
    const graphView=TerminusClient.View.graph()

    graphView.height("800").width("1500")
    graphView.show_force(true)
    graphView.edges(["v:Property Domain", "v:Property Range"]);
    graphView.edge("v:Property Domain", "v:Property Range").size(2).text("v:Property Name").arrow({width: 50, height: 20})
        .icon({label: true, color: [109,98,100], size: 0.8})
    graphView.node("Property Range").size(30).text("Range Name").color([150,233,151]).icon({label: true, color: [0,0,0]})
    graphView.node("Property Domain").size(30).text("Domain Name").color([150,233,151]).icon({label: true, color: [0,0,0]})
    graphView.node("Property Range").v("Abstract Range").in("Yes").color([189,248,190])
    graphView.node("Property Domain").v("Abstract Domain").in("Yes").color([189,248,190])
    graphView.node("Property Range").v("Enum Range").in("Yes").color([23,190,207])
    graphView.node("Property Range").v("Property Type").in("Data").hidden(true)
    graphView.node("Property Domain").collisionRadius(100)
    graphView.node("Property Range").v("Document Range").in("Yes").color([255,178,102])
    graphView.node("Property Domain").v("Document Domain").in("Yes").color([255,178,102])
    graphView.node("Property Range").v("Document Range").in("Yes").v("Abstract Range").in("Yes").color([252,219,186])
    graphView.node("Property Domain").v("Document Domain").in("Yes").v("Abstract Domain").in("Yes").color([252,219,186])

    let graphConfig = graphView.create(null)
    graphConfig.setResult(result.bindings)

    return graphConfig

}
//["Class ID", "Class Name"]
export const getClassesGraphConfig = (result) => {
    const graphView=TerminusClient.View.graph()

    graphView.node("Class ID").size(30).text("Class Name").color([150,233,151]).icon({label: true, color: [0,0,0]})

    graphView.height("800").width("1500")
    graphView.show_force(true)
    let graphConfig = graphView.create(null)
    graphConfig.setResult(result.bindings)

    return graphConfig
}


export const tableViewConfig= () => {
    const tabConfig= TerminusClient.View.table()
    tabConfig.pager("remote")
    tabConfig.pagesize(10)
    return tabConfig
}

export const tableViewConfigLocal= () => {
    const tabConfig= TerminusClient.View.table();
    tabConfig.pager("local")
    tabConfig.pagesize(10)
    return tabConfig
}


function propertyRelationType (result) {
    let tmp = [], propArray = ["Domain", "Domain Label", "Range", "Range Label"]
    for(var key in result[0]) {
        tmp.push(key)
    }
    return arrayEquals(tmp, propArray)
}

export const graphViewConfig = (result) => {

    const graph=TerminusClient.View.graph();
    graph.height(800).width("1500")

    graph.show_force(true)

    if(propertyRelationType(result)){
        graph.edges(["Domain", "Range Label"])

        graph.edge("Domain", "Range Label").size(2).text("Range").arrow({width: 50, height: 20})
            .icon({label: true, color: [109,98,100], size: 0.8})

        graph.node("Range Label").size(30).text("Range Label").color([27,153,139, 0.3]).icon({label: true, color: [109,98,100]})
        graph.node("Domain").size(30).text("Domain Label").color([97,218,251, 0.3]).icon({label: true, color: [109,98,100]})

        graph.node("Domain").collisionRadius(100)
        graph.node("Range Label").collisionRadius(100)
    }
    else {
        for (var item in result[0]){
            graph.node(item).color([23, 162, 184]).size(30).text(item).icon({label: true, color: [109,98,100]})
        }
    }
    //[27,153,139, 0.3]

    let graphConfig = graph.create(null);
    graphConfig.setResult(result);
    return graphConfig
}


// table configuration for document of a class
//
export const getDocumentOfTypeTabConfig = (result, getDeleteTool, getCopyIDTool, onRowClick) => {
    const tabConfig= TerminusClient.View.table()


    tabConfig.pager("remote")
    tabConfig.pagesize(10)

    let columns = getColumnsFromResults(result)

    tabConfig.column_order(...columns)
    tabConfig.row().click(onRowClick)

    return tabConfig
}

