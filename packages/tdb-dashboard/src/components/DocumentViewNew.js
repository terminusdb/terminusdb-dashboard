import React, {useState, useEffect} from "react"
import {FORM_VIEW, VIEW_DOCUMENT, PROGRESS_BAR_COMPONENT} from "./constants"
import {Card, Row, Col, Button} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {DocumentFrames} from "./DocumentFrames"
import {DocumentInfo} from "./DocumentInfo"
import {isArray} from "./utils"
import {Loading} from "./Loading"
import {DocumentSummary} from "./DocumentSummary"
import {DocumentControlObj} from '../hooks/DocumentControlContext'
import {BiArrowBack} from "react-icons/bi"
import {DocumentTable} from "./DocumentTable"

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

    const [barloading, setBarLoading]=useState(true)
    const [viewTable, setViewTable]=useState(false)


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

    const ShowLoading = () => {
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

        {!perDocumentCount && <ShowLoading/>}

        {!documentClasses && <ShowLoading/>}

        {/*<Row className="mt-4"><h2 className="text-success fw-bold ml-3"> {dataProduct} </h2></Row>*/}

        <Row className="mt-5 w-100">

        {/* Display summary cards with number of document classes available */}
        {isArray(perDocumentCount) && !documentObjectWithFrames.action && !viewTable && <DocumentSummary/>}

        {/* No document available for a chosen document class card */}
        {(documentClasses.length==0) && !viewTable && <DocumentSummary/>}

        {!documentObjectWithFrames.action && <DocumentTable 
            barloading={barloading} 
            setBarLoading={setBarLoading}
            viewTable={viewTable}
            setViewTable={setViewTable}/>}

        {/* Display list of available document classes on select of a type in left hand bar */}
        {
            !documentObjectWithFrames.action && (extractedResults.length>0) && rowCount &&
                <DocumentTable barloading={barloading} setBarLoading={setBarLoading}/>
            }

            {/* View document info on click of a row */}
            {
                documentObjectWithFrames.action ==  VIEW_DOCUMENT &&
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