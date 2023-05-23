import React, {useState, useEffect} from 'react'
import {extractDocuments} from './hookUtility'

// maybe we can add a start filter and a start orderby
/*
* @typedef {Object} options  
* @property {number} [limit] 
* @property {number} [start] 
* @property {object} [tableConfigObj]
* @property {array} [hiddenColumns]
*/
export function useTDBGraphqlQuery (apolloClient, graphqlQuery, documentType, options={}){
    const [limit, setLimit] = useState(options && options.limit || 10)
    const [start, setStart] = useState(options && options.start || 0)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [rowCount, setRowCount] = useState(0)
    const [data, setData] = useState(null)
    const [extractedData, setExtractedData] = useState(null)
    
    const [hiddenColumnsArr,setHiddenColumnsArr] = useState(["_id"])

    //filter is the filter formatted for the query
    let filterTable  = []
    
    // the original orderBy from the table and the object for the query
    const [orderBy, setOrderBy] = useState([])
    const [queryOrders, setQueryOrderBy] = useState(false)

    const [filterBy, setFilters] = useState(filterTable)
    const [queryFilters, setQueryFilters] = useState(false)

    useEffect(() => {
      if(documentType){       
          setHiddenColumnsArr(options.hiddenColumns || hiddenColumnsStart())    
      }
   },[documentType]);

    function hiddenColumnsStart(){
      const startHiddenColumns = []
      if(options && Array.isArray(options.tableConfigObj)){
        if(options.tableConfigObj.length > 1){
          startHiddenColumns.push("_id")
        }
        if(options.tableConfigObj.length > 4){
          options.tableConfigObj.forEach((item,i) =>{
            if(i>4){
              startHiddenColumns.push(item.id)
            }
          })
        }
      }
      return startHiddenColumns
    }

    const callGraphqlServer = (currentlimit,currentstart,queryOrders,queryFilters)=>{
      setStart(currentstart)
      setLimit(currentlimit)
      setQueryOrderBy(queryOrders)
      setQueryFilters(queryFilters)
      setFilters([])
      setOrderBy([])

      callFetchMore(currentlimit,currentstart,queryOrders,queryFilters) 
    }

    const callFetchMore = async (currentlimit,currentstart,currentOrderBy,currentFilter) =>{
        setLoading(true)
        setError(false)
        let result
        try{
        result = await apolloClient.query({query:graphqlQuery,
            variables:{"offset":currentstart , "limit":currentlimit+1,
            "orderBy":currentOrderBy || {}, "filter":currentFilter || {}}})
        
        if(result.errors) {
            setRowCount(0)
            setData([])
            setError(result.errors)
        }else{
            const data = result.data 
            if(!Array.isArray(data[documentType]))return []
                //current page is the startoffset
                const rowCountTmp  = currentstart+data[documentType].length
                if(data[documentType].length === (currentlimit+1)){
                //setHasNextPage(false)
                data[documentType].pop()
                }
                setRowCount(rowCountTmp)
                const extractedDataTmp = extractDocuments(data[documentType])
                setData(data)
                setExtractedData(extractedDataTmp)
        }
        }catch(err){
          //console.log("ERRORCALL",err.graphQLErrors,err.networkError.result.errors)
          const errorMessage = err.networkError && err.networkError.result ? err.networkError.result.errors : ""
          setRowCount(0)
          setData([])
          setExtractedData([])
          setError(errorMessage)
          
        }finally{
            setLoading(false)
        }
    }


    const changeLimits =(currentlimit,currentstart)=>{
        setStart(currentstart)
        setLimit(currentlimit)
        console.log("changeLimits" ,queryFilters)
        callFetchMore(currentlimit,currentstart,queryOrders,queryFilters) 
    }

    /*
    * the advanced filter is already formatted for the query
    */
    const setAdvancedFilters = (advfilter)=>{
        setFilters([])
        setQueryFilters(advfilter)
        console.log("setAdvancedFilters" ,advfilter, queryFilters)
        callFetchMore(limit,start,queryOrders,advfilter) 
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

       // console.log("changeFilters" ,filtersArr, filtersTmp)
        callFetchMore(limit,0,queryOrders,filtersTmp)      
      }

     const changeOrders = (orderByArr) =>{
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


    const setHiddenColumns =(id, checked)=>{
      const indexof = hiddenColumnsArr.indexOf(id)
      if(id==="__ALL__"){
          if(checked){
              hiddenColumnsArr.splice(0,0)
          }else{
              //columns name
              if(options && Array.isArray(options.tableConfigObj)){
                options.tableConfigObj.forEach(item =>{
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
        setError,
        callGraphqlServer,
        error,
        changeOrders,
        changeLimits,
        changeFilters,
        setAdvancedFilters,
        orderBy,
        filterBy,
        queryFilters,
        queryOrders,
        limit,
        start,
        loading,
        rowCount,
        documentResults:data,
        extractedData,
        hiddenColumnsArr,
        setHiddenColumns,
  }
}