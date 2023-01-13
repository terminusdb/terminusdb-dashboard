import React, {useEffect, useState} from "react"
import {Row, Col, Card, Button} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {DeleteDatabaseModal} from "../components/DeleteDatabaseModal"
import {DataProductActivityGraph, DataProductActivityBoard} from "../components/DataProductActivityStatus"
import {ManageProducts} from "../components/ManageProducts"
import {BsBriefcase, BsDashSquare} from "react-icons/bs"
import {MANAGE_COLLECTIONS} from "../components/constants"
//import moment from 'moment'
import {AboutDataProduct} from "../components/AboutDataProduct"
import {DATA_PRODUCT_HEALTHY} from "./constants"
import {Layout} from "./Layout"
//MAYBE WE CAN CREATE A VIEM MODE PAGE
export const DataProductsHome = (props) => {  
    const {woqlClient,accessControlDashboard } = WOQLClientObj()
    if(!woqlClient) return  ''
    const dataProduct  = woqlClient.db()
    const [dataProductDetails, setDataProductDetails] = useState(false)
    const [dataProductSettings, setDataProductSettings] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [currentDay, setCurrentDay] = useState()
   
    useEffect (() => {
        if(dataProduct && woqlClient){    
            const newList = woqlClient.databases()
            newList.map(dp => {
                if(dp.name === dataProduct) {
                    setDataProductDetails(dp)
                }
            })
            setCurrentDay(Date.now())
        }
        //if(setReloadQuery) setReloadQuery(Date.now())
    }, [dataProduct,woqlClient]) 
    
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
                        {/*<DataProductSummary/>*/}

                        <Col md={12}>
                            <DataProductActivityGraph />
                        </Col>

                        <Col md={12}  className="mb-5">
                            <DataProductActivityBoard />
                        </Col>

                        <Col md={12}  className="mb-5">
                            <div className="card mb-5">
                                <div class="card-header text-light mb-3 fw-bold bg-transparent "> Manage Branches</div>
                                <div className="card-body">
                                    <div className="row align-items-center gx-0">
                                        <div className="col">
                                            <div className="card-body w-100">
                                                <Row className="w-100 d-flex">
                                                    <Col md={10}>
                                                        <p className="mt-2 text-light"> Each Data Product can have one or more branches, with the default branch called main. Branches saves each version of Data Product as a snapshot of the data ly as it was at the moment you committed it.</p>
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
                                                        <ManageProducts setDataProductSettings={setDataProductSettings}/>
                                                    }
                                                </Row>
                                                
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                       
                    </Col>
                    <Col xs={4}>
                        <AboutDataProduct dataProductDetails={dataProductDetails} 
                            setShowDeleteModal={setShowDeleteModal}
                            healthColor={DATA_PRODUCT_HEALTHY}/>
                    </Col>
                    
                </Row>
             
            </React.Fragment>     
            }

        </main>
    </Layout>
}
