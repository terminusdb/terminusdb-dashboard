import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Card} from "react-bootstrap"
import {useParams} from 'react-router-dom'
import {GetDiffList} from "../hooks/DocumentHook"
import {WOQLClientObj} from "../init-woql-client"
import {DiffView} from "../components/DiffView"
import Badge from 'react-bootstrap/Badge'
import {BiGitBranch} from "react-icons/bi"
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Stack from 'react-bootstrap/Stack'
import {ChangeRequest} from "../hooks/ChangeRequest"
import {Loading} from "../components/Loading"
import Alert from 'react-bootstrap/Alert'
import {
    DIFFS, 
    MERGED, 
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

export const BranchCRMessage = ({css, branch}) => {
    return <React.Fragment>
        <Badge bg={css} className="fw-bold mr-2 text-dark">
            <BiGitBranch className=" mr-1"/>{branch}
        </Badge>
    </React.Fragment>
}

const DisplayHeader = ({author, documentModifiedCount, tracking_branch}) => {
    return <>
        <h6 className="mt-2">{`${author} wants to merge `}</h6>
        <DocumentModifiedCount documentModifiedCount={documentModifiedCount}/>
        <h6 className="mt-2">{` into `}</h6>
        <BranchCRMessage branch={"main"} css={"success"}/>
        <h6 className="mt-2">{`from `}</h6>
        <BranchCRMessage branch={tracking_branch} css={"primary"}/>
    </>
}


export const ChangeDiffComponent = () => { 

    const {
        woqlClient:client,
        currentCRObject
    } = WOQLClientObj() 

    
    const {id} = useParams()

    const [key, setKey] = useState(DIFFS)
    const [action, setAction]=useState(false) 
    const [loading, setLoading]=useState(true)
    const [errorMsg, setErrorMsg]=useState(false)

    const result = GetDiffList(client, id, setLoading, setErrorMsg)      

    useEffect(() => {
        if(key === DIFFS) setAction(false)
    }, [key])

    if(!client) return <div/>

    let documentModifiedCount = result ? result.length : 0

    // email address 
    let author= currentCRObject && currentCRObject.hasOwnProperty("creator_email") ?  currentCRObject["creator_email"] : "creator"

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
                            tracking_branch={currentCRObject.tracking_branch}
                            documentModifiedCount={documentModifiedCount}/>
                    </Stack>
                </Card.Header> 
                <Card.Body> 
                    
                    {currentCRObject.status !== MERGED && <ReviewComponent setKey={setKey} action={action} setAction={setAction}/> }
                    <DiffView diffs={result} CRObject={currentCRObject}/> 
                </Card.Body> 
            </Card>
        </Tab>
        <Tab eventKey={MESSAGES} title={MESSAGES}>
            <Messages setKey={setKey}/>
        </Tab>
    </Tabs>
}

     /*<small className="fw-bold mr-2 h6">You are in change request mode</small>
                                    <span className="float-right fw-bold mr-2 text-dark badge bg-primary mb-1">
                                        {currentCRObject[TRACKING_BRANCH]}
                                    </span>*/

/**
 * 
                                <Row className="w-100 mt-5">
                                    <Col md={6}>
                                        {result && <DocumentModifiedCount documentModifiedCount={documentModifiedCount}/>}
                                    </Col>
                                    <Col md={6}>
                                        <BranchCRMessage trackingBranch={currentCRObject.tracking_branch} originBranch={"main"}/>
                                    </Col>
                                </Row> 
 */
