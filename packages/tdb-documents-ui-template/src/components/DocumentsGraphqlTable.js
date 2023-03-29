import React,{useState,useEffect} from "react";
import {AdvancedSearch, GraphqlTable, ControlledGraphqlQuery} from '@terminusdb/terminusdb-react-table'
import {Tab,Tabs,Button,Alert,Container,ProgressBar} from 'react-bootstrap'
import { GraphqlQueryView } from "./GraphqlQueryViewer";
//import {gql} from "@apollo/client";
import { format } from 'graphql-formatter'
import Accordion from 'react-bootstrap/Accordion'
import {RiDeleteBin7Line, RiEdit2Fill} from "react-icons/ri"
import {HiOutlineDocument} from "react-icons/hi"

//to be review
export const DocumentsGraphqlTable = ({gqlQuery,apolloClient,tableConfig, type, onRowClick, onViewButtonClick, onEditButtonClick, onDeleteButtonClick, showGraphqlTab=true}) => {
    if(!tableConfig) return ''
    const query = gqlQuery//gql`${querystr}`
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
       extractedData } = ControlledGraphqlQuery(apolloClient,query, type, 10, 0, {}, false);
    
    let extractedResults = extractedData || []

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
                    {onViewButtonClick && <Button variant="success" size="sm" className="ml-3" title={`view document`} onClick={() => viewAction(invFullId)}>
                        <HiOutlineDocument/> 
                    </Button>}        
                    {onEditButtonClick && <Button variant="success" size="sm" className="ml-3" title={`edit document`} onClick={() => editAction(invFullId)}>
                        <RiEdit2Fill/> 
                    </Button>}  
                    {onDeleteButtonClick && <Button variant="danger" size="sm" className="ml-3" title={`delete document`} onClick={() => deleteAction(invFullId)}>
                        <RiDeleteBin7Line/> 
                    </Button>}
                </span>
            </React.Fragment>
    }

    const actionsButttons = {Header :  "", accessor: "__ACTIONS__", disableFilters:true, disableSortBy:true, 
    id:"__ACTIONS__" ,renderer:getActionButtons}

    // to be review
    const tableConfigObj = {}
    tableConfigObj.columns = JSON.parse(JSON.stringify(tablesColumnsConfig))
    if(onDeleteButtonClick || onEditButtonClick || onViewButtonClick) {
        tableConfigObj.columns.push(actionsButttons)
    }
    if(onRowClickCall) {
        tableConfigObj.rowClick = onRowClickCall
    }

    const error = documentError  && typeof documentError === "object" ? JSON.stringify(documentError, null, 4) : documentError

    return <div> 
            {error && <Alert
            className="text-break"
            variant="danger">
            GraphQL query error
            {error}
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
            {loading && <Container className="loading-bar-align justify-content-center">
                            <ProgressBar  message={`Loading ${type} ...`}/>
                        </Container>}
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