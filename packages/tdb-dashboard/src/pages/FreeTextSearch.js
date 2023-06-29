import React, {useState,useEffect,useRef} from "react";
import Form from "react-bootstrap/Form"
import { Layout } from "./Layout";
import Button from "react-bootstrap/Button";
import {WOQLClientObj} from '../init-woql-client'
import Accordion from 'react-bootstrap/Accordion'
import Stack from 'react-bootstrap/Stack'
import { useOpenAI } from "../hooks/useOpenAI";
import {Loading} from "../components/Loading"
import Pagination from 'react-bootstrap/Pagination'
import Container  from "react-bootstrap/Container";
import { useTDBDocuments } from "@terminusdb/terminusdb-documents-ui-template";
import { useParams, useNavigate, useLocation, NavLink} from "react-router-dom";
import { ErrorMessageReport } from "../components/ErrorMessageReport";
import  Alert  from "react-bootstrap/Alert";
import { DisplayNoIndexingAction } from "../components/DisplayNoIndexingAction";
import { BsSearch } from "react-icons/bs"
import InputGroup from 'react-bootstrap/InputGroup';
import {FiAlertTriangle} from 'react-icons/fi'


export function FreeTextSearch() {
    const {resetSearch,hasOpenAIKEY,
         getSearchableCommit, searchableCommit, 
         searchResult,
         getResearchResult,start,setStart, error, setError,loading,} = useOpenAI()
    const {dataProduct, organization} = useParams()

    const search = useRef(null)
    const [elements, setElements] = useState("")
    const location = useLocation()


    const commit = Array.isArray(searchableCommit) && searchableCommit.length>0 ? searchableCommit[0].searchable_commit['@value'] : null
    useEffect(()=>{
        if(searchResult){
            getElements()
        }
    },[start,searchResult])
     
    useEffect(()=>{
        setElements([])
        resetSearch()
        hasOpenAIKEY(organization)
        getSearchableCommit(1, "Assigned")
    },[dataProduct])

    const onClickHandler = ()=>{
        const freeText = search.current.value
        if(freeText=== ""){
            setError("Please enter the search data")
        }else {
            getResearchResult (commit, freeText, `${organization}/${dataProduct}`  )
        }
    }
    
    function getElements(){
        const elementsArr = []
        for (let count=start;  count<(5+start); count++) {
            if(count >= searchResult.length) continue  
            //const propertyModifiedCount = getPropertyModifiedCount(diffs[start])
            const documentItem = searchResult[count]
            
            // this are the diff panel for document
            elementsArr.push(
                <React.Fragment key={`item__${documentItem['id']}`}>
                <SearchDocument documentID={documentItem['id']}/>
                </React.Fragment>
            )
        }
        setElements(elementsArr)
    }


    const changePageCallNext =()=>{
        setStart(start+5)
    }

    const changePageCallPreview =()=>{
        setStart(start-5)
    }

    const prevActive = start>1 ? {onClick:changePageCallPreview} : {active:false}
    const nextActive = searchResult.length> start+5  ? {onClick:changePageCallNext} : {active:false}

    const lastDiff = Math.min(searchResult.length, start+5)

    let page = Math.ceil(start/5)

    return  <Layout showLeftSideBar={true} mainClassName={"mt-4"}>  
           {commit && <div className="d-flex flex-column">
           <Alert variant="primary bg-dark text-warning" className="mx-4 ml-4 mr-4">
            <span className="d-flex justify-content-center">
            <FiAlertTriangle size={24} className="mr-3"/><h5>Experimental Feature</h5></span></Alert> 
 
                <InputGroup className="mb-3">
                    <Form.Control ref={search} style={{maxWidth:"500px"}} type="text" placeholder="Search" className="ml-auto"/>
                    <Button onClick={onClickHandler} variant="light" className="mr-auto"><BsSearch/></Button>
                </InputGroup>

            </div>}
            <Container className="mt-4">
                {!commit  && <DisplayNoIndexingAction helpDescription={`You need to index your data before you can search`}/>/*<Alert type="Info" >
                    <h3>You need to index your data before you can search</h3>
                    <p>if you haven't already done it, Go to <NavLink to={`/${organization}/profile`}>Profile page</NavLink> and add an OpenAi Key to your team,</p> 
                    after you can start to index your data using the change request workflow
                </Alert>*/}
                {error &&  <ErrorMessageReport error={error} setError={setError}/> }
                {loading && <Loading>Search Documents</Loading>}
                {searchResult && 
                    <React.Fragment>
                    <div className="w-100 d-flex justify-content-center">
                        <Pagination size={"ls"}>
                            <Pagination.Prev {...prevActive} />
                            <Pagination.Item active>{`Result ${searchResult.length} --  Page ${page+1} -- from ${start+1} to ${lastDiff}`}</Pagination.Item>
                            <Pagination.Next {...nextActive} />
                        </Pagination>
                        </div>
                    {elements}
                    </React.Fragment>
                }   
             </Container>           
            </Layout>
}

function SearchDocument ({documentID}){
    const { woqlClient } = WOQLClientObj()
    const {dataProduct, organization} = useParams()
    const {loading, error, setError, selectedDocument, getSelectedDocument} = useTDBDocuments(woqlClient)
    const navigate = useNavigate()
    // const defaultActiveKey = isOpened ? {defaultActiveKey:"documentID"} : {}

    function getDocumentStatesOnClick (id) { 
        if(id===null)return
        getSelectedDocument(id)
    }

    function navigateToDoc(){
        let fullIdEncode = btoa(documentID)
        const type = selectedDocument["@type"]
        const options = {state:{previewPagePathname:location.pathname, previewPage:"search", currentDocument:documentID}}
        navigate(`/${organization}/${dataProduct}/documents/${type}/${fullIdEncode}`, options)
    }

    const documentObj = {}
    return <Accordion className="accordion__button padding-0 diff__accordian mb-3" id={documentID} onSelect={getDocumentStatesOnClick}> 
    <Accordion.Item eventKey={documentID} className="border-0">
        <Accordion.Header className="w-100 bg-secondary rounded">
        <Stack direction="horizontal" gap={1} className="w-100">
            <div>
                <small className="text-gray fw-bold">{documentID}</small>
            </div>
        </Stack>
    </Accordion.Header>
   <Accordion.Body className="border border-secondary">
       {error && < ErrorMessageReport error={error} setError={setError}></ErrorMessageReport>}
       {loading && <Loading message={`Loading Document ...`}/>}
       {selectedDocument && typeof selectedDocument === "object" && 
            <React.Fragment>
            <Stack direction="horizontal" gap={1} className={"float-right"} >
            <Button onClick={navigateToDoc}>Manage Document</Button>
            </Stack>
            {Object.keys(selectedDocument).map(key=>{
                    return<Stack direction="horizontal" gap={2} >
                            <p class="font-weight-bold text-success">{key}: </p><p class="font-weight-bold">{selectedDocument[key]}</p>
                        </Stack>
            })}
       </React.Fragment>}
   </Accordion.Body>
</Accordion.Item>
</Accordion>
}
 
 // //JSON.stringify(selectedDocument,null,4)}