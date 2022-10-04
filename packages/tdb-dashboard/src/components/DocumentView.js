import React, {useState, useEffect} from "react"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {FORM_VIEW, VIEW_DOCUMENT, PROGRESS_BAR_COMPONENT} from "./constants"
import {Card, Row, Col, Button} from "react-bootstrap"
import {WOQLTable} from '@terminusdb-live/tdb-react-components'
import {ControlledGetDocumentQuery} from '@terminusdb-live/tdb-react-components'
import {getDocumentOfTypeTabConfig} from "./ViewConfig"
import {WOQLClientObj} from '../init-woql-client'
import {SearchBox} from "./SearchBox"
import {getDocumentTools, getDeleteTool, getCopyIDTool} from "./DocumentActions"
import {DocumentFrames} from "./DocumentFrames"
import {DocumentInfo} from "./DocumentInfo"
import {getColumnsFromResults, displayIDOfLinkedDocuments, isArray} from "./utils"
import {NoDocumentsAvailable} from "./NoDocumentsAvailable"
import {Loading} from "./Loading"
import {DocumentSummary} from "./DocumentSummary"
import {DocumentControlObj} from '../hooks/DocumentControlContext'
import {BiArrowBack} from "react-icons/bi"

export const DocumentView = () => {
    const {
        woqlClient,
        perDocumentCount,
        documentClasses,
        frames
    } = WOQLClientObj()
    
    if(!woqlClient) return ""
    const dataProduct  = woqlClient.db()
    const [extractedResults, setExtractedResults]=useState([])
    const {
        documentObject,
        setDocumentObject,
        setDocumentObjectWithFrames,
        documentObjectWithFrames,
        actionControl
    } = DocumentControlObj()

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
    } = ControlledGetDocumentQuery(woqlClient, documentObject.type, 10)

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
        if(perDocumentCount){
            setBarLoading(false)
        }
    }, [perDocumentCount])

    useEffect(() => {
        if(documentClasses){
            setBarLoading(false)
        }
    }, [documentClasses]) 

    /*useEffect(() => {
        if(!perDocumentCount) return 
        if(!documentClasses) return 
        setBarLoading(false)
    }, [documentObjectWithFrames.update])*/

    useEffect(() => {
        setBarLoading(true)
    }, [limit])

    //console.log("limit", limit)

    useEffect(() =>{ // reset everything on change of page/ dataproduct
        setBarLoading(true)
        let resetDocument = {
            type: false, // document class type
            action: false,  // create/ view/ edit
            view: FORM_VIEW,    // view in form or json
            submit: false,  // click on submit button to edit or create
            currentDocument: false, // current document id to view document details
            frames: {}, // schema frames of document class
            filledFrame: {}, // filled frames of document id
            message: false, // success or error message related to action on a document
            loading: false,  // loading bar
            update:false // to refresh updated info
        }
        setDocumentObjectWithFrames(resetDocument)
        setDocumentObject(resetDocument)
    }, [dataProduct])

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
        let extractedResults = extractDocuments(documentResults)
        setExtractedResults(extractedResults)
        let tConf = getDocumentOfTypeTabConfig(extractedResults, getDeleteTool, getCopyIDTool, onRowClick)
        setTableConfig(tConf)
    }, [documentResults])

    // on click document table row
    function onRowClick (row) {
        setDocumentObject({
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
        })
    }

    function getNewPrevious(cur, documentObject) {
        let newArr=documentObject.previous
        if(Array.isArray(newArr)){
            let index = newArr.indexOf(cur)
            newArr.splice(index, 1)
        }
        return newArr
    }

    function goToPreviousLinkedDocument () {
        let cur = documentObject.previous[documentObject.previous.length-1]
        setDocumentObject({
            action: VIEW_DOCUMENT,
            type: documentObject.frames["@type"],
            view: FORM_VIEW,
            submit: false,
            currentDocument: cur,
            frames: {},
            filledFrame: {},
            loading: <Loading message={`Fetching document ${documentObject.previous.length-1} ...`} type={PROGRESS_BAR_COMPONENT}/>,
            message: false,
            update:false,
            previous: getNewPrevious(cur, documentObject)

        })
    }

    if(barloading){
        var message
        if(!documentObjectWithFrames.action) message = `Fetching documents of ${dataProduct}`
        else if (documentObjectWithFrames.action !== VIEW_DOCUMENT) message = `Fetching frames of ${documentObjectWithFrames.type}`
        else message =`Fecthing Info of ${documentObjectWithFrames.currentDocument}`
        return <Loading message={message}/>
    }

    if(!actionControl.read && !actionControl.write) {
        // info reader access control
        return <React.Fragment>
            <Row className="mt-5 w-100">
                <Col xs={11} className="d-block ml-5 mr-3">
                    <div className="card card-fil m-3"> 
                        <div className="card-body w-100 text-center">
                            <h4 className="text-muted mt-3 mb-3">{`No data level access`}</h4>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    }

    return <React.Fragment>

        {/*<Row className="mt-4"><h2 className="text-success fw-bold ml-3"> {dataProduct} </h2></Row>*/}

        <Row className="mt-5 w-100">

        {/* Display summary cards with number of document classes available */}
        {perDocumentCount && !documentObjectWithFrames.action && (!documentResults) && <DocumentSummary/>}

        {/* No document available for a chosen document class card */}
        {(documentClasses.length==0) && <DocumentSummary/>}

        {!documentObjectWithFrames.action && (documentResults.length == 0) && <NoDocumentsAvailable type={documentObject.type} documentObject={documentObject} setDocumentObject={setDocumentObject}/>}

        {/* Display list of available document classes on select of a type in left hand bar */}
        {
            !documentObjectWithFrames.action && (extractedResults.length>0) && tableConfig && rowCount &&
                <main className="content mr-3 ml-5 w-100 ">
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

            {/* View document info on click of a row */}
            {
                documentObjectWithFrames.action ===  VIEW_DOCUMENT &&
                documentObjectWithFrames.filledFrame &&
                <React.Fragment>
                    {isArray(documentObject.previous) && <span className="col-md-1 ml-5">
                        <Button
                            className="btn-light btn-sm"
                            title={`Go to previous document ${documentObject.previous}`}
                            onClick={goToPreviousLinkedDocument}>
                                <BiArrowBack className="mr-2"/>Back
                        </Button>
                    </span>}
                    <DocumentInfo/>
                </React.Fragment>
            }

            {/* create or edit a document */}
            {
                documentObjectWithFrames.action &&
                documentObjectWithFrames.action !==  VIEW_DOCUMENT &&
                documentObjectWithFrames.frames &&
                documentObjectWithFrames.update &&
                <DocumentFrames/>}


        </Row>
    </React.Fragment>


}