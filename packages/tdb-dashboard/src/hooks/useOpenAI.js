import React, {useState,useEffect} from "react";
import {WOQL} from "@terminusdb/terminusdb-client" 
import { WOQLClientObj } from "../init-woql-client";
import {gql} from "@apollo/client"
import { useLocation } from "react-router-dom";
import Handlebars from "handlebars";
import {UTILS} from '@terminusdb/terminusdb-client'
import { getIntrospectionQuery } from 'graphql';
import { createGraphiQLFetcher } from '@graphiql/toolkit';

export function useOpenAI(){ 
    const {apolloClient,woqlClient,clientUser} = WOQLClientObj()

    const [graphqlSchema,setGraphQlSchema] = useState(false)
    const [queryResult,setQueryResult] = useState(false)
    const [queryResultPreview,setQueryResultPreview] = useState(false)

    const [hasKey,setHasKey] = useState(false)

    const [documentClasses,setResultClasses] = useState(false)

    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)

    const [start,setStartValue] = useState(0)
    const [searchResult,setSearchResult] = useState(false)

    const [percentTask,setPercentTask] = useState(0)
    const [searchableCommit,setSearchableCommit] = useState(false)

    const location = useLocation()

    const resetSearch =() => {
        if(location.state && location.state.previewPage === "documentView"){
            const resultSaved = localStorage.getItem(`${location.pathname}___SEARCH__RESULT`)
            const startSaved = localStorage.getItem(`${location.pathname}___START`) || 0
            setStartValue(Number(startSaved))
            if(resultSaved)setSearchResult(JSON.parse(resultSaved))
        }else{
            setStartValue(0)
            setSearchResult(false)
        }
     }

    function getUrl(action="changes"){
        const client = woqlClient.copy()
        client.connectionConfig.api_extension = 'api/'
        if(client.connectionConfig.baseServer){
            client.connectionConfig.server = client.connectionConfig.baseServer
        }
        return client.connectionConfig.dbBase(action)
    }

    const setStart = (value) =>{
        setStartValue(value)
        localStorage.setItem(`${location.pathname}___START`,start)
    }

        ///changes/:orgid/:dbid/indexedcommit
    const updateIndexStatus = async (commit,status)=>{
        try{
            setLoading(true)
            const url = `${getUrl('indexes')}/${commit}`
            const result = await woqlClient.sendCustomRequest("PUT", url,{status:status})
            return result
            }catch (err){
                setError(err.data || err.message)
            }finally{
                setLoading(false)
        }
    }

    ///changes/:orgid/:dbid/indexedcommit
    const getSearchableCommit = async (limit=1, status=null, branch=null)=>{
        try{
            setLoading(true)
            setSearchableCommit(false)
            const statusQuery = status ? `&status=${status}` : ''
            const branchQuery = branch ? `&branch=${branch}` : ''
            const url = `${getUrl('indexes')}?limit=${limit}${statusQuery}${branchQuery}`
            const result = await woqlClient.sendCustomRequest("GET", url)
            if(result && result.bindings && result.bindings.length>0){
                setSearchableCommit(result.bindings)
            }
        }catch (err){
            setError(err.data || err.message)
            setSearchableCommit(false)    
        }finally{
            setLoading(false)
        }
    }

    const getResearchResult = async (commit, freeText) =>{
        if(woqlClient){
            try{
                setLoading(true)
                setSearchResult(false)
                localStorage.setItem(`${location.pathname}___SEARCH__TEXT`,freeText)
                const url = `${getUrl('indexes')}/search?commit=${commit}`
                const result = await woqlClient.sendCustomRequest("POST", url , {search:freeText})
                localStorage.setItem(`${location.pathname}___SEARCH__RESULT`,JSON.stringify(result))
                setSearchResult(result)
            }catch(err){
               setError(err.data || err.message)              
            }finally{
                setLoading(false)
            }
         }
    }

    const getLastBranchCommit = async (branch) =>{
        const query = WOQL.lib().commits(branch, 1, 0);

        const tmpWoqlClient =  woqlClient.copy()

        const commit = await tmpWoqlClient.query(query)
        // it is called inside a try/catch
        return  commit.bindings[0]['Commit ID']['@value']
    }

    const timeout = (time) => new Promise((resolve) => setTimeout(resolve, time));

    const stopPolling = ()=>{
        clearTimeout(timeout)
    }

    const pollingCall = async (commitid,updateStatus) =>{
        try{
            const pollingUrl = `${getUrl('indexes')}/${commitid}/check`
            const document = await woqlClient.sendCustomRequest("GET", pollingUrl)
            if(document.indexing_status !== "Assigned" && document.indexing_status !== "Error"){
                await timeout(5000)
                await pollingCall(commitid,updateStatus)
            }else{
                if(updateStatus)updateStatus(document)
            }
        }catch(err){
            clearTimeout(timeout)
        }finally{
            setLoading(false)
        }
    }

    const startIndexer = async (changeRequestId,domain,branch) =>{
        if(woqlClient){
            try{
                setLoading(true)
                const commit = await getLastBranchCommit(branch)
                const url = `${getUrl()}/${changeRequestId}/index?domain=${domain}&commit=${commit}`
                const currentTask = await woqlClient.sendCustomRequest("GET", url)
                setPercentTask(0.1)
                pollingCall(currentTask.indexRef)
            }catch(err){
               setError(err.data || err.message) 
               setLoading(false)
            } 
         }
    }

    const hasOpenAIKEY = async(orgName) =>{
        if(woqlClient){
            try{
                setLoading(true)
                const client = woqlClient.copy()
                let url 
                if(clientUser.serverType === "TerminusDB" ){
                    url = `${client.connectionConfig.baseServer}api/indexes/${UTILS.encodeURISegment(orgName)}/openaikey`
                }else{
                    url = `${client.server()}api/private/organizations/${UTILS.encodeURISegment(orgName)}/openaikey`
                }
                const hasKeyResult = await client.sendCustomRequest("GET", url)
                setHasKey(hasKeyResult.key )
            }catch(err){
               setError() 
            }finally{
                setLoading(false)
            }  
         }
    }

    const deleteOpenAIKEY = async(orgName) =>{
        if(woqlClient){
            try{
                setLoading(true)
                const client = woqlClient.copy()
                const url = `${client.server()}api/private/organizations/${UTILS.encodeURISegment(orgName)}/openaikey`
                const keyStatusObj = await client.sendCustomRequest("DELETE", url)
                setHasKey(keyStatusObj.key)
                return keyStatusObj
            }catch(err){
               setError() 
            }finally{
                setLoading(false)
            }  
         }
    }

    const changeOpenAIStatus= async(orgName,isActive) =>{
        if(woqlClient){
            try{
                setLoading(true)
                const client = woqlClient.copy()
                const url = `${client.server()}api/private/organizations/${UTILS.encodeURISegment(orgName)}/openaikey`
                const keyStatusObj = await client.sendCustomRequest("PUT", url ,{isActive})
                setHasKey(keyStatusObj.key)
            }catch(err){
               setError() 
            }finally{
                setLoading(false)
            }  
         }
    }

    const saveOpenAIKey = async(orgName,key) =>{
        if(woqlClient){
            try{
                setLoading(true)
                const client = woqlClient.copy()
                const url = `${client.server()}api/private/organizations/${UTILS.encodeURISegment(orgName)}/openaikey`
                const keyStatusObj = await client.sendCustomRequest("POST", url ,{key:key})
                setHasKey(keyStatusObj.key)
            }catch(err){
               setError() 
            }finally{
                setLoading(false)
            }  
         }
    }

    const getDocumentClasses = async ()=>{
      if(woqlClient){
         try{
             setLoading(true)
             const result = await woqlClient.getClasses()
             setResultClasses(result)
         }catch(err){
            setError() 
            setGraphQlSchema(null)
         }finally{
             setLoading(false)
         }  
      }
    }

    const getGraphQLSchema= async ()=>{
        if(woqlClient){
            try{
                setLoading(true)
                setGraphQlSchema(false)
                const client = woqlClient.copy()
                const url = client.connectionConfig.branchBase("graphql")
            
                // TO BE REVIEW!!!!
                const autorization = woqlClient.localAuth().type === "jwt" ? 'Bearer '+ woqlClient.localAuth().key : 'Basic '+ btoa(`${woqlClient.localAuth().user}:${woqlClient.localAuth().key}`)
 
                const fetcher = createGraphiQLFetcher({
                        url:url,
                        headers: {
                        authorization: autorization
                    }
                });

                const result = await fetcher({
                    query: getIntrospectionQuery(),
                    operationName: 'IntrospectionQuery',
                  });

                setGraphQlSchema(result.data);
            }catch(err){
                setError(err.message) 
                setGraphQlSchema(null)
            }finally{
                setLoading(false)
            }
        } 
    }

    const updateDocument = async (type,queryStr,handlebarsTemplate)=>{
        try{
            setLoading(true)
            const classObj= documentClasses.find(item=>item['@id']===type)
            if(!classObj['@metadata']) classObj['@metadata'] = {}
            if(!classObj['@metadata']['embedding']) classObj['@metadata']['embedding'] ={}
            classObj['@metadata']['embedding']['query']=queryStr;
            classObj['@metadata']['embedding']['template']=handlebarsTemplate;
            await woqlClient.updateDocument(classObj,{graph_type:"schema"})
            return true
        }catch(err){
            setError(err.data || err.message) 
        }finally{
            setLoading(false)
        }
    }

    const resetPreviewResult=()=>{
        setQueryResult(false)
        setQueryResultPreview(false)
    }

    const getPrewiew = async (type,queryStr,handlebarsTemplate)=>{
      try{
         setError(false)
         let queryWithLimit = queryStr  
         if(queryStr.indexOf("$limit") === -1){
            queryWithLimit = queryStr.replace("(","($offset: Int, $limit: Int, ")
            queryWithLimit = queryWithLimit.replace(`${type}(`,`${type}(offset: $offset, limit: $limit, `)
         }
         setLoading(true)
         const query = gql(`${queryWithLimit}`)
         const result = await apolloClient.query({query:query,variables:{limit:10,offset:0}})
         
         if(result.errors){
            setError(result.errors)
            resetPreviewResult()
         }else{ 
            let template = []
            const resData = result.data[type]
            if(resData.length>0){
                const template01 = Handlebars.compile(handlebarsTemplate);    
                template = result.data[type].map(item=>template01(item))
            }
            setQueryResult(resData)
            setQueryResultPreview(template)
         }
      }catch(err){
            setError(err.data || err.message) 
            resetPreviewResult()
      }finally{
            setLoading(false)
      }
    }

    
    return {pollingCall,
            updateIndexStatus,
            resetSearch,
            getPrewiew,
            resetPreviewResult,
            getSearchableCommit,
            searchableCommit,
            changeOpenAIStatus,
            stopPolling,
            hasKey,
            getLastBranchCommit,
            startIndexer,
            percentTask,
            saveOpenAIKey,
            hasOpenAIKEY,
            deleteOpenAIKEY,
            setStart,
            start,
            searchResult,
            getResearchResult,
            getGraphQLSchema,
            getDocumentClasses,
            documentClasses,
            graphqlSchema,
            error,
            setError,
            updateDocument,
            loading, 
            queryResult,
            queryResultPreview}


}

