import React, {useState, useEffect} from "react"
import TerminusClient from '@terminusdb/terminusdb-client'
import {executeQueryHook} from "./executeQueryHook"
import {WOQLClientObj} from '../init-woql-client'
export function ScopedDetails (woqlClient, branch, dataProduct)  {

    let {branches, ref} = WOQLClientObj()
    const [latest, setLatest] = useState([])
    const [contextQuery, setContextQuery] = useState(false)
    let [contextDataProvider] = executeQueryHook(woqlClient, contextQuery)

    useEffect(() => {
        if(branch){
            //load_context(branch, ref)
        }
    }, [branch, ref, branches])

    useEffect(() => {
        if(contextDataProvider) setLatest(contextDataProvider)
    }, [contextDataProvider])


    function load_context(b, r){
        let WOQL = TerminusClient.WOQL
        let woql = WOQL.query();
        return woql;
        let commit_id = "v:Active ID"
        if(r){
            commit_id = r
        }
        let [commit_iri, cpath, tail_iri, no_tail_iri] = WOQL.vars("ciri", "cpath", "tiri", "nt_iri")

        if(r){
            let q = WOQL.using("_commits").or(
                WOQL.triple(commit_iri, "ref:commit_id", commit_id).path(commit_iri, "ref:commit_parent+", tail_iri, cpath),
                WOQL.triple(commit_iri, "ref:commit_id", r)
            )
            woql.and(WOQL.count("v:Commits", q))
        }
        else {
            woql.and(
                WOQL.count("v:Commits").and(
                    WOQL.lib().active_commit_id(b, false, "Active ID"),
                    WOQL.using("_commits").or(
                        WOQL.triple(commit_iri, "ref:commit_id", commit_id).path(commit_iri, "ref:commit_parent+", tail_iri, cpath),
                        WOQL.eq(commit_iri, "v:Active ID")
                    )
                )
            )
        }

        //schema queries
        let class_query = WOQL.quad("v:AnyClass", "type", "owl:Class", "schema")
        let prop_query = WOQL.or(
            WOQL.quad("v:AnyProperty", "type", "owl:ObjectProperty", "schema"),
            WOQL.quad("v:AnyProperty", "type", "owl:DatatypeProperty", "schema")
        )

        let docs_query = WOQL.triple("v:AnyDocument", "type", "v:AnyType")
            .sub("system:Document", "v:AnyType")

        let nq = WOQL.and(
            getSizeQuery(),
            WOQL.opt().count("v:Classes", class_query),
            WOQL.opt().count("v:Properties", prop_query),
            WOQL.limit(1).select("Commit ID", "Author", "Message", "Time", WOQL.lib().commits(WOQL.eq("v:Commit ID", commit_id))),
            woql
        )

        setContextQuery(nq)

    }

    function getSizeQuery(){
        let WOQL = TerminusClient.WOQL
        let qbase = (ref ? woqlClient.resource("ref", ref) : woqlClient.resource("branch", branch))
        let q = WOQL.opt().and(
            WOQL.size(qbase, "v:Size").triple_count(qbase, "v:Triples")
        )
        return q
    }

    if(!latest) return []

    return latest
}