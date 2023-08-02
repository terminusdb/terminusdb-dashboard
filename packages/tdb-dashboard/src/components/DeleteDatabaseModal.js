import React, {useEffect, useState} from "react"
import {Modal, Button, Form} from "react-bootstrap" 
import {deleteDataProductForm} from "./constants"
import {AiOutlineDelete} from "react-icons/ai"
import {Loading} from "../components/Loading"
import {PROGRESS_BAR_COMPONENT} from "./constants"
import {WOQLClientObj} from "../init-woql-client"
import {TERMINUS_DANGER} from "./constants"
import {Alerts} from "./Alerts"
import {useNavigate,useParams} from "react-router-dom" 
import { DELETE_DATA_PRODUCT_ID, DELETE_DATAPRODUCT_BUTTON_ID } from "../cypress.constants"

export const DeleteDatabaseModal = ({showModal,setShowModal, dataProductDetails}) => {
    const {
        woqlClient, 
        reconnectToServer
    } = WOQLClientObj()
    if(!woqlClient) return ""

    let {organization} = useParams()
    let navigate = useNavigate();
    
    const [id, setID]=useState(false)
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled]=useState(true)
    const [reportAlert, setReportAlert]=useState(false)

  
    function handleClick () {
        event.preventDefault()
        if(disabled) return;

        setLoading(true)
        let dbInfo = dataProductDetails
        const clientCopy = woqlClient.copy()
        clientCopy.connectionConfig.api_extension = 'api/'
        clientCopy.deleteDatabase(dataProductDetails.name, woqlClient.organization(), true)
        .then((res) => {        
            setShowModal(false)
            setDisabled(true)
            setReportAlert(false)
            setLoading(false)
            reconnectToServer()
            navigate(`/${organization}`)         
        })
        .catch((err) => {
            let messaage=`Error in deleting database ${dataProductDetails.label}. ${err}`
            setReportAlert(messaage)
            setLoading(false)
        })
    }
    
    function handleOnChange (e) {
        if(e.target.value === dataProductDetails.name){
            setID(e.target.value)
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }
 
    function handleClose (e) {
        if(setShowModal) setShowModal(false)
    }

    useEffect(() => {
        if(showModal) setReportAlert(false)
    }, [showModal])
    
    return <Modal size="lg" className="modal-dialog-right" show={showModal} onHide={handleClose}>
        {loading && <div style={{height: "300px"}}><Loading message={`Deleting Data Product ${dataProductDetails.label} ...`}/></div>}
        {!loading && <><Modal.Header>
            <Modal.Title className="h6">{`Are you sure to delete Data Product - ${dataProductDetails.label} ?`} </Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
         <Modal.Body className="p-5">
            {reportAlert && <Alerts message={reportAlert} type={TERMINUS_DANGER}/>}
            <div className="d-flex align-items-center col-md-12 mb-3">
                <h6 className="fw-normal text-muted mb-2">Data Product ID </h6>
                <h6 className="ml-3">{dataProductDetails.name}</h6>
            </div>
            <div className="d-flex align-items-center col-md-12 mb-3">
                <h6 className="fw-normal text-muted mb-2">Name </h6>
                <h6 className="ml-3">{dataProductDetails.label}</h6>
            </div>
            {dataProductDetails.comment && <div className="d-flex align-items-center col-md-12 mb-3">
                {dataProductDetails.comment}
            </div>}
            <Form onSubmit={handleClick}>
                <Form.Group className="mb-3">
                    <Form.Control required 
                        id={dataProductDetails.name} 
                        type={deleteDataProductForm.type} 
                        data-cy={DELETE_DATA_PRODUCT_ID}
                        onChange={handleOnChange} 
                        placeholder={deleteDataProductForm.placeholder} />
                </Form.Group>
            </Form>
        </Modal.Body> 
        <Modal.Footer>
            <Button
                id ="delete_data_product_button"
                variant="danger" 
                data-cy={DELETE_DATAPRODUCT_BUTTON_ID}
                title={`Delete Data Product ${dataProductDetails.name}`} 
                disabled={disabled}
                onClick={handleClick}>
                <AiOutlineDelete className="me-2" /> Delete 
            </Button>
        </Modal.Footer> </> }
    </Modal>
}

