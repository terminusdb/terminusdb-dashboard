
import React, {useState} from "react"
import {Modal, Button, Form} from "react-bootstrap" 
import {CREATE_NEW_DATA_PRODUCT_BUTTON, newDataProductForm} from "./constants"
import {FaPlus} from "react-icons/fa"
import {PROGRESS_BAR_COMPONENT} from "./constants"
import {WOQLClientObj} from "../init-woql-client"
import {DATA_PRODUCTS} from "../routing/constants"
import {IconBarConfig} from "./constants"
import {BiPlus} from "react-icons/bi"
import {TERMINUS_DANGER} from "./constants"
import {Alerts} from "./Alerts"
import {useNavigate,useParams} from "react-router-dom"
import {UTILS} from "@terminusdb/terminusdb-client"
import {Loading} from "../components/Loading"
import { ManageDatabase } from "../hooks/ManageDatabase"
export const NewDatabaseModal = ({showModal, setShowModal, dbDetails = null}) => {
    const {
        reconnectToServer
    } = WOQLClientObj()

    const {organization} = useParams()
    const {createDatabase,updateDatabase,error,loading,setError} = ManageDatabase()

    const startid = dbDetails && dbDetails.name ? dbDetails.name : ''
    const startlabel = dbDetails && dbDetails.label ? dbDetails.label : '' 
    const startComment =  dbDetails && dbDetails.comment ? dbDetails.comment : '' 
    const title = startid ? `Update the Dataproduct ${startid} details` : 'New Data Product'
    const loadingMessage = startid ? `Updating ${startid}` : `Creating ${startid}`
    const defValueId = startid ? {style:{display:"none"}} : {}
    const action = startid ? {onClick:handleUpdate} : {onClick:handleCreate}
    const buttonLabel = startid ? "Update Dataproduct" : CREATE_NEW_DATA_PRODUCT_BUTTON.label 

    const [id, setID]=useState(startid)
    const [label, setLabel]=useState(startlabel)
    const [description, setDescription]=useState(startComment)
  
    let navigate = useNavigate();

    async function handleCreate () {
        const result = await createDatabase(id,label,description)
        if(result){
            await reconnectToServer(id)
            setShowModal(false)
            navigate(`/${organization}/${id}`) 
        }
    }

    async function handleUpdate () {
        const result = await updateDatabase(label,description)
        if(result){
            dbDetails.label = label
            dbDetails.comment = description
            await reconnectToServer(startid)
            setShowModal(false)
        }
    }


    function handleOnBlur (e) {
        e.preventDefault()
        e.stopPropagation()
        setError(false)
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
        setError(false)
    }
    
    
    return <Modal onClick={onClickPrevent} size="lg" className="modal-dialog-right" show={showModal} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title className="h6">{/*<FaPlus className="me-2 mr-3"/>*/}{title} </Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        {loading && <div style={{height: "300px"}}><Loading message={loadingMessage}/></div>}
        <Modal.Body className="p-5">
            {!loading && error && <Alerts message={error} type={TERMINUS_DANGER} onCancel={()=>{setError(false)}}/>}
            {!loading && <Form >
                <Form.Group className="mb-3" {...defValueId}>
                    <Form.Control required id={newDataProductForm.id.id} 
                        type={"text"} 
                        defaultValue={id}
                        onBlur={handleOnBlur} 
                        placeholder={newDataProductForm.id.placeholder} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control  defaultValue={label}
                    required id={newDataProductForm.label.id} type={"text"} onBlur={handleOnBlur} placeholder={newDataProductForm.label.placeholder} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control  defaultValue={description} id={newDataProductForm.description.id} as="textarea"  onBlur={handleOnBlur} rows="5" placeholder={newDataProductForm.description.placeholder} />
                </Form.Group>
            </Form>}
        </Modal.Body>
        <Modal.Footer> 
              <button title={IconBarConfig.dataProductView.title}  
                    className="btn-new-data-product mr-1 pt-2 pb-2 pr-4 pl-4 btn btn-sm btn btn-info" 
                    to={IconBarConfig.dataProductView.path} 
                    {...action}
                    id="create_data_product_button">
                    <BiPlus className="mr-1" size="1em"/>{buttonLabel}
               </button>
        </Modal.Footer>
    </Modal>
}