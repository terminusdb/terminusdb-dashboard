import React, {useState, useEffect} from 'react'
import {useQuery} from "@apollo/client";

export function ControlledGraphqlQuery (graphqlQuery, documentType, queryLimit, queryStart, order, filterBy) { 
    const [limit, setLimit] = useState(queryLimit || 10)
    const [start, setStart] = useState(queryStart || 0)
    const [orderBy, setOrderBy] = useState(order||false)
    const [rowCount, setRowCount] = useState(0)
    const [hasNextPage, setHasNextPage] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [controlledRefresh, setControlledRefresh] = useState(0)
    const [filters, setFilters] = useState(filterBy || {})
  
    const {loading, error, data, fetchMore } = useQuery(graphqlQuery, {variables:{offset:0 , limit:10}});

    //console.log("graphqlQuery",documentType, queryLimit, queryStart, order, filterBy)

   // console.log("graphqlQuery",limit, start, orderBy, filters)
   useEffect(() => {
        setLimit(queryLimit)
        setStart(0)
        setOrderBy(false)
        setFilters({})
    }, [graphqlQuery])

    const changeLimits =(currentlimit,currentpage)=>{
         setStart(currentpage)
         setLimit(currentlimit)
        
         fetchMore({
             variables:{offset:currentpage , limit:currentlimit+1, ...filters},
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

     const changeFilters = (filtersArr) =>{
        const filters = {}
        if(Array.isArray(filtersArr)){
          filtersArr.forEach(item=>{
            filters[item.id] = item.value
          })
        }
       // console.log("callSetFilters",filters)
        setFilters(filters)
        fetchMore({
          variables:{offset:start , limit:limit+1, orderBy:{}, ...filters},
  
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
          variables:{offset:start , limit:limit+1, orderBy:orderByObj},
  
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