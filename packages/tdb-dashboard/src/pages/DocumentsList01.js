import React, {useState, useEffect}  from "react";
import {DocumentTable} from "../components/DocumentTable"
import {getDocumentOfTypeTabConfig} from "../components/ViewConfig" 
import {WOQLClientObj} from '../init-woql-client'
import {Card, Row, Col} from "react-bootstrap"
import {WOQLTable,ControlledGetDocumentQuery} from '@terminusdb/terminusdb-react-table'
import { useNavigate, useParams } from "react-router-dom";


import {getDocumentTools, getDeleteTool, getCopyIDTool} from "../components/DocumentActions"
import {getColumnsFromResults, displayIDOfLinkedDocuments, isArray} from "../components/utils"

export const DocumentsList01 = () => {   

    const [viewTable, setViewTable]=useState(false) 

    const {
        woqlClient,
        perDocumentCount,
        documentClasses,
        frames
    } = WOQLClientObj()

    const {type} = useParams()
    const navigate=useNavigate()
    
    if(!woqlClient) return ""
    const dataProduct  = woqlClient.db()
    const [extractedResults, setExtractedResults]=useState([])

    const [tableConfig, setTableConfig] = useState(false)
    const [barloading, setBarLoading]=useState(true)

    useEffect(() => { // get documents on click of document types
        setBarLoading(true)
        setTableConfig(false)
        setControlledRefresh(controlledRefresh+1)
    }, [type])

    
    function extractDocuments(documentResults) {
        var extractedResults=[]
        
        documentResults.map(item=> {
            var newJson={}
            for(var key in item){
                if(Array.isArray(item[key]) && item[key].length > 0){
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
    } = ControlledGetDocumentQuery(woqlClient, type, 10)

    
    useEffect(() => { // set table view config
        if(!documentResults) return
        setBarLoading(false)
        let extractedResults = extractDocuments(documentResults)
        setExtractedResults(extractedResults)
        let tConf = getDocumentOfTypeTabConfig(extractedResults, getDeleteTool, getCopyIDTool, onRowClick)
        setTableConfig(tConf)
    }, [documentResults])

    // on click document table row
    function onRowClick (row) {
        // extract type out of document ID to navigate 
        const fullId = row.original["@id"]
        const id = fullId.substring(type.length+1, fullId.length);
        navigate(`${id}`)
    }

    return <main className="content mr-3 ml-5 w-100 mt-5">
        <Row className="w-100 mb-5">
            <Col md={11}>
                <Card className="content mr-3 ml-5 w-100" varaint="light">
                    <Card.Header>
                        <h6>Documents of type - <strong className="text-success">{type}</strong></h6>
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

    //<DocumentTable setBarLoading = {setBarLoading} setViewTable={setViewTable}/>
}