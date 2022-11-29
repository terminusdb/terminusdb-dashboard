import React, {useState, useEffect} from 'react'
import {useQuery} from "@apollo/client";

export function ControlledGraphqlQuery (graphqlQuery, documentType, queryLimit, queryStart, order, filter) {

    const [limit, setLimit] = useState(queryLimit || 10)
    const [start, setStart] = useState(queryStart || 0)
    const [orderBy, setOrderBy] = useState(order||false)
    const [rowCount, setRowCount] = useState(0)
  //  const [hasNextPage, setHasNextPage] = useState(true)
    const [controlledRefresh, setControlledRefresh] = useState(0)
   // const [data, setData] = useState(null)
 
    //filter is the filter formatted for the query
    let filterTable  = []
    

    const [filterBy, setFilters] = useState(filterTable)
    const [queryFilters, setQueryFilters] = useState(false)

    const {loading, error, fetchMore,data} = useQuery(graphqlQuery, {onCompleted:onCompleteCall, 
      variables:{"offset":start , "limit":limit+1, 
      "orderBy":orderBy || {}, "filter":queryFilters || {}}});


      console.log("ControlledGraphqlQuery" , start,limit,orderBy,queryFilters)

    useEffect( () => {
      // we reset all the filter if the document name change
      if(documentType){
        setLimit(queryLimit || 10)
        setOrderBy(order || false)
        setStart(queryStart || 0)
        setQueryFilters(filter || false)
        formatFilterForTable()
        
      }
  }, [documentType])


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

    //remove the extra element
    function onCompleteCall(data){
        if(!Array.isArray(data[documentType]))return []
        const rowCountTmp  = limit*start+data[documentType].length
        if(data[documentType].length === (limit+1)){
         //setHasNextPage(false)
           data[documentType].pop()
        }
        setRowCount(rowCountTmp)
        setData(data)
    }

    const useFetchMore = (currentlimit,currentpage,currentOrderBy,currentFilter) =>{
      console.log("useFetchMore" ,currentFilter)
        fetchMore({
          variables:{offset:currentpage , limit:currentlimit+1, orderBy:currentOrderBy, filters:currentFilter},
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


    const changeLimits =(currentlimit,currentpage,fetchMore=false)=>{
        setStart(currentpage)
        setLimit(currentlimit)
        console.log("changeLimits" ,queryFilters)

        if(fetchMore)useFetchMore(currentlimit,currentpage,orderBy,queryFilters) 
    }

     const setAdvancedFilters = (advfilter,fetchMore=false)=>{
        setFilters([])
        setQueryFilters(advfilter)
        console.log("setAdvancedFilters" ,advfilter, queryFilters)
        if(fetchMore)useFetchMore(limit,start,orderBy,advfilter) 
     }

     const changeFilters = (filtersArr,fetchMore=false) =>{
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
        setQueryFilters(filtersTmp)

        console.log("changeFilters" ,filtersArr, filtersTmp)
        if(fetchMore)useFetchMore(limit,start,orderBy,filtersTmp)      
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
        if(fetchMore)useFetchMore(limit,start,orderByObj,queryFilters)  
      }

    const onRefresh = () => {
        setRefresh(controlledRefresh+1)
    }
    
    return {
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