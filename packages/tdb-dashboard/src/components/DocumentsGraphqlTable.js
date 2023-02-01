import React,{useState,useEffect} from "react";
import {  GraphqlTable} from '@terminusdb/terminusdb-react-table'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { AdvancedSearch } from "./AdvancedSearch";
import {Tab,Tabs,Form, Button,Alert} from 'react-bootstrap'
import { GraphqlQueryView } from "./GraphqlQueryViewer";
import {gql} from "@apollo/client";
import { format } from 'graphql-formatter'
import Accordion from 'react-bootstrap/Accordion'
import {WOQLClientObj} from '../init-woql-client'
import { ControlledGraphqlQuery } from "../hooks/ControlledGraphqlQuery";
import {Loading} from "../components/Loading"

//to be review
export const DocumentsGraphqlTable = ({type,onRowClick,showGraphqlTab=true}) => {
    const {documentTablesConfig,apolloClient} = WOQLClientObj()
    if(!documentTablesConfig) return ''
    const tableConfig = documentTablesConfig
    const querystr  = tableConfig.objQuery[type].query
    const query = gql`${querystr}`
    //const query =gql`query Doc01Query($offset: Int, $limit: Int, $filter: Doc01_Filter, $orderBy: Doc01_Ordering) {\n  Doc01(offset: $offset, limit: $limit, filter: $filter, orderBy: $orderBy) {\n    _id\n    label\n  }\n}`
    const [advSearchFields,setAdvFields] = useState(false)
    const [queryToDisplay,setQueryTodisplay] = useState(false)
   
    if (!query) return ""
    const { documentError,
        callFetchMore,
        rowCount,
        changeOrder,
        changeLimits,
        changeFilters,
        setAdvancedFilters,
        limit,
        queryFilters,
        start,
        orderBy,
        filterBy,
        loading,
        documentResults } = ControlledGraphqlQuery(apolloClient,query, type, 10, 0, {}, false);
    
    useEffect(() => {
       if(type){       
            callFetchMore(10,0,{},false) 
            const queryStr = query.loc.source.body
            setQueryTodisplay(format(queryStr))
            setAdvFields(tableConfig.advancedSearchObj[type])         
       }
    },[type]);

    function onRowClickCall(row){
        if (onRowClick) {
            const rowTmp = row && row.original ? {label:row.original.name, id:row.original._id}: {}
            onRowClick(rowTmp)
        }
    }

     const tableConfigObj = {}
     tableConfigObj.columns = tableConfig.tablesColumnsConfig[type] || []
     tableConfigObj.rowClick = onRowClickCall
    
    let extractedResults = documentResults ? extractDocuments(documentResults[type]) : []

    function extractDocuments(documentResultsArr) {
        if(!documentResultsArr) {
            //alert(JSON.stringify(documentResultsArr))
            return []
            
        }
        var extractedResults = []

        documentResultsArr.map(item => {
            var newJson = {}
            for (var key in item) {
                // if it is an array this is set type, I can have more than 1 result for row
                //?? I can pust the count
                if (Array.isArray(item[key])) {
                    newJson[key] = `${(item[key].length)}`
                }
                else if (item[key] && typeof item[key] === "object") {
                    //key 
                    const objectKey = Object.keys(item[key])
                    objectKey.forEach(element => {
                        newJson[`${key}---${element}`] = `${item[key][element]}`
                    });
                }
                else {
                    newJson[key] = `${item[key]}`
                }
            }
            extractedResults.push(newJson)
        })
        //console.log("extractedResults", extractedResults)
        return extractedResults
    }



   // const showBar = loading ? {className:"visible"} : {className:"invisible"}
   //return <div>hello</div>
// <AdvancedSearch fields={advSearchFields} setFilter={setAdvancedFilters} />
    return <div> 
            {documentError && <Alert
            className="text-break"
            variant="danger">

            GraphQL query error
            </Alert>
}         
            {advSearchFields &&
                 <Accordion className="mb-4">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Advanced filter</Accordion.Header>
                        <Accordion.Body>
                            <AdvancedSearch fields={advSearchFields} setFilter={setAdvancedFilters} />
                        </Accordion.Body>
                    </Accordion.Item>
            </Accordion>}       
            {loading && <Loading message={`Loading ${type} ...`}/>}
            {!loading && 
            <Tabs defaultActiveKey="table" className="mb-3" >
                <Tab eventKey="table" title="Result Table">
                    {!loading && Array.isArray(extractedResults) && 
                     <GraphqlTable
                     // dowloadConfig={{filename:"test.csv",headers:["Author","Commit ID"]}}
                      result={extractedResults}
                      freewidth={true}
                      config ={tableConfigObj}
                   //   view={(tableConfig ? tableConfig.json() : {})}
                      limit={limit}
                      start={start}
                      orderBy={{}} 
                      setFilters = {changeFilters}
                      setLimits={changeLimits}
                     // setOrder={changeOrder}
                     // query={null}
                      loading={loading}
                      totalRows={rowCount}
                      onRefresh={function(){}}
                  />}
            </Tab>
           {showGraphqlTab && <Tab eventKey="graphql" title="Graphql Query">
                <div>
                {queryToDisplay && 
                   <GraphqlQueryView 
                     filterBy={queryFilters}
                     orderBy={orderBy}
                     start={start}
                     limit={limit}
                     queryToDisplay={queryToDisplay} />
                }
                </div>
            </Tab>}
         </Tabs>}
    </div>
}