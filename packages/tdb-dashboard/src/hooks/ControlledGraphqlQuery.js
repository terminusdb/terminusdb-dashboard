import React, {useState, useEffect} from 'react'
//import {useQuery} from "@apollo/client";

export function ControlledGraphqlQuery (apolloClient, graphqlQuery, documentType, queryLimit, queryStart, order, filter) {

    const [limit, setLimit] = useState(queryLimit || 10)
    const [start, setStart] = useState(queryStart || 0)
    const [orderBy, setOrderBy] = useState(order||false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [rowCount, setRowCount] = useState(0)
  //  const [hasNextPage, setHasNextPage] = useState(true)
    const [controlledRefresh, setControlledRefresh] = useState(0)
    const [data, setData] = useState(null)
 
    //filter is the filter formatted for the query
    let filterTable  = []
    

    const [filterBy, setFilters] = useState(filterTable)
    const [queryFilters, setQueryFilters] = useState(false)

   
    function formatFilterForTable(){
      if (filter){
      const keys = Object.keys(filter)
      keys.forEach(propN =>{
        
         const operator = Object.keys(filter[propN])[0]

         filterTable.push({id:propN, value:{value:filter[propN][operator],operator:operator}})
      })
        setFilters(filterTable)
      }
    }

    const callFetchMore = async (currentlimit,currentpage,currentOrderBy,currentFilter) =>{
        setLoading(true)
        setError(false)
        try{
        const result = await apolloClient.query({query:graphqlQuery,
            variables:{"offset":currentpage , "limit":currentlimit+1, 
            "orderBy":currentOrderBy || {}, "filter":currentFilter || {}}})
        
        if(result.errors) {
            setRowCount(0)
            setData([])
            setError("Graphql Error")
        }else{
            const data = result.data 
            if(!Array.isArray(data[documentType]))return []
                //current page is the startoffset
                const rowCountTmp  = currentpage+data[documentType].length
                if(data[documentType].length === (currentlimit+1)){
                //setHasNextPage(false)
                data[documentType].pop()
                }
                setRowCount(rowCountTmp)
                setData(data)
        }
        }catch(err){
            console.log("ERRORRRRR",err)
        }finally{
            setLoading(false)
        }
    }


    const changeLimits =(currentlimit,currentpage,fetchMore=false)=>{
        setStart(currentpage)
        setLimit(currentlimit)
        console.log("changeLimits" ,queryFilters)
        callFetchMore(currentlimit,currentpage,orderBy,queryFilters) 
    }

     const setAdvancedFilters = (advfilter,fetchMore=false)=>{
        setFilters([])
        setQueryFilters(advfilter)
        console.log("setAdvancedFilters" ,advfilter, queryFilters)
        callFetchMore(limit,start,orderBy,advfilter) 
     }

     const changeFilters = (filtersArr) =>{
        const filtersTmp = {}
        if(Array.isArray(filtersArr)){
          filtersArr.forEach(item=>{
            // value has operator:value {"eq":"myvalue"}
            if(item.value){
              let elementValue = item.value.value
              if(item.value.operator === "regex"){
                elementValue = `(?i)${elementValue}`
            }

              let value = {[item.value.operator]: elementValue}

              if(item.value.mode === "ARRAY"){
                value = {"someHave": {[item.value.operator]: elementValue}}
              }
             
              //max 2 level
              if(item.value.varPath){
                try{
                  const level01 = Object.keys(item.value.varPath)[0]
                  if(!filtersTmp[level01] ) filtersTmp[level01] = {}

                  const level02 = Object.keys(item.value.varPath[level01])[0]
                  filtersTmp[level01][level02] = value
                }catch(err){
                  console.log(err.message)
                  filtersTmp[item.id] = value
                }
              }else{
                filtersTmp[item.id] = value
              }
            }
          })
        }
        setFilters(filtersArr)
        setStart(0)
        setQueryFilters(filtersTmp)

        console.log("changeFilters" ,filtersArr, filtersTmp)
        callFetchMore(limit,0,orderBy,filtersTmp)      
      }

     const changeOrder = (orderByArr,fetchMore=false) =>{
        const orderByObj = {}
        if(Array.isArray(orderByArr)){        
          orderByArr.forEach(item=>{
            orderByObj[item.id] = item.desc === true ? "DESC" : "ASC"
          }) 
        }
        setOrderBy(orderByObj)
        console.log("changeOrder" ,orderByArr, queryFilters)
        callFetchMore(limit,start,orderByObj,queryFilters)  
      }

    const onRefresh = () => {
        setRefresh(controlledRefresh+1)
    }
    
    return {
        callFetchMore,
        documentError:error,
       // updateDocument,
        changeOrder,
        changeLimits,
        changeFilters,
        setAdvancedFilters,
        orderBy,
        filterBy,
        queryFilters,
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