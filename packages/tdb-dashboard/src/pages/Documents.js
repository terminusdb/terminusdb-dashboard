import React, {useState, useEffect} from "react"
import {DocumentSummary} from "@terminusdb/terminusdb-documents-ui-template"
import {DocumentsUIHook} from "@terminusdb/terminusdb-documents-ui"
import {ErrorMessageReport} from "../components/ErrorMessageReport"
import {BiPlus} from "react-icons/bi"
import {WOQLClientObj} from '../init-woql-client'
import 'react-accessible-accordion/dist/fancy-example.css'
import {IconBarConfig} from "../components/constants"
import {Nav} from "react-bootstrap"
import {NavLink as RouterNavLink , useParams, useNavigate} from "react-router-dom"
import {Loading} from "../components/Loading"

export const Documents = () => {   
    const {woqlClient} = WOQLClientObj()
    const {dataProduct,organization} = useParams()
    const navigate = useNavigate() 
    const {perDocumentCount,
        totalDocumentCount, 
        documentClasses,
        getDocNumber,
        setError,
        loading,
        error}=DocumentsUIHook(woqlClient)

//
    useEffect(() => {
        getDocNumber()
    },[dataProduct])

    const getUrl = (pageName)=> {
        return  `/${organization}/${dataProduct}/${pageName}`
    }

    function handleCardClick (doc) {
        navigate(doc) 
    }

    if(loading) return  <Loading message={`Fetching documents ...`}/>

    return <div className="w-100">
            {error && <ErrorMessageReport error={error} setError={setError}/>}
            <DocumentSummary totalDocumentCount={totalDocumentCount}
                perDocumentCount={perDocumentCount} documentClasses ={documentClasses}
                onClick={handleCardClick}>
                <Nav.Item className="mb-4">
                    <Nav.Link  as={RouterNavLink}
                        title={IconBarConfig.dataProductModal.title}
                        className="btn btn-lg btn-info p-2 d-inline text-white"
                        to={getUrl(IconBarConfig.dataProductModal.path)}                
                        // onClick={(e) => setRoute(IconBarConfig.dataProductModal.path)}
                        id={IconBarConfig.dataProductModal.key}>
                        <BiPlus className="mr-1"/>Create a document
                    </Nav.Link>
                </Nav.Item>
            </DocumentSummary>
        </div>
}