import React, {useState, useEffect} from "react"
import {WOQLClientObj} from "../init-woql-client"
import Accordion from 'react-bootstrap/Accordion'
import {useParams} from 'react-router-dom'
import {DiffViewer} from '@terminusdb/terminusdb-documents-ui'
import Badge from 'react-bootstrap/Badge'
import {TbCurrencyKroneDanish, TbExchange} from "react-icons/tb"
import Stack from 'react-bootstrap/Stack'
import Pagination from 'react-bootstrap/Pagination'
import {DIFFS_PER_PAGE_LIMIT} from "./constants"
import {Row, Col} from "react-bootstrap"
import {GetDocumentByBranches} from "../hooks/DocumentHook"
import Alert from 'react-bootstrap/Alert'
import ProgressBar from 'react-bootstrap/ProgressBar'
import {BsPlus} from "react-icons/bs"
import {BiMinusCircle} from "react-icons/bi"
import {extractID} from "../components/utils"
import {ChangeRequest} from "../hooks/ChangeRequest"
import {Loading} from "./Loading"

/**
 * 
 * @param {*} diff diff list 
 * @returns 
 */
function getPropertyModifiedCount(diff) {
    let count=0
    for(var item in diff){
        if(item === "@id") continue
        if(item === "@type") continue
        count+=1
    }
    return count
}

/**
 * 
 * @param {*} branch origin branch
 * @returns React Element with branch badge
 */
const OriginHeader = ({branch}) => {
    return <Badge bg="danger" className="float-right fw-bold text-dark">{branch}</Badge>
}

/**
 * 
 * @param {*} branch tracking branch
 * @returns React Element with branch badge
 */
const TrackingHeader = ({branch}) => {
    return <Badge bg="success" className="float-right fw-bold text-dark">{branch}</Badge>
}

/**
 * 
 * @param {*} branch tracking branch after inserted op
 * @returns React Element with branch badge
 */
const TrackingInsertedHeader = ({branch}) => {
    return <>
        <BsPlus className="text-success fw-bold h5"/>
        <BsPlus className="text-success fw-bold h5"/>
        <BsPlus className="text-success fw-bold h5"/>
        <Badge bg="success" className="float-right fw-bold text-dark">{branch}</Badge>
    </>
}

/**
 * 
 * @param {*} branch tracking branch after inserted op
 * @returns React Element with branch badge
 */
 const TrackingDeletedHeader = ({branch}) => {
    return <>
        <BiMinusCircle className="text-success fw-bold h5"/>
        <BiMinusCircle className="text-success fw-bold h5"/>
        <BiMinusCircle className="text-success fw-bold h5"/>
        <Badge bg="success" className="float-right fw-bold text-dark">{branch}</Badge>
    </>
}


/**
 * 
 * @param {*} propertyModifiedCount count of properties modified for a document
 * @returns 
 */
function propertyModified (propertyModifiedCount) {
    if(propertyModifiedCount === 1) return `${propertyModifiedCount} property modified`
    return `${propertyModifiedCount} properties modified`
}


/**
 * 
 * @param {*} diffs diff list 
 * @param {*} trackingBranchDocumentList document list of tracking branch
 * @param {*} originBranchDocumentList document list of origin branch
 * @returns 
 */
