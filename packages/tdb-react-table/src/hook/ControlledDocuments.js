import React, {useState, useEffect} from 'react'
import TerminusClient from '@terminusdb/terminusdb-client'
const WOQL = TerminusClient.WOQL

function ControlledDocuments (woqlClient, type, documents, queryLimit, queryStart, order) { 
    const [limit, setLimit] = useState(queryLimit || 10)
    const [start, setStart] = useState(queryStart || 0)
    const [orderBy, setOrderBy] = useState(order||false)
    const [rowCount, setRowCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [controlledRefresh, setControlledRefresh] = useState(0)
    const [documentResults, setDocumentResults]= useState(documents)
    const [documentError, setDocumentError]= useState(false)

    const controlledDocument = type

    const changeOrder = (ord) => {
        if(JSON.stringify(orderBy) != JSON.stringify(ord)){
            setOrderBy(ord)
            setStart(0)
        }
    }

    const changeLimits = (l, s) => {
        let ll = parseInt(l) || 0
        let ss = parseInt(s) || 0
        if(ll !== limit) {
            setLimit(ll)
        }
        if(ss !== start) setStart(ss)
    }

    const onRefresh = () => {
        setRefresh(controlledRefresh+1)
    }

    //I prefer run the query directly and pass the new document
    //to be review
    //the result is the only things that trigger a refresh
    const updateDocument = () =>{
        //setControlledDocument(document)
    }

    // we need the query result and the count query result
    const executeQuery = async () => {
        if(controlledDocument && woqlClient){
            let params = {}
            setLoading(true)
            let tstart = Date.now()
            let db=woqlClient.db()
            params['type'] = controlledDocument
            params['as_list'] = true
            params['skip'] = start
            params['count']=limit
            try{
                const response = await woqlClient.getDocument(params, db)
                const countResult = await executeCountQuery() 
                setDocumentResults(response)
                setRowCount(countResult)
               
            }catch(error){
                processErrorResult(error, tstart)
            }finally{
                setLoading(false)
            }
        }
    }
    const checkIfPrefix =(id)=>{
        if(id.indexOf(":")>-1){
            return id
        }
        return "@schema:"+id
    }

    const executeCountQuery = () => {
        const typeDoc = checkIfPrefix(type)
        let q = WOQL.count("v:Count", WOQL.triple("v:doc","rdf:type",typeDoc))
        return woqlClient.query(q)
        .then((cresult) => {
            return ((cresult && cresult.bindings && cresult.bindings.length) ? cresult.bindings[0]['Count']['@value'] : 0)
        })
    }

    /*
     * I have to review the error in interceptor
     */
    function processErrorResult(e, stime) {
        let response = {}
        response.status=e.status
        response.error = e
        setDocumentError(response)
    }

    useEffect( () => {
        if(loaded){
            setDocumentResults(false)
            executeQuery()
        }
        else {
            setLoaded(true)
        }
    }, [limit, start, orderBy, controlledRefresh])

    useEffect( () => {
        if(controlledDocument){
            if(start > 0){
                setStart(0)
            }
            else {
                executeQuery()
            }
        }
    }, [controlledDocument])

    return {
        documentError,
        updateDocument,
        changeOrder,
        changeLimits,
        controlledDocument,
        limit,
        start,
        loading,
        rowCount,
        onRefresh,
        documentResults,
        setDocumentResults,
        setControlledRefresh,
        controlledRefresh
    }
}

export {ControlledDocuments}
