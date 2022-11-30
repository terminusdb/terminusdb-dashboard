
import React, {useState} from "react"
import {Modal, Button, Form} from "react-bootstrap" 
import {CREATE_NEW_DATA_PRODUCT_BUTTON, newDataProductForm} from "./constants"
import {FaPlus} from "react-icons/fa"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT} from "./constants"
import {WOQLClientObj} from "../init-woql-client"
import {DATA_PRODUCTS} from "../routing/constants"
import {IconBarConfig} from "./constants"
import {BiPlus} from "react-icons/bi"
import {TERMINUS_DANGER} from "./constants"
import {Alerts} from "./Alerts"
import {useNavigate,useParams} from "react-router-dom"
import { UTILS } from "@terminusdb/terminusdb-client"

export const NewDatabaseModal = ({showModal, setShowModal}) => {
    const {
        woqlClient, 
        reconnectToServer
    } = WOQLClientObj()

    const {organization} = useParams()

    const [loading, setLoading] = useState(false)
    const [id, setID]=useState(false)
    const [label, setLabel]=useState(false)
    const [description, setDescription]=useState('')
    const [reportAlert, setReportAlert]=useState(false)

    let navigate = useNavigate();

    function handleCreate () {
        if(!UTILS.checkValidName(id)) {
            setReportAlert("Id is mandatory and can only contain underscores and alphanumeric characters.")
            return
        }else if(!label) {
            setReportAlert('Name cannot be empty')
            return
        }

        let dbInfo = {id: id, label: label, comment: description, organization:woqlClient.organization()}
        if(woqlClient && dbInfo.id && dbInfo.label) {
            setLoading(true)
            woqlClient.createDatabase(dbInfo.id, dbInfo).then((res) => { 
                reconnectToServer(dbInfo.id).then(()=>{
                    navigate(`/${organization}/${dbInfo.id}`)                     
                    setLoading(false)
                    setShowModal(false)
                    setReportAlert(false)
                    //clear all the fields
                    setID('');
                    setLabel('');
                    setDescription(''); 
                })           
                               
            }).catch((err) => {
                let errMsg = err
                if(err.data && err.data["api:message"]){
                    errMsg = err.data["api:message"]
                }
                let message=`Error in creating database ${dbInfo.label}. ${errMsg}`
                setErrorMessage(message)
                setLoading(false)

                //clear all the fields
                setID('');
                setLabel('');
                setDescription('');
            })
        }
    }

    function handleOnBlur (e) {
        e.preventDefault()
        e.stopPropagation()
        setReportAlert(false)
        if(e.target.id == newDataProductForm.id.id)
            setID(e.target.value)
        else if (e.target.id == newDataProductForm.label.id)
            setLabel(e.target.value)
        else if (e.target.id == newDataProductForm.description.id)
            setDescription(e.target.value)
    }

    //block the click propagation
    function onClickPrevent(e){
        e.preventDefault()
        e.stopPropagation()
    }

 
    function handleClose (e) {
        if(setShowModal) setShowModal(false)
    
        setReportAlert(false)
    }
    
    return <Modal onClick={onClickPrevent} size="lg" className="modal-dialog-right" show={showModal} onHide={handleClose}>
        {loading && <Loading message={`Creating ${label} ...`} type={PROGRESS_BAR_COMPONENT}/>}
        <Modal.Header>
            <Modal.Title className="h6"><FaPlus className="me-2 mr-3"/>Create a New Data Product </Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className="p-5">
            {reportAlert && <Alerts message={reportAlert} type={TERMINUS_DANGER}/>}
            <Form >
                <Form.Group className="mb-3">
                    <Form.Control required id={newDataProductForm.id.id} type={"text"} onBlur={handleOnBlur} placeholder={newDataProductForm.id.placeholder} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control  required id={newDataProductForm.label.id} type={"text"} onBlur={handleOnBlur} placeholder={newDataProductForm.label.placeholder} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control  id={newDataProductForm.description.id} as="textarea"  onBlur={handleOnBlur} rows="5" placeholder={newDataProductForm.description.placeholder} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer> 
              <button title={IconBarConfig.dataProductView.title}  
                    className="btn-new-data-product mr-1 pt-2 pb-2 pr-4 pl-4 btn btn-sm btn btn-info" 
                    to={IconBarConfig.dataProductView.path} 
                    onClick={(e) => handleCreate()}
                    id="create_data_product_button">
                    <BiPlus className="mr-1" size="1em"/>{CREATE_NEW_DATA_PRODUCT_BUTTON.label}
               </button>
        </Modal.Footer>
    </Modal>
}