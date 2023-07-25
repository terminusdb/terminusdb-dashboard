import React, {useState, useEffect} from 'react'
import TerminusClient from '@terminusdb/terminusdb-client'
const WOQL = TerminusClient.WOQL

function queryEditorRunnerHook(woqlClient, queryObj){//query, results, queryLimit, queryStart, order,total,queryObj=null) {
    const resultObj = queryObj.resultObj || {}
    const startResult = resultObj.result

    const orderBy = resultObj.orderBy
    const [result, setResult] = useState(startResult)
    const [totalRows, setTotalRows] = useState(null)    
    const [loading, setLoading] = useState(false)

    const [commitMsg, setCommitMsg]=useState()
    const [refresh, setRefresh] = useState(0)    

    const docQuery = (q) => {
        if(q.containsUpdate()) return q
        let wrapper = WOQL.query()
        if(resultObj.limit) wrapper.limit(resultObj.limit)
        if(resultObj.start) wrapper.start(resultObj.start)
        if(orderBy) wrapper.order_by(...orderBy)
        return wrapper.and(q)
    }

    const countQuery = (q) => {
        return WOQL.count("v:Count", q)
    }

    const changeOrder = (ord) => {
        if(JSON.stringify(orderBy) != JSON.stringify(ord)){
            //setOrderBy(ord)
            //setStart(0)
        }
    }

    const onRefresh = () => {
        setRefresh(refresh+1)
    }


    const changeLimits = (l, s) => {
        let ll = parseInt(l) || 0
        let ss = parseInt(s) || 0
        if(ll !== resultObj.limit) {
            resultObj.limit=ll
            //setLimit(ll)
        }
        if(ss !== resultObj.start) resultObj.start=ss

        executeQuery()
    }

    const updateQuery = (woql, commitMsg) => {
        //setWOQL(nwoql)
        //const query = queryObj.editorObj.query
        executeQuery(woql)
        setCommitMsg(commitMsg)

    }

    const executeQuery = async (woql) => {
        //I run only if the db is setted 
        //this is important or throw an error
        woql= woql || queryObj.editorObj.query
        if(woql && woqlClient.db()){
            setLoading(true)
            const tstart = Date.now()
            try{
                let q = docQuery(woql)
                const response = await woqlClient.query(q , commitMsg)
                if(!woql.containsUpdate()){
                     await executeCountQuery(woql)
                }else{
                    resultObj.totalRows = 1
                }
                processSuccessfulResult(response, tstart)
                setTotalRows(resultObj.totalRows)
            }catch(error){
                processErrorResult(error, tstart)
            }//finally{
                //setLoading(false)
            //}
        }
    }

    const executeCountQuery = (woql) => {
        let query = WOQL.count("v:Count", woql)
        return woqlClient.query(query)
        .then((cresult) => {
            let val = ((cresult && cresult.bindings && cresult.bindings.length) ? cresult.bindings[0]['Count']['@value'] : 0)
            resultObj.totalRows = val
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
            resultObj.error= null
            resultObj.result=response
            resultObj.graph =  null
            setResult(response)
            setLoading(false)
           
            
        }
    }

    /*
     * I have to review the error in interceptor
     */
    function processErrorResult(e, stime) {
        let response = {}
        attachMetadata(response, stime)
        response.status=e.status
        response.message = e.data ? `SERVER ERROR: ${e.data["api:message"]}` : "Query Error"
        resultObj.result= null
        resultObj.graph =  null
        resultObj.error= response   
        setResult(response)
        setLoading(false)    
    }

    /*useEffect( () => {
        if(loaded){
            executeQuery()
        }
        else {
            setLoaded(true)
        }
    }, [limit, start, orderBy, refresh])*/

    //run query is for query panel
   /* useEffect( () => {
        if(woql){
            if(start > 0){
                setStart(0)
            }
            else {
                executeQuery()
            }
        }
    }, [woql])*/

    return {
        updateQuery,
        changeOrder,
        changeLimits,
        result,
        loading,
        onRefresh,
        totalRows
    }
}

export {queryEditorRunnerHook}
