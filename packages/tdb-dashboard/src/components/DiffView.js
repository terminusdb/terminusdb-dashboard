import React, {useState,useEffect} from "react"
import Accordion from 'react-bootstrap/Accordion'
import {DiffViewer} from '@terminusdb/terminusdb-documents-ui' 
import {TraverseDocumentLinks, onTraverse} from "@terminusdb/terminusdb-documents-ui-template"
import Badge from 'react-bootstrap/Badge'
import {TbExchange} from "react-icons/tb"
import Stack from 'react-bootstrap/Stack'
import Pagination from 'react-bootstrap/Pagination'
import {DIFFS_PER_PAGE_LIMIT} from "./constants"
import {Row, Col} from "react-bootstrap"
import {DocumentHook} from "../hooks/DocumentHook"
import Alert from 'react-bootstrap/Alert'
import {BsPlus} from "react-icons/bs"
import {BiMinusCircle} from "react-icons/bi"
import {Loading} from "./Loading"
import {DocumentsUIHook} from "@terminusdb/terminusdb-documents-ui"
import {WOQLClientObj} from '../init-woql-client'
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
    return <Badge bg="success" className="float-right fw-bold text-dark">{branch}</Badge>
}

/**
 * 
 * @param {*} branch tracking branch
 * @returns React Element with branch badge
 */
const TrackingHeader = ({branch}) => {
    return <Badge className="float-right fw-bold text-dark bg-primary">{branch}</Badge>
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
        <Badge bg="primary" className="float-right fw-bold text-dark">{branch}</Badge>
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
        <Badge bg="primary" className="float-right fw-bold text-dark">{branch}</Badge>
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

function DiffViewDocument ({documentID,diffObj, CRObject,propertyModifiedCount,frames,action,docType}){
    const { woqlClient } = WOQLClientObj()

    const {getDocumentByBranches, 
        error,
        originalValue, 
        changedValue} = DocumentHook() 

    const [clicked, setClicked]=useState(false)

    function getDocumentStatesOnClick() {
        if(originalValue) return 
        getDocumentByBranches(CRObject.tracking_branch, documentID,action)
    }
    const eventKey = documentID

    const getDocumentById=(docId)=>{
        const clientCopy = woqlClient.copy()
        clientCopy.checkout(CRObject.tracking_branch)
        return clientCopy.getDocument({ id: docId }) 
    }

    function handleTraverse (documentID) {
        onTraverse(documentID, setClicked)
    }

   return <Accordion className="accordion__button padding-0 diff__accordian mb-3" id={eventKey} onSelect={getDocumentStatesOnClick}> 
        <Accordion.Item eventKey={eventKey} className="border-0">
            <Accordion.Header className="w-100 bg-secondary rounded">
            <Stack direction="horizontal" gap={1} className="w-100">
                <div className="mb-3">
                    <TbExchange className="text-muted mr-2"/>
                </div>
                <div>
                    <small className="text-gray fw-bold">{getTitle(diffObj)}</small>
                </div>
                <div className="ms-auto">
                    <small className="text-warning col-md-10 text-right font-italic">
                        {propertyModified(propertyModifiedCount)}
                    </small>
                </div>
            </Stack>
        </Accordion.Header>
       <Accordion.Body className="border border-secondary">
           {error && <Alert variant={"danger"}>
               {error}
           </Alert>}
           {!originalValue && !changedValue && <Loading message={`Loading Diffs ...`}/>} 
           {clicked && <TraverseDocumentLinks 
                getDocumentById={getDocumentById} 
                clicked={clicked} 
                frames={frames}
                show={clicked!==false} 
                onHide={() => setClicked(false)}/>} 
           {originalValue && changedValue && 
               <DiffViewer 
                   oldValue={originalValue} 
                   newValue={changedValue}
                   oldValueHeader={<OriginHeader branch="main"/>}
                   newValueHeader={<TrackingHeader branch={CRObject.tracking_branch}/>}
                   frame={frames}
                   onTraverse={handleTraverse}
                   type={docType}
                   diffPatch={diffObj}/>}
       </Accordion.Body>
   </Accordion.Item>
</Accordion>
}

/**
 * 
 * @param {*} diffs diff list 
 * @param {*} trackingBranchDocumentList document list of tracking branch
 * @param {*} originBranchDocumentList document list of origin branch
 * @returns 
 */
export const DiffView = ({diffs, CRObject}) => { 
    const {woqlClient} = WOQLClientObj()

    // I need to copy the woqlClient and set the original_branch 
    // to get the right frame
    const woqlClientCopy = woqlClient.copy()
    woqlClientCopy.checkout(CRObject.original_branch)

    const {frames,getUpdatedFrames} = DocumentsUIHook(woqlClientCopy)
    // pagination constants
    const [activePage, setActivePage]=useState(1)
    const [current, setCurrent]=useState(0)

    let elements=[], paginationItems=[]

    let divide = Math.ceil(diffs.length/DIFFS_PER_PAGE_LIMIT)

    useEffect(() => {
        getUpdatedFrames()
	},[])
    // function to handle on click of page
    function handlePagination(number) {
        let position=DIFFS_PER_PAGE_LIMIT * (number-1)
        
        setCurrent(position)
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
    
    if(!frames) return <Loading message={`Loading Frames ...`}/>
    if(!diffs) return <Loading message={`Loading Diffs ...`}/>

    
    // looping through diff lists
    for(let start=current; start<(current + DIFFS_PER_PAGE_LIMIT); start++) {
       
        if(start >= diffs.length) continue
      
        const propertyModifiedCount = getPropertyModifiedCount(diffs[start])
        const diffObj = diffs[start]
        const action = diffObj["@op"] || "Change"
        const actionKey = `@${action.toLowerCase()}`
        const eventKey= diffObj[actionKey] && diffObj[actionKey]["@id"] ? diffObj[actionKey]["@id"] : diffObj["@id"]
        const docType = diffObj[actionKey] && diffObj[actionKey]["@type"] ? diffObj[actionKey]["@type"] : diffObj["@type"]
        
        // this are the diff panel for document
        elements.push(
            <React.Fragment key={`item__${start}`}>
               <DiffViewDocument frames={frames} key={actionKey}
                    action={action}
                    docType={docType}
                    propertyModifiedCount={propertyModifiedCount} 
                    documentID={eventKey} 
                    diffObj={diffObj} 
                    CRObject={CRObject}/>
            </React.Fragment>
        )
    }

    return <React.Fragment>
        {elements}
        <Row className="w-100">
            <Col/>
            <Col>
                <Pagination className="justify-content-center ">{paginationItems}</Pagination>
            </Col>
            <Col/>
        </Row>
    </React.Fragment>
}

