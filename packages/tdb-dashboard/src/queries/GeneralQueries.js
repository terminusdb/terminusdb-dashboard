import TerminusClient from '@terminusdb/terminusdb-client'
import {shortenURL, covertStringToId} from "../components/utils"

export const ClassFromSchema = () => {
    let WOQL=TerminusClient.WOQL
    return WOQL.quad("v:Class ID", 'type', 'owl:Class', "schema/main").
        quad("v:Class ID", 'label', "v:Class Name", "schema/main")
}

export const getDocsTypeQuery=(type)=>{
    let WOQL =  TerminusClient.WOQL
    var docType=checkIfPrefix(type)
    let q = WOQL.isa("v:Documents", docType)
    return q
}

export const getDocsQuery = () =>{
    let WOQL =  TerminusClient.WOQL
    let q = WOQL.limit(500).isa("v:Documents", "v:Type")
    return q
}

export const getPropertiesOfClass = (id, dataProduct, woqlClient) => {
    if(!id && !dataProduct && !woqlClient) return null
    let WOQL=TerminusClient.WOQL
    let user=woqlClient.user()
    let dp = `${user.id}/${dataProduct}`

    return WOQL.using(dp).select("v:Property ID","v:Property Name","v:Property Domain","v:Property Type","v:Property Range","v:Property Description").and(
        WOQL.quad("v:Property ID", "type", "v:OWL Type", "schema/main"),
        WOQL.and(
            WOQL.quad("v:Property ID", "domain", id, "schema/main"),
            WOQL.quad("v:Property ID", "range", "v:Property Range", "schema/main"),
            WOQL.quad("v:Property ID", "domain", "v:Property Domain", "schema/main")
        ),
        WOQL.limit(1).or(
            WOQL.and(
                WOQL.eq("v:OWL Type", "DatatypeProperty"),
                WOQL.eq("v:Property Type", "Data")
            ),
            WOQL.and(
                WOQL.eq("v:OWL Type", "ObjectProperty"),
                WOQL.eq("v:Property Type", "Object")
            )
        ),
        WOQL.limit(1).or(
            WOQL.quad("v:Property ID", "label", "v:Property Name", "schema/main"),
            WOQL.eq("v:Property Name", "")
        ),
        WOQL.limit(1).or(
            WOQL.quad("v:Property ID", "comment", "v:Property Description", "schema/main"),
            WOQL.eq("v:Property Description", "")
        )
    )
}

export const getPropertyRelation = (id, dataProduct, woqlClient) => {
    if(!id  && !dataProduct && !woqlClient) return
    let WOQL=TerminusClient.WOQL
    let user=woqlClient.user()
    let dp = `${user.id}/${dataProduct}`

    return WOQL.limit(1).triple("v:Subject",  id, "v:Predicate")
}

// query to store query object in query library database
/** leave this here might use later on for dev  */
export const storeQueries = (query, saveQueryName) => {
    let WOQL=TerminusClient.WOQL
    let id = covertStringToId(saveQueryName)
    var json
    //console.log("query", query)
    if(query) {
        let q = query.query
        json = {
            "@id": id,
            "@type": "scm:Worker",
            "rdfs:comment": {
              "@type": "xsd:string",
              "@value": saveQueryName
            },
            "rdfs:label": {
              "@type": "xsd:string",
              "@value": saveQueryName
            },
            "scm:DatabaseID": {
              "@type": "xsd:string",
              "@value": "Kitty_Bikes"
            },
            "scm:query": {
              "@type": "xsd:string",
              "@value": JSON.stringify(q)
            }
          }
    }
    return WOQL.using("admin/live").update_object(json)
}

export const getStoredQueriesNames = () => {
    let WOQL=TerminusClient.WOQL

    return WOQL.using("admin/live").triple("v:Worker", "type", "scm:Worker").
        triple("v:Worker", "DatabaseID", "Kitty_Bikes").
        triple("v:Worker", "query", "v:Query").
        triple("v:Worker", "label", "v:Query Name")

}

export const getStoredQueryObject = (id) => {
    if(!id) return
    let WOQL=TerminusClient.WOQL
    let user=woqlClient.user()
    let dp = `${user.id}/${dataProduct}`
    return WOQL.using(dp).triple(id, "query", "v:Query")

}

/**** Document Queries  ****/
<<<<<<< HEAD
=======
export const getDocumentsOfType = (doctype) => {
    return ''
   /* let WOQL =  TerminusClient.WOQL
    return  WOQL.and(
        WOQL.lib().document_metadata()
    ).sub(doctype, "v:Type ID")*/
}
/*export const getDocumentsOfType = (doctype) => {
    let WOQL =  TerminusClient.WOQL
    return  WOQL.and(
        WOQL.lib().document_metadata()
    ).sub(doctype, "v:Type ID")
}*/

const checkIfPrefix =(id)=>{
    if(id.indexOf(":")>-1){
        return id
    }
    return "@schema:"+id
}
>>>>>>> ee5d3b3794054f702fa558f5563e1e61ae3ef6a1
// get count of document class instance
export const getCountOfDocumentClass = (documentClasses) => {
    let WOQL =  TerminusClient.WOQL
    let CountArray=[]
    documentClasses.map(item => { // set type of document
        let scmType=checkIfPrefix(item["@id"])
        let variable="v:"+item["@id"]
        let split = item["@id"].split(':')
        if(split.length === 2){
            scmType=split[1]
        }
        CountArray.push(WOQL.count (variable, WOQL.triple("v:Doc", "rdf:type", scmType)))
    })

    let q = WOQL.and(...CountArray)
    return q
}

export const getTotalNumberOfDocuments = (documentClasses) => {
    let WOQL =  TerminusClient.WOQL
    let CountArray=[]
    let variableList = []
    documentClasses.map(item => { // set type of document
        let scmType= checkIfPrefix(item["@id"])
        let variable="v:"+item["@id"]
        let split = item["@id"].split(':')
        if(split.length === 2){
            scmType=split[1]
        }
        variableList.push(variable)
        CountArray.push(WOQL.count (variable, WOQL.triple("v:Doc", "rdf:type", scmType)))
    })

    let q = WOQL.and(...CountArray, WOQL.sum(variableList, "v:Count"))
    return q
<<<<<<< HEAD
}
=======
}
>>>>>>> ee5d3b3794054f702fa558f5563e1e61ae3ef6a1
