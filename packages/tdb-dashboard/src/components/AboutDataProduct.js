import React, {useState, useEffect, Fragment, useRef} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {timeConverter, } from "../pages/utils"
import {Button,Alert} from "react-bootstrap"
import {DATA_PRODUCT_HEALTHY} from "../pages/constants"
import {HealthModal} from "./HealthModal"
import {localSettings} from "../../localSettings"
import InputGroup from 'react-bootstrap/InputGroup'
import Card from "react-bootstrap/Card"
import Form from 'react-bootstrap/Form';
import {CopyButton} from "./utils"
import { ManageDatabase } from "../hooks/ManageDatabase"
import { useParams } from "react-router-dom"
import { Loading } from "./Loading"
import {DocumentControlObj} from "../hooks/DocumentControlContext"

export const AboutDataProduct = ({dataProductDetails, setShowDeleteModal, healthColor ,branches}) =>{
    const {dataProduct,organization} =useParams()
    const [showHealth, setShowHealth]=useState(false)
    const [branchCount, setBranchCount]= useState(0)
    const {woqlClient, accessControlDashboard} = WOQLClientObj()
    const {documentClasses} = DocumentControlObj()
    

    const {cloneDatabase, loading:loadingClone, error:errorClone , setError:setCloneError} =  ManageDatabase()

    const cloneInTeam = useRef(null);
    const cloneDBName = useRef(null);

    if(!woqlClient) return ""  

    const [color, setColor]=useState("text-muted")
    const [healthText, setHealthText]=useState(false)
    
    const getCloneUrl = () =>{
        return `${localSettings.server}${organization}/${organization}/${dataProduct}`
    }

    useEffect(() => {
        if(!healthColor) setColor("text-muted")
        if(healthColor == DATA_PRODUCT_HEALTHY) setColor("text-success")
    }, [healthColor])

    useEffect(() => {
        if(cloneDBName){
            cloneDBName.current.value = dataProduct
        }
    }, [dataProduct])

    useEffect(() => {
        if(branches && typeof branches === "object"){
            const keys = Object.keys(branches)
            setBranchCount(keys.length)
        }
    }, [branches])

    let cloneURL = getCloneUrl()

    async function handleClone() {
		const orgName = cloneInTeam.current.value
        const dbName = cloneDBName.current.value
		
		const tmpClient = woqlClient.copy()
		const connection = tmpClient.connectionConfig
		connection.api_extension = `${organization}/`
		
		const cloneSource= {
			label:dataProduct,
			comment:"please clone the db",
			remote_url: `${connection.dbURLFragment()}`
		}
		const success = await cloneDatabase(cloneSource,orgName,dbName)
		if(success){
            window.location.replace(`/${orgName}/${dbName}`)
		}
	}
    
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
                {!loadingClone && accessControlDashboard && accessControlDashboard.deleteDB() && 
                <Fragment>
                   {errorClone && <Alert variant="danger"  onClose={() => setCloneError(false)} dismissible>{errorClone}</Alert>}
                    <h4 className="card-header-title text-light fw-bold">
                        Clone
                    </h4>
                    <InputGroup>
                        <span className="mt-2 text-light w-100 mb-0">
                            {`You can Clone ${dataProduct} to another Team or in the current Team with a different name.`}
                        </span>
                        <Form.Control ref={cloneDBName}
                            className="cloneInp"
                            placeholder="New Data Product name"
                            aria-label="New Data Product name"
                            defaultValue={dataProduct}                          
                        />                   
                    </InputGroup> 
                    <InputGroup className="mb-3">                    
                        <Form.Select aria-label="Clone Selects" className="mt-4" ref={cloneInTeam}>
                            <option value={false} >Select where you wish to clone</option>
                            {woqlClient && woqlClient.userOrganizations().map(element=>
                                <option key={`item__${element['name']}`} value={element['name']}>{element['name']}</option>
                            )}

                        </Form.Select>
                         <Button 
                         disabled={loadingClone}
                         className="btn-light mt-4" 
                         onClick={handleClone}> {loadingClone ? 'Cloning ...' : 'Clone' } </Button>
                    </InputGroup>
                      
                    </Fragment>
                }   
                {loadingClone && 
                <Loading message={`Cloning .... ${dataProduct}`} type={'PROGRESS_BAR_COMPONENT'}/>}
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
