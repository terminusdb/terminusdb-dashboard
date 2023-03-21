import React,{useState,useEffect} from "react";
import {AdvancedSearch, GraphqlTable, ControlledGraphqlQuery} from '@terminusdb/terminusdb-react-table'
import ProgressBar from 'react-bootstrap/ProgressBar'
import {Tab,Tabs,Form, Button,Alert} from 'react-bootstrap'
import { GraphqlQueryView } from "./GraphqlQueryViewer";
import {gql} from "@apollo/client";
import { format } from 'graphql-formatter'
import Accordion from 'react-bootstrap/Accordion'
import {WOQLClientObj} from '../init-woql-client'
import {Loading} from "../components/Loading"
import { DocumentControlObj } from "../hooks/DocumentControlContext";
import {RiDeleteBin7Line, RiEdit2Fill} from "react-icons/ri"
import {HiOutlineDocument} from "react-icons/hi"

//to be review
export const DocumentsGraphqlTable = ({type,onRowClick, onViewButtonClick, onEditButtonClick, onDeleteButtonClick, showGraphqlTab=true}) => {
    const {apolloClient} = WOQLClientObj()
    const {documentTablesConfig} = DocumentControlObj()
    if(!documentTablesConfig) return ''
    const tableConfig = documentTablesConfig
    const querystr  = tableConfig.objQuery[type].query
    const query = gql`${querystr}`
    //const query =gql`query Doc01Query($offset: Int, $limit: Int, $filter: Doc01_Filter, $orderBy: Doc01_Ordering) {\n  Doc01(offset: $offset, limit: $limit, filter: $filter, orderBy: $orderBy) {\n    _id\n    label\n  }\n}`
    const [advSearchFields,setAdvFields] = useState(false)
    const [queryToDisplay,setQueryTodisplay] = useState(false)
   
    if (!query) return ""
    const tablesColumnsConfig = tableConfig.tablesColumnsConfig[type] || []
    const { documentError,
        callFetchMore,
        rowCount,
        changeOrder,
        changeLimits,
        changeFilters,
        setAdvancedFilters,
        limit,
        queryFilters,
        queryOrderBy,
        start,
        orderBy,
        filterBy,
        loading,
       // hiddenColumnsArr,
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
            const rowTmp = row && row.original ? {label:row.original.name, id:row.original.fullID}: {}
            onRowClick(rowTmp)
        }
    }

    const deleteAction =(row)=>{
        if (onDeleteButtonClick) {
            const rowTmp = row && row.original ? {label:row.original.name, id:row.original.fullID}: {}
            onDeleteButtonClick(rowTmp)
        }
    }

    const viewAction =(row)=>{
         if (onViewButtonClick) {
            const rowTmp = row && row.original ? {label:row.original.name, id:row.original.fullID}: {}
            onViewButtonClick(rowTmp)
        }
    }

    const editAction =(row)=>{
        if (onEditButtonClick) {
            const rowTmp = row && row.original ? {label:row.original.name, id:row.original.fullID}: {}
            onEditButtonClick(rowTmp)
        }

    }
      
    const getActionButtons = (props) =>{
        const invFullId = props.cell.row//.original['id']
        //const name = cell.row.original['name']
        return <React.Fragment>
                <span className="d-flex justify-content-end mr-4">  
                <Button variant="success" size="sm" className="ml-3" title={`view document`} onClick={() => viewAction(invFullId)}>
                    <HiOutlineDocument/> 
                </Button>           
                <Button variant="success" size="sm" className="ml-3" title={`edit document`} onClick={() => editAction(invFullId)}>
                    <RiEdit2Fill/> 
                </Button>  
                <Button variant="danger" size="sm" className="ml-3" title={`delete document`} onClick={() => deleteAction(invFullId)}>
                    <RiDeleteBin7Line/> 
                </Button>
                </span>
            </React.Fragment>
    }
    const actionsButttons = {Header :  "", accessor: "Actions", disableFilters:true, disableSortBy:true, 
    id:"Actions" ,renderer:getActionButtons}


     const tableConfigObj = {}
     tableConfigObj.columns = JSON.parse(JSON.stringify(tablesColumnsConfig))
     tableConfigObj.columns.push(actionsButttons)
     tableConfigObj.rowClick = onRowClickCall

    let extractedResults = documentResults ? extractDocuments(documentResults[type]) : []

    function cleanIdValue(keyName, keyValue){
        if(keyValue === "null") return ""
        if(keyName!=="_id") return keyValue
        try{
            const regexp =/(?:\/+.*?\/)(.*$)/g
            const array01 = [...keyValue.matchAll(regexp)];
            return array01[0][1]
        }catch(err){
            return keyValue
        }
    }

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
                        const columnName = element === "_id" ? `${key}---id` : `${key}---${element}`
                        newJson[columnName] = cleanIdValue(element, item[key][element])
                    });
                }
                else {
                    if(key==="_id"){
                        newJson["fullID"] = `${item[key]}`
                    }
                    newJson[key] = cleanIdValue(key, `${item[key]}`)
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
                    //  hiddenColumnsArr = {hiddenColumnsArr}
                   //   view={(tableConfig ? tableConfig.json() : {})}
                      limit={limit}
                      start={start}
                      orderBy={orderBy} 
                      setFilters = {changeFilters}
                      setLimits={changeLimits}
                      setOrder={changeOrder}
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
                     orderBy={queryOrderBy}
                     start={start}
                     limit={limit}
                     queryToDisplay={queryToDisplay} />
                }
                </div>
            </Tab>}
         </Tabs>}
    </div>
}