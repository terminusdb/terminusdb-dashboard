import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Card} from "react-bootstrap"
import { Layout } from './Layout'
import {useParams} from 'react-router-dom'
import {GetDiffList} from "../hooks/DocumentHook"
import {WOQLClientObj} from "../init-woql-client"
import {DiffView} from "../components/DiffView"
import Badge from 'react-bootstrap/Badge'
import {BiGitBranch} from "react-icons/bi"
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Stack from 'react-bootstrap/Stack'
import {status} from "../components/utils" 
import {ChangeRequest} from "../hooks/ChangeRequest"
import {Loading} from "../components/Loading"
import Alert from 'react-bootstrap/Alert'
import {
    DIFFS, 
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

const BranchCRMessage = ({css, branch}) => {
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


export const ChangeDiff = () => { 

    const {
        woqlClient:client,
        currentCRObject
    } = WOQLClientObj() 

    const {
        getChangeRequestByID,
    } = ChangeRequest()
    const {id} = useParams()

    const [key, setKey] = useState(DIFFS)
    const [action, setAction]=useState(false) 
    const [loading, setLoading]=useState(true)
    const [errorMsg, setErrorMsg]=useState(false)

    useEffect(() => {
        async function getCRID() {
            await getChangeRequestByID(id)
        }
        if(id, client) getCRID()
    }, [id, client])

    //let changeRequestID=localStorage.getItem("TERMINUSCMS_CHANGE_REQUEST_ID")
    const result = GetDiffList(client, id, setLoading, setErrorMsg)      
    //const result = GetDiffList(client, currentCRObject["@id"])   

    useEffect(() => {
        if(key === DIFFS) setAction(false)
    }, [key])

    if(!client) return <div/>

    let documentModifiedCount = result ? result.length : 0

    let author= currentCRObject&&currentCRObject.hasOwnProperty("creator") ?  currentCRObject["creator"] : "user"

    return <Layout>
        <div className='d-flex ml-5 mr-5'>
            <div className='w-100'>
                <Tabs
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
                                <Stack direction="horizontal" gap={3} className="text-right w-100 h5 mt-3 ">
                                    <span className="text-light h6 mt-1 ms-auto">{`Status: `}</span>
                                    {status[currentCRObject.status]}
                                </Stack>
                                <ReviewComponent setKey={setKey} action={action} setAction={setAction}/> 
                                <DiffView diffs={result} CRObject={currentCRObject}/> 
                            </Card.Body> 
                        </Card>
                    </Tab>
                    <Tab eventKey={MESSAGES} title={MESSAGES}>
                        <Messages/>
                    </Tab>
                </Tabs>
            </div>
        </div>         
    </Layout>
}

     /*<small class="fw-bold mr-2 h6">You are in change request mode</small>
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
