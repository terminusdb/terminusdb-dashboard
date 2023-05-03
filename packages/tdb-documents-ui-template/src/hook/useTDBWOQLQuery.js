import React, {useState, useEffect} from 'react'
import TerminusClient from '@terminusdb/terminusdb-client'
const WOQL = TerminusClient.WOQL

export function useTDBWOQLQuery(woqlClient, query, results, queryLimit, queryStart, order,total) {
    const [limit, setLimit] = useState(queryLimit || 0)
    const [start, setStart] = useState(queryStart || 0)
    const [orderBy, setOrderBy] = useState(order||false)
    const [rowCount, setRowCount] = useState()
    const [result, setResult] = useState(results)
    const [loading, setLoading] = useState(false)
    const [woql, setWOQL] = useState(query || false)
    const [loaded, setLoaded] = useState(false)
    const [commitMsg, setCommitMsg]=useState()
    const [refresh, setRefresh] = useState(0)

    const docQuery = (q) => {
        if(q.containsUpdate()) return q
        let wrapper = WOQL.query()
        if(limit) wrapper.limit(limit)
        if(start) wrapper.start(start)
        if(orderBy) wrapper.order_by(...orderBy)
        return wrapper.and(q)
    }

    const changeOrder = (ord) => {
        if(JSON.stringify(orderBy) != JSON.stringify(ord)){
            setOrderBy(ord)
            setStart(0)
        }
    }

    const onRefresh = () => {
        setRefresh(refresh+1)
    }

    /*
    * change the limit and the start-page
    */
    const changeLimits = (l, s) => {
        let ll = parseInt(l) || 0
        let ss = parseInt(s) || 0
        if(ll != limit) {
            setLimit(ll)
        }
        if(ss != start) setStart(ss)
    }

    const updateQuery = (nwoql, commitMsg) => {
        setWOQL(nwoql)
        setCommitMsg(commitMsg)
    }

    const executeQuery = async () => {
        //I run only if the db is setted 
        //this is important or throw an error
        if(woql && woqlClient.db()){
            setLoading(true)
            let tstart = Date.now()
            let q = docQuery(woql)
            try{
                const response = await woqlClient.query(q , commitMsg)
                //maybe I can do the count query only the first time
                //the only thing it doesn't work if in the middle time we add another item
                if(!woql.containsUpdate()) {
                    const countResult= await executeCountQuery()
                    setRowCount(countResult)
                }
                processSuccessfulResult(response, tstart)
            }catch(err){
                processErrorResult(err, tstart)
            }finally{
                setLoading(false)
            }
        }
    }

    const executeCountQuery = () => {
        let q = WOQL.count("v:Count", woql)
        return woqlClient.query(q)
        .then((cresult) => {
            return ((cresult && cresult.bindings && cresult.bindings.length) ? cresult.bindings[0]['Count']['@value'] : 0)
           
        })
    }

    function attachMetadata(metadata, stime) {
        metadata.start = stime
        metadata.end = new Date()
        metadata.duration = metadata.end - stime
        if(typeof metadata.bindings != "undefined"){
            metadata.rows = metadata.bindings ? metadata.bindings.length : 0
            metadata.columns = metadata.bindings && metadata.bindings[0] ? metadata.bindings[0].length : 0
        }
    }

    function processSuccessfulResult(response, stime) {
        if (response) {
            attachMetadata(response, stime)
            response.status=200
            setResult(response)
        }
    }

    /*
     * I have to review the error in interceptor
     */
    function processErrorResult(e, stime) {
        let response = {}
        attachMetadata(response, stime)
        response.status=e.status
        response.error = e
        setResult(response)
    }

    useEffect( () => {
        if(loaded){
            executeQuery()
        }
        else {
            setLoaded(true)
        }
    }, [limit, start, orderBy, refresh])

    //run query is for query panel
    useEffect( () => {
        if(woql){
            if(start > 0){
                setStart(0)
            }
            else {
                executeQuery()
            }
        }
    }, [woql])

    return {
        updateQuery,
        changeOrder,
        changeLimits,
        woql,
        result,
        limit,
        start,
        loading,
        rowCount,
        onRefresh
    }
}
