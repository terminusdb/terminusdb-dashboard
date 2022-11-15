import React, {useState, useEffect} from 'react'
import {useQuery} from "@apollo/client";

export function ControlledGraphqlQuery (graphqlQuery, documentType, queryLimit, queryStart, order, filter) { 
    const [limit, setLimit] = useState(queryLimit || 10)
    const [start, setStart] = useState(queryStart || 0)
    const [orderBy, setOrderBy] = useState(order||false)
    const [rowCount, setRowCount] = useState(0)
    const [hasNextPage, setHasNextPage] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [controlledRefresh, setControlledRefresh] = useState(0)
 
    //filter is the filter formatted for the query
    let filterTable  = []
    if (filter){
      const keys = Object.keys(filter)
      keys.forEach(propN =>{
        
         const operator = Object.keys(filter[propN])[0]

         filterTable.push({id:propN, value:{value:filter[propN][operator],operator:operator}})
      })
    }

    console.log("filterTable",filterTable,filter)
  
    const [filterBy, setFilters] = useState(filterTable)
    const [queryFilters, setQueryFilters] = useState(filter || {})
  
    const {loading, error, data, fetchMore } = useQuery(graphqlQuery, {variables:{offset:0 , limit:10, orders:{},filter:queryFilters}});

   useEffect(() => {
        setLimit(queryLimit)
        setStart(0)
        setOrderBy(false)
        //we see for the tablefilter
        setQueryFilters(filter || {})
    }, [graphqlQuery])

    const changeLimits =(currentlimit,currentpage)=>{
         setStart(currentpage)
         setLimit(currentlimit)
        
         fetchMore({
             variables:{offset:currentpage , limit:currentlimit+1, filters:queryFilters},
             updateQuery: (prev, { fetchMoreResult }) => {
               //if (!fetchMoreResult) return prev;
               if(!Array.isArray(fetchMoreResult[documentType]))return []
               if(fetchMoreResult[documentType].length<(limit+1)){
                 setHasNextPage(false)
                 return fetchMoreResult 
               }
               fetchMoreResult[documentType].pop()
               return fetchMoreResult
             }
           })
     }

     //"filter": {"rgb": {"regex": "FFFFF"}}

     const changeFilters = (filtersArr) =>{
        const filtersTmp = {}
        if(Array.isArray(filtersArr)){
          filtersArr.forEach(item=>{
            // value has operator:value {"eq":"myvalue"}
            const value = {[item.value.operator]: item.value.value}
            if(item.varPath){

              const level01 = Object.keys(item.varPath)[0]
              if(!filtersTmp[level01] ) filtersTmp[level01] = {}

              const level02 = Object.keys(item.varPath[level01])[0]
              filtersTmp[level01][level02] = value

            }else
            filtersTmp[item.id] = value
          })
        }
        setFilters(filtersArr)
        setQueryFilters(filtersTmp)
       // console.log("callSetFilters",filters)
        fetchMore({
          variables:{offset:start , limit:limit+1, orderBy:{}, filter:filtersTmp},
  
          updateQuery: (prev, { fetchMoreResult }) => {
            //if (!fetchMoreResult) return prev;
            if(!Array.isArray(fetchMoreResult[documentType]))return []
            if(fetchMoreResult[documentType].length<(limit+1)){
              setHasNextPage(false)
              return fetchMoreResult 
            }
            fetchMoreResult[documentType].pop()
            return fetchMoreResult /*Object.assign({}, prev, {
              Color: [...prev.Color, ...fetchMoreResult.Color]
            });*/
          }
        })
      
      }

     const changeOrder = (orderByArr) =>{
        const orderByObj = {}
        if(Array.isArray(orderByArr)){        
          orderByArr.forEach(item=>{
            orderByObj[item.id] = item.desc === true ? "DESC" : "ASC"
          })
  
        }
        setOrderBy(orderByArr)
        fetchMore({
          variables:{offset:start , limit:limit+1, orderBy:orderByObj,filter:queryFilters},
  
          updateQuery: (prev, { fetchMoreResult }) => {
            //if (!fetchMoreResult) return prev;
            if(!Array.isArray(fetchMoreResult[documentType]))return []
            if(fetchMoreResult[documentType].length<(limit+1)){
              setHasNextPage(false)
              return fetchMoreResult 
            }
            fetchMoreResult[documentType].pop()
            return fetchMoreResult /*Object.assign({}, prev, {
              Color: [...prev.Color, ...fetchMoreResult.Color]
            });*/
          }
        })
      }

    const onRefresh = () => {
        setRefresh(controlledRefresh+1)
    }

    // maybe we need this
    const checkIfPrefix =(id)=>{
        if(id.indexOf(":")>-1){
            return id
        }
        return "@schema:"+id
    }
    

    return {
        documentError:error,
       // updateDocument,
        changeOrder,
        changeLimits,
        changeFilters,
        orderBy,
        filterBy,
       // controlledDocument,
        limit,
        start,
        loading,
        rowCount,
        onRefresh,
        documentResults:data,
        // maybe we need to set from outside
       // setDocumentResults,
       // setControlledRefresh,
        controlledRefresh
    }
}