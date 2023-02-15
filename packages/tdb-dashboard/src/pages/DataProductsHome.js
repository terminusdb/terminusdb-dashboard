import React, {useEffect, useState} from "react"
import {Row, Col, Card, Button} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {DeleteDatabaseModal} from "../components/DeleteDatabaseModal"
import {DataProductActivityStatus} from "../components/DataProductActivityStatus"
import {ManageProducts} from "../components/ManageProducts"
import {BsBriefcase, BsDashSquare} from "react-icons/bs"
import {MANAGE_COLLECTIONS} from "../components/constants"
import {BranchControl} from "../hooks/BranchControl"
//import moment from 'moment'
import {AboutDataProduct} from "../components/AboutDataProduct"
import {DATA_PRODUCT_HEALTHY} from "./constants"
import {Layout} from "./Layout"
import {useParams} from 'react-router-dom'
//MAYBE WE CAN CREATE A VIEM MODE PAGE
export const DataProductsHome = (props) => {  
    const {dataProduct,organization} = useParams()
    const {woqlClient,accessControlDashboard,currentChangeRequest } = WOQLClientObj()
    if(!woqlClient) return  ''
    
    //const dataProduct  = woqlClient.db()
    const [dataProductDetails, setDataProductDetails] = useState(false)
    const [dataProductSettings, setDataProductSettings] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    // const [currentDay, setCurrentDay] = useState()

    const { 
        // branchList,
         branches,
         getBranchList,
     } = BranchControl()

     
    function updateTable(){
        getBranchList()
    }
   
    useEffect (() => {
        if(dataProduct && woqlClient){    
            const newList = woqlClient.databases()
            newList.map(dp => {
                if(dp.name === dataProduct) {
                    setDataProductDetails(dp)
                }
            })
            updateTable()
            //setCurrentDay(Date.now())
        }
        //if(setReloadQuery) setReloadQuery(Date.now())
    }, [dataProduct,organization,woqlClient]) 
    
    return  <Layout>
            <main className="content mr-3 ml-5">
            <DeleteDatabaseModal showModal={showDeleteModal} 
                setShowModal={setShowDeleteModal}  
                dataProductDetails={dataProductDetails}/>

            {dataProduct && dataProductDetails && 
            <React.Fragment>
                <Row className="mt-4"><h2 className="text-success fw-bold ml-3" id="home_product_label"> {dataProductDetails.label} </h2></Row>
                <Row className="mt-5 w-100 justify-content-md-center">
                    <Col xs={8} className="d-block">
                       <DataProductActivityStatus/>
                       {!currentChangeRequest && 
                        <Col md={12}  className="mb-5">
                            <div className="card mb-5">
                                <div className="card-header text-light mb-3 fw-bold bg-transparent "> Manage Branches</div>
                                <div className="card-body">
                                    <div className="row align-items-center gx-0">
                                        <div className="col">
                                            <div className="card-body w-100">
                                                <Row className="w-100 d-flex">
                                                    <Col md={10}>
                                                        <p className="mt-2 text-muted"> Each Data Product can have one or more branches, with the default branch called main. Branches saves each version of Data Product as a snapshot of the data exactly as it was at the moment you committed it.</p>

                                                    </Col>
                                                    <Col md={2}>
                                                        {accessControlDashboard && accessControlDashboard.branch() && 
                                                        <Button variant="light" id="home_show_branches" 
                                                            className="m-3 btn btn-sm float-right text-right text-dark" 
                                                            onClick={(e) => setDataProductSettings(MANAGE_COLLECTIONS)}>
                                                            <BsBriefcase className="me-2"/> {MANAGE_COLLECTIONS}
                                                        </Button>}
                                                    </Col>
                                                </Row>
                                                <Row className="w-100 d-block">
                                                    {dataProduct && dataProductDetails && (dataProductSettings ==  MANAGE_COLLECTIONS) && 
                                                        <ManageProducts updateTable={updateTable} branches = {branches} setDataProductSettings={setDataProductSettings}/>
                                                    }
                                                </Row>
                                                
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>}
                       
                    </Col>
                    <Col xs={4}>
                        <AboutDataProduct branches={branches} dataProductDetails={dataProductDetails} 
                            setShowDeleteModal={setShowDeleteModal}
                            healthColor={DATA_PRODUCT_HEALTHY}/>
                    </Col>
                    
                </Row>
             
            </React.Fragment>     
            }

        </main>
    </Layout>
}
