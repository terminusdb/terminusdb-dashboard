
//this is the old version for local dashboard
import React from "react"
import {DocumentClassesSummary,useTDBDocuments} from "@terminusdb/terminusdb-documents-ui-template"
import {ErrorMessageReport} from "../components/ErrorMessageReport"
import {IconBarConfig} from "../components/constants"
import { Layout } from "./Layout"
import {Na,Col} from "react-bootstrap"
import {NavLink as RouterNavLink , useParams, useNavigate} from "react-router-dom"
import {WOQLClientObj} from "../init-woql-client"
export const DocumentExplorer = (props) => {

    const {woqlClient} = WOQLClientObj()
    const {dataProduct,organization} = useParams()
    const navigate = useNavigate() 
    const {perDocumentCount,
        totalDocumentCount, 
        documentClasses,
        getDocumentNumbers,
        setError,
        loading:documentLoading,
        error}=useTDBDocuments(woqlClient)

//
    useEffect(() => {
        getDocumentNumbers()
    },[dataProduct])

    const getUrl = (pageName)=> {
        return  `/${organization}/${dataProduct}/${pageName}`
    }

    function handleCardClick (doc) {
        navigate(doc) 
    }


    return <Layout >
                <main role="main" className="content mr-3 ml-5">
                    {documentLoading  && <Loading message={`Fetching documents ...`}/>}
                    {error && <ErrorMessageReport error={error} setError={setError}/>  }
                    {perDocumentCount &&
                        <React.Fragment>
                            <DocumentClassesSummary 
                                perDocumentCount={perDocumentCount}
                                totalDocumentCount={totalDocumentCount}
                                documentClasses={documentClasses} 
                                onClick={handleCardClick}/>
                               {Array.isArray(documentClasses) &&  documentClasses.length===0  &&
                                <Col xs={11} className="d-block ml-5 mr-3">
                                <div className="card card-fil m-3">
                                    <div className="card-body w-100 text-center">
                                        <h4 className="text-muted mt-3 mb-5">{`No document classes created yet...`}</h4>
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
                                    </div>
                                </div>
                            </Col>}  
                        </React.Fragment>     
                    }
                </main>
            </Layout>
       
}

/*
<Nav.Item className="mb-4">
                                <Nav.Link  as={RouterNavLink}
                                    title={IconBarConfig.dataProductModal.title}
                                    className="btn btn-lg btn-info p-2 d-inline text-white"
                                    to={getUrl(IconBarConfig.dataProductModal.path)}
                                    
                                   // onClick={(e) => setRoute(IconBarConfig.dataProductModal.path)}
                                    id={IconBarConfig.dataProductModal.key}>
                                        <BiPlus className="mr-1"/>Create a document
                                </Nav.Link>
                            </Nav.Item> */