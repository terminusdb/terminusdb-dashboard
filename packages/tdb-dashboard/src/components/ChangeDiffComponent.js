import React, {useState, useEffect} from 'react'
import {Card} from "react-bootstrap"
import {useDiff} from "../hooks/useDiff"
import {WOQLClientObj} from "../init-woql-client"
import {DiffView} from "../components/DiffView"
import Badge from 'react-bootstrap/Badge'
import {BiGitBranch} from "react-icons/bi"
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Stack from 'react-bootstrap/Stack'
import {Loading} from "../components/Loading"
import Alert from 'react-bootstrap/Alert'
import { useParams } from 'react-router-dom'
import {useTDBDocuments} from "@terminusdb/terminusdb-documents-ui-template"
import {
    DIFFS, 
    MERGED, 
    SUBMITTED,
    MESSAGES, 
    TRACKING_BRANCH
} from "../components/constants"
import {Messages} from "../components/Messages"
import {ReviewComponent} from "../components/ReviewComponent"

const DocumentModifiedCount = ({documentModifiedCount}) => { 
    if(documentModifiedCount > 1) return <h6 className="fw-bold mt-2 text-warning font-italic">
        {`${documentModifiedCount} documents`}
    </h6>

    if(documentModifiedCount === 1) return <h6 className="fw-bold mt-2 text-warning font-italic">
        {`${documentModifiedCount} document`}
    </h6>
}

export const BranchCRMessage = ({css, title}) => {
    return <React.Fragment>
        <Badge bg={css} className="fw-bold mr-2 text-dark">
            <BiGitBranch className=" mr-1"/>{title}
        </Badge>
    </React.Fragment>
}

const DisplayHeader = ({author, documentModifiedCount, tracking_branch,original_branch}) => {
    return <>
        <h6 className="mt-2">{`${author} wants to merge `}</h6>
        <DocumentModifiedCount documentModifiedCount={documentModifiedCount}/>
        <h6 className="mt-2">{` into `}</h6>
        <BranchCRMessage title={original_branch} css={"success"}/>
        <h6 className="mt-2">{`from `}</h6>
        <BranchCRMessage title={tracking_branch} css={"primary"}/>
    </>
}


export const ChangeDiffComponent = () => { 
    const {changeid} = useParams()
    const {
        woqlClient:client,
        currentCRObject
    } = WOQLClientObj() 

    const {getDiffList,error:errorMsg,loading,result,start} = useDiff()
    
    const [key, setKey] = useState(DIFFS)

    const woqlClientCopy = client.copy()
    woqlClientCopy.checkout(currentCRObject.original_branch)

    const {frames,getDocumentFrames} = useTDBDocuments(woqlClientCopy)
   
   
    useEffect(() => {
        getDocumentFrames()
        getDiffList(changeid)
    }, [])
    

    if(!client) return <div/>

    let documentModifiedCount = result ? result.length : 0
    // email address 
    let author= currentCRObject && currentCRObject.hasOwnProperty("creator_email") ?  currentCRObject["creator_email"] : "creator"

    const changePage=(page)=>{
        getDiffList(changeid,page)
    }

    return  <Tabs
        id="change_request_tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3">
        <Tab eventKey={DIFFS} title={DIFFS}>
            {loading && <Loading message={`Loading Diffs ...`}/>}
            {errorMsg && <Alert variant={"danger"} className="mr-3">
                {errorMsg}
            </Alert>}
            {!documentModifiedCount && <h6 className="text-muted fw-bold mt-3 mb-3">
                {`No documents `}
            </h6>}
            <Card bg="transparent" className="border-secondary mt-5 mb-5">
                <Card.Header>
                    <Stack direction="horizontal" gap={2} className="mt-1">
                        <DisplayHeader author={author} 
                            tracking_branch={currentCRObject.name || currentCRObject.tracking_branch}
                            original_branch ={currentCRObject.original_branch}
                            documentModifiedCount={documentModifiedCount}/>
                    </Stack>
                </Card.Header> 
                <Card.Body>                 
                    {currentCRObject.status === SUBMITTED && 
                    <ReviewComponent/> }
                    {!loading && <DiffView diffs={result} CRObject={currentCRObject} start={start} setStart={setStart}/>} 
                </Card.Body> 
            </Card>
        </Tab>
        <Tab eventKey={MESSAGES} title={MESSAGES}>
            <Messages setKey={setKey}/>
        </Tab>
    </Tabs>
}