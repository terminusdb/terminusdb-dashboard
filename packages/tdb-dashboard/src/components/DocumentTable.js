
import React, {useState, useEffect} from "react"
import {WOQLTable,ControlledGetDocumentQuery} from '@terminusdb/terminusdb-react-table'
import {getDocumentOfTypeTabConfig} from "./ViewConfig"
import {NoDocumentsAvailable} from "./NoDocumentsAvailable"
import {WOQLClientObj} from '../init-woql-client'
import {DocumentControlObj} from '../hooks/DocumentControlContext'
import {Card, Row, Col, Button} from "react-bootstrap"
import {getColumnsFromResults, displayIDOfLinkedDocuments, isArray} from "./utils"
import {getDocumentTools, getDeleteTool, getCopyIDTool} from "./DocumentActions"
import {FORM_VIEW, VIEW_DOCUMENT, PROGRESS_BAR_COMPONENT} from "./constants"
import {Loading} from "./Loading"

export const DocumentTable = ({barloading, setBarLoading, viewTable, setViewTable}) => {
    const {
        woqlClient,
        perDocumentCount,
        documentClasses,
        frames
    } = WOQLClientObj()
    
    if(!woqlClient) return <div/>

    const dataProduct  = woqlClient.db()
    const [extractedResults, setExtractedResults]=useState([])
    const {
        documentObject,
        setDocumentObject,
        setDocumentObjectWithFrames,
        documentObjectWithFrames,
        actionControl
    } = DocumentControlObj()

    console.log("documentObjectWithFrames", documentObjectWithFrames)
    console.log("documentObject", documentObject, tableConfig)

    if (documentObjectWithFrames.action) return <div/>
    //if (documentObject.action) return <div/>

    const {
        updateQuery,
        changeOrder,
        changeLimits,
        controlledDocument,
        result,
        limit,
        start,
        orderBy, 
        loading,
        rowCount,
        documentResults,
        setDocumentResults,
        setControlledRefresh,
        controlledRefresh
    } = ControlledGetDocumentQuery(woqlClient, documentObject.type, 10)

    const [tableConfig, setTableConfig] = useState(false)

    useEffect(() => { // get documents on click of document types
        setBarLoading(true)
        setTableConfig(false)
        setDocumentResults(false)
        setControlledRefresh(controlledRefresh+1)
    }, [documentObject.type])

    useEffect(() => { // reload table on update
        if(documentObjectWithFrames.update) {
            setBarLoading(true)
            setTableConfig(false)
            setDocumentResults(false)
            setControlledRefresh(controlledRefresh+1)
        }
    }, [documentObjectWithFrames.update])

    useEffect(() => {
        setBarLoading(true)
    }, [limit])

    function extractDocuments(documentResults) {
        var extractedResults=[]
        
        documentResults.map(item=> {
            var newJson={}
            for(var key in item){
                if(Array.isArray(item[key])){
                    var type = item[key][0]["@type"]
                    if(frames[`terminusdb:///schema#${type}`] && frames[`terminusdb:///schema#${type}`]["@subdocument"]){
                        // this is a subdocument
                        var newArray=[]
                        item[key].map(thing => {
                            newArray.push(thing["@id"])
                        })
                        newJson[key]=newArray
                    }
                }
                else if(typeof item[key] === "object"){
                    if(item[key].hasOwnProperty("@id")){ // object - we do not display sys json data as part of table
                        newJson[key]=item[key]["@id"]
                    }
                }
                else {
                    newJson[key]=item[key]
                }
            }
            extractedResults.push(newJson)
        })
        //console.log("extractedResults", extractedResults)
        return extractedResults
    }

    useEffect(() => { // set table view config
        if(!documentResults) return
        setBarLoading(false)
        setViewTable(true)
        let extractedResults = extractDocuments(documentResults)
        setExtractedResults(extractedResults)
        let tConf = getDocumentOfTypeTabConfig(extractedResults, getDeleteTool, getCopyIDTool, onRowClick)
        setTableConfig(tConf)
    }, [documentResults])



    // on click document table row
    function onRowClick (row) {
        let docObj={
            action: VIEW_DOCUMENT,
            type: row.original["@type"],
            view: documentObject.view ? documentObject.view : FORM_VIEW,
            submit: false,
            currentDocument: row.original["@id"],
            frames: {},
            filledFrame: {},
            loading: <Loading message={`Fetching document ${row.original["@id"]} ...`} type={PROGRESS_BAR_COMPONENT}/>,
            message: false,
            update:false
        }
        setDocumentObjectWithFrames(docObj)
        setDocumentObject(docObj)
    }

    if (documentResults.length == 0) {
        return <NoDocumentsAvailable 
            type={documentObject.type} 
            documentObject={documentObject} 
            setDocumentObject={setDocumentObject}
        />
    }

    console.log("tableConfig", tableConfig)

    if(tableConfig) {
        return <main className="content mr-3 ml-5 w-100 ">
            <Row className="w-100 mb-5">
                <Col md={11}>
                    <Card className="content mr-3 ml-5 w-100" varaint="light">
                        <Card.Header>
                            <h6>Documents of type - <strong className="text-success">{documentObjectWithFrames.type}</strong></h6>
                        </Card.Header>
                        <Card.Body>
                            <WOQLTable
                                result={extractedResults}
                                freewidth={true}
                                view={(tableConfig ? tableConfig.json() : {})}
                                limit={limit}
                                start={start}
                                orderBy={orderBy}
                                setLimits={changeLimits}
                                setOrder={changeOrder}
                                resultColumns={getColumnsFromResults(extractedResults)}
                                query={false}
                                loading={loading}
                                totalRows={rowCount}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </main>
    }

    return <div/>
}