export const DiffView = ({diffs, CRObject}) => { 
    const {
        frames, 
        woqlClient:client,
    } = WOQLClientObj()

    const {id} = useParams()

    // pagination constants
    const [activePage, setActivePage]=useState(1)
    const [current, setCurrent]=useState(0)

    // document constants
    const [documentID, setDocumentID] =  useState(false)
    const [originalValue, setOriginalValue] =  useState(false)
    const [changedValue, setChangedValue] =  useState(false)

    // refresh constants 
    const [originalRefresh, setOriginalRefresh]=useState(true)
    const [changedRefresh, setChangedRefresh]=useState(true)

    // message constants 
    const [error, setError]=useState(false)

    let cValue=GetDocumentByBranches(client, CRObject.tracking_branch, documentID, setChangedValue, setError, changedRefresh)
    let oValue=GetDocumentByBranches(client, "main", documentID, setOriginalValue, setError, originalRefresh)
    
    let elements=[], paginationItems=[]

    let divide = diffs.length/DIFFS_PER_PAGE_LIMIT

    // function to handle on click of page
    function handlePagination(number) {
        if(number > activePage) {
            let newCurrent=current+DIFFS_PER_PAGE_LIMIT+1
            setCurrent(newCurrent)
        }
        else {
            let newCurrent=current-DIFFS_PER_PAGE_LIMIT-1
            setCurrent(newCurrent)
        }
        setActivePage(number) 
        
    }

    // populate pagination Item
    for (let number = 1; number <= divide; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === activePage} onClick={(e) => handlePagination(number)}>
                {number}
            </Pagination.Item>
        )
    }
      
    if(!diffs) return <Loading message={`Loading Diffs ...  ...`}/>

    //console.log("originalValue", originalValue)
    //console.log("changedValue", changedValue)
    //console.log("documentID", documentID)

    
    // looping through diff lists
    for(let start=current; start<=(current + DIFFS_PER_PAGE_LIMIT); start++) {
       
        if(start >= diffs.length) continue

        let propertyModifiedCount = getPropertyModifiedCount(diffs[start])

        // onselect of diff accordian 
        function getDocumentStatesOnClick(clicked) {
            if(diffs[start].hasOwnProperty("@insert")) {
                let docId = diffs[start]["@insert"]["@id"]
                setDocumentID(docId)
                setChangedRefresh(Date.now())
                setOriginalValue(false)
                setOriginalRefresh(false)
            }
            else if(diffs[start].hasOwnProperty("@delete")) {
                let docId = diffs[start]["@delete"]["@id"]
                setDocumentID(docId)
                setOriginalRefresh(Date.now())
                setChangedValue(false)
                setChangedRefresh(false)
            } 
            else {
                setDocumentID(clicked)
                setOriginalRefresh(Date.now())
            }
        }


        function getTitle(diff) {
            if(diff.hasOwnProperty("@id")) return <>{diff["@id"]}</>
            if(diff.hasOwnProperty("@op") && diff["@op"] === "Insert") {
                return <div className="d-flex">
                    {`Added new Document ${diff["@insert"]["@id"]}`} 
                    <BsPlus className="text-success fw-bold h5"/>
                    <BsPlus className="text-success fw-bold h5"/>
                    <BsPlus className="text-success fw-bold h5"/>
                </div>
            }
            if(diff.hasOwnProperty("@op") && diff["@op"] === "Delete") {
                return <div className="d-flex">
                    {`Deleted Document ${diff["@delete"]["@id"]}`} 
                    <BiMinusCircle className="text-success fw-bold h5"/>
                    <BiMinusCircle className="text-success fw-bold h5"/>
                    <BiMinusCircle className="text-success fw-bold h5"/>
                </div>
            }
            return null
        }

        let eventKey= diffs[start].hasOwnProperty("@id") ? diffs[start]["@id"] : false
        if(diffs[start].hasOwnProperty("@insert")) {
            eventKey=diffs[start]["@insert"]["@id"]
        }
        if(diffs[start].hasOwnProperty("@delete")) {
            eventKey=diffs[start]["@delete"]["@id"]
        }
        
        //console.log("documentId", documentID, eventKey, css)
        elements.push(
            <React.Fragment>
                <Accordion className="mb-3 bg-secondary accordion__button"
                    id={eventKey}
                    activeKey={eventKey === documentID ? eventKey : false}
                    onSelect={getDocumentStatesOnClick}> 
                    <Accordion.Item eventKey={eventKey}>
                        <Accordion.Header className="w-100">
                            <Stack direction="horizontal" gap={1} className="w-100">
                                <div >
                                    <TbExchange className="text-muted mr-2"/>
                                </div>
                                <div>
                                    <small className="text-gray fw-bold">{getTitle(diffs[start])}</small>
                                </div>
                                <div className="ms-auto">
                                    <small className="text-warning col-md-10 text-right font-italic">
                                        {propertyModified(propertyModifiedCount)}
                                    </small>
                                </div>
                            </Stack>
                        </Accordion.Header>
                        <Accordion.Body>
                            {error && <Alert variant={"danger"}>
                                {error}
                            </Alert>}
                            {!originalValue && !changedValue && <ProgressBar variant="info" animated now={100}/>} 
                            {originalValue && changedValue && documentID === diffs[start]["@id"] && 
                                <DiffViewer 
                                    oldValue={originalValue} 
                                    newValue={changedValue}
                                    oldValueHeader={<OriginHeader branch="main"/>}
                                    newValueHeader={<TrackingHeader branch={CRObject.tracking_branch}/>}
                                    frame={frames}
                                    type={diffs[start]["@type"]}
                                    diffPatch={diffs[start]}/>}
                            {!originalValue && changedValue && 
                                diffs[start].hasOwnProperty("@insert") && 
                                documentID === diffs[start]["@insert"]["@id"] && 
                                <DiffViewer 
                                    oldValue={originalValue} 
                                    newValue={changedValue}
                                    oldValueHeader={<OriginHeader branch="main"/>}
                                    newValueHeader={<TrackingInsertedHeader branch={CRObject.tracking_branch}/>}
                                    frame={frames}
                                    type={diffs[start]["@insert"]["@type"]}
                                    diffPatch={diffs[start]}/>} 
                            {originalValue && !changedValue && 
                                diffs[start].hasOwnProperty("@delete") && 
                                documentID === diffs[start]["@delete"]["@id"] && 
                                <DiffViewer 
                                    oldValue={originalValue} 
                                    newValue={{}}
                                    oldValueHeader={<OriginHeader branch="main"/>}
                                    newValueHeader={<TrackingDeletedHeader branch={CRObject.tracking_branch}/>}
                                    frame={frames}
                                    type={diffs[start]["@delete"]["@type"]}
                                    diffPatch={diffs[start]}/>} 
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <br/>
            </React.Fragment>
        )
    }

    return <React.Fragment>
        {elements}
        <Row className="w-100">
            <Col/>
            <Col>
                <Pagination className="justify-content-center">{paginationItems}</Pagination>
            </Col>
            <Col/>
        </Row>
    </React.Fragment>
}
