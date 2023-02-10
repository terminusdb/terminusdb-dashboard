import React, {useState, useEffect} from "react"
import {Card, Row, Col, Button} from "react-bootstrap"
import {WOQLTable,ControlledGetDocumentQuery} from '@terminusdb/terminusdb-react-table'
//import {ControlledGetDocumentQuery} from '@terminusdb-live/tdb-react-components'
import {getDocumentOfTypeTabConfig} from "./ViewConfig" 
import {WOQLClientObj} from '../init-woql-client'
import {getDocumentTools, getDeleteTool, getCopyIDTool} from "./DocumentActions"
import {getColumnsFromResults, displayIDOfLinkedDocuments, isArray} from "./utils"
import {Loading} from "./Loading"
import { useParams,useNavigate } from "react-router-dom"
import {UTILS} from '@terminusdb/terminusdb-client'

export const DocumentWoqlTable = () => {
    const {
        woqlClient,
        perDocumentCount,
        documentClasses,
        frames
    } = WOQLClientObj()

    const {type} = useParams()
    const navigate = useNavigate()
    
    if(!woqlClient) return ""
    const dataProduct  = woqlClient.db()
    const [extractedResults, setExtractedResults]=useState([])
    const [tableConfig, setTableConfig] = useState(false)
    const [barloading, setBarLoading]=useState(true)
    
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

    /*useEffect(() => { // get documents on click of document types
        setBarLoading(true)
        setTableConfig(false)
        setDocumentResults(false)
        setControlledRefresh(controlledRefresh+1)
    }, [type])*/

 
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
        const fullId = row["id"]
        navigate(`${UTILS.encodeURISegment(fullId)}`)
    }


    if(barloading){
        return <Loading message={`Fetching documents of ${dataProduct}`}/>
    }

    return <React.Fragment>
        <Row className="mt-5 w-100">
        {extractedResults.length>0 && tableConfig && rowCount &&
                <main className="content mr-3 ml-5 w-100 ">
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
            }
        </Row>
    </React.Fragment>


}