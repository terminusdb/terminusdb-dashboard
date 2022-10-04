import React, {useEffect, useState} from "react"
import {Col, Button, Card, Form, Row, Nav} from "react-bootstrap"
//import {FrameViewer} from './frames/FrameViewer'
import { FrameViewer } from "@terminusdb/terminusdb-documents-ui"
import {ToggleJsonAndFormControl} from "./ToggleJsonAndFormControl"
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
require('codemirror/mode/css/css')
require('codemirror/mode/javascript/javascript')
import {FORM_VIEW, JSON_VIEW, EDIT_DOCUMENT, CREATE_DOCUMENT} from "./constants"
import {JsonFrameViewer} from "./JsonFrameViewer"
import {PROGRESS_BAR_COMPONENT} from "./constants"
import {DocumentationTypeFrame} from "./DocumentationTypeFrame"
import {DocumentControlObj} from '../hooks/DocumentControlContext'
import {NavLink as RouterNavLink, useParams} from "react-router-dom"
import {IconBarConfig} from "./constants"
import {checkIfNoProperties} from "./utils"
import {BiPlus} from "react-icons/bi"
import {Loading} from "./Loading"
import history from '../routing/history'
import {WOQLClientObj} from '../init-woql-client'
import TerminusClient from '@terminusdb/terminusdb-client'


export const DocumentFrames = () => {

    const {dataProduct,organization} = useParams()

    const getUrl = (pageName)=> {
        return  `/${organization}/${dataProduct}/${pageName}`
    }
    const {
        frames,
        woqlClient
    } = WOQLClientObj()


    const {
        documentObjectWithFrames,
        documentObject,
        setDocumentObject
    } = DocumentControlObj()

    const [currentView, setCurrentView]=useState(documentObject.view)
    const [loading, setLoading]=useState(true)




    function handleClick (view) { // on toggle of json and form controls
        let docObj = documentObjectWithFrames
        docObj.view=view
        setCurrentView(view)
        setDocumentObject(docObj)
    }

    useEffect(() =>{
        if(documentObject.frames) {
            setLoading(false)
            //documentObject.loading = <Loading message={`Fetching frames ...`} type={PROGRESS_BAR_COMPONENT}/>
        }
    }, [documentObject.frames])


    const onSelect = async (inp, type) => {
        let WOQL =  TerminusClient.WOQL
        var docType=`@schema:${type}`
        /*let split = item["@id"].split(':')
        if(split.length === 2){
            docType=split[1]
        }*/ 
        let q = WOQL.isa("v:Documents", docType)
        const results = await q.execute(woqlClient)
        .then((response) => {
            let options = []
            if(inp){
                response.bindings.map(thing => {
                    if(thing["Documents"].toUpperCase().includes(inp.toUpperCase())){
                        options.push({value: thing["Documents"], label: thing["Documents"]})
                    }
                })
            }
            else {
                response.bindings.map(thing => {
                    options.push({value: thing["Documents"], label: thing["Documents"]})
                })
            }
            return options
        })
        .catch((error) => {
            console.log("query run error", error)
        })
        return results
    }



    const onSubmit = (formData) => {
        formData["@type"]=documentObject.type

        //console.log("Data submitted: ",  formData)

        if(documentObject.action === CREATE_DOCUMENT){
            setDocumentObject({
                action: CREATE_DOCUMENT,
                type: documentObject.type,
                view: documentObject.view,
                submit: true,
                frames: formData,
                filledFrame: {},
                message: false,
                update: documentObject.update,
                loading: <Loading message={`Creating new ${documentObject.type} ...`} type={PROGRESS_BAR_COMPONENT}/>
            })
        }
        else if(documentObject.action === EDIT_DOCUMENT){
            formData["@id"]=documentObject.filledFrame["@id"]
            setDocumentObject({
                action: EDIT_DOCUMENT,
                type: documentObject.type,
                view: documentObject.view,
                submit: true,
                frames: formData,
                filledFrame: documentObject.filledFrame,
                message: false,
                update: false,
                loading: <Loading message={`Updating ${documentObject.filledFrame["@id"]} ...`} type={PROGRESS_BAR_COMPONENT}/>
            })
        }
    }

    //console.log("documentObject", documentObject.message)

    //console.log("refreshedDocumentObject in doc frame", documentObjectWithFrames)
    
    if(loading) return <Loading message={`Fetching frames ...`} type={PROGRESS_BAR_COMPONENT}/>

    return <main className="content mr-3 ml-5 w-100">
        <Row className="w-100 mb-5">
            <Col md={11}>
                {checkIfNoProperties(documentObject.frames) && <Col xs={11} className="d-block ml-5 mr-3">
                    <div className="card card-fil m-3">
                        <div className="card-body w-100 text-center">
                            <h4 className="text-muted mt-3 mb-5">{`No properties defined for ${documentObject.type}...`}</h4>
                            <Nav.Item className="mb-4">
                                <Nav.Link  as={RouterNavLink}
                                    title={IconBarConfig.dataProductModal.title}
                                    className="btn btn-lg btn-info d-inline text-white"
                                    to={getUrl(IconBarConfig.dataProductModal.path)}
                                    
                                    id={IconBarConfig.dataProductModal.key}>
                                        <BiPlus className="mr-1"/>{`Add properties to ${documentObject.type}`}
                                </Nav.Link>
                            </Nav.Item>
                        </div>
                    </div>
                </Col>
                }
                {!checkIfNoProperties(documentObject.frames) && <Card>
                    {documentObject.loading && documentObject.loading}
                    <Card.Header className="d-flex w-100 text-break">
                        <span className="w-100 float-left d-flex">
                            {documentObjectWithFrames.action == CREATE_DOCUMENT && <h5>
                                Create a new
                                <strong className="text-success ml-1">{documentObjectWithFrames.type}</strong>
                            </h5>}
                            {documentObjectWithFrames.action == EDIT_DOCUMENT && <h5>
                                Edit
                                <strong className="text-success ml-1">{documentObjectWithFrames.type}</strong>
                            </h5>}
                        </span>
                        <ToggleJsonAndFormControl onClick={handleClick} documentObjectWithFrames={documentObjectWithFrames}/>
                    </Card.Header>
                    <Card.Body className="text-break">
                        {documentObject.message && documentObject.message}
                        {documentObjectWithFrames.frames &&
                            documentObjectWithFrames.frames["@documentation"] &&
                            documentObjectWithFrames.frames["@documentation"]["@comment"] &&
                            <p className="text-muted fw-bold ml-3">
                            {documentObjectWithFrames.frames["@documentation"]["@comment"]}
                        </p>
                        }
                        {/*(currentView==FORM_VIEW) && documentObjectWithFrames.frames && <FrameViewer/> */}

                        {(currentView==FORM_VIEW) && documentObjectWithFrames.frames &&
                            <FrameViewer frame={frames}
                                type={documentObjectWithFrames.type}
                                mode={documentObjectWithFrames.action}
                                onSubmit={onSubmit}
                                onSelect={onSelect}
                                formData={documentObjectWithFrames.filledFrame}
                            />

                        }

                        {(currentView==JSON_VIEW) &&  documentObjectWithFrames.frames && <JsonFrameViewer/>
                        }
                    </Card.Body>
                </Card> }
            </Col>
        </Row>
    </main>


}
