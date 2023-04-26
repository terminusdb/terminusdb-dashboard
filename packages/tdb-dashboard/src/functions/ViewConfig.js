import TerminusClient from '@terminusdb/terminusdb-client'
import {arrayEquals} from "../components/utils"

export const tableViewConfig= (onRowClick) => {
    const tabConfig= TerminusClient.View.table();
    tabConfig.pager("remote")
    tabConfig.pagesize(10)
    if(onRowClick)tabConfig.row().click(onRowClick)
    return tabConfig
}

export const tableViewConfigLocal= () => {
    const tabConfig= TerminusClient.View.table();
    tabConfig.pager("local")
    tabConfig.pagesize(10)
    return tabConfig
}

/*
{
    "Duration": {
        "@type": "http://www.w3.org/2001/XMLSchema#integer",
        "@value": 288
    },
    "End": "terminusdb:///data/Station_31009",
    "End_Label": {
        "@type": "http://www.w3.org/2001/XMLSchema#string",
        "@value": "Crystal Dr & 27th St S"
    },
    "Start": "terminusdb:///data/Station_31007",
    "Start_Label": {
        "@type": "http://www.w3.org/2001/XMLSchema#string",
        "@value": "Crystal City Metro / 18th & Bell St"
    }
}
*/

/*
triple("v:Domain", propertId, "v:Range").
triple("v:Domain", "label", "v:Domain Label").
quad(propertId, "label", "v:Range Label", "schema/main")*/


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
            graph.node(item).color([40, 112, 194]).size(30).text(item).icon({label: true, color: [208, 212, 216]})
        }
    }



    let graphConfig = graph.create(null);
    graphConfig.setResult(result);
    return graphConfig
}