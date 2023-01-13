import React, {useState, useEffect, Fragment} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {timeConverter, } from "../pages/utils"
import {Col, Button} from "react-bootstrap"
import {DATA_PRODUCT_HEALTHY} from "../pages/constants"
import {HealthModal} from "./HealthModal"
import {localSettings} from "../../localSettings"
import InputGroup from 'react-bootstrap/InputGroup'
import Card from "react-bootstrap/Card"
import Form from 'react-bootstrap/Form';
import {CopyButton} from "./utils"
import {RiDeleteBin7Line} from "react-icons/ri"

export const AboutDataProduct = ({dataProductDetails, setShowDeleteModal, healthColor}) =>{

    const [showHealth, setShowHealth]=useState(false)
    const {
        woqlClient,
        documentClasses,
        branches,
        accessControlDashboard
    } = WOQLClientObj()

    if(!woqlClient) return ""
    const dataProduct = woqlClient.db()
    const organization = woqlClient.organization()

    const [color, setColor]=useState("text-muted")
    const [healthText, setHealthText]=useState(false)
    
    const getCloneUrl = () =>{
        return `${localSettings.server}${organization}/${organization}/${dataProduct}`
    }

    useEffect(() => {
        if(!healthColor) setColor("text-muted")
        if(healthColor == DATA_PRODUCT_HEALTHY) setColor("text-success")
    }, [healthColor])

    const [branchCount, setBranchCount]= useState(0)

    useEffect(() => {
        let count=0
        for (var key in branches){
            count+=1
        }
        setBranchCount(count)
    }, [branches])

    let cloneURL = getCloneUrl()
   
    return <React.Fragment> 

        <HealthModal dataProduct={dataProduct} showHealth={showHealth} setShowHealth={setShowHealth}/>
        <Card className="bg-transparent p-1 mb-5 tdb__align__container" border="muted">
            <Card.Body>
                <h4 className="text-light mb-3 fw-bold">About</h4>
                {dataProductDetails.comment!== 'false' && <span className="text-light mb-4 ">
                    {dataProductDetails.comment}
                </span>}
                {(dataProductDetails.comment==='false' || dataProductDetails.comment==='') && <span className="text-light mb-4">
                    No description provided 
                </span>}
                <span className="d-flex mb-2 mt-3">
                    <h6 className="fw-normal text-muted mb-2 fw-bold tdb__align__label">Data Product ID </h6>
                    <h6 className="text-light">{dataProductDetails.name}</h6>
                </span>
                <span className="d-flex mb-2">
                    <h6 className="fw-normal text-muted mb-2 fw-bold tdb__align__label">Created</h6>
                    <h6 className="text-light">{timeConverter(dataProductDetails.creation_date)}</h6>
                </span>
                <span className="d-flex">
                    <span className="d-flex mb-2 mr-3">
                        <h6 className="fw-normal text-muted mb-2 fw-bold tdb__align__label">Total Document Classes</h6>
                        <h6 className="text-light">{documentClasses.length}</h6>
                    </span>
                </span>
                <span className="d-flex">
                    <span className="d-flex mb-2 mr-3">
                        <h6 className="fw-normal text-muted mb-2 fw-bold tdb__align__label">Total Branches</h6>
                        <h6 className="text-light">{branchCount}</h6>
                    </span>
                </span>
                <span className="d-flex">
                    <span className="d-flex mb-2">
                        <h6 className="fw-normal text-muted mb-2 fw-bold tdb__align__label">Clone Url</h6>    
                    </span>
                    <span className="d-flex mb-2 mr-3">
                        <InputGroup className="mb-3">
                            <Form.Control
                                readOnly
                                className="cloneInp"
                                placeholder="Clone URL"
                                aria-label="URL to clone Data Product"
                                aria-describedby="URL to clone Data Product"
                                defaultValue={cloneURL}
                            />
                            <InputGroup.Text className="bg-transparent">
                                <CopyButton text={cloneURL} title={`Copy Clone URL`} css={"btn btn-sm bg-transparent "}/>
                            </InputGroup.Text>
                        </InputGroup>
                        {/*<h6 className="text-break text-light">{getCloneUrl()}</h6>*/}
                    </span>
                </span>
        
            
            </Card.Body>
        </Card>
        

        <hr className="my-4 border-indigo dropdown-divider" role="separator"></hr>
        <Card className="bg-transparent p-1 mt-5" border="muted">
           <Card.Body>
                {accessControlDashboard && accessControlDashboard.deleteDB() && <Fragment>
                    <h4 className="card-header-title text-light fw-bold">
                        Clone
                    </h4>
                    <InputGroup className="mb-3">
                        <span className="mt-2 text-light w-100 mb-0">
                            {`You can Clone ${dataProduct} to another Team or even locally. Select an option from below ...`}
                        </span>
                        <Form.Select aria-label="Clone Selects" className="mt-4">
                            <option>Select where you wish to clone ...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        <Button className="btn-light mt-4">Clone</Button>
                    </InputGroup>
                    </Fragment>
                }   
            </Card.Body>
        </Card>

        <hr className="my-4 border-indigo dropdown-divider" role="separator"></hr>
        <Card className="bg-transparent p-1 " border="muted">
           <Card.Body>
                {accessControlDashboard && accessControlDashboard.deleteDB() && <Fragment>
                    <h4 className="card-header-title text-light fw-bold">
                    Danger Zone
                    </h4>
                    <div className="w-100 d-block align-items-center gx-0">
                        <span className="mt-2 text-light w-100 mb-0"> Delete this Data Product, there is no going back. Please be certain. </span>
                        <Button variant="secondary" 
                            id="home_open_delete_product_modal"
                            title={`Delete Data Product ${dataProduct}`} 
                            className=" btn btn-lg h2 text-danger fw-bold w-100 mt-4"
                            onClick={(e) =>setShowDeleteModal(true)}>
                             Delete 
                        </Button>
                    </div>
                    </Fragment>
                }   
            </Card.Body>
        </Card>
    </React.Fragment>
}


/* Nuking health for now */
/*
    <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>

    <h4 className="text-muted mb-3 fw-bold">Health</h4>

    {healthText && <p style={{color: color}}>healthText</p>}
    {!healthText && <p className="text-muted">You can set the health of your Data Product.</p>}
<div className="w-100 d-flex align-items-center gx-0">
        <span className={`h2 mb-0 w-100 ${color}`} >
            <BsBarChart/>
        </span>
        <div className="col-auto">
            <span className="h2 text-muted mb-0">
                <Button variant="light" className="btn-sm" onClick={(e)=>setShowHealth(true)}>Change</Button>
            </span>
        </div>
    </div>
*/
