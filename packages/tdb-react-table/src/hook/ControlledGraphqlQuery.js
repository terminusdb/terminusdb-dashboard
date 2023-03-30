import React, {useState, useEffect} from 'react'
import {extractDocuments} from './hookUtility'

export function ControlledGraphqlQuery (apolloClient, graphqlQuery, documentType, queryLimit, queryStart, order, filter,tableConfigObj,hiddenColumnsStart) {
    const [limit, setLimit] = useState(queryLimit || 10)
    const [start, setStart] = useState(queryStart || 0)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [rowCount, setRowCount] = useState(0)
  //  const [hasNextPage, setHasNextPage] = useState(true)
    const [controlledRefresh, setControlledRefresh] = useState(0)
    const [data, setData] = useState(null)
    const [extractedData, setExtractedData] = useState(null)
    
    const [hiddenColumnsArr,setHiddenColumnsArr] = useState(['_id'])

    //filter is the filter formatted for the query
    let filterTable  = []
    
    // the original orderBy from the table and the object for the query
    const [orderBy, setOrderBy] = useState([])
    const [queryOrderBy, setQueryOrderBy] = useState(false)

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
                const extractedData = extractDocuments(data[documentType])
                setData(data)
                setExtractedData(extractedData)
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

    /*
    * the advanced filter is already formatted for the query
    */
    const setAdvancedFilters = (advfilter,fetchMore=false)=>{
        setFilters([])
        setQueryFilters(advfilter)
        console.log("setAdvancedFilters" ,advfilter, queryFilters)
        callFetchMore(limit,start,queryOrderBy,advfilter) 
     }
    
    /*
    * the table filter need to be transformed
    */
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
        callFetchMore(limit,0,queryOrderBy,filtersTmp)      
      }

     const changeOrder = (orderByArr) =>{
        const orderByObj = {}
        if(Array.isArray(orderByArr)){        
          orderByArr.forEach(item=>{
            orderByObj[item.id] = item.desc === true ? "DESC" : "ASC"
          }) 
        }
        setOrderBy(orderByArr)
        setStart(0)
        setQueryOrderBy(orderByObj)
        callFetchMore(limit,0,orderByObj,queryFilters)  
      }

    const onRefresh = () => {
        setRefresh(controlledRefresh+1)
    }

    const setHiddenColumns =(id, checked)=>{
      const indexof = hiddenColumnsArr.indexOf(id)
      if(id==="__ALL__"){
          if(checked){
              setHiddenColumnsArr([])
          }else{
              //columns name
              if(Array.isArray(tableConfigObj)){
                tableConfigObj.forEach(item =>{
                  if(hiddenColumnsArr.indexOf(item.id) === -1)
                      hiddenColumnsArr.push(item.id)
                })
              }
          }
      }else{
          if(indexof>-1 && checked===true){
              // we remove the item if it is in the array
              const x = hiddenColumnsArr.splice(indexof, 1);
          }else if(checked===false && indexof=== -1) {
              hiddenColumnsArr.push(id)
          }
      }
      
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
        queryOrderBy,
       // controlledDocument,
        limit,
        start,
        loading,
        rowCount,
        onRefresh,
        documentResults:data,
        extractedData,
        hiddenColumnsArr,
        setHiddenColumns,
        // maybe we need to set from outside
       // setDocumentResults,
       // setControlledRefresh,
        controlledRefresh
    }
}